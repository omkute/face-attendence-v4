" use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

function useFaceAttendance(date) {
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:3002/api/v1/attendance/get/${date}`);
        setAttendanceData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [date]);

  return { attendanceData, loading, error };
}

export default useFaceAttendance;