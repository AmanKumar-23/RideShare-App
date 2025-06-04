'use client';

import PageLayout from "@/components/shared/PageLayout";

export default function TermsPage() {
  return (
    <PageLayout>
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-300">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using RideShare's services, you agree to be bound by these Terms of Service.
          </p>

          <h2>2. User Responsibilities</h2>
          <p>
            Users must:
          </p>
          <ul>
            <li>Provide accurate information</li>
            <li>Maintain account security</li>
            <li>Follow safety guidelines</li>
            <li>Respect other users</li>
          </ul>

          <h2>3. Booking and Payments</h2>
          <p>
            All payments are processed securely through our platform. Cancellation policies apply.
          </p>

          {/* Add more sections as needed */}
        </div>
      </div>
    </PageLayout>
  );
}