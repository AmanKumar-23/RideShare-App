import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL
});

// 🔐 Attach token to headers using interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('🔑 Token in interceptor:', token ? 'Present' : 'Missing');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔒 Added Authorization header');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const ridesAPI = {
  createRide: async (rideData:RideData) => {
    try {
      console.log('🚗 Creating ride with token:', localStorage.getItem('token') ? 'Present' : 'Missing');
      const response = await axiosInstance.post('/rides', rideData);
      console.log('✅ Ride created successfully');
      return response.data;
    } catch (error: any) {
      console.error('❌ Error creating ride:', error);
      if (error.response) {
        console.error('Error response:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
      } else if (error.request) {
        console.error('No response received:', error.request);
      }
      throw error;
    }
  },
  getAllRides: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      
      // Safely access localStorage only in browser environment
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      const response = await fetch(`/api/rides?${queryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error response:', {
          status: response.status,
          data: errorData
        });
        throw new Error(`Failed to fetch rides: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching rides:', error);
      throw error;
    }
  },
  getRideById: async (id: string) => {
    const response = await axiosInstance.get(`/rides/${id}`);
    return response.data;
  }
};

export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    try {
      console.log('🔐 Attempting login...');
      const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
      console.log('✅ Login response received:', response.data);
      
      const { token, user } = response.data;
      if (!token) {
        throw new Error('No token received from server');
      }
      
      console.log('💾 Storing token in localStorage...');
      localStorage.setItem('token', token);
      console.log('✅ Token stored successfully');
      
      return { token, user };
    } catch (error: any) {
      console.error('❌ Login Error:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
      }
      throw error;
    }
  },
  register: async (userData: { name: string; email: string; password: string; phone: string }) => {
    try {
      console.log('📝 Attempting registration...');
      const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
      console.log('✅ Registration response received:', response.data);
      
      const { token, user } = response.data;
      if (!token) {
        throw new Error('No token received from server');
      }
      
      console.log('💾 Storing token in localStorage...');
      localStorage.setItem('token', token);
      console.log('✅ Token stored successfully');
      
      return { token, user };
    } catch (error: any) {
      console.error('❌ Registration Error:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
      }
      throw error;
    }
  },
  logout: () => {
    console.log('🚪 Logging out, removing token...');
    localStorage.removeItem('token');
    console.log('✅ Token removed');
  }
};

export const userAPI = {
  getProfile: async () => {
    try {
      console.log('👤 Fetching user profile...');
      const response = await axiosInstance.get('/user/profile');
      console.log('✅ Profile fetched successfully');
      return response.data;
    } catch (error) {
      console.error('❌ Profile Error:', error);
      throw error;
    }
  }
};
