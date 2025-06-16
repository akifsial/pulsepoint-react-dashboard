import React, { useState } from "react";
import CommonInput from "@components/Shared-components/Inputs/Common-Input/CommonInput";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";

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

const PopularCommunity = () => {
  const [step, setStep] = useState(0);

  const popularCommunity = [
    { icon: community1, title: "Hospital Stay Reviews" },
    { icon: community2, title: "Facility Finder Help" },
    { icon: community3, title: "Assisted Living Insights" },
    { icon: community4, title: "End-of-Life Planning" },
    { icon: community5, title: "Patient Rights & Safety" },
  ];

  const closeModal = () => setStep(0);

  return (
    <>
      <div className="sm:w-[292px] py-5 md:py-0">
        <CommonInput
          placeholder="Search Communities"
          showImg
          imgSrc={searchCommunity}
          imgLeft
          inputClassName="text-sm"
          containerClassName="w-full max-w-md border-0 px-5 py-3.5 rounded-[10px] mb-4"
        />

        <div className="bg-white  rounded-[10px] px-5 pt-4.5 pb-[4px] mb-4">
          <h3 className="mb-2 font-[Space Grotesk]">Popular Communities</h3>
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
          showImg
          imgClass="w-[24px] h-[24px] object-cover"
          img={addCommunity}
          imgPosition="left"
          btnClass="border border-[#000] px-4 w-full py-[10px] rounded-[10px] text-[#252525] font-semibold"
          onClick={() => setStep(1)}
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
