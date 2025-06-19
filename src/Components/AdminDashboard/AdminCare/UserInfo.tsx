import React, { useRef, useState } from "react";
import User from "./User";
import map from "@assets/media/images/map.png";
import ClientReviews from "./ClientReviews";
import UserTable from "./UserTable";
import downarrow from "@assets/media/svgs/downarrow.svg";
import client from "@assets/media/images/client.png";
import exports from "@assets/media/svgs/export.svg";
import whitearrow from "@assets/media/svgs/whitearrow.svg";
import edit from "@assets/media/svgs/edit.svg";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import EditDetails from "@components/AdminDashboard/AdminCare/EditDetails";
import UserCommunity from "./UserCommunity";
import UserComments from "./UserComments";
import UserFlagged from "./UserFlagged";
import leftarrow from "@assets/media/svgs/leftarrow.svg";

const infoItems = [
  { label: "Name:", value: "Dr. Emily Carter" },
  { label: "Provider ID:", value: "CP-20419" },
  { label: "Specialty:", value: "Pulmonology" },
  { label: "Organization:", value: "Summit Health Network" },
  { label: "Assigned Patients:", value: "126" },
  { label: "Last Login:", value: "May 15, 2025, 3:22 PM" },
];

const arrayinfo = [
  { label: "Email:", value: "emily.carter@summithealth.com" },
  { label: "Phone", value: "(555) 123-9876" },
  {
    label: "Working hours",
    value: "Monday–Friday: 9:00 AM – 6:00 PM\nWeekends: Off",
  },
  { label: "Address:", value: "1010 Greenway Blvd, Suite 200" },
  { label: "City/State", value: "Denver, CO" },
  { label: "Zip Code:", value: "80202" },
];

const UserInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showEditPage, setShowEditPage] = useState(false);
  const dropdownRef = useRef(null);

  if (showEditPage) {
    return <EditDetails goBack={() => setShowEditPage(false)} />;
  }

  return (
    <div>
      <div className="flex items-baseline gap-2">
        <img src={leftarrow} alt="" />
        <h2 className=" text-[25px] font-bold text-[#181D27] font-[Space Grotesk] mb-6">
          Care Provider Details
        </h2>
      </div>
      <div className="p-5 bg-[#ffffff] rounded-lg mb-5">
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-4">
            <img src={client} alt="Methew" className="rounded-[50%]" />
            <div className="mr-2">
              <h4 className="font-bold mb-1 text-[#252525] text-xl leading-tight">
                Methew Thompson
              </h4>
              <span className="text-base text-[#181D27]/50 leading-tight">
                (Discharged Patient)
              </span>
            </div>
            <div className="border border-[#067647] rounded-[30px] flex items-center justify-center gap-2.5 py-[5px] px-3">
              <span className="font-medium text-[14px] text-[#067647]">
                Active
              </span>
              <img src={downarrow} alt="downarrow" className="h-2.5 w-2.5" />
            </div>
          </div>

          <div className="flex items-center gap-3.5 pt-1.5">
            <div className="relative" ref={dropdownRef}>
              <PrimaryButton
                btnText="Export Table"
                showImg={true}
                img={exports}
                imgClass="w-4 h-4"
                suffixImg={whitearrow}
                suffixImgClass="w-4 h-4"
                onClick={() => setIsOpen(!isOpen)}
                btnClass="flex items-center justify-center gap-[5px] h-[46px] cursor-pointer w-[159px] bg-[#28A2FF] text-white px-4 rounded-lg font-semibold text-sm"
              />
              {isOpen && (
                <div className="absolute z-10 top-full left-0 w-[159px] bg-white rounded-[10px] shadow-md p-1.5">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      console.log("Export as CSV");
                    }}
                    className="block w-full rounded-[5px] text-left px-2.5 py-2.5 mb-1 hover:bg-[#DDEFF7] text-sm text-[#252525]"
                  >
                    Export As CSV
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      console.log("Export as PDF");
                    }}
                    className="block w-full rounded-[5px] text-left px-2.5 py-2.5 hover:bg-[#DDEFF7] text-sm text-[#252525]"
                  >
                    Export As Pdf
                  </button>
                </div>
              )}
            </div>

            <PrimaryButton
              btnText="Edit Details"
              showImg={true}
              img={edit}
              onClick={() => setShowEditPage(true)}
              btnClass="flex items-center justify-center h-[46px] w-[131px] cursor-pointer bg-[#252525] border border-[#252525] text-white py-[13px] px-4 rounded-lg font-semibold text-sm"
            />
          </div>
        </div>

        <div className="bg-[#FAFAFA] p-6 mb-5 rounded-[10px]">
          <div className="max-w-[327px]">
            <h4 className="font-bold mb-4">Add Personal Information</h4>
            <User data={infoItems} />
          </div>
        </div>
        <div className="bg-[#FAFAFA] flex items-center justify-between p-6 mb-5 rounded-[10px]">
          <div className="max-w-[414px]">
            <h4 className="font-bold mb-4">Contact Information</h4>
            <User data={arrayinfo} />
          </div>
          <div>
            <img src={map} alt="map" className="rounded-[5px]" />
          </div>
        </div>
      </div>
      <ClientReviews />
      <UserTable />
      <UserCommunity />
      <UserComments />
      <UserFlagged />
    </div>
  );
};

export default UserInfo;
