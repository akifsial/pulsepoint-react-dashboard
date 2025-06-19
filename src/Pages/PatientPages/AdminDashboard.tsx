import StatsCommonCards from "@components/Dashboard-components/Cards/StatsCommonCards";
import React from "react";
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
import WriteReview from "@assets/media/svgs/dashboard-svgs/writen-review.svg";
import ThumbsUp from "@assets/media/svgs/dashboard-svgs/thumbs-up.svg";
import Patientdbimg from "@assets/media/svgs/patient-db-svgs/patient-dashboard.jpeg";
import alice from "@assets/media/images/dashboard-images/alice.svg";
import { useNavigate } from "react-router-dom";
import ReviewCard from "@components/ReviewCard";
import { Search, Clock } from 'lucide-react';

// Import or define your Modal component
const Model = ({ setIsOpen, children, className = "" }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className={`bg-white p-7.5 rounded-[10px] relative w-full mx-4 ${className}`}>
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-[18px] top-[18px]"
          aria-label="Close"
        >
          <span className="w-7 h-7 cursor-pointer text-gray-500 hover:text-gray-700 text-xl">×</span>
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

interface RecentSearch {
  id: string;
  text: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showRatingDropdown, setShowRatingDropdown] = React.useState(false);
  const [searchText, setSearchText] = React.useState<string>("");
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = React.useState(false);

  // Recent searches data
  const recentSearches: RecentSearch[] = [
    { id: '1', text: 'Johns Hopkins Hospital' },
    { id: '2', text: 'Dr. Amanda Reyes – Green Valley Rehab Center' },
    { id: '3', text: 'Search all providers near 10001' },
    { id: '4', text: 'St. Luke\'s Long-Term Care – 30303' }
  ];

  type dataTypes = {
    id?: number;
    first_name?: string;
    last_name?: string;
    date?: string;
    email?: string;
    image?: string;
    rating?: React.ReactNode;
    reviews?: string;
    specialization?: string;
    location?: string;
  };

  const columns = [
    {
      accessor: "userData",
      header: "Provider's Name",
      showSort: true,
      cell: ({ row }: any) => {
        const { first_name, last_name, email } = row.original;
        return (
          <div
            className="flex items-center gap-3 cursor-pointer"
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

  const handleRowSelect = (row: any) => {
    console.log("Selected row:", row);
  };

  const handleReviewClick = () => {
    console.log("Review button clicked");
  };

  // Search dropdown handlers
  const handleSearchFocus = () => {
    setIsSearchDropdownOpen(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleClearRecentSearches = () => {
    console.log('Clear recent searches');
  };

  const handleSearchItemClick = (searchValue: string) => {
    setSearchText(searchValue);
    setIsSearchDropdownOpen(false);
    console.log('Selected search:', searchValue);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isSearchDropdownOpen && !target.closest('.search-dropdown-container')) {
        setIsSearchDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchDropdownOpen]);

  return (
    <div className="mb-10">
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-[13px]">
        <StatsCommonCards
          count={40}
          title={
            <>
              Total Care <br />
              Providers Listing
            </>
          }
          cardImg={userSearch}
          imgBg="#EEE0FF"
          borderBg="#9747FF"
        />
        <StatsCommonCards
          count={25}
          title="Total Reviews Written"
          cardImg={WriteReview}
          imgBg="#D8F6D4"
          borderBg="#52C343"
        />
        <StatsCommonCards
          count={4.6}
          title="Average Rating Given"
          cardImg={ThumbsUp}
          imgBg="#FFE8CF"
          borderBg="#F98A17"
        />
        <ReviewCard
          backgroundImage={Patientdbimg}
          onReviewClick={handleReviewClick}
        />
      </div>
      
      <div className="mt-6 bg-[#FFFFFF] rounded-[10px] px-4 py-6 mb-6">
        <div className="mb-6 flex md:flex-row flex-col md:items-center md:justify-between">
          <h3 className="md:mb-0 mb-3">Care Providers</h3>
          
          {/* Updated searchbar with dropdown */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end px-5 relative">
            <div className="w-full max-w-sm relative search-dropdown-container">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search with Provider name, zip code"
                  value={searchText}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  className="w-full pl-10 pr-4 py-3 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                />
              </div>
              
              {/* Search Dropdown - positioned below input */}
              {isSearchDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg border border-gray-200 shadow-lg z-50 max-h-[400px] overflow-hidden">
                  {/* Search Input in Dropdown */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        onChange={handleSearchChange}
                        className="w-full pl-10 pr-4 py-3 text-gray-700 placeholder-gray-400 border border-blue-500 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                        autoFocus
                      />
                    </div>
                  </div>

                  {/* Recents Section */}
                  <div className="p-2">
                    <div className="flex items-center justify-between mb-0">
                      <h3 className="text-gray-600 font-medium text-base">Recents</h3>
                      <button
                        onClick={handleClearRecentSearches}
                        className="text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors"
                      >
                        Clear
                      </button>
                    </div>

                    {/* Recent Searches List */}
                    <div className="space-y-0.5 max-h-[250px] overflow-y-auto">
                      {recentSearches.map((search) => (
                        <div
                          key={search.id}
                          onClick={() => handleSearchItemClick(search.text)}
                          className="flex items-center p-2 hover:bg-gray-50 cursor-pointer rounded-md transition-colors"
                        >
                          <Clock className="w-4 h-4 text-gray-400 flex-shrink-0 mr-3" />
                          <span className="text-gray-700 text-sm leading-relaxed">
                            {search.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex md:flex-row flex-col md:items-center md:gap-4 gap-3">
            <p className="text-[#252525] font-medium text-sm">Filter by</p>
            <div className="relative">
              <div className="flex items gap-4 ">
                <PrimaryButton
                  btnText="ratings"
                  showImg={true}
                  imgClass="w-[24px] h-[24px] object-cover"
                  img={filterIcon}
                  imgPosition="right"
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
        
        <div>
          <TanDataTable<dataTypes>
            columns={columns}
            data={data}
            showCheckbox={false}
            onRowSelect={handleRowSelect}
            showActions={true}
            className="my-custom-class"
            actions={(row) => (
              <DropdownActions
                // onView={() => console.log("View", row.id)}
                onEdit={() => console.log("Edit", row.id)}
                onDelete={() => console.log("Delete", row.id)}
              />
            )}
          />
        </div>
      </div>


    </div>
  );
};

export default AdminDashboard;