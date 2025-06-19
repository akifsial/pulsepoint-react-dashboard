import React from 'react';
import backArrow from "../../assets/media/svgs/dashboard-svgs/arrow-left.svg";
import User from "../AdminDashboard/AdminCare/User";
import Profile from "../../assets/media/svgs/dashboard-svgs/Avatar.svg"

const infoItems = [
  { label: "Care Need:", value: "Short-Term Nursing Stay" },
  { label: "Age: ", value: "67" },
  { label: "Gender:", value: "Male" },
  { label: "Phone Number:", value: "(916) 555-8923" },
  { label: "Location:", value: "4001 J St, Sacramento, CA 95819" },
  { label: "Preferred Communication Method", value: "Email, SMS, Phone" },
];

const PatientInfo = ({ setShowPatientInfo }) => {
  return (
    <div>
      <div
        className="flex items-center mb-4.5 gap-2.5 cursor-pointer"
        onClick={() => setShowPatientInfo(false)}
      >
        <img src={backArrow} alt="backArrow" />
        <h2 className="text-xl font-semibold text-[#252525] font-[Space Grotesk]">
          Patient’s Profile
        </h2>
      </div>
    <div className='bg-white pt-5 pb-8 px-6 rounded-[10px]'>
            <div className="flex items-center gap-6 mb-6">
              <img src={Profile} alt="Methew" className='rounded-full' />
              <div className="mr-2">
                <h4 className="font-bold text-[#252525] text-xl leading-tight">
                 Ronald Richards
                </h4>
                <span className="text-[12px] text-[#181D27]/50 leading-tight">
                 support@hopkinshospital.org
                </span>
              </div>
              
            </div>
            <p className='text-lg font-bold mb-3'>About</p>
        <User data={infoItems} />
    </div>
    </div>
  );
};

export default PatientInfo;
