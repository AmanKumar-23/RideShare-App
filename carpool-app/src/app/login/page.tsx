'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PageLayout from '@/components/shared/PageLayout';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setError('');
      
      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }
      
      if (!validateEmail(email)) {
        setError('Please enter a valid email address');
        return;
      }

      console.log('🔐 Starting login process...');
      const userData = await login(email, password);
      console.log('✅ Login successful, user data:', userData);
      
      // Check if token was set in localStorage
      const token = localStorage.getItem('token');
      console.log('🎟️ Token in localStorage:', token ? 'Present' : 'Missing');
      
      if (token) {
        // Save the token in localStorage
        localStorage.setItem('token', token);
      } else {
        throw new Error('No token returned from the server');
      }

      toast.success('Login successful!');
      console.log('🚀 Redirecting to home page...');
      router.push('/'); // Redirect to home page after successful login
    } catch (error: any) {
      console.error('❌ Login error:', error);
      setError(error.message || 'An unexpected error occurred. Please try again');
      toast.error(error.message || 'An unexpected error occurred. Please try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-xl shadow-lg">
          <div>
            <h2 className="text-center text-3xl font-bold text-white">Sign in to your account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3 text-sm">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-300">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>

            <div className="text-center text-sm text-gray-400">
              Don't have an account?{' '}
              <Link href="/register" className="text-purple-400 hover:text-purple-300">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}