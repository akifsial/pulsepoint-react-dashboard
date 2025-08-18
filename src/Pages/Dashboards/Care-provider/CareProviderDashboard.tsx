import StatsCommonCards from "@components/Dashboard-components/Cards/StatsCommonCards";
import React, { useEffect, useState } from "react";
import contacts from "@assets/media/svgs/dashboard-svgs/contacts.svg";
import stars from "@assets/media/svgs/dashboard-svgs/stars.svg";
import flags from "@assets/media/svgs/dashboard-svgs/flag.svg";
import userSearch from "@assets/media/svgs/dashboard-svgs/user-search.svg";
import TanDataTable from "@components/Dashboard-components/Tanstack-data-table/TanDataTable";
import DropdownActions from "@components/Dashboard-components/Dropdown-actions/DropdownActions";
import filterIcon from "@assets/media/svgs/dashboard-svgs/filter-icon.svg";
import ForwardArrow from "@assets/media/svgs/dashboard-svgs/arrow-forward-white.svg";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import { AnimatePresence, motion } from "framer-motion";
import RatingFilterDropdown from "@components/Dashboard-components/Dropdowns/RatingFilterDropdown";
import RatingStars from "@components/Shared-components/RatingStars";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import Pagination from "@components/Pagination/Pagination";
import ForumActivityCard from "@components/Dashboard-components/Cards/ForumActivityCard";
import { useApiMyReviews } from "@src/hooks/useMyReviews";
import dayjs from "dayjs";
import { useStatsApi } from "@src/hooks/useDashboard";


const CareProviderDashboard: React.FC = () => {
  const [showRatingDropdown, setShowRatingDropdown] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [rating, setRating] = useState("");
  const [page, setPage] = useState(1);
const [searchText, setSearchText] = useState("");
const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);

  const [sort, setSort] = useState(true);

  const { data: CareproviderData, refetch,  } = useApiMyReviews(
    "",
    rating,
    page,
    sort == true ? "asc" : "desc"
  );

  const { data: statsData } = useStatsApi();
  console.log("stats", statsData);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowRatingDropdown(false);
      }
    };



    if (showRatingDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showRatingDropdown]);

  type dataTypes = {
    id?: number;
    first_name?: string;
    last_name?: string;
    date?: string;
    email?: string;
    image?: string;
    rating?: any;
    reviews?: string;
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchText]);

  const columns = [
    {
      accessor: "userData",
      header: "Patient’s Name",
      showSort: true,
      cell: ({ row }: any) => {
        const {
          patient: { first_name, last_name, email, image },
        } = row.original;
        return (
          <div className="flex items-center gap-3">
            <img
              src={`${import.meta.env.VITE_APP_API_IMG_URL}${image}`}
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
      accessor: "updated_at",
      header: "Date",
      showSort: true,
      cell: (info: any) => <i>{dayjs(info.getValue()).format(" DD/MM/YY ")}</i>,
    },
    // {
    //   accessor: "rating",
    //   header: "Rating",
    //   showSort: true,
    // },
    {
      accessor: "rating",
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
      accessor: "content",
      header: "Reviews",
      showSort: true,
    },
  ];

  const data: dataTypes[] = [
    {
      id: 1,
      first_name: "Ronald",
      last_name: "Richards",
      date: "9/4/12",
      email: "tim.jennings@example.com",
      image: "/images/patient1.png",
      rating: <RatingStars value={5} isDisabled={true} />,
      reviews:
        "Staff was caring and responsive, though the wait time could be improved.",
    },
    {
      id: 2,
      first_name: "Dianne",
      last_name: "Russell",
      date: "5/7/16",
      email: "alma.lawson@example.com",
      image: "/images/patient1.png",
      rating: <RatingStars value={4} isDisabled={true} />,
      reviews:
        "Excellent support for my mother with dementia. Highly recommended.",
    },
    {
      id: 3,
      first_name: "Jacob",
      last_name: "Jones",
      date: "10/6/13",
      email: "kenzi.lawson@example.com",
      image: "/images/patient1.png",
      rating: <RatingStars value={4} isDisabled={true} />,
      reviews:
        "Facilities are clean and staff is friendly. A bit pricey, but worth it.",
    },
    {
      id: 4,
      first_name: "Devon",
      last_name: "Lane",
      date: "2/11/12",
      email: "dolores.chambers@example.com",
      image: "/images/patient1.png",
      rating: <RatingStars value={3} isDisabled={true} />,
      reviews: "Great amenities and staff. Rooms were spacious and bright.",
    },
  ];

  const handleRowSelect = (row: Person) => {
    console.log("Selected row:", row);
  };

  const renderActions = (row: Person) => (
    <button onClick={() => alert(`Edit ${row.name}`)}>Edit</button>
  );

      const onSortClick = () => {
      setSort(!sort);
      refetch();
    };


    // console.log("CareproviderDataCareproviderDataCareproviderData",CareproviderData?.records)

  return (
    <div className="mb-10">
      <div className="w-[100%] grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-[13px]">
        <StatsCommonCards
          count={statsData?.totalPatientReviews ? statsData?.totalPatientReviews : 0}
          title="Total Patient Reviews"
          cardImg={contacts}
          imgBg="#EEE0FF"
          borderBg="#9747FF"
        />
        <StatsCommonCards
          count={0}
          title="Unread Messages or Questions"
          cardImg={stars}
          imgBg="#D8F6D4"
          borderBg="#52C343"
        />
        <StatsCommonCards
          count={statsData?.flaggedReviews ? statsData?.flaggedReviews : 0}
          title="Flagged Reviews"
          cardImg={flags}
          imgBg="#FFE8CF"
          borderBg="#F98A17"
        />
        <StatsCommonCards
          count={statsData?.profileViewsThisMonth ? statsData?.profileViewsThisMonth : 0}
          title="Profile Views This Month"
          cardImg={userSearch}
          imgBg="#E2F0F6"
          borderBg="#007AB2"
        />
      </div>
      <div className="mt-6 bg-[#FFFFFF] rounded-[10px] px-4 py-6 mb-6">
        <div className="mb-6 flex md:flex-row flex-col md:items-center md:justify-between">
          <h3 className="md:mb-0 mb-3">Recent Reviews</h3>
          <div className="flex md:flex-row flex-col md:items-center md:gap-4 gap-3">
            <p className="text-[#252525] font-medium text-sm">Filter by</p>
            <div className="relative">
              <div className="flex flex-wrap items gap-4 ">
                <PrimaryButton
                  btnText={` ${rating} Ratings`}
                  showImg={true}
                  imgClass="w-[24px] h-[24px] object-cover"
                  img={filterIcon}
                  imgPosition="left"
                  btnClass="border border-[#252525] px-4 md:w-[101px] h-[44px] w-full py-[10px] rounded-lg text-[#252525] text-sm font-medium"
                  onClick={() => setShowRatingDropdown(!showRatingDropdown)}
                />
                <PrimaryButton
                  btnText="View All Reviews"
                  btnTextClass="text-[#FFFFFF] text-sm font-semibold"
                  showImg={true}
                  imgClass="w-[14px] h-[13px]"
                  img={ForwardArrow}
                  imgPosition="right"
                  btnClass="border border-[#252525] px-4 py-3 md:w-[159px] h-[46px] w-full rounded-lg bg-[#000000]"
                />
              </div>
              <AnimatePresence>
                {showRatingDropdown && (
                  <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 top-[60px] w-50 z-50"
                  >
                    <RatingFilterDropdown
                      setRating={setRating}
                      setShowRatingDropdown={setShowRatingDropdown}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div>
          <TanDataTable<dataTypes>
            columns={columns}
            data={CareproviderData?.records ?? ""}
            showCheckbox={false}
            onRowSelect={handleRowSelect}
            actions={renderActions}
            onSortClick={onSortClick}
            // showActions={true}
            className="my-custom-class"
            // actions={(row) => (
            //   <DropdownActions
            //     onView={() => console.log("View", row.id)}
            //     onEdit={() => console.log("Edit", row.id)}
            //     onDelete={() => console.log("Delete", row.id)}
            //   />
            // )}
          />
        </div>
        <Pagination
          onPageChange={handlePageChange}
          totalRows={CareproviderData?.totalRecords}
          currentPage={page}
          rowsPerPage={3}
        />
      </div>
      {/* <div className="bg-[#FFFFFF] rounded-[10px] px-4 p-5">
        <div>
          <div className="flex md:flex-row flex-col md:items-center md:justify-between mb-6.5">
            <h3 className="mb-3 md:mb-0">Community Forum Activity</h3>
            <div className="flex items-center gap-3">
              <p className="text-[#252525] font-medium text-sm">Filter by</p>
              <PrimaryButton
                btnText="Today"
                showImg={true}
                imgClass="w-[24px] h-[24px] object-cover"
                img={filterIcon}
                imgPosition="left"
                btnClass="border border-[#252525] px-4 md:w-[91px] h-[46px] w-full py-[10px] rounded-lg text-[#252525] text-sm font-medium"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2  grid-cols-1 gap-[13px]">
            <ForumActivityCard />
            <ForumActivityCard />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default CareProviderDashboard;
