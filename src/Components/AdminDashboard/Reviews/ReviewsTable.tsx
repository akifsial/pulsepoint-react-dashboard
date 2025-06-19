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

const ReviewsTable: React.FC = () => {
  const [showRatingDropdown, setShowRatingDropdown] = React.useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "saved">("all");

  type dataTypes = {
    id?: number;
    first_name?: string;
    first_name1?: string;
    email1?: string;
    reviewed?: string;
    reviews?: string;
    patient?: number;
    rating?: number | string | React.ReactNode;
    email?: string;
    image?: string;
  };

  const columns: TanDataTableColumn<dataTypes>[] = [
    {
      accessor: "reviewed",
      header: "Review ID",
      showSort: true,
    },
    {
      accessor: "first_name",
      header: "Provider’s Name",
      showSort: true,
      cell: ({ row }: { row: { original: dataTypes } }) => {
        const { first_name, email } = row.original;
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
      accessor: "first_name1",
      header: "Patient’s Name",
      showSort: true,
      cell: ({ row }: { row: { original: dataTypes } }) => {
        const { first_name1, email1 } = row.original;
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
              <span className="text-xs text-gray-500 leading-tight">
                {email1}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessor: "rating",
      header: "Rating",
      showSort: true,
    },
    {
      accessor: "reviews",
      header: "Reviews",
      showSort: true,
      cell: ({ row }: { row: { original: dataTypes } }) => (
  <div className="w-[225px] whitespace-normal break-words text-sm text-gray-700">
    {row.original.reviews}
  </div>
)

    },
  ];

  const data: dataTypes[] = [
    {
      id: 1,
      reviewed: "RV - 01",
      first_name: "Savannah Nguyen",
      email: "nevaeh.simmons@gmail.com",
      first_name1: "Savannah Nguyen",
      email1: "nevaeh.simmons@gmail.com",
      image: dummyImage,
      rating: " ⭐ ⭐ ⭐ ⭐ ⭐",
      reviews:
        "“Staff was caring and responsive, though the wait time could be improved.”",
    },
    {
      id: 2,
      reviewed: "RV - 02",
      first_name: "Kristin Watson",
      email: "alma.lawson@example.com",
      first_name1: "Kristin Watson",
      email1: "alma.lawson@example.com",
      image: dummyImage,
      rating: " ⭐ ⭐ ⭐ ⭐☆",
      reviews:
        "“Excellent support for my mother with dementia. Highly recommended.”",
    },
    {
      id: 3,
      reviewed: "RV - 03",
      first_name: "Brooklyn Simmons",
      email: "deanna.curtis@example.com",
      first_name1: "Brooklyn Simmons",
      email1: "deanna.curtis@example.com",
      image: dummyImage,
      rating: " ⭐ ⭐ ⭐ ⭐☆",
      reviews:
        "“Facilities are clean and staff is friendly. A bit pricey, but worth it.",
    },
    {
      id: 4,
      reviewed: "RV - 04",
      first_name: "Arlene McCoy",
      email: "tanya.hill@example.com",
      first_name1: "Arlene McCoy",
      email1: "tanya.hill@example.com",
      image: dummyImage,
      rating: " ⭐ ⭐ ⭐ ☆ ☆",
      reviews: "“Great amenities and staff. Rooms were spacious and bright.”",
    },
    {
      id: 5,
      reviewed: "RV - 05",
      first_name: "Eleanor Pena",
      email: "michelle.rivera@example.com",
      first_name1: "Eleanor Pena",
      email1: "michelle.rivera@example.com",
      image: dummyImage,
      rating: " ⭐ ⭐ ☆ ☆ ☆",
      reviews:
        "“Compassionate end-of-life care. They made a difficult time easier.",
    },
    {
      id: 6,
      reviewed: "RV - 06",
      first_name: "Jenny Wilson",
      email: "curtis.weaver@example.com",
      first_name1: "Jenny Wilson",
      email1: "curtis.weaver@example.com",
      image: dummyImage,
      rating: "⭐ ☆ ☆ ☆ ☆",
      reviews:
        "“The food quality was inconsistent, but the overall experience was positive.”",
    },
    {
      id: 7,
      reviewed: "RV - 07",
      first_name: "Ralph Edwards",
      email: "dolores.chambers@example.com",
      first_name1: "Ralph Edwards",
      email1: "dolores.chambers@example.com",
      image: dummyImage,
      rating: "☆ ☆ ☆ ☆ ☆",
      reviews:
        "“They offered a variety of activities that kept my father engaged. ",
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
        Reviews List
      </h2>
      <div className="mt-6 bg-[#FFFFFF] rounded-[10px] px-4 py-6 mb-6">
        <div className="mb-6 flex md:flex-row flex-col md:items-center md:justify-between">
          <h3 className="md:mb-0 mb-3">All Reviews</h3>
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
                  btnText="ratings"
                  showImg={true}
                  imgClass="w-[24px] h-[24px] object-cover"
                  img={filterIcon}
                  imgPosition="left"
                  btnClass="border border-[#252525] px-4 md:w-[101px] w-full pb-[10px] rounded-[10px] text-[#252525] text-sm font-medium"
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
        <div className="mb-4 flex"></div>
        <div>
          {activeTab === "all" ? (
            <TanDataTable<dataTypes>
              columns={columns}
              data={data}
              showCheckbox={false}
              onRowSelect={handleRowSelect}
              showActions={false}
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
              showActions={false}
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

export default ReviewsTable;
