'use client';

import PageLayout from "@/components/shared/PageLayout";
import { Search } from "lucide-react";
import Link from "next/link";

export default function HelpPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-lg max-w-3xl mx-auto text-gray-300 mb-8">
            Find answers to your questions and get support
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help..."
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Getting Started",
                questions: [
                  "How do I create an account?",
                  "How do I book a ride?",
                  "How do I offer a ride?",
                  "What are the fees?"
                ]
              },
              {
                title: "Payments & Refunds",
                questions: [
                  "What payment methods are accepted?",
                  "How do refunds work?",
                  "When do drivers get paid?",
                  "Are there any hidden charges?"
                ]
              },
              {
                title: "Safety & Security",
                questions: [
                  "How are users verified?",
                  "What insurance is provided?",
                  "How do I report an issue?",
                  "Emergency contact information"
                ]
              }
            ].map((category, i) => (
              <div key={i} className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-purple-300">{category.title}</h3>
                <ul className="space-y-3">
                  {category.questions.map((q, j) => (
                    <li key={j}>
                      <Link 
                        href={`/help/faq#${q.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        {q}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="py-16 px-4 bg-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-purple-300">Still Need Help?</h2>
          <p className="text-gray-400 mb-8">
            Our support team is available 24/7 to assist you with any questions or concerns
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-purple-600 text-white px-6 py-3 rounded-full font-medium">
              Contact Support
            </Link>
            <button className="bg-transparent border border-purple-600 text-purple-400 px-6 py-3 rounded-full font-medium">
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}