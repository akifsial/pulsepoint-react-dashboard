import React, { useState } from "react";
import TanDataTable from "@components/Dashboard-components/Tanstack-data-table/TanDataTable";
import DropdownActions from "@components/Dashboard-components/Dropdown-actions/DropdownActions";
// import filterIcon from "@assets/media/svgs/dashboard-svgs/filter-icon.svg";
// import ForwardArrow from "@assets/media/svgs/dashboard-svgs/arrow-forward-white.svg";
// import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
// import { AnimatePresence, motion } from "framer-motion";
// import RatingFilterDropdown from "@components/Dashboard-components/Dropdowns/RatingFilterDropdown";
// import RatingStars from "@components/Shared-components/RatingStars";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import alice from "@assets/media/images/dashboard-images/alice.svg";
// import searchIcon from "@assets/media/svgs/patient-db-svgs/search-icon.svg";
// import CommonInput from "@components/Shared-components/Inputs/Common-Input/CommonInput";
import { TanDataTableColumn } from "@components/Dashboard-components/Tanstack-data-table/types";

const UserCommunity: React.FC = () => {
  const [showRatingDropdown, setShowRatingDropdown] = React.useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "saved">("all");

  type dataTypes = {
    id?: number;
    first_name?: string;
    role?: string;
    image?: string;
    lastdate?: string;
    status?: string;
  };

  const columns: TanDataTableColumn<dataTypes>[] = [
    {
      accessor: "first_name",
      header: "Provider’s Name",
      showSort: true,
      cell: ({ row }: { row: { original: dataTypes } }) => {
        const { first_name } = row.original;
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
            </div>
          </div>
        );
      },
    },
    {
      accessor: "role",
      header: "Role",
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
  ];

  const data: dataTypes[] = [
    {
      id: 1,
      first_name: "Anxiety & Stress Support",
      lastdate: "9/4/12",
      role: "Member",
      image: alice,
      status: "Active",
    },
    {
      id: 2,
      first_name: "Anxiety & Stress Support",
      lastdate: "9/4/12",
      role: "Contributor",
      image: alice,
      status: "Inactive",
    },
    {
      id: 3,
      first_name: "Anxiety & Stress Support",
      lastdate: "9/4/12",
      role: "Member",
      image: alice,
      status: "Active",
    },
  ];

  const handleRowSelect = (row: dataTypes) => {};

  const renderActions = (row: dataTypes) => (
    <button onClick={() => alert(`Edit ${row.first_name} ${row.last_name}`)}>
      Edit
    </button>
  );

  const handleTabClick = (tab: "all" | "saved") => {
    setActiveTab(tab);
  };
  const [searchText, setSearchText] = React.useState<string>("");

  return (
    <div className="mb-10">
      <div className="mt-6 bg-[#FFFFFF] rounded-[10px] px-4 py-6 mb-6">
        <div className="mb-6 flex md:flex-row flex-col md:items-center md:justify-between">
          <h3 className="md:mb-0 mb-3 font-space-grotesk">
            Community Participation
          </h3>
        </div>
        <div>
          {activeTab === "all" ? (
            <TanDataTable<dataTypes>
              columns={columns}
              data={data}
              showCheckbox={true}
              onRowSelect={handleRowSelect}
              showActions={false}
              className="my-custom-class"
              actions={(row) => (
                <DropdownActions
                  onView={() => console.log("View Detail", row.id)}
                  onEdit={() => console.log("Edit", row.id)}
                  onDelete={() => console.log("Delete", row.id)}
                />
              )}
            />
          ) : (
            <TanDataTable<dataTypes>
              columns={columns}
              data={data.slice(0, 3)}
              showCheckbox={true}
              onRowSelect={handleRowSelect}
              showActions={false}
              className="my-custom-class"
              actions={(row) => (
                <DropdownActions
                  onView={() => console.log("View Detail", row.id)}
                  onEdit={() => console.log("Edit", row.id)}
                  onDelete={() => console.log("Delete", row.id)}
                />
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCommunity;
