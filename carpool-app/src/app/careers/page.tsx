'use client';

import PageLayout from "@/components/shared/PageLayout";
import Image from "next/image";

export default function CareersPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
          <p className="text-lg max-w-3xl mx-auto text-gray-300">
            Help us transform the future of transportation in India
          </p>
        </div>
      </div>

      {/* Why Join Us */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-purple-300 text-center">Why Join RideShare?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Impact",
                description: "Work on solutions that affect millions of lives and make transportation more sustainable"
              },
              {
                title: "Growth",
                description: "Fast-paced environment with plenty of opportunities for learning and career advancement"
              },
              {
                title: "Culture",
                description: "Collaborative, inclusive workplace where your ideas are valued and implemented"
              }
            ].map((perk, i) => (
              <div key={i} className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-semibold mb-2 text-white">{perk.title}</h3>
                <p className="text-gray-400">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="py-16 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-purple-300 text-center">Open Positions</h2>
          
          <div className="space-y-6">
            {[
              {
                title: "Senior Frontend Developer",
                department: "Engineering",
                location: "Bangalore",
                type: "Full-time"
              },
              {
                title: "Product Manager",
                department: "Product",
                location: "Delhi",
                type: "Full-time"
              },
              {
                title: "Customer Support Specialist",
                department: "Operations",
                location: "Remote",
                type: "Full-time"
              }
            ].map((job, i) => (
              <div key={i} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-purple-400">{job.department}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-400">{job.location}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-400">{job.type}</span>
                    </div>
                  </div>
                  <button className="mt-4 md:mt-0 bg-purple-600 text-white px-6 py-2 rounded-full font-medium hover:bg-purple-700 transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}