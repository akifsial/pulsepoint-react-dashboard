import TopBar from "@components/website/layout/top-bar";
import UtilityRow from "@components/website/layout/utility-row";
import facilityImg from "@assets/media/images/dashboard-images/about-banner.png"; 
import Footer from "@components/website/layout/footer";

const FacilitiesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <UtilityRow />

      <div className="relative bg-gradient-to-r from-blue-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Senior Care <span className="text-blue-600">Facilities</span>
            </h1>
            <p className="text-lg text-gray-700">
              Explore different types of senior living facilities and care
              options designed to provide safety, comfort, and well-being for
              your loved ones.
            </p>
            <p className="text-gray-700">
              From independent living communities to specialized nursing homes,
              we guide you to make the best choices for senior care.
            </p>

          </div>

          <div className="flex justify-center">
            <img
              src={facilityImg}
              alt="Senior care facility"
              className="w-full max-w-md md:max-w-lg rounded-2xl shadow-xl object-cover"
            />
          </div>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Types of <span className="text-blue-600">Senior Facilities</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Each facility type is designed for different needs – from active
            lifestyles to full-time medical support.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-blue-50 p-8 rounded-xl shadow hover:shadow-lg transition text-left">
              <h3 className="font-bold text-xl text-gray-800 mb-3">
                Independent Living
              </h3>
              <p className="text-gray-600">
                Ideal for active seniors who want freedom with access to
                community activities and amenities.
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-xl shadow hover:shadow-lg transition text-left">
              <h3 className="font-bold text-xl text-gray-800 mb-3">
                Assisted Living
              </h3>
              <p className="text-gray-600">
                Provides support with daily activities such as meals, personal
                care, and medication management.
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-xl shadow hover:shadow-lg transition text-left">
              <h3 className="font-bold text-xl text-gray-800 mb-3">
                Nursing Homes
              </h3>
              <p className="text-gray-600">
                Offers 24/7 medical care and supervision for seniors with
                serious health conditions or disabilities.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />

    </div>
  );
};

export default FacilitiesPage;
