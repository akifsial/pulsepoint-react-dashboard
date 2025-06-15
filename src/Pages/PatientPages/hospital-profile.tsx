import { ArrowLeft, Plus } from "lucide-react";
import ContactInformationCard from "@components/contact-information-card";
import RatingsReviewsSection from "@components/ratings-reviews-section";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import HospitalProfileCard from "@components/hospital-profile-card";

const HospitalProfile = () => {
  const handleGoBack = () => {
    // In a real app, this would use router navigation or history.back()
    console.log("Navigate back to previous page");
  };

  const handleAddReview = () => {
    // In a real app, this would open a review form modal or navigate to review page
    console.log("Open add review modal/page");
  };

  return (
    <div className="min-h-screen bg-medical-bg">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <PrimaryButton
                btnClass="text-gray-600 hover:text-gray-900 p-1"
                img={<ArrowLeft className="h-5 w-5" />}
                onClick={handleGoBack}
                showImg={true}
                imgPosition="left"
                disabled={false}
              />

              {/* <h1 className="text-xl font-semibold text-gray-900">
                {hospitalData.name}
              </h1> */}
            </div>
            <PrimaryButton
              btnText="Add A Review"
              btnClass="bg-gray-800 text-white hover:bg-gray-700 flex items-center space-x-2"
              img={<Plus className="h-4 w-4" />}
              onClick={handleAddReview}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hospital Profile and Contact Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <HospitalProfileCard />
          <ContactInformationCard />
        </div>

        {/* Ratings and Reviews Section */}
        <RatingsReviewsSection />
      </main>
    </div>
  );
};

export default HospitalProfile;
