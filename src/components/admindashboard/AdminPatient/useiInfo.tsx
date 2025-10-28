import React, { useRef, useState } from "react";
import User from "./user";
import { PrimaryButton } from "@components/Sharedcomponents/Buttons/Commonbutton/commonbutton";
import PatientDetails from "@components/admindashboard/AdminPatient/patientdetails";
import downarrow from "@assets/media/svgs/downarrow.svg";
import whitearrow from "@assets/media/svgs/whitearrow.svg";
import edit from "@assets/media/svgs/edit.svg";
import leftarrow from "@assets/media/svgs/leftarrow.svg";
import patient from "@assets/media/images/patient.png";
import UserCommunity from "../AdminCare/usercommunity";
import UserComments from "../AdminCare/usercomments";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import exports from "../../../assets/media/svgs/export.svg";
import PatientUserFlagged from "./patientuserflagged";

import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import UserCommunityPatient from "../AdminCare/usercommunitypatient";

interface UserInfoProps {
  userData: {
    id?: string | number;
    first_name?: string;
    last_name?: string;
    saved_by_patients?: Array<{ id: string; name: string; age: number }>;
    last_login?: string;
    assigned_provider_name?: string;
    conditions?: string;
    last_visit?: string;
    post_flag?: Array<{
      id: number;
      user_id: number;
      post_id: number;
      deleted: boolean;
      created_at: string;
      post: {
        id: number;
        title: string;
        community_id: number;
        created_at: string;
        community: { title: string };
        post_report: Array<{
          id: number;
          comment: string;
          report_reason: { name: string };
        }>;
      };
    }>;
    comment?: Array<{
      id: number;
      post_id: number;
      user_id: number;
      parent_id: number | null;
      status: string;
      content: string;
      deleted: boolean;
      created_at: string;
      updated_at: string;
    }>;
  };
  goBack: (value: boolean) => void;
}

const infoItems = (userData: UserInfoProps["userData"]) => [
  {
    label: "Name:",
    value: `${userData?.first_name || ""} ${userData?.last_name || ""}`,
  },
  { label: "Provider ID:", value: `CP-${userData?.id || "N/A"}` },
  {
    label: "Last Login:",
    value: userData?.last_login
      ? new Date(userData.last_login).toLocaleString()
      : "N/A",
  },
];

const arrayinfo = (userData: UserInfoProps["userData"]) => [
  {
    label: "Care Provider Assigned:",
    value: userData?.assigned_provider_name || "N/A",
  },
  {
    label: "Conditions:",
    value: userData?.conditions || "Asthma, Hypertension",
  },
];

const history = (userData: UserInfoProps["userData"]) => [
  {
    label: "Last Visit:",
    value: userData?.last_visit || "May 12, 2025",
  },
  {
    label: "Care Provider Assigned:",
    value: userData?.assigned_provider_name || "Dr. Sophia Green",
  },
];

const UserInfo: React.FC<UserInfoProps> = ({ userData, goBack,fetchUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPatientDetailsPage, setShowEditPage] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const contentRef = useRef<HTMLDivElement | null>(null);

  const buildExportData = () => {
    const personal = infoItems(userData).map((i) => ({
      Section: "Personal Information",
      Label: i.label.replace(":", ""),
      Value: i.value ?? "",
    }));

    const clinical = arrayinfo(userData).map((i) => ({
      Section: "Clinical Profile",
      Label: i.label.replace(":", ""),
      Value: i.value ?? "",
    }));

    const appointments = history(userData).map((i) => ({
      Section: "Appointment History",
      Label: i.label.replace(":", ""),
      Value: i.value ?? "",
    }));

    const comments = (userData?.comment ?? []).map((c) => ({
      Section: "Comments",
      CommentID: c.id,
      PostID: c.post_id,
      Status: c.status,
      Content: c.content,
      CreatedAt: new Date(c.created_at).toLocaleString(),
      UpdatedAt: new Date(c.updated_at).toLocaleString(),
    }));

    const flagged = (userData?.post_flag ?? []).map((f) => ({
      Section: "Flagged Posts",
      FlagID: f.id,
      PostID: f.post_id,
      Deleted: String(f.deleted),
      CreatedAt: new Date(f.created_at).toLocaleString(),
      PostTitle: f.post?.title ?? "",
      Community: f.post?.community?.title ?? "",
      ReportReasons: (f.post?.post_report ?? [])
        .map(
          (r) =>
            `${r.report_reason?.name ?? ""}${r.comment ? `: ${r.comment}` : ""}`
        )
        .join(" | "),
    }));

    return { personal, clinical, appointments, comments, flagged };
  };

  const toCSV = (rows: Record<string, any>[]) => {
    if (!rows.length) return "";
    const headers = Array.from(new Set(rows.flatMap((r) => Object.keys(r))));
    const esc = (v: any) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const lines = [
      headers.join(","),
      ...rows.map((r) => headers.map((h) => esc(r[h])).join(",")),
    ];
    return lines.join("\r\n");
  };

  const handleExportPDF = () => {
    const { personal, clinical, appointments, comments, flagged } =
      buildExportData();

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
    personal.forEach((item) => addText(`${item.Label}: ${item.Value}`));

    addText("Clinical Profile");
    clinical.forEach((item) => addText(`${item.Label}: ${item.Value}`));

    addText("Appointment History");
    appointments.forEach((item) => addText(`${item.Label}: ${item.Value}`));

    addText("Comments");
    comments.forEach((item) =>
      addText(`Comment ID: ${item.CommentID} - ${item.Content}`)
    );

    addText("Flagged Posts");
    flagged.forEach((item) =>
      addText(`Post Title: ${item.PostTitle} - Report: ${item.ReportReasons}`)
    );

    doc.save(`Patient_Details_${userData?.id ?? ""}.pdf`);
  };

  const handleExportXLSX = () => {
    const { personal, clinical, appointments, comments, flagged } =
      buildExportData();
    const wb = XLSX.utils.book_new();

    const addSheet = (name: string, data: any[]) => {
      const ws = XLSX.utils.json_to_sheet(
        data.length ? data : [{ Note: "No data" }]
      );
      XLSX.utils.book_append_sheet(wb, ws, name);
    };

    addSheet("Personal Info", personal);
    addSheet("Clinical Profile", clinical);
    addSheet("Appointment History", appointments);
    addSheet("Comments", comments);
    addSheet("Flagged Posts", flagged);

    XLSX.writeFile(wb, `Patient_Details_${userData?.id ?? ""}.xlsx`);
  };

  if (showPatientDetailsPage) {
    return <PatientDetails fetchUser={fetchUser} goBack={setShowEditPage} userData={userData} />;
  }

  return (
    <div ref={contentRef}>
      <div className="flex mt-5 items-baseline gap-2">
        <img
          src={leftarrow}
          alt=""
          className="cursor-pointer"
          onClick={() => goBack(false)}
        />
        <h2 className="text-[25px] space-grotesk font-bold text-[#181D27] font-[Space Grotesk] mb-6">
          Patient Details
        </h2>
      </div>

      <div className="p-5 bg-[#ffffff] rounded-lg mb-5">
        <div className="flex flex-wrap  items-center justify-between mb-7">
          <div className="flex flex-wrap items-center mb-5 gap-4">
            <img 
              src={
                userData?.image
                  ? `${import.meta.env.VITE_APP_API_IMG_URL}${
                      userData.image
                    }`
                  : dummyImage
              }
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = dummyImage;
              }}
              alt={userData?.first_name || "Patient"}
              className="w-[50px] h-[50px] rounded-full object-cover border border-gray-200"
            />

            <div className="mr-2">
              <h4 className="font-bold mb-1 space-grotesk text-[#252525] text-xl leading-tight">
                {userData?.first_name || "Methew"}{" "}
                {userData?.last_name || "Thompson"}
              </h4>
              
            </div>
            <div className={userData?.status=="ACTIVE" ?  ` text-[#067647] border border-[#067647] rounded-[30px] flex items-center justify-center gap-2.5 py-[5px] px-3` : `border border-red-500 !text-red-500 rounded-[30px] flex items-center justify-center gap-2.5 py-[5px] px-3` }>
              <span className="font-medium text-[14px] ">
                {userData.status || "-"}
              </span>
            </div>
          </div>

          <div className="flex items-center  sm:gap-3.5">
        
            <div className="relative" ref={dropdownRef}>
            
              {isOpen && (
                <div className="absolute z-10 top-full left-0 w-[159px] bg-white rounded-[10px] shadow-md p-1.5">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleExportXLSX();
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
              btnClass="flex items-center mt-0 justify-center h-[46px] w-[131px] cursor-pointer bg-[#252525] border border-[#252525] text-white py-[13px] px-4 rounded-lg font-semibold text-sm"
            />
          </div>
        </div>

        <div className="bg-[#FAFAFA] p-6 mb-5 rounded-[10px]">
          <div className="">
            <h4 className="font-bold space-grotesk mb-4">Add Personal Information</h4>
            <User data={infoItems(userData)} />
          </div>
        </div>

        
      </div>

      <UserCommunityPatient userData={userData} />


      <UserComments commentData={userData?.comment || []} />

        <PatientUserFlagged postFlagData={userData.post_flag} />
    </div>
  );
};

export default UserInfo;
