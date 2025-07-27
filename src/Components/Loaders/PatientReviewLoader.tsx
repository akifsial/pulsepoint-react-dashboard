import React from "react";

function PatientReviewLoader() {
  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <div className="flex mb-5 gap-5 items-center">
          <div className="animate-pulse w-10 h-10 bg-gray-300 rounded-full" />
          <div className="animate-pulse w-28 h-4 bg-gray-300 rounded" />
        </div>
        <div>
          <div className="animate-pulse w-13 h-12 bg-gray-300 rounded-[10px]" />
        </div>
      </div>
      <div className="animate-pulse mb-5 w-28 h-4 bg-gray-300 rounded" />
      <div className="animate-pulse w-28 h-4 bg-gray-300 rounded" />
    </div>
  );
}

export default PatientReviewLoader;
