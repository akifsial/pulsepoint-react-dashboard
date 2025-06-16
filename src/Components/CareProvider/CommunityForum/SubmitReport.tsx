import React from "react";
import SuccessIcon from "@assets/media/images/reset-success-icon.png";

const SubmitReport = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-6">
      <img src={SuccessIcon} alt="Success" className="w-16 h-16 mb-4" />
      <h2 className="text-xl font-semibold text-[#2F3542] mb-2">
        Report submitted Successfully
      </h2>
      <p className="text-sm text-[#6B7280] max-w-[300px]">
        Thank you! Your report has been submitted and will be reviewed shortly.
      </p>
    </div>
  );
};

export default SubmitReport;
