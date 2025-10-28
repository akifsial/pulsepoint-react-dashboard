import React from "react";

const FeedSkeleton = () => {
  return (
    <div className="w-full mx-auto mt-6 space-y-6 p-4 rounded-xl bg-gradient-to-br from-gray-100 to-blue-50">
      <div className="flex items-center space-x-3 animate-pulse">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div>
          <div className="h-3 w-24 bg-gray-300 rounded"></div>
        </div>
      </div>

      <div className="animate-pulse space-y-2">
        <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
        <div className="h-3 w-1/3 bg-gray-200 rounded"></div>
      </div>

      <div className="flex items-center space-x-4 animate-pulse">
        <div className="w-12 h-8 bg-gray-300 rounded-md"></div>
        <div className="w-12 h-8 bg-gray-300 rounded-md"></div>
        <div className="w-16 h-8 bg-gray-300 rounded-md"></div>
      </div>

      <div className="flex items-center space-x-2 animate-pulse">
        <div className="flex-1 h-10 bg-gray-200 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>

      {[1, 2].map((i) => (
        <div key={i} className="flex space-x-3 animate-pulse mt-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-3 w-24 bg-gray-300 rounded"></div>
            <div className="h-3 w-20 bg-gray-200 rounded"></div>
            <div className="flex items-center space-x-3 mt-1">
              <div className="w-10 h-6 bg-gray-300 rounded-md"></div>
              <div className="w-10 h-6 bg-gray-300 rounded-md"></div>
              <div className="w-14 h-6 bg-gray-300 rounded-md"></div>
              <div className="w-10 h-6 bg-gray-300 rounded-md"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedSkeleton;
