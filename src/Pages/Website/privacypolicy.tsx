import TopBar from "@src/Components/Website/Layout/topbar";
import UtilityRow from "@src/Components/Website/Layout/utilityrow";
import Footer from "@src/Components/Website/Layout/footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <UtilityRow />

      <div className="relative bg-gradient-to-r from-blue-50 via-white to-blue-50 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Privacy <span className="text-blue-600">Policy</span>
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto">
            Your privacy is important to us. This Privacy Policy explains how we
            collect, use, and protect your information when you use our website
            and services.
          </p>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may collect personal information such as your name, email
              address, phone number, and any other details you provide when
              contacting us or using our services. We also collect non-personal
              information such as browser type, device, and usage patterns.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Your information is used to provide and improve our services,
              communicate with you, personalize your experience, and ensure
              security. We never sell your personal information to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Cookies & Tracking
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies and similar technologies to analyze traffic,
              remember preferences, and enhance user experience. You may disable
              cookies in your browser settings, but some features may not work
              properly.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We implement industry-standard measures to protect your data from
              unauthorized access, alteration, or disclosure. However, no online
              transmission is 100% secure.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Your Rights
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You have the right to access, update, or request deletion of your
              personal data. Please contact us if you wish to exercise these
              rights.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Updates to This Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with the updated effective date.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about this Privacy Policy, please contact us
              at <span className="text-blue-600">privacy@topseniorspot.com</span>.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
