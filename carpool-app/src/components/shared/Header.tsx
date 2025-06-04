'use client';

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const navigationLinks = [
    { href: "/about", label: "About" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/safety", label: "Safety" },
    { href: "/help", label: "Help" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" }
  ];

  const renderAuthButtons = () => {
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
  };

  return (
    <header className="bg-gray-900 p-4 flex flex-col md:flex-row justify-between items-center shadow-md sticky top-0 z-50 border-b border-gray-800">
      <div className="flex w-full md:w-auto justify-between items-center">
        <Link href="/" className="flex items-center gap-2 font-medium text-purple-400 text-lg">
          <span>RideShare</span>
        </Link>
        <button 
          className="md:hidden text-gray-300 hover:text-purple-400"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center gap-6 w-full md:w-auto mt-4 md:mt-0`}>
        {navigationLinks.map((link) => (
          <Link 
            key={link.href}
            href={link.href} 
            className="text-gray-300 hover:text-purple-400 transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <Link 
          href="/rides/publish" 
          className="bg-purple-600 hover:bg-purple-700 rounded-full px-4 py-2 text-sm font-medium text-white transition duration-300 shadow-md"
        >
          Publish a ride
        </Link>
        {renderAuthButtons()}
      </nav>
    </header>
  );
}
