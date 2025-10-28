import StatsCommonCards from "@src/Components/Dashboardcomponents/Cards/statscommoncards";
import React, { useState, useRef, useEffect } from "react";
import userSearch from "@assets/media/svgs/dashboard-svgs/user-search.svg";
import TanDataTable from "@components/dashboard-components/tanstack-data-table/tan-data-table";
import filterIcon from "@assets/media/svgs/dashboard-svgs/filter-icon.svg";
import ForwardArrow from "@assets/media/svgs/dashboard-svgs/arrow-forward-white.svg";
import { PrimaryButton } from "@src/Components/Sharedcomponents/Buttons/Commonbutton/commonbutton";
import { AnimatePresence, motion } from "framer-motion";
import RatingFilterDropdown from "@src/Components/Dashboardcomponents/dropdowns/rating-filter-dropdown";
import RatingStars from "@src/Components/Sharedcomponents/ratingstars";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import WriteReview from "@assets/media/svgs/dashboard-svgs/writen-review.svg";
import ThumbsUp from "@assets/media/svgs/dashboard-svgs/thumbs-up.svg";
import Patientdbimg from "@assets/media/svgs/patient-db-svgs/patient-dashboard.jpeg";
import alice from "@assets/media/images/dashboard-images/alice.svg";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ReviewCard from "@src/Components/reviewcard";
import MessageIcon from "@assets/media/svgs/dashboard-svgs/message-time.svg";
import dayjs from "dayjs";
import { Search, Clock } from "lucide-react";
import {
  useCareProviders,
  useRecentSearches,
  useStatsApi,
} from "@src/hooks/usedashboard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ApiCareProviderStatusUpdate,
  ApiDeleteRecentSearches,
  ApiGetCareProviders,
} from "@src/api/apidashboard";
import DeleteModal from "@src/Components/Model/deletemodal";
import { apiDeleteCareProvider } from "@src/api/apidashboard";
import EditModal from "@src/Components/Model/activeinactivemodal";
import ActiveInactiveModal from "@src/Components/Model/activeinactivemodal";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import TableSkeletonLoader from "@src/Components/Loaders/tableskeletonloader";
import { useMeApi } from "@src/hooks/useusers";
import LikeIcon from "@assets/media/svgs/dashboard-svgs/like-tag2.svg";
import axios from "axios";
import userDown from "@assets/media/svgs/dashboard-svgs/user-down-01.svg";
import Pagination from "@src/Components/Pagination/pagination";
const Model = ({ setIsOpen, children, className = "" }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div
        className={`bg-white p-7.5 rounded-[10px] relative w-full mx-4 ${className}`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-[18px] top-[18px]"
          aria-label="Close"
        >
          <span className="w-7 h-7 cursor-pointer text-gray-500 hover:text-gray-700 text-xl">
            <X />
          </span>
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [status, setStatus] = useState();
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const [rating, setRating] = useState();
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(true);
  const { data: StatsData, isLoading } = useStatsApi();
  const {
    data: CareProvidersData,
    refetch,
    isFetching,
    isLoading: isLoadingCareProviderData,
  } = useCareProviders(
    debouncedSearchText,
    rating,
    page,
    sort == true ? "desc" : "asc"
  );

  const { data: MeData, refetch: MeDataFetch } = useMeApi(navigate);

  useEffect(() => {
    MeDataFetch();
  });

  const onSortClick = () => {
    setSort(!sort);
    refetch();
  };
  const [searchParams] = useSearchParams();
  const urlToken = searchParams.get("token"); 
  const [token, setToken] = useState<string | null>(null); 

  useEffect(() => {
    if (urlToken) {
      localStorage.setItem("token", JSON.stringify(urlToken));
      ApiMe();

      setToken(urlToken); 
    } else {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
      }
    }
  }, [urlToken]);

  const ApiMe = async () => {
    const BASE_URL = `${import.meta.env.VITE_APP_API_URL}auth/me`;

    const response = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${urlToken}` },
    });

    if (response?.status == 200) {
      localStorage.setItem("userInfo", JSON.stringify(response?.data?.payload));
    }

    return response.data.payload;
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

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

  const dropdownRef = useRef<HTMLDivElement>(null); 
  const dummyCareProvidersData = {
    payload: {
      records: [
        {
          id: 1,
          organization_name: "Sunrise Health Clinic",
          first_name: "Dr. Emily",
          last_name: "Johnson",
          email: "emily.johnson@sunriseclinic.com",
          created_at: "2025-09-10T10:00:00Z",
          total_rating: 5,
          overall_rating: 4.9,
          specialization: "Family Medicine",
          state: "California",
          address: "123 Maple Street, Los Angeles, CA",
          postal_code: "90001",
        },
        {
          id: 2,
          organization_name: "Green Valley Medical Center",
          first_name: "Dr. Michael",
          last_name: "Smith",
          email: "michael.smith@greenvalleymed.com",
          created_at: "2025-08-22T14:30:00Z",
          total_rating: 4,
          overall_rating: 4.3,
          specialization: "Cardiology",
          state: "Texas",
          address: "245 Oak Avenue, Houston, TX",
          postal_code: "77002",
        },
        {
          id: 3,
          organization_name: "Healing Touch Hospital",
          first_name: "Dr. Olivia",
          last_name: "Brown",
          email: "olivia.brown@healingtouch.com",
          created_at: "2025-07-15T09:20:00Z",
          total_rating: 3,
          overall_rating: 3.5,
          specialization: "Dermatology",
          state: "Florida",
          address: "456 Palm Street, Miami, FL",
          postal_code: "33101",
        },
        {
          id: 4,
          organization_name: "New Hope Medical Center",
          first_name: "Dr. James",
          last_name: "Williams",
          email: "james.williams@newhopehealth.com",
          created_at: "2025-06-03T11:45:00Z",
          total_rating: 4,
          overall_rating: 4.2,
          specialization: "Neurology",
          state: "New York",
          address: "789 Broadway, New York, NY",
          postal_code: "10001",
        },
        {
          id: 5,
          organization_name: "Evercare Wellness Hospital",
          first_name: "Dr. Sophia",
          last_name: "Davis",
          email: "sophia.davis@evercarewellness.com",
          created_at: "2025-05-29T13:15:00Z",
          total_rating: 5,
          overall_rating: 4.8,
          specialization: "Pediatrics",
          state: "Illinois",
          address: "321 Lakeview Drive, Chicago, IL",
          postal_code: "60601",
        },
        {
          id: 6,
          organization_name: "Trinity Heart Institute",
          first_name: "Dr. William",
          last_name: "Miller",
          email: "william.miller@trinityheart.com",
          created_at: "2025-04-17T08:30:00Z",
          total_rating: 4,
          overall_rating: 4.6,
          specialization: "Cardiology",
          state: "Ohio",
          address: "88 Central Blvd, Columbus, OH",
          postal_code: "43085",
        },
        {
          id: 7,
          organization_name: "Harmony General Hospital",
          first_name: "Dr. Ava",
          last_name: "Garcia",
          email: "ava.garcia@harmonygeneral.com",
          created_at: "2025-03-21T15:50:00Z",
          total_rating: 3,
          overall_rating: 3.9,
          specialization: "Orthopedics",
          state: "Washington",
          address: "990 Pine Street, Seattle, WA",
          postal_code: "98101",
        },
        {
          id: 8,
          organization_name: "Unity Health Partners",
          first_name: "Dr. Benjamin",
          last_name: "Martinez",
          email: "benjamin.martinez@unityhealth.com",
          created_at: "2025-02-10T12:00:00Z",
          total_rating: 5,
          overall_rating: 5.0,
          specialization: "Internal Medicine",
          state: "Colorado",
          address: "400 Aspen Avenue, Denver, CO",
          postal_code: "80201",
        },
        {
          id: 9,
          organization_name: "WellSpring Medical Group",
          first_name: "Dr. Isabella",
          last_name: "Lopez",
          email: "isabella.lopez@wellspringgroup.com",
          created_at: "2025-01-26T16:45:00Z",
          total_rating: 4,
          overall_rating: 4.4,
          specialization: "Endocrinology",
          state: "Georgia",
          address: "550 Peachtree Street, Atlanta, GA",
          postal_code: "30301",
        },
        {
          id: 10,
          organization_name: "Riverside Care Center",
          first_name: "Dr. Ethan",
          last_name: "Anderson",
          email: "ethan.anderson@riversidecare.com",
          created_at: "2024-12-19T11:10:00Z",
          total_rating: 2,
          overall_rating: 2.8,
          specialization: "Gastroenterology",
          state: "Arizona",
          address: "789 Desert Road, Phoenix, AZ",
          postal_code: "85001",
        },
      ],
    },
  };

  const columns = [
    {
      accessor: "userData",
      header: "Provider's Name",
      showSort: true,
      cell: ({ row }: any) => {
        const { id, organization_name, first_name, last_name, email } =
          row.original;
        return (
          <div
            className="max-w-[250px] flex me-5 items-center gap-3 cursor-pointer"
            onClick={() => navigate(`/patient/care-provider/${id}`)}
          >
            <img
              src={dummyImage}
              alt={`${first_name} ${last_name}`}
              className="w-[38px] h-[38px] rounded-full object-cover border border-gray-200"
            />
            <div className="flex flex-col">
              <span className="font-medium text-[16px] text-[#252525] leading-tight">
                {organization_name.length > 20
                  ? organization_name.slice(0, 20) + "....."
                  : organization_name}
              </span>
              <span className="text-[12px] text-gray-500 leading-tight">
                {email}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessor: "date",
      header: <span className="">Date</span>,
      width: 200,
      showSort: true,
      cell: (info) => {
        const row = info.row.original;
        return (
          <div className=" font-normal">
            {dayjs(row?.created_at).format("DD/MM/YY") ?? "N/A"}
          </div>
        );
      },
    },

    {
      accessor: "total_rating",
      header: "Rating",
      showSort: true,
      cell: ({ getValue }) => {
        const rating = Number(getValue()) || 0;
        const value = getValue();

        if (rating === 0) {
          return (
            <div
              className={`flex ${
                value ? "max-w-[100px]" : "max-w-[100px]"
              } justify-center`}
            >
              <span className="text-gray-500">N/A</span>
            </div>
          );
        }

        const totalStars = 5;

        const StarIcon = ({ filled }: { filled: boolean }) => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={filled ? "#FACC15" : "#D1D5DB"} 
            width="17"
            height="17"
          >
            <path d="M12 .587l3.668 7.431L24 9.753l-6 5.847 1.416 8.267L12 19.771l-7.416 4.096L6 15.6 0 9.753l8.332-1.735z" />
          </svg>
        );

        return (
          <div className="flex justify-center items-center gap-0.5">
            {Array.from({ length: totalStars }).map((_, index) => (
              <StarIcon key={index} filled={index < rating} />
            ))}
          </div>
        );
      },
    },
    {
      accessor: "overall_rating",
      header: "Overall Rating",
      showSort: true,

      cell: ({ row }) => {
        const rating = Number(row.original?.overall_rating ?? 0);

        return (
          <div className="flex justify-center">
            {rating === 0 ? (
              <span className="text-gray-500">N/A</span>
            ) : (
              <RatingStars value={rating} isDisabled={true} />
            )}
          </div>
        );
      },
    },
    {
      accessor: "specialization",
      header: "Specialization",
      cell: ({ getValue }) => {
        const value = getValue();
        return (
          <div
            className={` 
              ${
                value
                  ? "text-left w-[150px] truncate"
                  : "flex justify-center w-[120px]"
              }
            `}
          >
            {value || <span className="text-gray-500">N/A</span>}
          </div>
        );
      },
    },
    {
      accessor: "state",
      header: <span className="">State</span>,
      width: 200,
      showSort: true,
      cell: ({ getValue }) => getValue() || "N/A",
    },

    {
      accessor: "address",
      header: "Location",
      showSort: true,
      cell: ({ getValue }) => {
        const value = getValue();

        return (
          <div
            className={` max-w-[150px]
              ${
                value
                  ? "text-left w-[250px] truncate"
                  : "flex justify-center w-[250px]"
              }
            `}
          >
            {value || <span className="text-gray-500">N/A</span>}
          </div>
        );
      },
    },
    {
      accessor: "postal_code",
      header: "Zip Code",
      showSort: true,
    },
  ];

  const { data: recentSearchesData } = useRecentSearches();

  const handleRowSelect = (row: any) => {};

  const handleReviewClick = () => {};

  const handleSearchFocus = () => {
    setIsSearchDropdownOpen(true);
  };

  const handleClearRecentSearches = () => {};

  const handleSearchItemClick = (searchValue: string) => {
    setSearchText(searchValue);
    setIsSearchDropdownOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isSearchDropdownOpen &&
        !target.closest(".search-dropdown-container")
      ) {
        setIsSearchDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchDropdownOpen]);

  const { mutateAsync: deleteMutation, isPending: deleteMutationLoading } =
    useMutation({
      mutationFn: () => apiDeleteCareProvider(selectedRowId),
      onSuccess: async () => {
        queryClient.invalidateQueries(["useCareProviders"]); 
        setIsDeleteModalOpen(false);

      },
      onError: (error) => {
      },
    });

  const handleDelete = async () => {
    if (selectedRowId !== null) {
      await deleteMutation(selectedRowId);
    }
  };

  const { mutateAsync: updateStatusMutation, isPending: updateStatusPending } =
    useMutation({
      mutationFn: ({ data }) =>
        ApiCareProviderStatusUpdate(data, selectedRowId),

      onSuccess: async () => {
        queryClient.invalidateQueries(["useCareProviders"]); 
        toast.success("Status Update Successfully");
        setIsEditModalOpen(false);
      },
      onError: (error) => {
      },
    });

  const handleUpdateStatus = (stst) => {
    const newStatus = stst === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    const data = {
      status: newStatus,
    };

    updateStatusMutation({ data });
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowRatingDropdown(false); 
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

  const { mutateAsync: deleteSearchesAllMutation } = useMutation({
    mutationFn: () => ApiDeleteRecentSearches(),

    onSuccess: async () => {
      queryClient.invalidateQueries(["useRecentSearches"]); 
      toast.success("Delete All Searches Successfully");
    },
    onError: (error) => {
    },
  });

  const handleDeleteSearches = (id) => {
    deleteSearchesAllMutation(id);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    setPage(1);
  }, [searchText]);

  return (
    <div className="mb-10">
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[13px]">
        <StatsCommonCards
          count={
            isLoading ? (
              <div className="h-[40px] w-[40px] bg-gray-100 rounded-md animate-pulse" />
            ) : StatsData?.totalProviders ? (
              StatsData?.totalProviders
            ) : (
              0
            )
          }
          title={
            <>
              Total Care <br />
              Providers Listing
            </>
          }
          cardImg={userDown}
          imgBg="#EEE0FF"
          borderBg="#9747FF"
        />
        <StatsCommonCards
          count={
            isLoading ? (
              <div className="h-[40px] w-[40px] bg-gray-100 rounded-md animate-pulse" />
            ) : StatsData?.totalReviewsWritten ? (
              StatsData?.totalReviewsWritten
            ) : (
              0
            )
          }
          title="Total Reviews Written"
          cardImg={MessageIcon}
          imgBg="#D8F6D4"
          borderBg="#52C343"
        />
        <StatsCommonCards
          count={
            isLoading ? (
              <div className="h-[40px] w-[40px] bg-gray-100 rounded-md animate-pulse" />
            ) : StatsData?.averageRatingGiven ? (
              StatsData?.averageRatingGiven
            ) : (
              0
            )
          }
          title="Average Rating Given"
          cardImg={LikeIcon}
          imgBg="#FFE8CF"
          borderBg="#F98A17"
        />
      </div>

      <div className="mt-6 overflow-y-auto w-[100%] bg-[#FFFFFF] rounded-tr-[10px] rounded-tl-[10px] h-fit px-4 mb-0 py-6">
        <div className="mb-6 flex gap-2 md:mt-0 mt-5 md:flex-row flex-col md:items-center md:justify-between">
          <div className="lg:flex md:flex-nowrap flex-wrap items-center gap-5">
            <h3 className="lg:mb-0 space-grotesk text-[20px] font-bold text-gray-900 mb-3">
              Care Providers
            </h3>
            <div className="relative">
              <Search className="absolute left-2 top-6 transform -translate-y-1/2 text-[#252525] w-5 h-5" />
              <input
                type="text"
                placeholder="Search with Provider name, zipcode"
                value={searchText}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                className="w-full min-w-[330px] text-[14px] font-medium inter pl-10 pr-4 py-3 text-gray-700 placeholder-[#252525] border border-[#252525] rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
              />
              <div className="sm:block hidden lg:flex lg:flex-1 lg:justify-end px-0 mt-2 lg:px-5 relative">
                <div className="w-full max-w-sm search-dropdown-container">
                  {isSearchDropdownOpen && (
                    <div className="absolute top-0 left-0  mt-2 bg-white rounded-lg  shadow-lg z-50 min-w-[300px] max-h-[400px] overflow-hidden">

                      {recentSearchesData?.length == 0 ? (
                        ""
                      ) : (
                        <div className="p-2">
                          <div className="flex items-center justify-between mb-0">
                            <h3 className="text-gray-600 font-medium text-base">
                              Recents
                            </h3>
                            <button
                              onClick={() => handleDeleteSearches()}
                              className="text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors"
                            >
                              Clear
                            </button>
                          </div>


                          <div className="space-y-0.5 max-h-[250px] min-h-[50px] overflow-y-auto">
                            {recentSearchesData?.length == 0 ? (
                              <div className="mt-3 flex justify-center">
                                <p className="text-[14px]">No Searches Found</p>
                              </div>
                            ) : (
                              recentSearchesData?.map((search) => (
                                <div
                                  key={search.id}
                                  onClick={() =>
                                    handleSearchItemClick(search.keyword)
                                  }
                                  className="flex items-center p-2 hover:bg-gray-50 cursor-pointer rounded-md transition-colors"
                                >
                                  <Clock className="w-4 h-4 text-gray-400 flex-shrink-0 mr-3" />
                                  <span className="text-gray-700 text-sm leading-relaxed">
                                    {search.keyword}
                                  </span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex md:flex-row md:mt-0 mt-5 flex-col md:items-center md:gap-4 gap-3">
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center md:flex-nowrap flex-wrap gap-4">
                <p className="text-[#252525] inter font-medium text-[14px]">
                  Filter by
                </p>
                <PrimaryButton
                  btnText={` ${rating ? rating : ""} Ratings`}
                  showImg={true}
                  imgClass="w-[24px] h-[24px] object-cover"
                  img={filterIcon}
                  imgPosition="right"
                  btnClass="border inter border-[#252525] !px-2 rounded-[10px] text-[#252525] text-sm font-medium"
                  onClick={() => setShowRatingDropdown(!showRatingDropdown)}
                />
                <button
                  onClick={() => navigate("/patient/care-provider")}
                  className="border border-[#252525] px-4 py-3 cursor-pointer md:w-[180px] w-full rounded-[10px] bg-[#000000] flex items-center justify-center gap-2"
                >
                  <span className="text-[#FFFFFF] inter  text-[14px] font-semibold">
                    View All Listing
                  </span>
                  <img
                    src={ForwardArrow}
                    alt="arrow"
                    className="w-[14px] h-[13px] object-cover"
                  />
                </button>
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

        <div>
          {isLoadingCareProviderData ? (
            <TableSkeletonLoader />
          ) : (

            <TanDataTable
              columns={columns ?? []}
              data={dummyCareProvidersData.payload.records}
              pageCount={2}
              fetchData={CareProvidersData}
              onSortClick={onSortClick}
            />
          )}

          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedRowId(null);
            }}
            onDelete={handleDelete}
          />

          {isEditModalOpen ? (
            <ActiveInactiveModal
              onClose={() => {
                setIsEditModalOpen(false);
                setSelectedRowId(null);
              }}
              onEdit={handleUpdateStatus}
              loading={updateStatusPending}
              selectedRowId={selectedRowId}
              setStatus={setStatus}
            />
          ) : (
            ""
          )}
        </div>
        <Pagination
          onPageChange={handlePageChange}
          totalRows={CareProvidersData?.payload?.totalRecords}
          currentPage={page}
          rowsPerPage={10}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
