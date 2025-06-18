import React, { useState } from "react"; // Import useState for state management
import Patientdbimg from "@assets/media/svgs/patient-db-svgs/patient-dashboard.jpeg";

interface ReviewCardProps {
  backgroundImage?: string;
  title?: string;
  buttonText?: string;
  onReviewClick?: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  backgroundImage,
  title = "Tell us what you liked or didn't like",
  buttonText = "Write a Review",
  onReviewClick,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // New state for dropdown visibility
const handleReviewClick = () => {
  console.log("Button clicked!");
  setIsDropdownOpen(!isDropdownOpen); // Toggling dropdown visibility
};
  return (
    <div
      className="relative w-[340px] h-[142px] rounded-[10px] bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Content container with flex column layout */}
      <div className="relative h-full p-4 flex flex-col justify-between">
        {/* Title text - positioned at top left */}
        <h2 className="text-white text-sm leading-[22px] tracking-[0%] font-normal font-sans max-w-[140px] text-start">
          {title}
        </h2>

        {/* Button - positioned at bottom right */}
        <div className="flex justify-start">
          <button
            onClick={handleReviewClick}  // Attach the toggle function
            className="w-[120px] h-[32px] rounded-[8px] bg-[#28A2FF] hover:bg-[#1e8ae6] transition-colors text-white font-bold text-[10px] leading-[12px] tracking-[0%] font-sans flex justify-center items-center gap-[4px] shadow-sm"
          >
            {buttonText}
          </button>
        </div>
      </div>
            {/* Dropdown menu - conditionally rendered */}
      {isDropdownOpen && (
        <div className="absolute top-[50px] left-0 w-[100%] bg-white shadow-lg rounded-[10px] p-4">
          <div className="max-h-[200px] overflow-auto">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Johns Hopkins Hospital</span>
                <span>⏱</span>
              </div>
              <div className="flex justify-between">
                <span>Dr. Amanda Reyes – Green Valley Rehab Center</span>
                <span>⏱</span>
              </div>
              <div className="flex justify-between">
                <span>Search all providers near 10001</span>
                <span>⏱</span>
              </div>
              <div className="flex justify-between">
                <span>St. Luke’s Long-Term Care – 30303</span>
                <span>⏱</span>
              </div>
            </div>
          </div>
        </div>
      )}

<div className="absolute inset-0 bg-black/10 rounded-[10px] pointer-events-none z-0" />    
</div>
  );
};

const AppReviewCard: React.FC = () => {
  const handleReviewClick = () => {
    console.log("Review button clicked!");
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <ReviewCard
        onReviewClick={handleReviewClick}
        backgroundImage={Patientdbimg}
      />
    </div>
  );
};

export default AppReviewCard;
