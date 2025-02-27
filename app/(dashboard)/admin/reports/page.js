"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, PersonStandingIcon, SheetIcon, Download, CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import useFaceAttendance from "@/hooks/getFa";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import rollListData from "@/data/rollList.json";

function Reports() {
  const [date, setDate] = useState(new Date());
  const formattedDate = format(date, 'yyyy-MM-dd');
  const { attendanceData, loading, error } = useFaceAttendance(formattedDate);
  const reportRef = useRef();

  const getMergedAttendance = () => {
    if (!attendanceData || !Array.isArray(attendanceData.data)) return [];
    
    // Create a map of present students
    const presentStudents = new Map(
      attendanceData.data.map(student => [String(student.rollNo), student])
    );

    // Merge template with attendance data
    return rollListData.students.map(templateStudent => ({
      ...templateStudent,
      remark: presentStudents.has(String(templateStudent.rollNo)) ? "Present" : "Absent",
      _id: templateStudent.rollNo.toString()
    }));
  };

  const downloadPDF = () => {
    const mergedData = getMergedAttendance();
    if (mergedData.length > 0) {
      const doc = new jsPDF();
      const semester = mergedData[0].semester;
      const fileName = `DailyAtt_Semester:${semester}_Date:${formattedDate}.pdf`;

      doc.text(`Daily Attendance: ${formattedDate} | Semester: ${semester}`, 10, 10);
      doc.autoTable({
        head: [['Roll No', 'Name', 'Status', 'Semester']],
        body: mergedData.map(data => [
          data.rollNo,
          data.name,
          data.remark,
          data.semester
        ]),
      });

      doc.save(fileName);
    }
  };

  const mergedAttendanceData = getMergedAttendance();

  return (
    <section className="w-full p-5" ref={reportRef}>
      <Card className="w-full p-4">
        <div className="flex items-center space-x-4 p-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {mergedAttendanceData.length > 0 && (
          <CardTitle className="p-5">
            Daily Attendance: {formattedDate} | Semester: {mergedAttendanceData[0].semester}
            <Button className="ml-9" onClick={downloadPDF}>Download PDF</Button>
          </CardTitle>
        )}
        <CardContent>
          {loading && <p>Loading...</p>}
          {error && <p>Error loading data</p>}
          {mergedAttendanceData.length > 0 ? (
            <Table className="w-full">
              <TableHeader className="py-4">
                <TableRow>
                  <TableHead>Roll No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Semester</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mergedAttendanceData.map((data) => (
                  <TableRow key={data._id} className={data.remark === "Absent" ? "bg-red-100" : "bg-green-100"}>
                    <TableCell>{data.rollNo}</TableCell>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.remark}</TableCell>
                    <TableCell>{data.semester}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            !loading && <p>No data available</p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}

export default Reports;