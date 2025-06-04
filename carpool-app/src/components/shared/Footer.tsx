'use client';

import Link from "next/link";

export default function Footer() {
  const quickLinks = [
    { href: "/about", label: "About Us" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/safety", label: "Safety" },
    { href: "/help", label: "Help Center" },
    { href: "/careers", label: "Careers" }
  ];

  const legalLinks = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/contact", label: "Contact Us" }
  ];

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand / CTA */}
        <div className="md:col-span-2">
          <h4 className="text-2xl font-bold mb-4 text-purple-400">RideShare India</h4>
          <p className="text-gray-400 mb-6 max-w-md">
            Making journeys more affordable, social, and sustainable. Join our community of travelers and drivers today.
          </p>
          <div className="flex space-x-4">
            {/* Social media links */}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-purple-300">Quick Links</h4>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-purple-300">Legal</h4>
          <ul className="space-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} RideShare India. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/privacy" className="text-gray-500 hover:text-purple-400 transition-colors text-sm">Privacy</Link>
            <Link href="/terms" className="text-gray-500 hover:text-purple-400 transition-colors text-sm">Terms</Link>
            <Link href="/contact" className="text-gray-500 hover:text-purple-400 transition-colors text-sm">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
