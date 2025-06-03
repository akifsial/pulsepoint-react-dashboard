import React from "react";
import { StatsCommonCardsProps } from "./Types/Index";

const StatsCommonCards: React.FC<StatsCommonCardsProps> = ({
  count,
  title,
  cardImg,
  imgBg,
  borderBg,
}) => {
  return (
    <div className="bg-white rounded-[10px] px-6 py-6 flex justify-between  relative">
      <div
        className="absolute top-0 left-2 h-[84%] my-auto bottom-0 rounded-[10px]  border-l-[4px]"
        style={{ borderColor: borderBg }}
      ></div>

      <div>
        <p className="text-[45px] font-bold font-secondary text-[#1C1C1C] leading-10 mb-3">
          {count}
        </p>
        <p className="text-[#181D27] text-[17px] font-bold leading-tight">
          {title}
        </p>
      </div>
      <div
        className="w-[50px] h-[50px] flex items-center justify-center rounded-lg"
        style={{ backgroundColor: imgBg }}
      >
        <img src={cardImg} alt="Stat Icon" className="w-[28px] h-[28px] object-cover" />
      </div>
    </div>
  );
};

export default StatsCommonCards;
