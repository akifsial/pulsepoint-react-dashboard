import React from "react";
import ProfilePic from "@assets/media/svgs/patient-db-svgs/hospital-prof-img.svg";
import { useCareProviderSingle } from "@src/hooks/use-dashboard";

interface HospitalHeaderProps {
  name: string;
  imageUrl: string;
  email: string;
}

const HospitalHeader: React.FC<HospitalHeaderProps> = ({
  name,
  imageUrl,
  email,
  id,
}) => {
  const { data } = useCareProviderSingle(id);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <img
        src={ProfilePic}
        alt="profile"
        className="w-14 h-14 rounded-full object-cover"
      />

      <div className="leading-tight">
        {/* <h2 className="font-space text-wrap space-grotesk font-bold mb-3 text-[20px] leading-[32px] text-[#181D27] align-middle [leading-trim:cap] [text-edge:cap]">
          {data?.first_name ?? data?.user_name} {data?.last_name}
        </h2> */}
        {/* <h2 className="font-space space-grotesk font-bold mb-3 text-[20px] leading-[32px] text-[#181D27] break-words">
          {data?.first_name ?? data?.user_name} {data?.last_name}
        </h2> */}
        <h2 className="font-space space-grotesk font-bold mb-3 text-[20px] leading-[32px] text-[#181D27] truncate max-w-full">
          {data?.first_name ?? data?.user_name?.length > 13 ? data?.user_name?.slice(0,13)+".." : data?.user_name} {data?.last_name}
        </h2>


        <p className="font-geist font-normal text-[12px] leading-[100%] text-[#252525] align-middle [leading-trim:cap] [text-edge:cap]">
          {data?.email}
        </p>
      </div>
    </div>
  );
};

export default HospitalHeader;
