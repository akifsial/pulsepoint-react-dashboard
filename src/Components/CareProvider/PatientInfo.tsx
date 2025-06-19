import React from 'react';
import backArrow from "../../assets/media/svgs/dashboard-svgs/arrow-left.svg";
import User from "../AdminDashboard/AdminCare/User";
import Methew from "../../assets/media/svgs/dashboard-svgs/methew.svg"

const infoItems = [
  { label: "Name:", value: "Dr. Emily Carter" },
  { label: "Provider ID:", value: "CP-20419" },
  { label: "Specialty:", value: "Pulmonology" },
  { label: "Organization:", value: "Summit Health Network" },
  { label: "Assigned Patients:", value: "126" },
  { label: "Last Login:", value: "May 15, 2025, 3:22 PM" },
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
          Back to Community
        </h2>
      </div>
    <div className='bg-white pt-5 pb-8 px-6 rounded-[10px]'>
            <div className="flex items-center gap-6.5 mb-6">
              <img src={Methew} alt="Methew" />
              <div className="mr-2">
                <h4 className="font-bold mb-1 text-[#252525] text-xl leading-tight">
                  Methew Thompson
                </h4>
                <span className="text-base text-[#181D27]/50 leading-tight">
                  (Discharged Patient)
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
