import React, { useState, useEffect, useMemo, useRef } from "react";
import TanDataTable from "@components/Dashboard-components/Tanstack-data-table/TanDataTable";
import DropdownActions from "@components/Dashboard-components/Dropdown-actions/DropdownActions";
import filterIcon from "@assets/media/svgs/dashboard-svgs/filter-icon.svg";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import searchIcon from "@assets/media/svgs/patient-db-svgs/search-icon.svg";
import CommonInput from "@components/Shared-components/Inputs/Common-Input/CommonInput";
import { TanDataTableColumn } from "@components/Dashboard-components/Tanstack-data-table/types";
import UserInfo from "./UserInfo";
import { apiServices } from "@src/Shared/apiServices";
import apiEndpoint from "@src/Shared/apiEndPoint";
import DeleteConfirmationModal from "@components/DeleteConfirmationModal";
import ExportTable from "@components/Shared-components/ExportTable";
import { debounce } from "lodash";
import SkeletonTableLoader from "@components/Loader/SkeltonTableLoader";
import { toast } from "react-toastify";
import Pagination from "@components/Pagination/Pagination";
import { AnimatePresence, motion } from "framer-motion";
import RatingFilterDropdown from "@components/Dashboard-components/Dropdowns/RatingFilterDropdown";
import RatingStars from "@components/Shared-components/RatingStars";
import { useNavigate } from "react-router-dom";
import AdminDropdownAction from "../AdminDropdownAction/AdminDropdownAction";
import AdminRatingFilterDropDown from "../AdminDropdownAction/AdminRatingFilterDropDown";

const CareProviderDashboard: React.FC = () => {
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);
  const [selectedUser, setSelectedUser] = useState<dataTypes | false>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [providerData, setProviderData] = useState<dataTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<string>("");
  const [, setRecentSearches] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);

  // --- Pagination (dynamic/API) ---
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 3;
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [careProvidersData, setCareProvidersData] = useState();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  type dataTypes = {
    id: number | string;
    first_name?: string;
    organization_name?: string;
    role?: string;
    communities?: string;
    patient?: number;
    rating?: number | string | React.ReactNode;
    status?: string;
    email?: string;
    image?: string;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowRatingDropdown(false);
      }
    };
    if (showRatingDropdown)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showRatingDropdown]);

  // Initial load & when rating changes -> reset to page 1 (include current search)
  useEffect(() => {
    setCurrentPage(1);
    fetchProviders(selectedRating, 1, searchText);
  }, [selectedRating]);

  // Re-fetch when page changes (include current search)
  useEffect(() => {
    fetchProviders(selectedRating, currentPage, searchText);
  }, [currentPage]);

  const handleRatingSelect = (rating: string) => {
    setSelectedRating(rating);
  };
  useEffect(() => {
    if (userId !== null) {
      fetchProviders(selectedRating, currentPage, searchText);
    }
  }, [userId, currentPage]);

  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  // me api integration for getting dynamic user id for search
  const fetchUserProfile = async () => {
    try {
      const response = await apiServices.get(apiEndpoint.me);
      if (response.data.success) {
        const userData = response.data.payload;
        const capitalizedFirstName = capitalizeFirstLetter(
          userData.first_name || ""
        );
        setUserId(userData.id);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // integrating api for fetching provider data (now paginated on server)
  const fetchProviders = async (
    rating: string = "",
    page: number = currentPage,
    search: string = ""
  ) => {
    try {
      setLoading(true);
      let url = apiEndpoint.getUsersByRole(
        `CARE_PROVIDER&page=${page}&limit=${pageSize}`
      );

      if (search.trim() !== "") {
        url += `&search=${encodeURIComponent(search.trim())}`;
      }
      if (rating.trim() !== "") {
        url += `&total_rating=${rating}`;
      }

      const response = await apiServices.get(url);
      const records = response.data?.payload?.records || [];
      setTotalRecords(
        response.data?.payload?.totalRecords ?? records.length ?? 0
      );
      setCareProvidersData(response.data?.payload);

      const mappedData = records.map((item: any) => ({
        id: item.id,
        first_name: item.first_name,
        organization_name: item.organization_name,
        email: item.email,
        role: item.specialization || item.specialization,
        communities: item.community?.join(", ") || "N/A",
        patient: item.saved_by_patients?.length || 0,
        rating: item.total_rating,
        status: item.status,
        image: item.image || dummyImage,
        postal_code: item.postal_code || dummyImage,
      }));

      setProviderData(mappedData);
    } catch (error) {
      console.error("Failed to fetch provider data:", error);
    } finally {
      setLoading(false);
    }
  };

  // recent search api and filteration;
  const fetchRecentSearches = async () => {
    if (!userId) return;
    try {
      const response = await apiServices.get(
        apiEndpoint.getRecentSearches(userId)
      );
      if (response.data?.success) {
        setRecentSearches(response.data.payload || []);
      }
    } catch (error) {
      console.error("Error fetching recent searches:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // fetch when userId is known and page changes (search handled via debounce below)
  useEffect(() => {
    if (userId !== null) {
      fetchProviders(searchText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, currentPage]);

  const debouncedFetchProviders = debounce((search: string) => {
    fetchProviders(selectedRating, 1, search);
  }, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    setCurrentPage(1); // reset to page 1 on new search (UI-only change)
    debouncedFetchProviders(value);
  };

  const handleSearchFocus = () => {
    fetchRecentSearches();
  };

  // delete provider api integration
  const handleDeleteProvider = async (id: number) => {
    try {
      setLoading(true);
      const response = await apiServices.delete(apiEndpoint.updateUser(id));
      if (response.data.success) {
        setLoading(false);

        toast.success("Provider deleted successfully!");
        setShowDeleteModal(false);
        setProviderData((prevData) =>
          prevData.filter((provider) => provider.id !== id)
        );
      }
    } catch (error) {
      setLoading(false);

      console.error("Failed to delete provider:", error);
      alert("Error deleting provider.");
    }
  };

  const handleDeleteClick = (id: number) => {
    setUserIdToDelete(id);
    setShowDeleteModal(true);
  };

  const columns: TanDataTableColumn<dataTypes>[] = [
    {
      accessor: "first_name",
      header: "Provider's Name",
      showSort: true,
      cell: ({ row }: { row: { original: dataTypes } }) => {
        const { first_name, organization_name, email, image, id } =
          row.original;
        const displayName = organization_name || first_name || "N/A";
        return (
          <div
            className="flex  pe-10 items-center gap-3 cursor-pointer"
            onClick={() => {
              navigate(`/admin/careprovider-info/${id}`);
            }}
          >
            <img
              src={
                row.original.image
                  ? `${import.meta.env.VITE_APP_API_IMG_URL}${
                      row.original.image
                    }`
                  : dummyImage
              }
              onError={(e) => {
                // if broken URL, fallback to dummyImage
                (e.currentTarget as HTMLImageElement).src = dummyImage;
              }}
              alt={row.original.first_name || "Patient"}
              className="w-[38px] h-[38px] rounded-full object-cover border border-gray-200"
            />
            <div className="flex flex-col">
              <span className="font-medium text-sm text-[#252525] leading-tight">
                {displayName}
              </span>
              <span className="text-xs text-gray-500 leading-tight ">
                {email}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessor: "role",
      header: "Specialization",
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
      cell: ({ row }) => {
        const rating = Number(row.original?.rating ?? 0);

        // Show N/A if rating is 0
        if (rating === 0) {
          return <span className="text-gray-500">N/A</span>;
        }

        return <RatingStars value={rating} isDisabled={true} />;
      },
    },
    {
      accessor: "overall_rating",
      header: "Overall Rating",
      showSort: true,
      cell: ({ row }) => {
        const rating = Number(row.original?.overall_rating ?? 0);

        if (rating === 0) {
          return <span className="text-gray-500">N/A</span>;
        }

        return <RatingStars value={rating} isDisabled={true} />;
      },
    },
    {
      accessor: "status",
      header: "Status",
      showSort: true,
      cell: ({ row }: { row: { original: dataTypes } }) => {
        const { postal_code } = row.original;

        const status = row.original.status?.toLowerCase() ?? "inactive";
        const statusStyles = {
          active: "text-[#067647] border-[1.5px] border-[#079455]",
          inactive: "text-[#C22E00] border-[1.5px] border-[#C22E00]",
        };

        return (
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              (statusStyles as any)[status as "active" | "inactive"] ||
              "bg-gray-200 text-gray-700"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      },
    },
    {
      accessor: "postal_code",
      header: "Zip Code",
      showSort: true,
      cell: ({ row }: { row: { original: dataTypes } }) => {
        const { postal_code } = row.original;

        return <span>{postal_code ? postal_code : "N/A"}</span>;
      },
    },
  ];

  // (no non-pagination changes)
  const filteredProviderData = useMemo(
    () =>
      (providerData ?? []).filter((item) =>
        `${item.first_name ?? ""} ${item.email ?? ""} ${item.id}`
          .toString()
          .toLowerCase()
          .includes(searchText.toLowerCase())
      ),
    [providerData, searchText]
  );

  // Dynamic totals from server
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

  // ---------- Pagination UI ----------

  // ----------------------------------------------------------

  return (
    <div className="mb-10">
      {!selectedUser && (
        <h2 className="space-grotesk text-[25px] font-bold text-heading leading-8 tracking-normal text-brand-ink">
          Care Provider Listing
        </h2>
      )}
      <div
        className={` mt-6 rounded-[10px] pt-6 ${
          selectedUser ? "" : "bg-white"
        }`}
      >
        {selectedUser ? (
          <UserInfo
            userData={selectedUser}
            goBack={() => setSelectedUser(false)}
          />
        ) : (
          <>
            <div className="mb-6 flex md:flex-row flex-col md:items-center px-5 md:justify-between">
              <h3 className="md:mb-0 mb-3 text-[20px] font-bold space-grotesk ">
                Care Providers
              </h3>

              <div className="hidden lg:flex lg:flex-1 lg:justify-end px-5">
                <CommonInput
                  placeholder="Search by Name, Email, or ID"
                  value={searchText}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  showImg={true}
                  imgSrc={searchIcon}
                  imgLeft={true}
                  inputClassName="text-sm inter placeholder-[#252525] "
                  containerClassName="rounded-[10px]"
                />
              </div>

              <div className="flex md:flex-row flex-col md:items-center md:gap-4 gap-3">
                <p className="text-[#252525] inter font-medium text-sm">
                  Filter by
                </p>
                <div className="relative" ref={dropdownRef}>
                  <PrimaryButton
                    btnText={
                      selectedRating ? `Ratings: ${selectedRating}+` : "Ratings"
                    }
                    showImg={true}
                    imgClass="w/[24px] h/[24px] object-cover"
                    img={filterIcon}
                    imgPosition="left"
                    btnClass="border border-[#252525] inter !px-4 md:w/[101px] h-[44px] w/full py-[10px] rounded-lg text-[#252525] text-sm font-medium"
                    onClick={() => setShowRatingDropdown((v) => !v)}
                  />
                  <AnimatePresence>
                    {showRatingDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute md:right-0 top-[60px] w-50 z-50"
                      >
                        <AdminRatingFilterDropDown
                          onRatingSelect={handleRatingSelect}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="mb-8">
              {loading ? (
                <p className="text-center text-gray-500 px-10 py-10">
                  <SkeletonTableLoader />
                </p>
              ) : (
                <>
                  <TanDataTable<dataTypes>
                    columns={columns}
                    data={providerData} /* now server provides current page */
                    // showCheckbox={true}
                    onRowSelect={(row) => console.log("Selected row:", row)}
                    showActions={true}
                    actions={(row) => (
                      <AdminDropdownAction
                        variant="default"
                        actions={[
                          {
                            label: "View Detail",
                            onClick: () => {
                              navigate(`/admin/careprovider-info/${row.id}`);
                            },
                            type: "view",
                          },
                        ]}
                      />
                    )}
                  />
                  {/* <Pagination /> */}
                </>
              )}
            </div>
            <div>
              <Pagination
                rowsPerPage={pageSize}
                totalRows={careProvidersData?.totalRecords || 0} 
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && userIdToDelete && (
        <DeleteConfirmationModal
          className="max-w-lg"
          loading={loading}
          userId={userIdToDelete}
          onClose={() => {
            setShowDeleteModal(false);
            setUserIdToDelete(null);
          }}
          onDelete={handleDeleteProvider}
        />
      )}
    </div>
  );
};

export default CareProviderDashboard;
