import CommonInput from "@components/Shared-components/Inputs/Common-Input/CommonInput";
import React from "react";
import searchCommunity from "@assets/media/svgs/dashboard-svgs/searchCommunity.svg";
import community1 from "@assets/media/svgs/dashboard-svgs/community1.svg";
import community2 from "@assets/media/svgs/dashboard-svgs/community2.svg";
import community3 from "@assets/media/svgs/dashboard-svgs/community3.svg";
import community4 from "@assets/media/svgs/dashboard-svgs/community4.svg";
import community5 from "@assets/media/svgs/dashboard-svgs/community5.svg";
import addCommunity from "@assets/media/svgs/dashboard-svgs/addCommunity.svg";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";

const PopularCommunity = () => {
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
  return (
    <>
      <div className="w-[25%]">
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
            <div key={idx} className="flex items-center gap-3.5 py-[13px] border-b border-b-[#E6E6E6] last:border-b-0">
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
                  imgClass="w-[24px] h-[24px] object-cover"
                  img={addCommunity}
                  imgPosition="left"
                  btnClass="border border-[#000] px-4 w-full py-[10px] rounded-[10px] text-[#252525] font-semibold"
                  
                />
      </div>
    </>
  );
};

export default PopularCommunity;
