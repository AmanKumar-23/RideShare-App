'use client';

import PageLayout from "@/components/shared/PageLayout";

export default function PrivacyPage() {
  return (
    <PageLayout>
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-300">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, including:
          </p>
          <ul>
            <li>Personal identification information</li>
            <li>Contact information</li>
            <li>Payment details</li>
            <li>Travel preferences</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>
            Your information is used to:
          </p>
          <ul>
            <li>Provide and improve our services</li>
            <li>Process payments</li>
            <li>Communicate with you</li>
            <li>Ensure platform safety</li>
          </ul>

          {/* Add more sections as needed */}
        </div>
      </div>
    </PageLayout>
  );
}
