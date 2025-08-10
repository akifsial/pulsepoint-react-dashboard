import React, { useState } from "react";
import TanDataTable from "@components/Dashboard-components/Tanstack-data-table/TanDataTable";
import DropdownActions from "@components/Dashboard-components/Dropdown-actions/DropdownActions";
import filterIcon from "@assets/media/svgs/dashboard-svgs/filter-icon.svg";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
// import { AnimatePresence, motion } from "framer-motion";
// import RatingFilterDropdown from "@components/Dashboard-components/Dropdowns/RatingFilterDropdown";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import searchIcon from "@assets/media/svgs/patient-db-svgs/search-icon.svg";
import CommonInput from "@components/Shared-components/Inputs/Common-Input/CommonInput";
import { TanDataTableColumn } from "@components/Dashboard-components/Tanstack-data-table/types";
import ViewCommunity from "./ViewCommunity";
import Model from "@components/Model/Model";
import DeletePost from "./DeletePost";
import forwardarrow from "@assets/media/svgs/dashboard-svgs/arrow-forward-white.svg"

const ForumTable: React.FC = () => {
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<dataTypes | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  type dataTypes = {
    id?: number;
    first_name?: string;
    first_name1?: string;
    second_name?: string;
    email1?: string;
    content?: string;
    post?: string;
    type?: string;
    date?: string;
    reviews?: string;
    status?: string;
    patient?: number;
    rating?: number | string | React.ReactNode;
    email?: string;
    image?: string;
    actions?: string;
  };

  const columns: TanDataTableColumn<dataTypes>[] = [
    {
      accessor: "post",
      header: "Post ID",
      showSort: true,
    },
    {
      accessor: "first_name",
      header: "Community Name",
      showSort: true,
      cell: ({ row }) => {
        const { first_name } = row.original;
        return (
          <div className="flex items-center gap-3">
            <img
              src={dummyImage}
              alt={`${first_name}`}
              className="w-[38px] h-[38px] rounded-full object-cover border border-gray-200"
            />
            <div className="flex flex-col">
              <span className="font-medium text-sm text-[#252525] leading-tight">
                {first_name}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessor: "first_name1",
      header: "Posted By",
      showSort: true,
      cell: ({ row }) => {
        const { first_name1, second_name, email } = row.original;
        return (
          <div className="flex items-center gap-3">
            <img
              src={dummyImage}
              alt={`${first_name1}`}
              className="w-[38px] h-[38px] rounded-full object-cover border border-gray-200"
            />
            <div className="flex flex-col">
              <span className="font-medium text-sm text-[#252525] leading-tight">
                {first_name1}
              </span>
              <span className="text-xs text-gray-500 leading-tight">
                {second_name}
              </span>
              <span className="text-xs text-gray-500 leading-tight">
                {email}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessor: "content",
      header: "Content Preview",
      showSort: true,
    },
    {
      accessor: "type",
      header: "Type",
      showSort: true,
    },
    {
      accessor: "date",
      header: "Date Posted",
      showSort: true,
    },
    {
      accessor: "status",
      header: "Status",
      showSort: true,
      cell: ({ row }) => {
        const status = row.original.status?.toLowerCase();
        const statusStyles = {
          pending: "text-[#067647] border-[1.5px] border-[#079455]",
          approved: "text-[blue] border-[1.5px] border-[blue]",
          flagged: "text-[#C22E00] border-[1.5px] border-[#C22E00]",
        };

        return (
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              statusStyles[status as keyof typeof statusStyles] || "bg-gray-200 text-gray-700"
            }`}
          >
            {status?.charAt(0).toUpperCase() + status?.slice(1)}
          </span>
        );
      },
    },
  ];

  const data: dataTypes[] = [
    {
      id: 1,
      post: "CM - 01",
      first_name: "Alzheimer’s Support",
      first_name1: "Savannah Nguyen",
      second_name: "(Patient)",
      content: "“Feeling anxious lately...”",
      type: "Post",
      date: "9/4/12",
      status: "Pending"
    },
    {
      id: 2,
      post: "CM - 02",
      first_name: "Stroke Rehab Tips",
      first_name1: "Kristin Watson",
      second_name: "(Patient)",
      content: "“Here are 5 daily tips...”",
      type: "Comment",
      date: "5/7/16",
      status: "Approved"
    },
    {
      id: 3,
      post: "CM - 03",
      first_name: "Family Caregivers",
      first_name1: "Brooklyn Simmons",
      second_name: "(Patient)",
      content: "“Is turmeric helpful?”",
      type: "Comment",
      date: "10/6/13",
      status: "Flagged"
    },
    {
      id: 4,
      post: "CM - 04",
      first_name: "Memory Boosting",
      first_name1: "Arlene McCoy",
      second_name: "(Patient)",
      content: "“Mindfulness exercises that work.”",
      type: "Post",
      date: "2/11/12",
      status: "Pending"
    },
    {
      id: 5,
      post: "CM - 05",
      first_name: "Eleanor Pena",
      first_name1: "Eleanor Pena",
      email: "michelle.rivera@example.com",
      content: "“Mindfulness exercises that work.”",
      type: "Report",
      date: "3/4/16",
      status: "Pending"
    },
    {
      id: 6,
      post: "CM - 06",
      first_name: "Jenny Wilson",
      first_name1: "Jenny Wilson",
      email: "curtis.weaver@example.com",
      content: "“The benefits of journaling.”",
      type: "Save",
      date: "16/5/24",
      status: "Approved"
    },
    {
      id: 7,
      post: "CM - 07",
      first_name: "Ralph Edwards",
      first_name1: "Ralph Edwards",
      email: "dolores.chambers@example.com",
      content: "“Finding support and community.”",
      type: "Like",
      date: "11/2/25",
      status: "Approved"
    },
  ];

  const handleRowSelect = (row: dataTypes) => {
  };

  return (
    <div className="mb-10">
      {selectedCommunity ? (
        <ViewCommunity
          community={selectedCommunity}
          goBack={ setSelectedCommunity}
        />
      ) : (
        <>
          <h2 className="font-space-grotesk font-bold text-heading leading-8 text-brand-ink">
            Forum Moderation
          </h2>

          <div className="mt-6 bg-white rounded-[10px] px-4 py-6">
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
              <h3 className="mb-3 md:mb-0">Patients’ Details</h3>

              <div className="flex items-center">
                 <CommonInput
              placeholder="Search by Name, Email, or ID"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              showImg={true}
              imgSrc={searchIcon}
              imgLeft={true}
              inputClassName="text-sm"
              containerClassName="rounded-[10px]"
            />
                <span className="text-sm font-medium w-full text-center">
                  Filter By
                </span>
                 <PrimaryButton
                  btnText="Ratings"
                  showImg={true}
                  imgClass="w-[24px] h-[24px] object-cover"
                  img={filterIcon}
                  imgPosition="left"
                  btnClass="border border-[#252525] px-4  h-[44px] w-full py-[10px] rounded-lg text-[#252525] text-sm font-medium"
                  onClick={() => setShowRatingDropdown(!showRatingDropdown)}
                />
              </div>
            </div>

            <TanDataTable<dataTypes>
              columns={columns}
              data={data}
              showCheckbox={true}
              onRowSelect={handleRowSelect}
              showActions={true}
              actions={(row) => (
                <DropdownActions
                  onView={() => setSelectedCommunity(row)}
                  onEdit={() => console.log("Approve Post", row.id)}
                  onFlag={() => console.log("Flag Post", row.id)}
                  onDelete={() => setShowDeleteModal(true)}
                  variant="simple"
                />
              )}
            />
          </div>
        </>
      )}

      {showDeleteModal && (
        <Model setIsOpen={setShowDeleteModal} className="max-w-[488px]">
          <DeletePost />
        </Model>
      )}
    </div>
  );
};

export default ForumTable;
