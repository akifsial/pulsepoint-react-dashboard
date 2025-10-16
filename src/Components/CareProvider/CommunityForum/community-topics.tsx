import React, { useState } from "react";

const CommunityTopics = ({
  title,
  asterisk,
  options = [],
  onSelect,
  setSelectedTopicId

}) => {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (id) => {
    setSelectedId(id);
    if (onSelect) onSelect(id);
    
    setSelectedTopicId(id) // topic id set

  };

  return (
    <div className="text-base">
      <h6 className="font-medium mb-2">
        {title}{" "}
        {asterisk && (
          <span className="text-red-500 font-medium text-[16px] leading-[140%] tracking-normal font-geist relative top-[-1px]">
            *
          </span>
        )}
      </h6>
      <div className="flex font-normal text-[#1A1A1A] gap-[11px] mb-5 flex-wrap">
        {options.map((option, index) => (
          <button
            type="button"
            // value={selectedId}
            key={index}
            onClick={() => handleSelect(option.id)}
            className={`py-1.5 cursor-pointer px-4 rounded-[20px] transition-all duration-200
              ${selectedId === option.id
                ? "bg-[#28A2FF] text-white"
                : "bg-[#F4F4F4] text-black hover:bg-[#DDF0FF]"
              }`}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CommunityTopics;
