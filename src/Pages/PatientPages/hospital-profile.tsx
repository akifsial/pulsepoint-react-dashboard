import { ArrowLeft, Plus } from "lucide-react";
import ContactInformationCard from "@components/contact-information-card";
import RatingsReviewsSection from "@components/ratings-reviews-section";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import HospitalProfileCard from "@components/hospital-profile-card";
import PlusIcon from "@assets/media/svgs/patient-db-svgs/add-circle.svg";

const HospitalProfile = () => {
  const handleGoBack = () => {
    // In a real app, this would use router navigation or history.back()
    console.log("Navigate back to previous page");
  };

  const handleAddReview = () => {
    // In a real app, this would open a review form modal or navigate to review page
    console.log("Open add review modal/page");
  };

  function setIsModalOpen(arg0: boolean): void {
    throw new Error("Function not implemented.");
  }

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
  showImg
  img={
    <span className="flex items-center justify-center w-[19px] h-[19px] rounded-full bg-white">
      <img src={PlusIcon} alt="add" className="w-[11px] h-[11px]" />
    </span>
  }
  imgClass="w-[19px] h-[19px]"
  imgPosition="left"
  btnClass="
    flex items-center justify-center gap-[4px]
    w-[180px] h-[46px]
    p-2 rounded-[8px]
    bg-[#252525]
    text-white font-spaceGrotesk font-bold
    text-[14px] leading-[32px]
  "
  onClick={() => setIsModalOpen(true)}
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
