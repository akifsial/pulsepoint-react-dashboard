import React from "react";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import flag from "@assets/media/svgs/dashboard-svgs/flag2.svg";
import RatingStars from "@components/Shared-components/RatingStars";

const PatientReviewsCard: React.FC = () => {
  return (
    <div className="bg-[#FAFAFA] rounded-[8px] px-6 py-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-[10px]">
          <img
            src={dummyImage}
            alt="User"
            className="w-[50px] h-[50px] object-cover rounded-full"
          />
          <div className="flex items-center gap-[12px]">
            <p className="#252525 text-[16px] font-bold">Patricia M.</p>
            <p className="#252525 text-[16px] ">5 hours ago</p>
          </div>
        </div>
        <div className="border border-[#D3D3D3] rounded-[10px] px-2 py-3 flex items-center gap-2">
          <img src={flag} alt="flag" className="w-[24px] h-[24px] " />
          <p className="text-[16px] text-[#252525]">Flagged</p>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <RatingStars value={5} isDisabled={true} />
        <p className="text-[16px] text-[#252525]">(5.0)</p>
      </div>
      <div className="">
        <p className="text-[16px] text-[#252525]">
          “Golden Years Rehab treated my mother like family. The staff was
          patient, kind, and always available. I could finally breathe knowing
          she was in good hands.”
        </p>
      </div>
    </div>
  );
};

export default PatientReviewsCard;
