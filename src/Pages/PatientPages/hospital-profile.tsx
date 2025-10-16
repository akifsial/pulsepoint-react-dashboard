import { ArrowLeft } from "lucide-react";
import ContactInformationCard from "@components/contact-information-card";
import RatingsReviewsSection from "@components/review/ratings-reviews-section";
import { PrimaryButton } from "@components/shared-components/buttons/common-button/common-button";
import HospitalProfileCard from "@components/hospital-profile-card";
import PlusIcon from "@assets/media/svgs/patient-db-svgs/add-circle.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import FeedbackForm from "./feedback-form";
import { useCareProviderSingle } from "@src/hooks/use-dashboard";
const HospitalProfile = () => {
  const navigate = useNavigate();
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const { id } = useParams();

  const handleGoBack = () => {
    navigate(-1);
  };

  const { data } = useCareProviderSingle(id);


  return (
    <>
      {feedbackOpen ? (
        <FeedbackForm setFeedbackOpen={setFeedbackOpen} />
      ) : (
        <div className="h-[661px] overflow-y-auto transition-colors duration-300 bg-medical-bg">
          {/* Header */}
          <header
            className="md:max-w-7xl max-w-full py-7 mx-auto  sm:px-6 px-3 flex flex-wrap justify-between items-center md:justify-between md:gap-0 gap-3 items-center relative "
            style={{
              background:
                "linear-gradient(107.76deg, #f4f7ff -2.99%, #ddeff7 64.85%, #d6e0f9 113.61%)",
            }}
          >
            {/* Left: Back Arrow + Hospital Name */}
            <div className="flex items-center space-x-2">
              <ArrowLeft
                className="h-5 w-5 cursor-pointer text-black"
                onClick={handleGoBack}
              />
              <h1 className="font-space space-grotesk font-bold !text-[20px] sm:!text-[28px] leading-[32px] text-[#181D27] align-middle [leading-trim:cap] [text-edge:cap]">
                {data?.organization_name ? data?.organization_name : data?.user_name}{" "}
                {data?.last_name}
              </h1>
            </div>

            {/* Right: Add A Review Button */}
            <PrimaryButton
              btnText="Add A Review"
              showImg
              img={PlusIcon}
              imgClass="w-[19px] h-[19px]"
              imgPosition="left"
              btnClass="flex sm:w-fit w-full items-center justify-center gap-[4px] h-[36px] !px-4 rounded-md bg-[#252525] text-white text-sm font-semibold"
              onClick={() => setFeedbackOpen(true)}
            />
          </header>

          {/* Main Content */}
          <main className="  max-w-7xl mx-auto md:px-4 md:px-6 px-0 lg:px-8 md:pt-12 pt-4 pb-6">
            {/* Hospital Profile and Contact Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
              <HospitalProfileCard
                name={""}
                imageUrl={""}
                email={""}
                specialty={""}
                description={""}
                id={id}
              />
              <ContactInformationCard
                address={""}
                phone={""}
                weekdayHours={""}
                weekendHours={""}
                id={id}
              />
            </div>
            <RatingsReviewsSection rating={data?.ratingData?.avg_rating} id={id} />
          </main>
        </div>
      )}
    </>
  );
};

export default HospitalProfile;
