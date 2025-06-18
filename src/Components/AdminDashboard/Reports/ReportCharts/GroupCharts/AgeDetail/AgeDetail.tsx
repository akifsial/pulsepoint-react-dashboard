import React from "react";

const agedata = [
  { label: "70-80", count: 4000, percent: "50%" },
  { label: "60-70", count: 3509, percent: "50%" },
  { label: "50-60", count: 3076, percent: "50%" },
  { label: "40-50", count: 100, percent: "50%" },
  { label: "40-50", count: 100, percent: "50%" },
  { label: "40-50", count: 100, percent: "50%" },
];

const AgeDetail = () => {
  return (
    <div className="text-sm ">
      <div className="font-semibold mb-3 flex gap-10 border-b pb-4 ">
        <span className="text-[14px] font-medium">Age Groups</span>
        <span className="text-[14px] font-medium">Count</span>
        <span className="text-[14px] font-medium">%</span>
      </div>
      {agedata.map((item, index) => (
        <div key={index} className="flex justify-between gap-10 mb-2">
          <div>{item.label}</div>
          <div>{item.count}</div>
          <div>{item.percent}</div>
        </div>
      ))}
    </div>
  );
};

export default AgeDetail;
