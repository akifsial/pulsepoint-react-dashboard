import React from "react";
import { v4 as uuid } from "uuid";
const RatingFilterDropdown: React.FC = ({setRating}) => {
  const dropdownOptions = [
    { id: uuid(), name: "5 Star Rating", value: "5" },
    { id: uuid(), name: "4 Star Rating", value: "4" },
    { id: uuid(), name: "3 Star Rating", value: "3" },
    { id: uuid(), name: "2 Star Rating", value: "2" },
    { id: uuid(), name: "1 Star Rating", value: "1" },
  ];
  return (
    <div
      style={{ boxShadow: "0px 4px 5.7px 0px #00000040" }}
      className="bg-white rounded-[10px]"
    >
      {dropdownOptions.map((item: any) => {
        return (
          <div key={item.id}>
            <button onClick={()=>(setRating(item.value))} className="w-full text-left px-4 py-3 hover:bg-[#E7F2F9] focus:outline-none cursor-pointer">
              <p className="text-[#252525] text-sm font-medium">{item.name}</p>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default RatingFilterDropdown;
