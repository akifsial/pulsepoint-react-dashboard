import React from "react";

const ReplyLoader: React.FC = () => {
  return (
    <div className="w-full">
      <div className="max-w-fit bg-gray-200 px-4 py-2 rounded-2xl shadow animate-pulse flex gap-1 items-center">
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
};

export default ReplyLoader;
