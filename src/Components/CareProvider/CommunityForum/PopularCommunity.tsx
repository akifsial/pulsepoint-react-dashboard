import React, { useState } from "react";
import CommonInput from "@components/Shared-components/Inputs/Common-Input/CommonInput";
import { PrimaryButton }, { useState } from "@components/Shared-components/Buttons/Common-button/CommonButton"; 

import searchCommunity from "@assets/media/svgs/dashboard-svgs/searchCommunity.svg";
import community1 from "@assets/media/svgs/dashboard-svgs/community1.svg";
import community2 from "@assets/media/svgs/dashboard-svgs/community2.svg";
import community3 from "@assets/media/svgs/dashboard-svgs/community3.svg";
import community4 from "@assets/media/svgs/dashboard-svgs/community4.svg";
import community5 from "@assets/media/svgs/dashboard-svgs/community5.svg";
import addCommunity from "@assets/media/svgs/dashboard-svgs/addCommunity.svg";

import Model from "@components/Model/Model";
import CommunityStep1 from "./Community1";
import CommunityStep2 from "./Community2";
import CommunityStep3 from "./Community3";
import CommunityModal from "@components/CommunityModal";


const PopularCommunity = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const popularCommunity = [
    {
      icon: community1,
      title: "Hospital Stay Reviews",
    },
    {
      icon: community2,
      title: "Facility Finder Help",
    },
    {
      icon: community3,
      title: "Assisted Living Insights",
    },
    {
      icon: community4,
      title: "End-of-Life Planning",
    },
    {
      icon: community5,
      title: "Patient Rights & Safety",
    },
  ];
    // Handle the form submission logic for community creation
  const handleCommunitySubmit = async (data: any) => {
    console.log("Community Data Submitted", data);
    // Handle the actual community creation logic here
  };
  return (
    <>
      {/* Modal */}
      <CommunityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close the modal
        onSubmit={handleCommunitySubmit} // Handle the form submission
      />
      <div className="w-[292px]">
        <div>
          <CommonInput
            placeholder="Search Communities "
            showImg={true}
            imgSrc={searchCommunity}
            imgLeft={true}
            inputClassName="text-sm"
            containerClassName="w-full max-w-md border-0 px-5 py-3.5 rounded-[10px] mb-4"
          />
        </div>
        <div className="bg-white rounded-[10px] px-5 pt-4.5 pb-[4px] mb-4">
          <h4 className="mb-2">Popular Communities</h4>
          {popularCommunity.map((community, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3.5 py-[13px] border-b border-b-[#E6E6E6] last:border-b-0"
            >
              <img
                src={community.icon}
                alt={community.title}
                className="rounded-full h-[37px] w-[37px]"
              />
              <p className="font-semibold">{community.title}</p>
            </div>
          ))}
        </div>

        <PrimaryButton
          btnText="Create Community" 
          showImg={true}
          img={addCommunity}
          imgClass="w-[19px] h-[19px] object-cover"
          imgPosition="left"
          btnClass="border-1 border-[#000] w-[292px] h-[46px] !rounded-[10px] px-4 py-[10px] text-[#252525] font-semibold leading-[33px] gap-[10px] flex items-center justify-center "
          onClick={() => setIsModalOpen(true)} // This triggers modal opening
        />
      </div>

      {step === 1 && (
        <Model setIsOpen={closeModal}>
          <CommunityStep1 onNext={() => setStep(2)} onClose={closeModal} />
        </Model>
      )}
      {step === 2 && (
        <Model setIsOpen={closeModal}>
          <CommunityStep2 onNext={() => setStep(3)} onBack={() => setStep(1)} />
        </Model>
      )}
      {step === 3 && (
        <Model setIsOpen={closeModal}>
          <CommunityStep3 onBack={() => setStep(2)} onClose={closeModal} />
        </Model>
      )}
    </>
  );
};

export default PopularCommunity;
