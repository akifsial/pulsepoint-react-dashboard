import React, { useState } from "react";
import TanDataTable from "@components/Dashboard-components/Tanstack-data-table/TanDataTable";
import DropdownActions from "@components/Dashboard-components/Dropdown-actions/DropdownActions";
import filterIcon from "@assets/media/svgs/dashboard-svgs/filter-icon.svg";
// import ForwardArrow from "@assets/media/svgs/dashboard-svgs/arrow-forward-white.svg";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import { AnimatePresence, motion } from "framer-motion";
import RatingFilterDropdown from "@components/Dashboard-components/Dropdowns/RatingFilterDropdown";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import whitearrow from "@assets/media/svgs/whitearrow.svg";
import exports from "@assets/media/svgs/export.svg";
import searchIcon from "@assets/media/svgs/patient-db-svgs/search-icon.svg";
import CommonInput from "@components/Shared-components/Inputs/Common-Input/CommonInput";
import { TanDataTableColumn } from "@components/Dashboard-components/Tanstack-data-table/types";
import UserInfo from "./UserInfo";

const CareProviderDashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);
  const [selectedUser, setSelectedUser] = useState<dataTypes | false>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [isExportOpen, setIsExportOpen] = useState(false);

  

  type dataTypes = {
    id?: number;
    first_name?: string;
    role?: string;
    communities?: string;
    patient?: number;
    rating?: number | string | React.ReactNode;
    status?: string;
    email?: string;
    image?: string;
  };

  const columns: TanDataTableColumn<dataTypes>[] = [
    {
      accessor: "first_name",
      header: "Provider’s Name",
      showSort: true,
      cell: ({ row }: { row: { original: dataTypes } }) => {
        const { first_name, email, image } = row.original;
        return (
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setSelectedUser(row.original)}
          >
            <img
              src={image}
              alt={first_name}
              className="w-[38px] h-[38px] rounded-full object-cover border border-gray-200"
            />
            <div className="flex flex-col">
              <span className="font-medium text-sm text-[#252525] leading-tight hover:underline">
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
      accessor: "role",
      header: "Role/Specialty",
      showSort: true,
    },
    {
      accessor: "communities",
      header: "Communities",
      showSort: true,
    },
    {
      accessor: "patient",
      header: "Patient Assigned",
      showSort: true,
    },
    {
      accessor: "rating",
      header: "Avg. Rating",
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
      first_name: "Savannah Nguyen",
      email: "nevaeh.simmons@example.com",
      role: "Pulmonologist",
      image: dummyImage,
      communities: "COPD, Asthma Care",
      patient: 76,
      rating: "★ 4.8",
      status: "Active",
    },
    {
      id: 2,
      first_name: "Kristin Watson",
      email: "alma.lawson@example.com",
      role: "RN – Pediatrics",
      image: dummyImage,
      communities: "Child Health Hub",
      patient: 98,
      rating: "★ 4.2",
      status: "Inactive",
    },
    {
      id: 3,
      first_name: "Brooklyn Simmons",
      email: "deanna.curtis@example.com",
      role: "Psychologist",
      image: dummyImage,
      communities: "Mental Wellness",
      patient: 35,
      rating: "★ 4.6",
      status: "Active",
    },
    {
      id: 4,
      first_name: "Arlene McCoy",
      email: "tanya.hill@example.com",
      role: "Cardiologist",
      image: dummyImage,
      communities: "Mental Health Support",
      patient: 34,
      rating: "★ 4.6",
      status: "Inactive",
    },
    {
      id: 5,
      first_name: "Eleanor Pena",
      email: "michelle.rivera@example.com",
      role: "Physiotherapist",
      image: dummyImage,
      communities: "Senior Wellness Program",
      patient: 89,
      rating: "★ 4.6",
      status: "Active",
    },
    {
      id: 6,
      first_name: "Jenny Wilson",
      email: "curtis.weaver@example.com",
      role: "Therapist",
      image: dummyImage,
      communities: "Women's Health Initiatives",
      patient: 23,
      rating: "★ 4.6",
      status: "Inactive",
    },
  ];

  const handleRowSelect = (row: dataTypes) => {
  };

  const handleTabClick = (tab: "all" | "saved") => {
    setActiveTab(tab);
  };

  return (
    <div className="mb-10">
      {!selectedUser && (
        <h2 className="font-space-grotesk font-bold text-heading leading-8 tracking-normal text-brand-ink">
          Care Provider Listing
        </h2>
      )}
      <div
        className={` mt-6 rounded-[10px] px-4 py-6 mb-6 ${
          selectedUser ? "" : "bg-white"
        }`}
      >
        {selectedUser ? (
          <UserInfo user={selectedUser} goBack={setSelectedUser} />
        ) : (
          <>
            <div className="mb-6 flex md:flex-row flex-col md:items-center md:justify-between">
              <h3 className="md:mb-0 mb-3">Care Providers</h3>

              <div className="hidden lg:flex lg:flex-1 lg:justify-end px-5">
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
              </div>

              <div className="flex md:flex-row flex-col md:items-center md:gap-4 gap-3">
            <p className="text-[#252525] font-medium text-sm">Filter by</p>
            <div className="relative">
              <div className="relative">
              <div className="flex items gap-4">
                <PrimaryButton
                  btnText="Ratings"
                  showImg={true}
                  imgClass="w-[24px] h-[24px] object-cover"
                  img={filterIcon}
                  imgPosition="left"
                  btnClass="border border-[#252525] px-4 md:w-[101px] h-[44px] w-full py-[10px] rounded-lg text-[#252525] text-sm font-medium"
                  onClick={() => setShowRatingDropdown(!showRatingDropdown)}
                />
                <PrimaryButton
                  btnText="Export Table"
                  showImg={true}
                  img={exports}
                  imgClass="w-4 h-4"
                  suffixImg={whitearrow}
                  suffixImgClass="w-4 h-4"
                  onClick={() => setIsExportOpen(!isExportOpen)}
                  btnClass="flex items-center justify-center gap-[5px] h-[46px] cursor-pointer w-[159px] bg-[#28A2FF] text-white px-4 rounded-lg font-semibold text-sm"
                />
              </div>
              <AnimatePresence>
                {showRatingDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 top-[60px] w-50 z-50"
                  >
                    <RatingFilterDropdown />
                  </motion.div>
                )}
                {isExportOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-[60px] left-[120px] bg-white  shadow-md rounded-lg p-4 z-50"
                  >
                    <div className="flex flex-col gap-2 w-full">
                      <button className="text-sm text-black  mb-2.5">Export as CSV</button>
                      <button className="text-sm text-black ">Export AS Pdf</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            </div>
          </div>
            </div>

            {/* {activeTab === "all" ? (
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
                    onView={() => console.log("View Details", row.id)}
                    onEdit={() => console.log("Approve Post", row.id)}
                    onFlag={() => console.log("Flag Post", row.id)}
                    onDelete={() => console.log("Delete Post", row.id)}
                    variant="simple"
                  />
                )}
              />
            )} */}
             <div>
              <TanDataTable<dataTypes>
              columns={columns}
              data={data}
              showCheckbox={true}
              onRowSelect={handleRowSelect}
              showActions={true}
              actions={(row) => (
                <DropdownActions
                  onView={() => setSelectedCommunity(row)}
                  onEdit={() => console.log("Edit Detail", row.id)}
                  onDelete={() => setShowDeleteModal(true)}
                  variant="simple"
                />
              )}
            />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CareProviderDashboard;
