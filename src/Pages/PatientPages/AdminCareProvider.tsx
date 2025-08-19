import React, { useState, useRef, useEffect } from "react";
import TanDataTable from "@components/Dashboard-components/Tanstack-data-table/TanDataTable";
import filterIcon from "@assets/media/svgs/dashboard-svgs/filter-icon.svg";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import { AnimatePresence, motion } from "framer-motion";
import RatingFilterDropdown from "@components/Dashboard-components/Dropdowns/RatingFilterDropdown";
import RatingStars from "@components/Shared-components/RatingStars";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import alice from "@assets/media/images/dashboard-images/alice.svg";
import searchIcon from "@assets/media/svgs/patient-db-svgs/search-icon.svg";
import Pagination from "@components/Pagination/Pagination";
import CommonInput from "@components/Shared-components/Inputs/Common-Input/CommonInput";
import { TanDataTableColumn } from "@components/Dashboard-components/Tanstack-data-table/types";
import { useNavigate } from "react-router-dom";
import { useCareProviders } from "@src/hooks/useDashboard";
import dayjs from "dayjs";
import { useAllSavedCareProviders } from "@src/hooks/useUsers";
import TableSkeletonLoader from "@components/Loaders/TableSkeletonLoader";
import SavedCareProviders from "./SavedCareProviders";

  export const columns: TanDataTableColumn<dataTypes>[] = [
    {
      accessor: "first_name",
      header: "Provider’s Name",
      showSort: true,
      cell: ({ row }: { row: { original: dataTypes } }) => {
        const { id, organization_name, first_name, last_name, email } =
          row.original;
        return (
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate(`/patient/hospital-profile/${id}`)}
          >
            <img
              src={dummyImage}
              alt={`${first_name} ${last_name}`}
              className="w-[38px] h-[38px] rounded-full object-cover border border-gray-200"
            />
            <div className="flex flex-col">
              <span className="font-medium text-sm text-[#252525] leading-tight">
                {organization_name}
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
      cell: ({ row }) => (
        <i>{dayjs(row?.original?.created_at).format("DD/MM/YY")}</i>
      ),
    },
    // {
    //   accessor: "total_rating",
    //   header: "Rating",
    //   showSort: true,
    //   cell: ({ getValue }) => {
    //     const rating = getValue();
    //     return rating ? rating : ""
    //   },
    // },

    {
      accessor: "total_rating",
      header: "Rating",
      showSort: true,
      cell: ({ getValue }) => {
        const rating = Number(getValue()) || 0;
        const totalStars = 5;

        const StarIcon = ({ filled }: { filled: boolean }) => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={filled ? "#FACC15" : "#D1D5DB"} // yellow-400 or gray-300
            width="20"
            height="20"
          >
            <path d="M12 .587l3.668 7.431L24 9.753l-6 5.847 1.416 8.267L12 19.771l-7.416 4.096L6 15.6 0 9.753l8.332-1.735z" />
          </svg>
        );

        return (
          <div className="flex items-center gap-0.5">
            {Array.from({ length: totalStars }).map((_, index) => (
              <StarIcon key={index} filled={index < rating} />
            ))}
          </div>
        );
      },
    },
    {
      accessor: "specialization",
      header: "Specialization",
      showSort: true,
    },
    {
      accessor: "address",
      header: "Location",
      showSort: true,
    },
  ];

const CareProviderDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showRatingDropdown, setShowRatingDropdown] = React.useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "saved">("all");
  const [searchText, setSearchText] = React.useState<string>("");
  const [rating, setRating] = useState();
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(true);

  const {
    data: CareProvidersData,
    isLoading: isLoadingCareProvidersData,
    refetch,
  } = useCareProviders(
    debouncedSearchText,
    rating,
    page,
    sort == true ? "asc" : "desc"
  );
  // const {
  //   data: AllSavedCareProviders,
  //   isLoading: isLoadingAllSavedCareProvider,
  // } = useAllSavedCareProviders(
  //   debouncedSearchText,
  //   rating,
  //   page,
  //   sort == true ? "asc" : "desc"
  // );
  console.log("CARE", CareProvidersData);

  const onSortClick = () => {
    setSort(!sort);
    refetch();
  };
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
    onSortClick?: number;
  };



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

  const handleRowSelect = (row: dataTypes) => {};

  const handleTabClick = (tab: "all" | "saved") => {
    setActiveTab(tab);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowRatingDropdown(false); // close dropdown
      }
    }

    if (showRatingDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showRatingDropdown]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    setPage(1);
  }, [searchText]);

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
      mb-6
    "
      >
        Care Provider Listing
      </h2>
      <div className="bg-[#FFFFFF] rounded-tr-[10px] rounded-tl-[10px] h-[450px] px-4 py-6">
        <div className="mb-6 flex md:flex-row flex-col md:items-center md:justify-between">
          <h3 className="md:mb-0 mb-3">Care Providers</h3>
          {/* searchbar */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end px-5">
            <CommonInput
              placeholder="Search with Provider name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              showImg={true}
              imgSrc={searchIcon}
              imgLeft={true}
              inputClassName="text-sm "
              containerClassName="w-full border-gray-200 rounded-lg py-3 max-w-sm"
            />
          </div>
          <div className="flex md:flex-row flex-col md:items-center md:gap-4 gap-3">
            <p className="text-[#252525] font-medium text-sm">Filter by</p>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowRatingDropdown(!showRatingDropdown)}
                className={`border ${
                  rating ? "ps-6" : ""
                } border-[#252525] px-4 md:w-[110px] w-full py-[5px] cursor-pointer rounded-[30px] text-[#252525] text-sm font-medium flex items-center justify-center gap-1.5`}
              >
                {rating ? rating : ""}
                <span className=" pe-1 flex"> Ratings</span>
                <img
                  src={filterIcon}
                  alt="filter icon"
                  className="w-[24px] h-[24px] pe-2 object-cover"
                />
              </button>

              <AnimatePresence>
                {showRatingDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute md:left-[-100px] top-[50px] w-50 z-50"
                  >
                    {/* 👇 This must be inside ref wrapper */}
                    <RatingFilterDropdown
                      setShowRatingDropdown={setShowRatingDropdown}
                      setRating={setRating}
                    />
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
            isLoadingCareProvidersData ? (
              <TableSkeletonLoader />
            ) : (
              <div className="overflow-x-auto">
                <TanDataTable<dataTypes>
                  columns={columns}
                  data={CareProvidersData?.payload?.records}
                  showCheckbox={false}
                  onRowSelect={handleRowSelect}
                  className="my-custom-class"
                  onSortClick={onSortClick}
                />
              </div>
            )
          )  : (
            <>
            {/* <TanDataTable<dataTypes>
              columns={columns}
              data={AllSavedCareProviders ?? []}
              showCheckbox={false}
              onRowSelect={handleRowSelect}
              className="my-custom-class"
              onSortClick={onSortClick}
            /> */}
            <SavedCareProviders onSortClick={onSortClick} debouncedSearchText={debouncedSearchText} rating={rating} page={page} sort={sort} />
            </>
          )}
        </div>
      </div>
      {
        activeTab == "all" ? 
      <div>
        <Pagination
          onPageChange={handlePageChange}
          totalRows={CareProvidersData?.payload?.totalRecords}
          currentPage={page}
          rowsPerPage={3}
        />
      </div> : ""
      }
    </div>
  );
};

export default CareProviderDashboard;
