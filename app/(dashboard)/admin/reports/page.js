"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, PersonStandingIcon, SheetIcon, Download } from "lucide-react";
import React, { useRef } from "react";
import useFaceAttendance from "@/hooks/getFa";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function Reports() {
  const date = "2023-10-05";
  const { attendanceData, loading, error } = useFaceAttendance(date);
  const reportRef = useRef();

  const downloadPDF = () => {
    if (attendanceData && Array.isArray(attendanceData.data) && attendanceData.data.length > 0) {
      const doc = new jsPDF();
      const semester = attendanceData.data[0].semester;
      const timestamp = attendanceData.data[0].timestamp.split('T')[0];
      const fileName = `DailyAtt_Semester:${semester}_Date:${timestamp}.pdf`;

      doc.text(`Daily Attendance: ${timestamp} | Semester: ${semester}`, 10, 10);
      doc.autoTable({
        head: [['Roll No', 'Name', 'Status', 'Semester']],
        body: attendanceData.data.map(data => [data.rollNo, data.studentName, data.remark, data.semester]),
      });

      doc.save(fileName);
    }
  };

  return (
    <section className="w-full p-5" ref={reportRef}>
      <Card className="w-full p-4  ">
        {attendanceData && Array.isArray(attendanceData.data) && attendanceData.data.length > 0 && (
          <CardTitle className=" p-5" key={attendanceData.data[0].id}>
            Daily Attendance: {attendanceData.data[0].timestamp.split('T')[0]} | Semester: {attendanceData.data[0].semester}
            <Button className=" ml-9" onClick={downloadPDF} >Download PDF</Button>

          </CardTitle>
        )}
        <CardContent>
          {loading && <p>Loading...</p>}
          {error && <p>Error loading data</p>}
          {attendanceData && Array.isArray(attendanceData.data) ? (
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
                {attendanceData.data.map((data) => (
                  <TableRow key={data._id} className={data.remark === "Absent" ? "bg-red-100" : "bg-green-100"}>
                    <TableCell>{data.rollNo}</TableCell>
                    <TableCell>{data.studentName}</TableCell>
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