"use client";

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

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddPopoverOpen, setIsAddPopoverOpen] = useState(false);
  const [loading, setLoading] = useState(true);  // Add this line
  const [newSubject, setNewSubject] = useState({
    name: "",
    code: "",
    semester: "",
  });

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e, setter) => {
    setter((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
//  Add
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your submit logic here
    if (
      !newSubject.name ||
      !newSubject.semester
      
    ) {
      console.error("All fields are required");
      alert("All fields are required");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3002/api/v1/subjects/create",
        newSubject
      );
      // console.log("Server response:", response);

      if (response.status === 201) {
        // console.log(" added successfully:", response.data);
        setSubjects((subjects) => [... subjects, response.data]);
        setNewSubject({
          name: "",
          semester: ""
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

  // Get 
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/api/v1/subjects/get"
        );
        if (response.status === 200 && response.data.success) {
          // console.log("Response is:", response.data.data);
          setSubjects(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching Subjects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

// Delete
  const handleDelete = async (subjectId) => {
    // Add your delete logic here
    try {
      const response = await axios.delete(
        `http://localhost:3002/api/v1/subjects/${subjectId}`
      );
      if (response.status === 200 && response.data.success) {
        // Fix: Use _id instead of studentId in the filter
        setSubjects((prevSubjects) =>
          prevSubjects.filter((subject) => subject._id !== subjectId)
        );
        // console.log("Subject deleted successfully");
      }
    } catch (error) {
      console.error("Delete Error", error);
      alert("Error deleting Subject");
    }
  };

  return (
    <section className="w-full p-5">
      <div className="grid lg:grid-cols-3 gap-4 mb-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Subjects</p>
                <p className="text-2xl font-bold">{subjects.length}</p>
              </div>
              <BarChart2 className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mb-8">
        <Input
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Popover suppressHydrationWarning  open={isAddPopoverOpen} onOpenChange={setIsAddPopoverOpen}>
          <PopoverTrigger asChild>
            <Button className="flex items-center space-x-2">
              <PlusCircle className="w-5 h-5" />
              <span>Add Subject</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-4">
                <Input
                  name="name"
                  placeholder="Subject Name"
                  value={newSubject.name}
                  onChange={(e) => handleInputChange(e, setNewSubject)}
                />
                
                <Input
                  name="semester"
                  placeholder="Semester"
                  value={newSubject.semester}
                  onChange={(e) => handleInputChange(e, setNewSubject)}
                />
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </PopoverContent>
        </Popover>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subject List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
          <TableHeader>
              <TableRow>
                <TableHead>Subject Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubjects.map((subject) => (
                <TableRow key={subject._id}>
                  <TableCell>{subject.customId}</TableCell>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell>{subject.semester}</TableCell>
                  <TableCell>
                    <Popover suppressHydrationWarning>
                      <PopoverTrigger>
                        <Delete className="cursor-pointer text-red-400 h-5" />
                      </PopoverTrigger>
                      <PopoverContent className="max-w-fit">
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(subject._id)}
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

export default Subjects;
