import { useState } from "react";
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
import Community1 from "./Community1";
import Community2 from "./Community2";
import Community3 from "./Community3";

const PopularCommunity = () => {
  const [step, setStep] = useState<number | "">(""); 

  const popularCommunity = [
    { icon: community1, title: "Hospital Stay Reviews" },
    { icon: community2, title: "Facility Finder Help" },
    { icon: community3, title: "Assisted Living Insights" },
    { icon: community4, title: "End-of-Life Planning" },
    { icon: community5, title: "Patient Rights & Safety" },
  ];

  const closeModal = () => setStep(""); 

  return (
    <>
      {/* Sidebar */}
      <div>
        <CommonInput
          placeholder="Search Communities "
          showImg={true}
          imgSrc={searchCommunity}
          imgLeft={true}
          inputClassName="text-base"
          containerClassName="w-full max-w-md border-0 px-5 py-3.5 rounded-[10px] mb-4"
          imgClassName="w-5 h-5"
        />

        <div className="bg-white rounded-[10px] px-5 pt-4.5 pb-[4px] mb-4">
          <h4 className="mb-1.5">Popular Communities</h4>
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

        {/* <PrimaryButton
          btnText="Create Community"
          showImg={true}
          img={addCommunity}
          imgClass="w-[19px] h-[19px] object-cover"
          imgPosition="left"
          btnClass="border-1 border-[#000] w-[292px] h-[46px] !rounded-[10px] px-4 py-[10px] text-[#252525] font-semibold leading-[33px] gap-[10px] flex items-center justify-center"
          onClick={() => setStep(1)} 
        /> */}
      </div>

      {/* Step-based Modal Views */}
      {step === 1 && (
        <Model className="max-w-[596px]" setIsOpen={closeModal}>
          <Community1 onNext={() => setStep(2)} onClose={closeModal} />
        </Model>
      )}

      {step === 2 && (
        <Model className="max-w-[596px]" setIsOpen={closeModal}>
          <Community2 onNext={() => setStep(3)} onBack={() => setStep(1)} />
        </Model>
      )}

      {step === 3 && (
        <Model className="max-w-[596px]" setIsOpen={closeModal}>
          <Community3 onBack={() => setStep(2)} onClose={closeModal} />
        </Model>
      )}
    </>
  );
};

export default PopularCommunity;
