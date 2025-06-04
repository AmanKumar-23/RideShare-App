'use client';

import PageLayout from "@/components/shared/PageLayout";
import { Shield, Lock, UserCheck, Bell, Phone, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function SafetyPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Your Safety is Our Priority</h1>
          <p className="text-lg max-w-3xl mx-auto text-gray-300">
            We've implemented comprehensive safety measures to ensure secure and comfortable journeys
          </p>
        </div>
      </div>

      {/* Safety Features */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <UserCheck className="h-8 w-8" />,
                title: "Verified Users",
                description: "All users undergo thorough verification including ID and phone number checks"
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Secure Payments",
                description: "All transactions are processed through our secure payment gateway"
              },
              {
                icon: <Lock className="h-8 w-8" />,
                title: "Data Protection",
                description: "Your personal information is encrypted and securely stored"
              }
            ].map((feature, i) => (
              <div key={i} className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <div className="text-purple-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Features */}
      <div className="py-16 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-purple-300 text-center">Emergency Support</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <Bell className="h-8 w-8" />,
                title: "SOS Alert",
                description: "One-tap emergency button that alerts our 24/7 support team and shares your location"
              },
              {
                icon: <Phone className="h-8 w-8" />,
                title: "24/7 Helpline",
                description: "Round-the-clock support for immediate assistance during emergencies"
              }
            ].map((feature, i) => (
              <div key={i} className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex items-start gap-6">
                <div className="text-purple-400">{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety Tips */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-purple-300 text-center">Safety Tips</h2>
          
          <div className="space-y-6">
            {[
              {
                title: "Verify Profiles",
                description: "Always check user profiles, ratings, and reviews before booking"
              },
              {
                title: "Share Trip Details",
                description: "Share your trip details with trusted contacts using our share feature"
              },
              {
                title: "Meet in Public",
                description: "Always meet your co-travelers in well-lit, public locations"
              }
            ].map((tip, i) => (
              <div key={i} className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <div className="flex items-start gap-4">
                  <div className="text-purple-400">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{tip.title}</h3>
                    <p className="text-gray-400">{tip.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 px-4 bg-gradient-to-br from-purple-900 to-indigo-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready for a Safe Journey?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rides" className="bg-white text-purple-900 px-6 py-3 rounded-full font-medium">
              Find a Ride
            </Link>
            <Link href="/contact" className="bg-transparent border border-white text-white px-6 py-3 rounded-full font-medium">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
