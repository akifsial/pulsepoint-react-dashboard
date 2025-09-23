import React, { useRef, useState } from "react";
import User from "./User";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import PatientDetails from "@components/AdminDashboard/AdminPatient/PatientDetails";
import downarrow from "@assets/media/svgs/downarrow.svg";
import whitearrow from "@assets/media/svgs/whitearrow.svg";
import edit from "@assets/media/svgs/edit.svg";
import leftarrow from "@assets/media/svgs/leftarrow.svg";
import patient from "@assets/media/images/patient.png";
import UserCommunity from "../AdminCare/UserCommunity";
import UserComments from "../AdminCare/UserComments";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import exports from "../../../assets/media/svgs/export.svg";
import PatientUserFlagged from "./PatientUserFlagged";

// Export libs
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import UserCommunityPatient from "../AdminCare/UserCommunityPatient";

interface UserInfoProps {
  userData: {
    id?: string | number;
    first_name?: string;
    last_name?: string;
    // specialization?: string;
    // organization_name?: string;
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
  // { label: "Specialty:", value: userData?.specialization || "N/A" },
  // { label: "Organization:", value: userData?.organization_name || "N/A" },
  // {
  //   label: "Assigned Patients:",
  //   value: userData?.saved_by_patients?.length?.toString() || "0",
  // },
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

  // ✅ ADD: Ref to the content we want to export
  const contentRef = useRef<HTMLDivElement | null>(null);

  // ✅ ADD: Build exportable data from current UI sections
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

  // ✅ ADD: Simple CSV creator
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

  // ✅ ADD: Export handlers for PDF
  const handleExportPDF = () => {
    const { personal, clinical, appointments, comments, flagged } =
      buildExportData();

    const doc = new jsPDF();
    doc.setFontSize(16);

    // Helper function to add text and check if we need to add a page
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

    // Add Personal Information
    addText("Personal Information");
    personal.forEach((item) => addText(`${item.Label}: ${item.Value}`));

    // Add Clinical Profile
    addText("Clinical Profile");
    clinical.forEach((item) => addText(`${item.Label}: ${item.Value}`));

    // Add Appointment History
    addText("Appointment History");
    appointments.forEach((item) => addText(`${item.Label}: ${item.Value}`));

    // Add Comments Section
    addText("Comments");
    comments.forEach((item) =>
      addText(`Comment ID: ${item.CommentID} - ${item.Content}`)
    );

    // Add Flagged Posts Section
    addText("Flagged Posts");
    flagged.forEach((item) =>
      addText(`Post Title: ${item.PostTitle} - Report: ${item.ReportReasons}`)
    );

    // Save the generated PDF
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
            {/* <img src={patient} alt="Methew" className="rounded-[50%]" /> */}
            <img 
              src={
                userData?.image
                  ? `${import.meta.env.VITE_APP_API_IMG_URL}${
                      userData.image
                    }`
                  : dummyImage
              }
              onError={(e) => {
                // Agar broken URL hai to dummy dikhao
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
              {/* <span className="text-base text-[#181D27]/50 leading-tight">
                (Discharged Patient)
              </span> */}
              
            </div>
            <div className={userData?.status=="ACTIVE" ?  ` text-[#067647] border border-[#067647] rounded-[30px] flex items-center justify-center gap-2.5 py-[5px] px-3` : `border border-red-500 !text-red-500 rounded-[30px] flex items-center justify-center gap-2.5 py-[5px] px-3` }>
              <span className="font-medium text-[14px] ">
                {userData.status || "-"}
              </span>
            </div>
          </div>

          <div className="flex items-center  sm:gap-3.5">
            {/* <PrimaryButton
              btnText="Ban User"
              showImg={true}
              onClick={() => setShowEditPage(true)}
              btnClass="flex items-center justify-center h-[46px] w-[159px] cursor-pointer bg-[#F3F3F3] border text-black border-[#25252533] py-[13px] px-4 rounded-lg font-semibold text-sm"
            /> */}
            <div className="relative" ref={dropdownRef}>
              {/* <PrimaryButton
                btnText="Export Table"
                showImg={true}
                img={exports}
                imgClass="w-4 h-4"
                suffixImg={whitearrow}
                suffixImgClass="w-4 h-4"
                onClick={() => setIsOpen(!isOpen)}
                btnClass="flex items-center justify-center gap-[5px] h-[46px] cursor-pointer w-[159px] bg-[#28A2FF] text-white px-4 rounded-lg font-semibold text-sm"
              /> */}
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
        {/* hiding on requirement of backend */}

        {/* <div className="bg-[#FAFAFA] flex items-center justify-between p-6 gap-5 mb-5 rounded-[10px]">
          <div className="max-w-[600px]">
            <h4 className="font-bold mb-4 font-[Space Grotesk]">
              Clinical Profile
            </h4>
            <User data={arrayinfo(userData)} />

            <h4 className="font-bold mb-4 font-[Space Grotesk]">
              Appointment History
            </h4>
            <User data={history(userData)} />
          </div>
        </div> */}
      </div>

      {/* <UserCommunity /> */}
      {/* <UserCommunityPatient /> */}
      <UserCommunityPatient userData={userData} />


      {/* ✅ Dynamic Comments */}
      <UserComments commentData={userData?.comment || []} />

      {/* ✅ Dynamic Flagged Posts */}
      {/* {userData?.post_flag?.length ? ( */}
        <PatientUserFlagged postFlagData={userData.post_flag} />
      {/* // ) : null} */}
    </div>
  );
};

export default UserInfo;
