import React from "react";
import closeArrow from "@assets/media/svgs/dashboard-svgs/close-circle.svg";

const Model = ({ setIsOpen, children }) => {
  return (
    <div className="fixed inset-0 bg-black/40  flex justify-center items-center z-50">
      <div className="bg-white max-w-[596px] p-7.5 rounded-[10px] relative w-full mx-4">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-[30px] top-[30px]"
          aria-label="Close"
        >
          <img src={closeArrow} alt="Close" className="w-6 h-6" />
        </button>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Model;
