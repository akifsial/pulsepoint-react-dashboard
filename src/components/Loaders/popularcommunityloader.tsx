import React from "react";

const PopularCommunitySkeleton = () => {
  return (
    <div className="w-full max-w-xs p-4 rounded-xl bg-white shadow-md animate-pulse">
      <ul className="space-y-4">
        {[1, 2, 3, 4, 5].map((_, idx) => (
          <li key={idx} className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularCommunitySkeleton;
