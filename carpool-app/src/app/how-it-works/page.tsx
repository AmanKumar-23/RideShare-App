'use client';

import PageLayout from "@/components/shared/PageLayout";
import { Car, Search, Users, CreditCard, MessageSquare, Star } from "lucide-react";
import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4 
          text-gray-300">How RideShare Works</h1>
          <p className="text-lg max-w-3xl mx-auto text-purple-300 ">
            Simple, efficient, and reliable carpooling for everyone
          </p>
        </div>
      </div>

      {/* For Passengers */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-purple-300 text-center">For Passengers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="h-8 w-8" />,
                title: "Find a Ride",
                description: "Enter your destination and travel date to browse available rides"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Choose Your Driver",
                description: "View profiles, ratings, and prices to find your perfect match"
              },
              {
                icon: <CreditCard className="h-8 w-8" />,
                title: "Book Securely",
                description: "Pay securely through our platform and get instant confirmation"
              }
            ].map((step, i) => (
              <div key={i} className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <div className="text-purple-400 mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* For Drivers */}
      <div className="py-16 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-purple-300 text-center">For Drivers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Car className="h-8 w-8" />,
                title: "Share Your Journey",
                description: "Post your route, schedule, and available seats"
              },
              {
                icon: <MessageSquare className="h-8 w-8" />,
                title: "Connect with Passengers",
                description: "Accept bookings and coordinate through our secure chat"
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: "Earn & Build Trust",
                description: "Get paid securely and build your reputation with reviews"
              }
            ].map((step, i) => (
              <div key={i} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <div className="text-purple-400 mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 px-4 bg-gradient-to-br from-purple-900 to-indigo-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/safety" className="bg-white text-purple-900 px-6 py-3 rounded-full font-medium">
              Learn About Safety
            </Link>
            <Link href="/rides/publish" className="bg-transparent border border-white text-white px-6 py-3 rounded-full font-medium">
              Publish a Ride
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}