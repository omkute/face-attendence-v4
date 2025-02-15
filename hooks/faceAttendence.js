"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

export function useAvgClassAttendance() {
  const [avgAttendance, setAvgAttendance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/v1/attendance/avgattendence');
        setAvgAttendance(response.data.average);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  return { avgAttendance, loading, error };
}

export default useAvgClassAttendance;
