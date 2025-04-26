// src/api/axios.ts
import axios from 'axios';

const baseURL = 'http://localhost:8084/api';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle token refresh or redirect to login on 401 errors
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email: string, password: string) => 
    axiosInstance.post('/auth/signin', { email, password }),
  
  // Add other auth methods as needed
  googleLogin: (token: string) => 
    axiosInstance.post('/auth/google', { token }),
};

export default axiosInstance;