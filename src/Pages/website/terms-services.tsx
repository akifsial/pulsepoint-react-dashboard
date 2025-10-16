import TopBar from "@components/website/layout/top-bar";
import UtilityRow from "@components/website/layout/utility-row";
import Footer from "@components/website/layout/footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar + Utility */}
      <TopBar />
      <UtilityRow />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Terms of <span className="text-[#2DB2FD]">Service</span>
            </h1>
            <p className="text-lg text-gray-700">
              Please read these Terms of Service carefully before using our
              website. By accessing or using our services, you agree to be bound
              by these terms.
            </p>
            <p className="text-gray-700">
              These terms outline the rules, rights, and responsibilities
              between you (the user) and us (the service provider).
            </p>
          </div>

          {/* Right Illustration */}
          <div className="flex justify-center">
            <div className="w-full max-w-md md:max-w-lg rounded-2xl shadow-xl bg-purple-100 flex items-center justify-center p-10">
              <span className="text-6xl">📜</span>
            </div>
          </div>
        </div>
      </div>

      {/* Terms Section */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
            Our <span className="text-[#2DB2FD]">Terms</span>
          </h2>

          <div className="space-y-10 text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                1. Acceptance of Terms
              </h3>
              <p>
                By accessing or using our services, you confirm that you accept
                these Terms of Service and agree to comply with them.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                2. Use of Services
              </h3>
              <p>
                You agree to use our services only for lawful purposes and in a
                way that does not infringe the rights of, restrict, or inhibit
                anyone else's use of the website.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                3. User Responsibilities
              </h3>
              <p>
                You are responsible for maintaining the confidentiality of your
                account and for all activities that occur under your account.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                4. Limitation of Liability
              </h3>
              <p>
                We will not be held responsible for any indirect, incidental, or
                consequential damages arising from your use of our services.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                5. Changes to Terms
              </h3>
              <p>
                We may update these Terms of Service from time to time. Any
                changes will be posted on this page with an updated date.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfService;
