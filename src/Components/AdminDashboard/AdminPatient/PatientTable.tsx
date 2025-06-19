import React, { useState } from "react";
import TanDataTable from "@components/Dashboard-components/Tanstack-data-table/TanDataTable";
import DropdownActions from "@components/Dashboard-components/Dropdown-actions/DropdownActions";
import filterIcon from "@assets/media/svgs/dashboard-svgs/filter-icon.svg";
// import ForwardArrow from "@assets/media/svgs/dashboard-svgs/arrow-forward-white.svg";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import { AnimatePresence, motion } from "framer-motion";
import RatingFilterDropdown from "@components/Dashboard-components/Dropdowns/RatingFilterDropdown";
// import RatingStars from "@components/Shared-components/RatingStars";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import alice from "@assets/media/images/dashboard-images/alice.svg";
import searchIcon from "@assets/media/svgs/patient-db-svgs/search-icon.svg";
import exports from "@assets/media/svgs/export.svg"
import whitearrow from "@assets/media/svgs/whitearrow.svg"
import CommonInput from "@components/Shared-components/Inputs/Common-Input/CommonInput";
import { TanDataTableColumn } from "@components/Dashboard-components/Tanstack-data-table/types";

const CareProviderDashboard: React.FC = () => {
  const [showRatingDropdown, setShowRatingDropdown] = React.useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "saved">("all");

  type dataTypes = {
    id?: number;
    first_name?: string;
    // last_name?: string;
    date?: string;
    email?: string;
    image?: string;
    // rating?: number | string | React.ReactNode;
    reviews?: string;
    lastdate?: string;
    status?: string;
    // specialization?: string;
    // location?: string;
  };


  const columns: TanDataTableColumn<dataTypes>[] = [
    {
      accessor: "first_name",
      header: "Provider’s Name",
      showSort: true,
      cell: ({ row }: { row: { original: dataTypes } }) => {
        const { first_name,  email } = row.original;
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
              <span className="text-xs text-gray-500 leading-tight">
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
  ];

  const data: dataTypes[] = [
    {
      id: 1,
      first_name: "Savannah Nguyen",
      date: "9/04/12",
      reviews:
        "Staff was caring and responsive, though the wait time could be improved.",
      lastdate: "9/4/12",
      email: "nevaeh.simmons@gmail.com",
      image: alice,
      status: "Active",
    },
    {
      id: 2,
      first_name: "Kristin Watson",
      date: "5/7/16",
      email: "alma.lawson@example.com",
      reviews:
        "“Excellent support for my mother with  dementia. Highly recommended.”",
      lastdate: "9/4/12",
      image: "/images/michael.png",
      status: "Inactive",
    },
    {
      id: 3,
      first_name: "Brooklyn Simmons",
      date: "10/6/13",
      email: "deanna.curtis@example.com",
      reviews:
        "“Facilities are clean and staff is friendly.  A bit pricey, but worth it.",
      lastdate: "9/4/12",
      image: "/images/michael.png",
      status: "Active",
    },
    {
      id: 4,
      first_name: "Arlene McCoy",
      date: "2/11/12",
      email: "tanya.hill@example.com",
      reviews:
        "“Great amenities and staff. Rooms were  spacious and bright.”",
      lastdate: "9/4/12",
      image: "/images/michael.png",
      status: "Inactive",
    },
    {
      id: 5,
      first_name: "Eleanor Pena",
      date: "3/4/16",
      email: "michelle.rivera@example.com",
      reviews:
        "“Compassionate end-of-life care. They  made a difficult time easier.",
      lastdate: "9/4/12",
      image: "/images/michael.png",
      status: "Active",
    },
    {
      id: 6,
      first_name: "Jenny Wilson",
      date: "8/15/14",
      email: "michelle.rivera@example.com",
      reviews:
        "“The food quality was inconsistent, but  the overall experience was positive.”",
      lastdate: "9/4/12",
      image: "/images/michael.png",
      status: "Active",
    },
    {
      id: 7,
      first_name: "Ralph Edwards",
      date: "11/22/15",
      email: "dolores.chambers@example.com",
      reviews:
        "“They offered a variety of activities that kept my father engaged. ",
      lastdate: "9/4/12",
      image: "/images/michael.png",
      status: "Active",
    },
  ];

  const handleRowSelect = (row: dataTypes) => {
    console.log("Selected row:", row);
  };

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
      <h2
        className="
      font-space-grotesk
      font-bold
      text-heading
      leading-8
      tracking-normal
      text-brand-ink
      align-middle
    "
      >
        Patients List
      </h2>
      <div className="mt-6 bg-[#FFFFFF] rounded-[10px] px-4 py-6 mb-6">
        <div className="mb-6 flex md:flex-row flex-col md:items-center md:justify-between">
          <h3 className="md:mb-0 mb-3">Patients’ Details</h3>
          {/* searchbar */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end px-5">
            <CommonInput
              placeholder="Search with Provider name , zip code"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              showImg={true}
              imgSrc={searchIcon}
              imgLeft={true}
              inputClassName="text-sm"
              containerClassName="w-full max-w-sm"
            />
          </div>
          <div className="flex md:flex-row flex-col md:items-center md:gap-4 gap-3">
            <p className="text-[#252525] font-medium text-sm">Filter by</p>
            <div className="relative">
              <div className="flex items gap-4">
                <PrimaryButton
                  btnText="Ratigs"
                  showImg={true}
                  imgClass="w-[24px] h-[24px] object-cover"
                  img={filterIcon}
                  imgPosition="left"
                  btnClass="border border-[#252525] px-4 md:w-[101px] w-full py-[10px] h-[44px]  rounded-[10px] text-[#252525] text-sm font-medium"
                  onClick={() => setShowRatingDropdown(!showRatingDropdown)}
                />
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
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div>
          {activeTab === "all" ? (
            <TanDataTable<dataTypes>
              columns={columns}
              data={data}
              showCheckbox={true}
              onRowSelect={handleRowSelect}
              showActions={true}
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
              showActions={true}
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

export default CareProviderDashboard;
