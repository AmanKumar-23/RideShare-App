'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function NavButtons() {
  const { user, logout } = useAuth();

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          className="text-gray-300 hover:text-white"
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link href="/login">
        <Button variant="ghost" className="text-gray-300 hover:text-white">
          Login
        </Button>
      </Link>
      <Link href="/register">
        <Button className="bg-purple-600 hover:bg-purple-700">
          Sign Up
        </Button>
      </Link>
    </div>
  );
}