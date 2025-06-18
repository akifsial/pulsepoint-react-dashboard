import React from "react";
import downarrow from "../../../../../assets/media/svgs/downarrow.svg";
import InsuranceGraph from "./InsuranceGraph";
import AgeDetail from "./AgeDetail/AgeDetail";

const InsuranceChart = () => {
  return (
    <div className="bg-white p-5 rounded-[10px] w-1/2 min-h-[328px]">
      <div className="flex justify-between items-center mb-5">
        <h4 className="text-xl text-[#181D27] mb-3.5 font-bold">
          Top Insurances Used
        </h4>
        <div className="flex items-center justify-center gap-2.5">
          <div className="border border-[#DADADA] rounded-[5px] flex items-center justify-center gap-2.5 py-[5px] px-2">
            <span className="font-medium text-[14px] text-[rgba(37, 37, 37, 0.6)]">
              Last 7 Days
            </span>
            <span>
              <img src={downarrow} alt="" />
            </span>
          </div>
        </div>
      </div>
      {/* <InsuranceGraph/> */}
      <div className="flex gap-10 items-center justify-between">
          <InsuranceGraph />
          <AgeDetail/>
      </div>
    </div>
  );
};

export default InsuranceChart;
