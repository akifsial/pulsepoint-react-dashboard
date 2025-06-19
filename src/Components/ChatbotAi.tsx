import React, { useState } from "react";
import { PrimaryButton } from "./Shared-components/Buttons/Common-button/CommonButton";
import ChatbotSearchbar from "./ChatbotSearchBar";

const ChatbotAi: React.FC = () => {
  const [question, setQuestion] = useState("");

  const handleAskAI = () => {
    // Handle AI suggestion functionality
    console.log("Ask AI for suggestions");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Question submitted:", question);
  };

  return (
    <div className="w-full max-w-screen mx-auto bg-white rounded-lg p-8 shadow-sm">
      <div className="flex flex-col gap-8 h-screen justify-center items-center">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="font-grotesk font-bold text-[25px] leading-custom text-customGray text-center mb-2">
            Top Senior Spot - Ask a Question
          </h2>

          <h6 className="font-geist font-medium text-base leading-capHeight text-customGray text-center">
            Have a question about care providers? Get answers and advice from
            patients, caregivers, and experts.
          </h6>
        </div>

        {/* Search Input Section */}
         <ChatbotSearchbar onAskAI={handleAskAI} />

        {/* Notice Text */}
        <div className="font-geist font-medium text-base leading-relaxed text-customGray text-center">
          It will need to know if the business is on cash vs accrual, from
          website and user provided description
        </div>

        {/* Category Buttons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <PrimaryButton
            btnText="🏥 Care Provider reviews"
            btnTextClass="text-sm font-semibold"
            btnClass="border border-[#252525] px-4 py-3 w-auto w-full rounded-[10px]"
          />
          <PrimaryButton
            btnText="📋 Medical Ratings"
            btnTextClass="text-sm font-semibold"
            btnClass="border border-[#252525] px-4 py-3 w-auto w-full rounded-[10px]"
          />
          <PrimaryButton
            btnText="🧓 Patient feedback"
            btnTextClass="text-sm font-semibold"
            btnClass="border border-[#252525] px-4 py-3 w-auto w-full rounded-[10px]"
          />
          <PrimaryButton
            btnText="🤖 AI Support"
            btnTextClass="text-sm font-semibold"
            btnClass="border border-[#252525] px-4 py-3 w-auto w-full rounded-[10px]"
          />
          <PrimaryButton
            btnText="🛏️ Rehab Care"
            btnTextClass="text-sm font-semibold"
            btnClass="border border-[#252525] px-4 py-3 w-auto w-full rounded-[10px]"
          />
          <PrimaryButton
            btnText="💰 Insurance Acceptance"
            btnTextClass="text-sm font-semibold"
            btnClass="border border-[#252525] px-4 py-3 w-auto w-full rounded-[10px]"
          />
          <PrimaryButton
            btnText="🧾 Nursing Home Advice"
            btnTextClass="text-sm font-semibold"
            btnClass="border border-[#252525] px-4 py-3 w-auto w-full rounded-[10px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatbotAi;
