import React, { useState } from "react";
import TanDataTable from "@components/Dashboard-components/Tanstack-data-table/TanDataTable";
import filterIcon from "@assets/media/svgs/dashboard-svgs/filter-icon.svg";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import { AnimatePresence, motion } from "framer-motion";
import RatingFilterDropdown from "@components/Dashboard-components/Dropdowns/RatingFilterDropdown";
import RatingStars from "@components/Shared-components/RatingStars";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import alice from "@assets/media/images/dashboard-images/alice.svg";
import searchIcon from "@assets/media/svgs/patient-db-svgs/search-icon.svg";
import CommonInput from "@components/Shared-components/Inputs/Common-Input/CommonInput";
import { TanDataTableColumn } from "@components/Dashboard-components/Tanstack-data-table/types";
import { useNavigate } from "react-router-dom";  

const CareProviderDashboard: React.FC = () => {
    const navigate = useNavigate();  
  const [showRatingDropdown, setShowRatingDropdown] = React.useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "saved">("all");

  type dataTypes = {
    id?: number;
    first_name?: string;
    last_name?: string;
    date?: string;
    email?: string;
    image?: string;
    rating?: number | string | React.ReactNode;
    reviews?: string;
    specialization?: string;
    location?: string;
  };

  const columns: TanDataTableColumn<dataTypes>[] = [
    {
      accessor: "first_name",
      header: "Provider’s Name",
      showSort: true,
      cell: ({ row }: { row: { original: dataTypes } }) => {
        const { first_name, last_name, email } = row.original;
        return (
          <div className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/patient/hospital-profile")} 
            >
              <img
              src={dummyImage}
              alt={`${first_name} ${last_name}`}
              className="w-[38px] h-[38px] rounded-full object-cover border border-gray-200"
            />
            <div className="flex flex-col">
              <span className="font-medium text-sm text-[#252525] leading-tight">
                {first_name} {last_name}
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
      header: "Date",
      showSort: true,
      cell: (info: any) => <i>{info.getValue()}</i>,
    },
    {
      accessor: "rating",
      header: "Rating",
      showSort: true,
    },
    {
      accessor: "specialization",
      header: "Specialization",
      showSort: true,
    },
    {
      accessor: "location",
      header: "Location",
      showSort: true,
    },
  ];

  const data: dataTypes[] = [
    {
      id: 1,
      first_name: "Alice",
      last_name: "Border",
      date: "9/04/12",
      email: "alice.border@example.com",
      // image: "/images/dashboard-images/alice.svg",
      image: alice,
      rating: <RatingStars value={5} isDisabled={true} />,
      specialization: "Elderly care",
      location: "📍200 1st St SW, Rochester",
    },
    {
      id: 2,
      first_name: "Michael",
      last_name: "Schofield",
      date: "9/04/16",
      email: "michael.schofield@example.com",
      image: "/images/michael.png",
      rating: <RatingStars value={3} isDisabled={true} />,
      specialization: "Post-surgical rehab",
      location: "📍190 E Bannock St, Boise, ID 83712",
    },
    {
      id: 3,
      first_name: "Sarah",
      last_name: "Johnson",
      date: "10/04/19",
      email: "sarah.johnson@example.com",
      image: "/images/sarah.png",
      rating: <RatingStars value={4} isDisabled={true} />,
      specialization: "Harmony Memory Care",
      location: "📍T9500 Euclid Ave, Cleveland,",
    },
    {
      id: 4,
      first_name: "John",
      last_name: "Doe",
      date: "12/04/22",
      email: "john.doe@example.com",
      image: "/images/john.png",
      rating: <RatingStars value={5} isDisabled={true} />,
      specialization: "Fitness  services.",
      location: "📍1468 Madison Ave, NY 10029",
    },
    {
      id: 5,
      first_name: "Emily",
      last_name: "Davis",
      date: "15/04/23",
      email: "emily.davis@example.com",
      image: "/images/emily.png",
      rating: <RatingStars value={2} isDisabled={true} />,
      specialization: "Rehabilitation Center",
      location: "📍8900 N Kendall Dr, Miami, FL 33176",
    },
  ];

  const handleRowSelect = (row: dataTypes) => {
    console.log("Selected row:", row);
  };

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
        Care Provider Listing
      </h2>
      <div className="mt-6 bg-[#FFFFFF] rounded-[10px] px-4 py-6 mb-6">
        <div className="mb-6 flex md:flex-row flex-col md:items-center md:justify-between">
          <h3 className="md:mb-0 mb-3">Care Providers</h3>
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
                  imgPosition="right"
                  btnClass="border border-[#252525] px-4 md:w-[101px] w-full pb-[10px] rounded-[10px] text-[#252525] text-sm font-medium"
                  onClick={() => setShowRatingDropdown(!showRatingDropdown)}
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
        <div className="mb-4 flex">
          <div
            className={`tab ${
              activeTab === "all"
                ? "bg-[#E9F2F6] border-b-2 border-[#007AB2]"
                : "bg-white"
            } `}
            onClick={() => handleTabClick("all")}
            style={{
              width: "213px",
              height: "47px",
              gap: "10px",
              paddingTop: "18px",
              paddingRight: "10px",
              paddingBottom: "18px",
              paddingLeft: "10px",
              cursor: "pointer",
            }}
          >
            <p
              className={`font-medium text-sm ${
                activeTab === "all" ? "text-[#007AB2]" : "text-[#252525CC]"
              }`}
            >
              All Care Providers
            </p>
          </div>
          <div
            className={`tab ${
              activeTab === "saved"
                ? "bg-[#E9F2F6] border-b-2 border-[#007AB2]"
                : "bg-white"
            } `}
            onClick={() => handleTabClick("saved")}
            style={{
              width: "213px",
              height: "47px",
              gap: "10px",
              paddingTop: "18px",
              paddingRight: "10px",
              paddingBottom: "18px",
              paddingLeft: "10px",
              cursor: "pointer",
            }}
          >
            <p
              className={`font-medium text-sm ${
                activeTab === "saved" ? "text-[#007AB2]" : "text-[#252525CC]"
              }`}
            >
              Saved Care Providers
            </p>
          </div>
        </div>

        <div>
          {activeTab === "all" ? (
            <TanDataTable<dataTypes>
              columns={columns}
              data={data}
              showCheckbox={false}
              onRowSelect={handleRowSelect}
              className="my-custom-class"
            />
          ) : (
            <TanDataTable<dataTypes>
              columns={columns}
              data={data.slice(0, 3)}
              showCheckbox={false}
              onRowSelect={handleRowSelect}
              className="my-custom-class"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CareProviderDashboard;
