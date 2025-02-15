"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/v1/user/profile', {
          withCredentials: true
        });
        if (response.status === 200) {
          setUserInfo(response.data.user);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          // Handle unauthorized error
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []); // Removed `router` from dependency array

  return { userInfo, loading };
};

export default useUserInfo;
