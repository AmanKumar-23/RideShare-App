'use client';

import PageLayout from "@/components/shared/PageLayout";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Page Banner */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-300">About RideShare</h1>
          <p className="text-lg max-w-3xl mx-auto text-gray-300">
            India`s leading carpooling platform connecting travelers and drivers
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-16 px-4"> 
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-purple-300">Our Story</h2>
              <p className="text-gray-300 mb-4">
                Founded in 2021, RideShare emerged from a simple idea: to make travel more affordable, 
                accessible, and sustainable for all Indians.
              </p>
              <p className="text-gray-300 mb-4">
                Our founders experienced firsthand the challenges of intercity travel - high costs, 
                uncomfortable experiences, and the environmental impact of underutilized vehicles on our roads.
              </p>
              <p className="text-gray-300">
                Today, we have connected over 500,000 travelers across India, saved millions in travel costs, 
                and reduced carbon emissions by encouraging ride-sharing instead of individual journeys.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-xl">
              <div className="aspect-video relative rounded-lg overflow-hidden">
                <Image 
                  src="/images/about_image.jpeg" 
                  alt="People carpooling" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Values */}
      <div className="py-16 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-purple-300">Our Mission</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              To transform intercity travel in India by making it more social, affordable, 
              and environmentally sustainable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Community",
                icon: "👥",
                description: "Build a trusted community of travelers who can rely on each other for safe, enjoyable journeys."
              },
              {
                title: "Affordability",
                icon: "💰",
                description: "Make travel accessible to everyone by significantly reducing costs through resource sharing."
              },
              {
                title: "Sustainability",
                icon: "🌱",
                description: "Reduce the carbon footprint of travel by maximizing vehicle occupancy and reducing the number of cars on the road."
              }
            ].map((item, i) => (
              <div key={i} className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-purple-300">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-purple-300 text-center">Our Leadership Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Aman Kumar",
                role: "Co-Founder & CEO",
                bio: "Former consultant with a passion for sustainable transportation solutions."
              },
              {
                name: "Priya Patel",
                role: "Co-Founder & CTO",
                bio: "Tech innovator with experience at leading Indian startups."
              },
              {
                name: "Arun Kumar",
                role: "Chief Operating Officer",
                bio: "Operations expert with background in scaling marketplaces across India."
              }
            ].map((person, i) => (
              <div key={i} className="bg-gray-900 rounded-xl p-6 border border-gray-800 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {person.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold text-white">{person.name}</h3>
                <p className="text-purple-300 mb-3">{person.role}</p>
                <p className="text-gray-400">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Join Us CTA */}
      <div className="py-16 px-4 bg-gradient-to-br from-purple-900 to-indigo-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Join the RideShare Community</h2>
          <p className="text-xl text-gray-300 mb-8">
            Be part of India`s transportation revolution. Save money, meet interesting people, 
            and help save the planet - one shared ride at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/how-it-works" 
              className="bg-white text-purple-900 hover:bg-gray-100 px-6 py-3 rounded-full font-medium shadow-lg"
            >
              Learn How It Works
            </Link>
            <Link 
              href="/safety" 
              className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-full font-medium"
            >
              Our Safety Features
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
