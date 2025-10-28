import TopBar from "@src/Components/Website/Layout/topbar";
import UtilityRow from "@src/Components/Website/Layout/utilityrow";
import HealthPhoto from "@assets/media/images/dashboard-images/health-care-page.jpg";

import React from "react";
import Footer from "@src/Components/Website/Layout/footer";

const HealthPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <UtilityRow />
      <div className="relative bg-blue-50">
        <div className="absolute inset-0">
          <img
            src={HealthPhoto}
            alt="Healthcare"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900">
            Health Resources
          </h1>
          <p className="mt-6 text-xl text-gray-700 max-w-3xl mx-auto">
            Discover health tips, medical resources, and wellness programs
            designed to help seniors live healthier, happier lives.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Stay Healthy, Stay Strong
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Our resources cover nutrition, fitness, chronic disease
              management, and preventive care to help seniors maintain their
              independence and improve quality of life.
            </p>
            <ul className="space-y-4 text-gray-700">
              <li>✅ Nutrition & Diet Guides</li>
              <li>✅ Fitness & Exercise Programs</li>
              <li>✅ Mental Health & Wellness Support</li>
              <li>✅ Preventive Healthcare Tips</li>
            </ul>
          </div>

          <div>
            <img
              src={HealthPhoto}
              alt="Health and Wellness"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
      <Footer />

    </div>
  );
};

export default HealthPage;
