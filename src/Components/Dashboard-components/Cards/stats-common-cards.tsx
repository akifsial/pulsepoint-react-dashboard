import React from "react";
import { StatsCommonCardsProps } from "./Types";  // Importing the interface

// Define the StatsCommonCards component as a functional component
const StatsCommonCards: React.FC<StatsCommonCardsProps> = ({
  count,
  title,
  cardImg,
  imgBg,
  borderBg,
  imageSrc,  // This is the new prop to accept the image source
}) => {
  return (
    <div className="bg-white rounded-[10px] px-6 py-6 flex justify-between relative">
      <div
        className="absolute top-0 left-2 h-[84%] my-auto bottom-0 rounded-[10px] border-l-[4px]"
        style={{ borderColor: borderBg }}
      ></div>

      {/* Check if imageSrc is provided, if so, render image instead of text */}
      {imageSrc ? (
        <div className="w-full h-[127px] overflow-hidden rounded-[10px]">
          <img
            src={imageSrc}
            alt="Card Image"
            className="w-full h-full object-cover rounded-[10px]"
          />
        </div>
      ) : (
        <>
          {/* Default content */}
          <div>
            <p className="text-[45px] space-grotesk font-bold font-secondary text-[#1C1C1C] leading-10 mb-3">
              {count}
            </p>
            <p className="text-[#5D6168] space-grotesk text-[17px] font-bold leading-tight">
              {title}
            </p>
          </div>

          {/* Right side icon */}
          <div
            className="w-[50px] h-[50px] flex items-center justify-center rounded-lg"
            style={{ backgroundColor: imgBg }}
          >
            <img src={cardImg} alt="Stat Icon" className="w-[28px] h-[28px] object-cover" />
          </div>
        </>
      )}
    </div>
  );
};

// Export the component
export default StatsCommonCards;
