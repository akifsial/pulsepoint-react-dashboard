import React from "react";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import { PrimaryButton } from "@src/Components/Sharedcomponents/Buttons/Commonbutton/commonbutton";
import ForwardArrow from "@assets/media/svgs/dashboard-svgs/arrow-forward-white.svg";

const ForumActivityCard: React.FC = () => {
  return (
    <div className="bg-[#FAFAFA] rounded-lg p-5">
      <div className="flex items-center gap-3 mb-[14px]">
        <img
          src={dummyImage}
          alt="User"
          className="w-[50px] h-[50px] object-cover rounded-full"
        />
        <div>
          <p className="text-[#252525] text-sm font-bold mb-1">
            Cameron Williamson
          </p>
          <p className="text-[13px] text-[#252525]">
            2 hours ago .In Medical Hit
          </p>
        </div>
      </div>
      <div className="mb-3.5">
        <p className="text-[16px] text-[#252525] font-semibold">
          Q: How do I know if a rehab center is right for my dad?”
        </p>
      </div>
      <div className="flex items-center gap-3 mb-5">
        <img
          src={dummyImage}
          alt="User"
          className="w-[43px] h-[43px] object-cover rounded-full"
        />
       
      </div>
      <PrimaryButton
                  btnText="View Discussion"
                  btnTextClass="text-[#FFFFFF] text-sm font-semibold"
                  showImg={true}
                  imgClass="w-[14px] h-[13px]"
                  img={ForwardArrow}
                  imgPosition="right"
                  btnClass="border border-[#252525] px-4 py-3 md:w-[159px] h-[46px] w-full rounded-lg bg-[#000000]"
                />
    </div>
  );
};

export default ForumActivityCard;
