"use client";
import { CardContent, CardHeader, CardTitle, Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Edit2,
  PencilLineIcon,
  Users,
  BarChart2,
  PlusCircle,
  DeleteIcon,
  Delete,
} from "lucide-react";
import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddPopoverOpen, setIsAddPopoverOpen] = useState(false);
  // console.log(isAddPopoverOpen);
  const [newStudent, setNewStudent] = useState({
    name: "",
    rollNo: "",
    email: "",
    semester: "",
  });

  const handleInputChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDelete = async (studentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3002/api/v1/students/delete/${studentId}`
      );
      if (response.status === 200 && response.data.success) {
        // Fix: Use _id instead of studentId in the filter
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student._id !== studentId)
        );
        // console.log("Student deleted successfully");
      }
    } catch (error) {
      console.error("Delete Error", error);
      alert("Error deleting student");
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/api/v1/students/get"
        );
        if (response.status === 200 && response.data.success) {
          // console.log("Response is:", response.data.data);
          setStudents(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Submitting new student:", newStudent);

    if (
      !newStudent.name ||
      !newStudent.rollNo ||
      !newStudent.email ||
      !newStudent.semester
    ) {
      console.error("All fields are required");
      alert("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3002/api/v1/students/create",
        newStudent
      );
      // console.log("Server response:", response);

      if (response.status === 201) {
        // console.log("Student added successfully:", response.data.data);
        setStudents((students) => [...students, response.data.data]);
        setNewStudent({
          name: "",
          rollNo: "",
          email: "",
          semester: "",
        });
        setIsAddPopoverOpen(false);
        // alert("Student added successfully!");
      }
    } catch (error) {
      console.error(
        "Error adding student:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Error adding student");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="w-full p-5">
      <div className=" grid lg:grid-cols-3 gap-4 mb-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        {/* <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Avg Attendance</p>
                  <p className="text-2xl font-bold"> {students.reduce((sum, student) => sum + student.avgAttendence, 0) / students.length}%</p>
                </div>
                <BarChart2 className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card> */}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mb-8">
        <Input
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Popover suppressHydrationWarning open={isAddPopoverOpen} onOpenChange={setIsAddPopoverOpen}>
          <PopoverTrigger asChild>
            <Button className="flex items-center space-x-2">
              <PlusCircle className="w-5 h-5" />
              <span>Add Student</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <form>
              <div className="flex flex-col space-y-4">
                {/* <Input name="_id" placeholder="Student ID" value={newStudent._id} onChange={(e) => handleInputChange(e, setNewStudent)} /> */}
                <Input
                  name="rollNo"
                  placeholder="Roll No"
                  value={newStudent.rollNo}
                  min="1"
                  max="85"
                  onChange={(e) => handleInputChange(e, setNewStudent)}
                />
                <Input
                  name="name"
                  placeholder="Name"
                  value={newStudent.name}
                  onChange={(e) => handleInputChange(e, setNewStudent)}
                />
                <Input
                  name="semester"
                  placeholder="Semester"
                  value={newStudent.semester}
                  onChange={(e) => handleInputChange(e, setNewStudent)}
                />
                {/* <Input name="avgAttendence" placeholder="Avg Attendance" type="number" value={newStudent.avgAttendence} onChange={(e) => handleInputChange(e, setNewStudent)} /> */}
                <Input
                  name="email"
                  placeholder="Email"
                  value={newStudent.email}
                  onChange={(e) => handleInputChange(e, setNewStudent)}
                />
                <Button onClick={handleSubmit} type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </PopoverContent>
        </Popover>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student's List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
          <TableHeader>
              <TableRow>
                <TableHead>Roll No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.semester}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    <Popover suppressHydrationWarning >
                      <PopoverTrigger>
                        <Delete className=" cursor-pointer text-red-400 h-5" />
                      </PopoverTrigger>

                      <PopoverContent className=" max-w-fit">
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(student._id)}
                        >
                          Confirm Delete ?
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

export default Students;
