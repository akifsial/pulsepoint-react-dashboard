import React, { useState } from "react";
import ChatbotSearchbar from "./ChatbotSearchBar";
import MsgIcon from "@assets/media/svgs/patient-db-svgs/chat-send-icon.png";

interface Facility {
  name: string;
  rating: number;
}

const NursingHomeReviews: React.FC = () => {
  const [zipCode, setZipCode] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [inputMessage, setInputMessage] = useState("");

  const facilities: Facility[] = [
    { name: "Green Oaks Nursing", rating: 4.5 },
    { name: "WillowCare Rehab", rating: 4.4 },
    { name: "Sunset Haven Home", rating: 4.3 },
  ];

  const handleZipSubmit = (zip: string) => {
    setZipCode(zip);
    setShowResults(true);
  };

  const handleInputSubmit = () => {
    if (inputMessage.trim()) {
      // Handle input submission logic here
      setInputMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleInputSubmit();
    }
  };

  function handleAskAI(question: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="w-full max-w-screen mx-auto bg-white rounded-lg p-8 shadow-sm">
      <div className="space-y-4">
        {/* Initial question */}
        <div className="flex justify-end">
          <div className="bg-[#E7EFF3] rounded-[30px] p-[20px] shadow-sm w-[523px] h-[50px] flex items-center gap-[10px]">
            <p className="text-[#252525] text-[14px] font-semibold leading-[120%] tracking-[0.2px] font-geist">
              I'm looking for reviews on nursing homes in my area. Any
              suggestions?
            </p>
          </div>
        </div>

        {/* Assistant response */}
        <div className="flex justify-start">
          <div className="rounded-[30px] p-[20px]">
            <p className="text-[#252525] text-[14px] font-normal leading-[24px] tracking-[0.2px] font-geist">
              Would you like me to pull Medicare ratings and reviews for nursing
              homes in your zip code?
            </p>
          </div>
        </div>

        {/* User confirmation */}
        <div className="flex justify-end">
          <div className="bg-[#E7EFF3] rounded-[30px] p-[20px] shadow-sm w-[197px] h-[50px] flex items-center gap-[10px]">
            <p className="text-[#252525] text-[14px] font-semibold leading-[120%] tracking-[0.2px]">
              Yes, please! Zip: 75001
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="flex justify-start w-[815px] h-auto gap-[25px]">
          <div className="bg-white rounded-2xl px-6 py-4 w-full">
            {/* Title Text */}
            <p className="text-[#252525] text-[14px] font-normal leading-[24px] tracking-[0.2px]">
              Here are top-rated facilities near 75001:
            </p>

            <div className="space-y-[10px]">
              {/* Facilities Label */}
              <p className="text-[#252525] text-[14px] font-bold leading-[24px] tracking-[0.2px]">
                Facilities near me:
              </p>

              {/* List of Facilities */}
              {facilities.map((facility, index) => (
                <div key={index} className="flex items-center">
                  {/* Facility Index */}
                  <span className="text-[#252525] text-[16px] font-bold leading-[24px] tracking-[0.2px] mr-2">
                    {index + 1}:
                  </span>

                  {/* Facility Name */}
                  <span className="text-[#333333] text-[14px] font-medium leading-[22px] tracking-[0.2px]">
                    {facility.name}
                  </span>

                  {/* Separator */}
                  <span className="text-[#252525] text-[14px] ml-2">—</span>

                  {/* Rating */}
                  <div className="flex items-center ml-2">
                    <span className="text-yellow-500 text-[14px]">⭐</span>
                    <span className="text-[#252525] text-[14px] ml-1">
                      {facility.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second user response */}
        <div className="flex justify-end">
          <div className="bg-[#E7EFF3] rounded-[30px] p-[20px] shadow-sm w-[197px] h-[50px] flex items-center gap-[10px]">
            <p className="text-[#252525] text-[14px] font-semibold leading-[120%] tracking-[0.2px]">
              Yes, please! Zip: 75001
            </p>
          </div>
        </div>
        
        {/* Chatbot Searchbar */}
        <ChatbotSearchbar onAskAI={handleAskAI} />
      </div>
    </div>
  );
};

export default NursingHomeReviews;
