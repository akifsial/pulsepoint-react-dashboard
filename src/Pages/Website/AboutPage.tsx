import medicalImage from "@assets/media/images/dashboard-images/about-banner.png";
import Footer from "@components/Website/Layout/Footer";
import TopBar from "@components/Website/Layout/TopBar";
import UtilityRow from "@components/Website/Layout/UtilityRow";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar + Utility */}
      <TopBar />
      <UtilityRow />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              About{" "}
              <span className="text-blue-600">TopSeniorSpot</span>
            </h1>
            <p className="text-lg text-gray-700">
              We are dedicated to helping seniors and their families make
              informed decisions about care options and healthy aging.
            </p>
            <p className="text-gray-700">
              Our platform connects you with trusted healthcare providers,
              care facilities, and resources to support your journey. We make
              senior care simple, reliable, and compassionate.
            </p>
            <p className="text-gray-700">
              Whether it’s finding the right caregiver, exploring health tips,
              or accessing community support,{" "}
              <span className="font-semibold text-blue-600">
                TopSeniorSpot
              </span>{" "}
              is your trusted partner for senior well-being.
            </p>

            {/* CTA Button */}
            {/* <button className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 hover:shadow-lg transition">
              Learn More
            </button> */}
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <img
              src={medicalImage}
              alt="Medical care"
              className="w-full max-w-md md:max-w-lg rounded-2xl shadow-xl object-cover"
            />
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-blue-600">TopSeniorSpot?</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            We combine technology, expert advice, and community support to
            provide seniors and their families with reliable resources for a
            healthier and happier life.
          </p>

          {/* Features Grid */}
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-blue-50 p-8 rounded-xl shadow hover:shadow-lg transition text-left">
              <h3 className="font-bold text-xl text-gray-800 mb-3">
                Trusted Providers
              </h3>
              <p className="text-gray-600">
                Connect with verified healthcare professionals and facilities
                that meet the highest standards of care.
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-xl shadow hover:shadow-lg transition text-left">
              <h3 className="font-bold text-xl text-gray-800 mb-3">
                Reliable Resources
              </h3>
              <p className="text-gray-600">
                Access guides, tips, and educational content crafted for senior
                well-being and family support.
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-xl shadow hover:shadow-lg transition text-left">
              <h3 className="font-bold text-xl text-gray-800 mb-3">
                Community Support
              </h3>
              <p className="text-gray-600">
                Join a caring community of seniors and families sharing
                experiences, advice, and encouragement.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />

    </div>
  );
};

export default AboutPage;
