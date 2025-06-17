import { ArrowLeft } from "lucide-react";
import ContactInformationCard from "@components/contact-information-card";
import RatingsReviewsSection from "@components/Review/RatingsReviewsSection";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import HospitalProfileCard from "@components/hospital-profile-card";
import PlusIcon from "@assets/media/svgs/patient-db-svgs/add-circle.svg";
import { useNavigate } from "react-router-dom";

const HospitalProfile = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page in browser history
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
      {/* <header className="py-4 bg-transparent"> */}
      <header className={`bg-transparent rounded-lg px-4 py-6 sm:px-6 fixed top-20 transition-all duration-300 lg:left-67 lg:right-4 left-0 right-0
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Back Arrow + Hospital Name */}
            <div className="flex items-center space-x-2">
              <ArrowLeft
                className="h-5 w-5 cursor-pointer text-black"
                onClick={handleGoBack}
              />
              <h1 className="font-space font-bold text-[25px] leading-[32px] text-[#181D27] align-middle [leading-trim:cap] [text-edge:cap]">
                Johns Hopkins Hospital
              </h1>
            </div>

            {/* Right: Add A Review Button */}
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
          h-[36px] px-4
          rounded-md bg-[#252525] text-white
          text-sm font-semibold
        "
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hospital Profile and Contact Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
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
