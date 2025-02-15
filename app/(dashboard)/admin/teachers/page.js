"use client";

// Import necessary components and libraries
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Users, PlusCircle, Delete, BarChart2 } from "lucide-react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent 
} from "@/components/ui/dropdown-menu"

function Teachers() {
  // --- State Management ---
  // Core states for teacher data
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectsLoading, setSubjectsLoading] = useState(true); // Fix: Initialize as boolean

  // Form-related states
  const [isAddPopoverOpen, setIsAddPopoverOpen] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    subjects: [],
    semesters: []
  });

  // Subject-related states
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedSemesters, setSelectedSemesters] = useState([]);
  const [subjectNames, setSubjectNames] = useState({});

  // Generate semester numbers 1-8
  const semesters = Array.from({length: 8}, (_, i) => i + 1);

  // --- Event Handlers ---
  // Handle teacher name input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDelete = async (teacherId) => {
    // Add your delete logic here
    try {
      const response = await axios.delete(
        `http://localhost:3002/api/v1/teachers/${teacherId}`
      );
      if (response.status === 200) {
        // Fix: Use _id instead of studentId in the filter
        setTeachers((prevSubjects) =>
          prevSubjects.filter((teacher) => teacher._id !== teacherId)
        );
        // console.log("Teacher deleted successfully");
      }
    } catch (error) {
      console.error("Delete Error", error);
      alert("Error deleting Subject");
    }
  };
  // Fix the filteredTeachers implementation
  const filteredTeachers = teachers.filter((teacher) =>
    teacher?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Alternative safer implementation if you prefer
  /*
  const filteredTeachers = React.useMemo(() => {
    if (!Array.isArray(teachers)) return [];
    return teachers.filter((teacher) => 
      teacher?.name?.toLowerCase().includes(searchQuery?.toLowerCase() || '')
    );
  }, [teachers, searchQuery]);
  */

  // Handle subject selection with checkbox
  const handleSubjectToggle = (subjectId) => {
    const updatedSubjects = selectedSubjects.includes(subjectId)
      ? selectedSubjects.filter(id => id !== subjectId)
      : [...selectedSubjects, subjectId];
    
    setSelectedSubjects(updatedSubjects);
    setNewTeacher(prev => ({
      ...prev,
      subjects: updatedSubjects
    }));
  };

  // Handle semester selection
  const handleSemesterToggle = (semester) => {
    const updatedSemesters = selectedSemesters.includes(semester)
      ? selectedSemesters.filter(sem => sem !== semester)
      : [...selectedSemesters, semester];
    
    setSelectedSemesters(updatedSemesters);
    setNewTeacher(prev => ({
      ...prev,
      semesters: updatedSemesters
    }));
  };

  // --- Form Submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!newTeacher.name) return alert("Name is required");
    if (newTeacher.subjects.length === 0) return alert("Please select at least one subject");
    if (newTeacher.semesters.length === 0) return alert("Please select at least one semester");

    const teacherData = {
      name: newTeacher.name,
      subjects: newTeacher.subjects,
      semesters: newTeacher.semesters.sort((a, b) => a - b)
    };

    try {
      const response = await axios.post("http://localhost:3002/api/v1/teachers/create", teacherData);
      if (response.status === 201) {
        // Refresh the teachers list instead of just adding the new data
        const teachersResponse = await axios.get("http://localhost:3002/api/v1/teachers/get");
        if (teachersResponse.status === 200 && teachersResponse.data.success) {
          setTeachers(teachersResponse.data.data);
        }
        
        // Reset form
        setNewTeacher({ name: "", subjects: [], semesters: [] });
        setSelectedSubjects([]);
        setSelectedSemesters([]);
        setIsAddPopoverOpen(false);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error adding teacher");
    }
  };

  // --- Data Fetching ---
  // Fetch teachers
  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3002/api/v1/teachers/get"
        );
        if (response.status === 200 && response.data.success) {
          const teacherData = Array.isArray(response.data.data) ? response.data.data : [];
          setTeachers(teacherData);
          
          setSubjectsLoading(true); // Start loading subjects
          // Fetch all unique subject IDs
          const uniqueSubjectIds = [...new Set(
            teacherData.flatMap(teacher => teacher.subjects)
          )];

          // Fetch subjects in parallel
          const subjectPromises = uniqueSubjectIds.map(async (subjectId) => {
            try {
              const subjectResponse = await axios.get(`http://localhost:3002/api/v1/subjects/${subjectId}`);
              if (subjectResponse.status === 200) {
                return { 
                  id: subjectId, 
                  name: subjectResponse.data.data.name // Adjust based on your API response structure
                };
              }
            } catch (error) {
              console.log(`Error fetching subject ${subjectId}:`, error);
              return { id: subjectId, name: 'Unknown' };
            }
          });

          const subjectsData = await Promise.all(subjectPromises);
          const subjectNamesMap = subjectsData.reduce((acc, subject) => {
            acc[subject.id] = subject.name;
            return acc;
          }, {});

          setSubjectNames(subjectNamesMap);
        }
      } catch (error) {
        console.error("Error fetching Teachers:", error);
        setTeachers([]);
      } finally {
        setLoading(false);
        setSubjectsLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  // Fetch subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/v1/subjects/get");
        if (response.status === 200 && response.data.success) {
          setAvailableSubjects(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  // --- Render UI ---
  return (
    <section className="w-full p-5">
      {/* Stats Card */}
      <div className="grid lg:grid-cols-3 gap-4 mb-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Teachers</p>
                <p className="text-2xl font-bold">{teachers.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Add Teacher Section */}
      <div className="flex space-x-4 mb-8">
        <Input
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Popover open={isAddPopoverOpen} onOpenChange={setIsAddPopoverOpen}>
          <PopoverTrigger asChild>
            <Button className="flex items-center space-x-2">
              <PlusCircle className="w-5 h-5" />
              <span>Add Teacher</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-4">
                {/* Name Input */}
                <Input
                  name="name"
                  placeholder="Teacher Name"
                  value={newTeacher.name}
                  onChange={handleInputChange}
                />
                
                {/* Semester Selection */}
                <div className="space-y-2">
                  <Label>Select Semesters</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {semesters.map((semester) => (
                      <div key={semester} className="flex items-center space-x-2">
                        <Checkbox
                          id={`semester-${semester}`}
                          checked={selectedSemesters.includes(semester)}
                          onCheckedChange={() => handleSemesterToggle(semester)}
                        />
                        <Label htmlFor={`semester-${semester}`}>Sem {semester}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subject Selection with Checkboxes */}
                <div className="space-y-2">
                  <Label>Select Subjects</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        {selectedSubjects.length
                          ? `${selectedSubjects.length} subjects selected`
                          : "Select subjects"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full p-2">
                      {availableSubjects.map((subject) => (
                        <div key={subject._id} className="flex items-center space-x-2 p-2">
                          <Checkbox
                            id={`subject-${subject._id}`}
                            checked={selectedSubjects.includes(subject._id)}
                            onCheckedChange={() => handleSubjectToggle(subject._id)}
                          />
                          <label htmlFor={`subject-${subject._id}`}>
                            {subject.name}
                          </label>
                        </div>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <Button type="submit">Submit</Button>
              </div>
            </form>
          </PopoverContent>
        </Popover>
      </div>

      {/* Teachers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Teacher List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
          <TableHeader>
              <TableRow>
                {/* <TableHead>Created At</TableHead> */}
                <TableHead>Name</TableHead>
                <TableHead>Semesters</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {filteredTeachers.map((teacher) => (
              <TableRow key={teacher._id}>
                {/* <TableCell>{new Date(teacher.createdAt).toLocaleDateString()}</TableCell> */}
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.semesters.join(" | ")}</TableCell>
                <TableCell suppressHydrationWarning >
                  {subjectsLoading 
                    ? <span>Loading subjects...</span>
                    : (teacher.subjects.map(subjectId => subjectNames[subjectId]).join(" | ") || "No subjects")}
                </TableCell>
                <TableCell>
                  <Popover suppressHydrationWarning>
                    <PopoverTrigger>
                      <Delete className="cursor-pointer text-red-400 h-5" />
                    </PopoverTrigger>
                    <PopoverContent className="max-w-fit">
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(teacher._id)}
                      >
                        Confirm Delete?
                      </Button>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}

export default Teachers;
