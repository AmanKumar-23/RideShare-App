'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, userAPI } from '@/services/api';

interface AuthContextType {
  user: any | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  register: (userData: { name: string; email: string; password: string; phone: string }) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkTokenExpiration = (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000; // Convert to milliseconds
      
      // If token is expired or will expire in next 5 minutes
      if (expirationTime < Date.now() + 300000) {
        console.log('Token expired or expiring soon');
        localStorage.removeItem('token');
        setUser(null);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      localStorage.removeItem('token');
      setUser(null);
      return false;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Checking auth with token:', token ? 'present' : 'absent');
        
        if (!token) {
          setUser(null);
          setIsLoading(false);
          return;
        }

        if (checkTokenExpiration(token)) {
          try {
            const userData = await userAPI.getProfile();
            console.log('User profile fetched:', userData);
            setUser(userData);
          } catch (error) {
            console.error('Failed to fetch user profile:', error);
            localStorage.removeItem('token');
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  
    // Set up periodic token check every minute
    const tokenCheckInterval = setInterval(() => {
      const token = localStorage.getItem('token');
      if (token) {
        checkTokenExpiration(token);
      }
    }, 60000);
  
    return () => clearInterval(tokenCheckInterval);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authAPI.login({ email, password });
      
      if (!response || !response.token) {
        throw new Error('Invalid response from server');
      }
  
      console.log('Login successful, setting token and user');
      localStorage.setItem('token', response.token);
      
      if (response.user) {
        setUser(response.user);
        return response.user;
      }
      
      const userData = await userAPI.getProfile();
      setUser(userData);
      return userData;
    } catch (error: any) {
      console.error('Login error:', error);
      let errorMessage = 'An unexpected error occurred. Please try again';
      
      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = 'Invalid email or password format';
            break;
          case 401:
            errorMessage = 'Invalid email or password';
            break;
          case 404:
            errorMessage = 'User not found';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later';
            break;
          default:
            errorMessage = error.response.data?.message || errorMessage;
        }
      } else if (error.request) {
        errorMessage = 'Unable to connect to server. Please check your internet connection';
      }
      
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: { name: string; email: string; password: string; phone: string }) => {
    try {
      setIsLoading(true);
      const { token, user: newUser } = await authAPI.register(userData);
      
      if (!token || !newUser) {
        throw new Error('Invalid response from server during registration');
      }

      console.log('Registration successful, setting token and user');
      localStorage.setItem('token', token);
      setUser(newUser);
      return newUser;
    } catch (error: any) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log('Logging out, clearing token and user');
    localStorage.removeItem('token');
    setUser(null);
    authAPI.logout();
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};