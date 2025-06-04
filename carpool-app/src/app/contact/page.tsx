'use client';

import PageLayout from "@/components/shared/PageLayout";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg max-w-3xl mx-auto text-gray-300">
            We're here to help with any questions or concerns
          </p>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              {
                icon: <Phone className="h-6 w-6" />,
                title: "Call Us",
                description: "24/7 Support Hotline",
                contact: "+91 1800-123-4567"
              },
              {
                icon: <Mail className="h-6 w-6" />,
                title: "Email Us",
                description: "We'll respond within 24 hours",
                contact: "support@rideshare.in"
              }
            ].map((method, i) => (
              <div key={i} className="bg-gray-900 p-6 rounded-xl border border-gray-800 flex items-center">
                <div className="bg-purple-600/10 p-4 rounded-full mr-6">
                  <div className="text-purple-400">{method.icon}</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">{method.title}</h3>
                  <p className="text-gray-400 mb-2">{method.description}</p>
                  <p className="text-purple-400 font-medium">{method.contact}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-8">
            <h2 className="text-2xl font-bold mb-6 text-purple-300">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={false}
                className="bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors w-full md:w-auto disabled:opacity-50"
              >
'Send Message'
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
