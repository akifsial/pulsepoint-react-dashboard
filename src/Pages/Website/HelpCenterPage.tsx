import React from "react";
import TopBar from "@components/Website/Layout/TopBar";
import UtilityRow from "@components/Website/Layout/UtilityRow";
import HealthPic from "@assets/media/images/dashboard-images/health-doc-banner.jpg";
import Footer from "@components/Website/Layout/Footer";


const HelpCenterPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Topbar + Header */}
      <TopBar />
      <UtilityRow />

      {/* Hero Section */}
      <div className="relative bg-blue-50">
        <div className="absolute inset-0">
          <img
            src={HealthPic}
            alt="Help Center"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900">Help Center</h1>
          <p className="mt-6 text-xl text-gray-700 max-w-2xl mx-auto">
            Find answers to common questions, explore support topics, or reach
            out for assistance.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Question 1 */}
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              How can I contact support?
            </h3>
            <p className="text-gray-600">
              You can reach us via the contact page, email at{" "}
              <span className="text-blue-600">support@topseniorspot.com</span>, 
              or by calling our helpline.
            </p>
          </div>

          {/* Question 2 */}
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              How do I find senior care facilities?
            </h3>
            <p className="text-gray-600">
              Visit our Facilities page to explore trusted senior living and
              healthcare providers near you.
            </p>
          </div>

          {/* Question 3 */}
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              Is TopSeniorSpot free to use?
            </h3>
            <p className="text-gray-600">
              Yes, our platform is free to explore. Some services may have costs
              associated with providers.
            </p>
          </div>

          {/* Question 4 */}
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              Can I join the community?
            </h3>
            <p className="text-gray-600">
              Absolutely! Join our community forum to connect with other seniors
              and families, share experiences, and get advice.
            </p>
          </div>
        </div>

        {/* Contact Support CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still need help?
          </h2>
          <p className="text-gray-600 mb-6">
            Our support team is here to assist you with any questions or
            concerns.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
            Contact Support
          </button>
        </div>
      </div>
      <Footer />

    </div>
  );
};

export default HelpCenterPage;
