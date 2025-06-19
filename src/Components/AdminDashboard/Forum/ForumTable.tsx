import React, { useState } from "react";
import TanDataTable from "@components/Dashboard-components/Tanstack-data-table/TanDataTable";
import DropdownActions from "@components/Dashboard-components/Dropdown-actions/DropdownActions";
import filterIcon from "@assets/media/svgs/dashboard-svgs/filter-icon.svg";
import ForwardArrow from "@assets/media/svgs/dashboard-svgs/arrow-forward-white.svg";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import { AnimatePresence, motion } from "framer-motion";
import RatingFilterDropdown from "@components/Dashboard-components/Dropdowns/RatingFilterDropdown";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import searchIcon from "@assets/media/svgs/patient-db-svgs/search-icon.svg";
import CommonInput from "@components/Shared-components/Inputs/Common-Input/CommonInput";
import { TanDataTableColumn } from "@components/Dashboard-components/Tanstack-data-table/types";

const ForumTable: React.FC = () => {
  const [showRatingDropdown, setShowRatingDropdown] = React.useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "saved">("all");

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
    actions?: string
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
      cell: ({ row }: { row: { original: dataTypes } }) => {
        const { first_name} = row.original;
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
      accessor: "first_name1",
      header: "Posted By",
      showSort: true,
      cell: ({ row }: { row: { original: dataTypes } }) => {
        const { first_name1, second_name, email } = row.original;
        return (
          <div className="flex items-center gap-3">
            <img
              src={dummyImage}
              alt={`${first_name1} `}
              className="w-[38px] h-[38px] rounded-full object-cover border border-gray-200"
            />
            <div className="flex flex-col">
              <span className="font-medium text-sm text-[#252525] leading-tight">
                {first_name1}
              </span>
              <span className="text-xs text-gray-500 font-regular leading-tight">
                {second_name}
              </span>
              <span className="text-xs text-gray-500 font-regular leading-tight">
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
      cell: ({ row }: { row: { original: dataTypes } }) => {
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
      image: dummyImage,
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
      image: dummyImage,
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
      image: dummyImage,
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
      image: dummyImage,
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
      image: dummyImage,
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
      image: dummyImage,
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
      image: dummyImage,
      content: "“Finding support and community.”",
      type: "Like",
      date: "11/2/25",
      status: "Approved"
    },
  ];

  const handleRowSelect = (row: dataTypes) => {
    console.log("Selected row:", row);
  };

  // const renderActions = (row: dataTypes) => (
  //   <button onClick={() => alert(`Edit ${row.first_name} ${row.last_name}`)}>
  //     Edit
  //   </button>
  // );

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
        Forum Moderation
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
                  btnClass="border border-[#252525] px-4 md:w-[101px] w-full py-[10px] rounded-[10px] text-[#252525] text-sm font-medium"
                  onClick={() => setShowRatingDropdown(!showRatingDropdown)}
                />
                <PrimaryButton
                  btnText="View All Listing"
                  btnTextClass="text-[#FFFFFF] text-sm font-semibold"
                  showImg={true}
                  imgClass="w-[14px] h-[13px] object-cover"
                  img={ForwardArrow}
                  imgPosition="right"
                  btnClass="border border-[#252525] px-4 py-3 md:w-[180px] w-full rounded-[10px] bg-[#000000]"
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
                actions={(row) => (
                  <DropdownActions
                    onView={() => console.log("View Detail", row.id)}
                    onEdit={() => console.log("Approve Post", row.id)}
                    onFlag={() => console.log("Flag Post", row.id)}
                    onDelete={() => console.log("Delete Post", row.id)}
                    variant="simple"
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
                actions={(row) => (
                  <DropdownActions
                    onView={() => console.log("View Detail", row.id)}
                    onEdit={() => console.log("Approve Post", row.id)}
                    onFlag={() => console.log("Flag Post", row.id)}
                    onDelete={() => console.log("Delete Post", row.id)}
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

export default ForumTable;