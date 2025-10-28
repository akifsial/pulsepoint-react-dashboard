import React, { useRef, useState } from "react";
import User from "./user";
import map from "@assets/media/images/map.png";
import ClientReviews from "./clientreviews";
import UserTable from "./usertable";
import downarrow from "@assets/media/svgs/downarrow.svg";
import client from "@assets/media/images/client.png";
import exports from "@assets/media/svgs/export.svg";
import whitearrow from "@assets/media/svgs/whitearrow.svg";
import edit from "@assets/media/svgs/edit.svg";
import { PrimaryButton } from "@components/Sharedcomponents/Buttons/Commonbutton/commonbutton";
import EditDetails from "@components/admindashboard/AdminCare/editdetails";
import UserCommunity from "./usercommunity";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import UserComments from "./usercomments";
import UserFlagged from "./userflagged";
import leftarrow from "@assets/media/svgs/leftarrow.svg";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

interface UserInfoProps {
  goBack: (value: boolean) => void;
  userData: {
    first_name?: string;
    last_name?: string;
    id?: number | string;
    specialization?: string;
    organization_name?: string;
    saved_by_patients?: Array<{ id: string; name: string; age?: number }>;
    last_login?: string;
    email?: string;
    number?: string;
    working_hours?: string;
    address?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    image?: string;
    status?: string;
    filterValue?: string;
    comment?: Array<any>;
    post_flag?: Array<any>;
    reviews_to_careprovider?: Array<any>;
  } | null;
}

const UserInfo: React.FC<UserInfoProps> = ({ goBack, userData,fetchUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showEditPage, setShowEditPage] = useState(false);
  const dropdownRef = useRef(null);

  if (!userData) {
    return <div className="p-6 text-red-500">User data not found.</div>;
  }

  const infoItems = [
    {
      label: "Name:",
      value: `${userData?.first_name || userData.user_name || ""} ${
        userData?.last_name || ""
      }`,
    },
    { label: "Provider ID:", value: `CP-${userData?.id || "N/A"}` },
    { label: "Specialty:", value: userData?.specialization || "N/A" },
    { label: "Organization:", value: userData?.organization_name || "N/A" },
    {
      label: "Assigned Patients:",
      value: userData?.saved_by_patients?.length?.toString() || "0",
    },
    {
      label: "Last Login:",
      value: userData?.last_login
        ? new Date(userData.last_login).toLocaleString()
        : "N/A",
    },
  ];

  const arrayinfo = [
    { label: "Email:", value: userData?.email || "N/A" },
    { label: "Phone", value: userData?.number || "N/A" },
    {
      label: "Working hours",
      value: `${userData?.start_day || "N/A"}, ${
        userData?.end_day || "N/A"
      } | ${userData?.time_in || "N/A"}-${userData?.time_out || "N/A"} `,
    },
    { label: "Address:", value: userData?.address || "N/A" },
    {
      label: "City/State",
      value: `${userData?.city || "N/A"}, ${userData?.state || "N/A"}`,
    },
    { label: "Zip Code:", value: userData?.postal_code || "N/A" },
  ];

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);

    let yPosition = 10;
    const pageMargin = 10;
    const addText = (text: string) => {
      if (yPosition > doc.internal.pageSize.height - 20) {
        doc.addPage();
        yPosition = pageMargin;
      }
      doc.text(text, pageMargin, yPosition);
      yPosition += 10;
    };

    addText("Personal Information");
    infoItems.forEach((item) => addText(`${item.label}: ${item.value}`));

    addText("Contact Information");
    arrayinfo.forEach((item) => addText(`${item.label}: ${item.value}`));

    doc.save(`UserDetails_${userData?.id ?? ""}.pdf`);
  };

  const handleExportCSV = () => {
    const data = [
      ...infoItems.map((item) => ({
        Section: "Personal Information",
        Label: item.label.replace(":", ""),
        Value: item.value ?? "",
      })),
      ...arrayinfo.map((item) => ({
        Section: "Contact Information",
        Label: item.label.replace(":", ""),
        Value: item.value ?? "",
      })),
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "User Details");

    XLSX.writeFile(wb, `UserDetails_${userData?.id ?? ""}.csv`);
  };

  if (showEditPage) {
    return <EditDetails fetchUser={fetchUser} goBack={setShowEditPage} userData={userData} />;
  }

  return (
    <div>
      <div className="flex md:mt-0 mt-5 items-baseline gap-2">
        <img
          src={leftarrow}
          alt=""
          className="cursor-pointer"
          onClick={() => goBack(false)}
        />
        <h2 className=" text-[25px] font-bold text-[#181D27] space-grotesk mb-6">
          Care Provider Details
        </h2>
      </div>
      <div className="px-1 sm:py-0 py-4 sm:px-5 bg-[#ffffff] rounded-lg mb-5">
        <div className="flex flex-wrap items-center justify-between mb-7">
          <div className="flex mt-5 items-center gap-4">
            <img
              src={
                userData?.image
                  ? `${import.meta.env.VITE_APP_API_IMG_URL}${userData.image}`
                  : dummyImage
              }
              alt={name || "Care Provider"}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = dummyImage;
              }}
              className="rounded-[50%] w-16 h-16 object-cover"
            />
            <div className="mr-2">
              <h4 className="font-bold mb-1 space-grotesk text-[#252525] text-xl leading-tight">
                {userData?.full_name ||
                  `${userData?.first_name ?? ""} ${
                    userData?.last_name ?? ""
                  }`.trim() ||
                  userData?.name ||
                  userData?.user_name ||
                  "N/A"}
              </h4>

            </div>
            <div
              className={
                userData?.status == "ACTIVE"
                  ? ` text-[#067647] border border-[#067647] rounded-[30px] flex items-center justify-center gap-2.5 py-[5px] px-3`
                  : `border border-red-500 !text-red-500 rounded-[30px] flex items-center justify-center gap-2.5 py-[5px] px-3`
              }
            >
              <span className="font-medium text-[14px] ">
                {userData.status || "-"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 pt-1.5">
            <div className="relative" ref={dropdownRef}>
      
              {isOpen && (
                <div className="absolute z-10 top-full left-0 w-[159px] bg-white rounded-[10px] shadow-md p-1.5">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleExportCSV();
                    }}
                    className="block w-full rounded-[5px] text-left px-2.5 py-2.5 mb-1 hover:bg-[#DDEFF7] text-sm text-[#252525]"
                  >
                    Export As CSV
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleExportPDF();
                    }}
                    className="block w-full rounded-[5px] text-left px-2.5 py-2.5 hover:bg-[#DDEFF7] text-sm text-[#252525]"
                  >
                    Export As PDF
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
          <h4 className="font-bold mb-4">Add Personal Information</h4>
          <User data={infoItems} />
        </div>
        <div className="bg-[#FAFAFA] flex items-center justify-between p-6 mb-5 rounded-[10px]">
          <div className="w-full">
            <h4 className="font-bold mb-4">Contact Information</h4>
            <User data={arrayinfo} />
          </div>
          <div>
          </div>
        </div>
      </div>

      <ClientReviews reviews={userData?.reviews_to_careprovider || []} />

      <UserCommunity userData={userData} />
      <UserComments commentData={userData?.comment || []} />
      <UserFlagged post_flag={userData?.post_flag || []} />
    </div>
  );
};

export default UserInfo;
