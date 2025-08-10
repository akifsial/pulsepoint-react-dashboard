

import React, { useState } from "react";
import TanDataTable from "@components/Dashboard-components/Tanstack-data-table/TanDataTable";
import DropdownActions from "@components/Dashboard-components/Dropdown-actions/DropdownActions";
// import filterIcon from "@assets/media/svgs/dashboard-svgs/filter-icon.svg";
// import ForwardArrow from "@assets/media/svgs/dashboard-svgs/arrow-forward-white.svg";
// import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
// import { AnimatePresence, motion } from "framer-motion";
// import RatingFilterDropdown from "@components/Dashboard-components/Dropdowns/RatingFilterDropdown";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
// import searchIcon from "@assets/media/svgs/patient-db-svgs/search-icon.svg";
// import CommonInput from "@components/Shared-components/Inputs/Common-Input/CommonInput";
import { TanDataTableColumn } from "@components/Dashboard-components/Tanstack-data-table/types";

const UserTable: React.FC = () => {
  const [showRatingDropdown, setShowRatingDropdown] = React.useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "saved">("all");

  type dataTypes = {
    id?: number;
    first_name?: string;
    date?: string;
    reviews?: string;
    status?: string;
    email?: string;
    lastdate?: string;
    image?: string;
    actions?: string
  };

  const columns: TanDataTableColumn<dataTypes>[] = [
    {
      accessor: "first_name",
      header: "Provider's Name",
      showSort: true,
      cell: ({ row }: { row: { original: dataTypes } }) => {
        const { first_name, email} = row.original;
        return (
          <div className="flex items-center gap-3">
            <img
              src={dummyImage}
              alt={`${first_name} `}
              className="w-[38px] h-[38px] rounded-full object-cover border border-gray-200"
            />
            <div className="flex flex-col">
              <span className="font-medium text-sm text-[#252525] leading-tight">
                {first_name}
              </span>
              <span className="text-xs text-gray-500 leading-tight hover:underline">
                {email}
              </span>
            </div>
          </div>
        );
      },
    },
     {
      accessor: "date",
      header: "Registered Date",
      showSort: true,
    },
    {
      accessor: "reviews",
      header: "Reviews",
      showSort: true,
    },
    {
      accessor: "lastdate",
      header: "Last Visit Date",
      showSort: true,
    },
     {
      accessor: "status",
      header: "Status",
      showSort: true,
      cell: ({ row }: { row: { original: dataTypes } }) => {
        const status = row.original.status?.toLowerCase();
        const statusStyles = {
          active: "text-[#067647] border-[1.5px] border-[#079455]",
          inactive: "text-[#C22E00] border-[1.5px] border-[#C22E00]",
        };

        return (
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              statusStyles[status as "active" | "inactive"] ||
              "bg-gray-200 text-gray-700"
            }`}
          >
            {status?.charAt(0).toUpperCase() + status?.slice(1)}
          </span>
        );
      },
    },
//      {
//       accessor: "status",
//       header: "Status",
//       showSort: true,
//       cell: ({ row }: { row: { original: dataTypes } }) => {
//         const status = row.original.status?.toLowerCase();
//         const statusStyles = {
//           pending: "text-[#067647] border-[1.5px] border-[#079455]",
//           approved: "text-[blue] border-[1.5px] border-[blue]",
//           flagged: "text-[#C22E00] border-[1.5px] border-[#C22E00]",
//         };

//         return (
//           <span
//   className={`text-xs font-medium px-3 py-1 rounded-full ${
//     statusStyles[status as keyof typeof statusStyles] || "bg-gray-200 text-gray-700"
//   }`}
// >
//   {status?.charAt(0).toUpperCase() + status?.slice(1)}
// </span>

//         );
//       },
//     },
  ];

  const data: dataTypes[] = [
    {
      id: 1,   
      first_name: "Savannah Nguyen",
      email: "nevaehsimmsons@gmail.com",
      date: "9/4/12",
      reviews: "Staff was caring and responsive, though the wait time could be improved",
      lastdate: "9/4/12",
      status: "Active"
    },
    {
      id: 2,   
      first_name: "Stroke Rehab Tips",
      email: "nevaehsimmsons@gmail.com",
      date: "9/4/12",
      reviews: "Staff was caring and responsive, though the wait time could be improved",
      lastdate: "9/4/12",
      status: "Inactive"
    },
    {
      id: 3,   
      first_name: "Stroke Rehab Tips",
      email: "nevaehsimmsons@gmail.com",
      date: "9/4/12",
      reviews: "Staff was caring and responsive, though the wait time could be improved",
      lastdate: "9/4/12",
      status: "Active"
    },
  ];

  const handleRowSelect = (row: dataTypes) => {
  };


  const handleTabClick = (tab: "all" | "saved") => {
    setActiveTab(tab);
  };
  const [searchText, setSearchText] = React.useState<string>("");

  return (
    <div className="mb-10">
     
      <div className=" bg-[#FFFFFF] rounded-[10px] px-4 py-6 mb-6">
        <div className=" flex md:flex-row flex-col md:items-center md:justify-between">
          <h3 className="mb-3 font-space-grotesk">Added Patients</h3>
        </div>
        <div>
          {activeTab === "all" ? (
            <TanDataTable<dataTypes>
              columns={columns}
              data={data}
              showCheckbox={false}
              onRowSelect={handleRowSelect}
              showActions={true}
              className="my-custom-class"
              actions={(row) => (
                <DropdownActions
                  onView={() => console.log("View Detail", row.id)}
                  onEdit={() => console.log("Edit Detail", row.id)}
                  onDelete={() => console.log("Delete Provider", row.id)}
                  variant="simple"
                />
              )}
            />
          ) : (
            <TanDataTable<dataTypes>
              columns={columns}
              data={data.slice(0, 3)}
              showCheckbox={false}
              onRowSelect={handleRowSelect}
              showActions={true}
              className="my-custom-class"
              actions={(row) => (
                <DropdownActions
                  onView={() => console.log("View Detail", row.id)}
                  onEdit={() => console.log("Edit Detail", row.id)}
                  onDelete={() => console.log("Delete Provider", row.id)}
                  variant="simple"
                />
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTable;