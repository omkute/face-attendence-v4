import axios from 'axios';

export function logout() {
  // Clear the token cookie
  document.cookie = 'token=; Max-Age=0; path=/';
  // Redirect to login page
  window.location.href = '/login';
}

export const userinfo = async (setUserInfo, setLoading) => {
  try {
    const response = await axios.get('http://localhost:3002/api/v1/user/profile', {
      withCredentials: true
    });
    if (response.status === 200) {
      console.log('User info:', response.data.user);
      
      setUserInfo(response.data.user);
    }
  } catch (error) {
    console.error('Error fetching user info:', error);
    if (axios.isAxiosError(error) && error.response?.status === 401) {
    }
  } finally {
    setLoading(false);
  }
}

export default userinfo;

