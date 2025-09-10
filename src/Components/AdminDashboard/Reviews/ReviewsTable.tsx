import React, { useEffect, useMemo, useRef, useState } from "react";
import TanDataTable from "@components/Dashboard-components/Tanstack-data-table/TanDataTable";
import DropdownActions from "@components/Dashboard-components/Dropdown-actions/DropdownActions";
import filterIcon from "@assets/media/svgs/dashboard-svgs/filter-icon.svg";
import searchIcon from "@assets/media/svgs/patient-db-svgs/search-icon.svg";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import CommonInput from "@components/Shared-components/Inputs/Common-Input/CommonInput";
import { TanDataTableColumn } from "@components/Dashboard-components/Tanstack-data-table/types";
import RatingStars from "@components/Shared-components/RatingStars";
import { AnimatePresence, motion } from "framer-motion";
import RatingFilterDropdown from "@components/Dashboard-components/Dropdowns/RatingFilterDropdown";
import { useNavigate } from "react-router-dom";
import Model from "@components/Model/Model";
import Pagination from "@components/Pagination/Pagination";
import DeleteReview from "../Forum/DeleteReview";
import apiEndpoint from "@src/Shared/apiEndPoint";
import { apiServices } from "@src/Shared/apiServices";
import SkeletonTableLoader from "@components/Loader/SkeltonTableLoader";
import AdminDropdownAction from "../AdminDropdownAction/AdminDropdownAction";
import AdminRatingFilterDropDown from "../AdminDropdownAction/AdminRatingFilterDropDown";

// ---- Small, safe highlighter for exact matches (word-boundary by default)
const Highlighter: React.FC<{ text?: string | number; query: string }> = ({
  text,
  query,
}) => {
  const source = (text ?? "").toString();
  const q = query.trim();
  if (!q) return <>{source}</>;

  // Escape regex special chars from user input
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Word-boundary regex to show EXACT term the user typed
  const re = new RegExp(`\\b(${escaped})\\b`, "gi");

  // If no word-boundary hit, fall back to a plain case-insensitive find so IDs/emails still highlight
  if (!re.test(source)) {
    const soft = new RegExp(`(${escaped})`, "gi");
    return (
      <>
        {source.split(soft).map((part, i) =>
          i % 2 === 1 ? (
            <mark key={i} className="bg-yellow-200 rounded px-0.5">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  }

  // Reset lastIndex since we used .test
  re.lastIndex = 0;
  return (
    <>
      {source.split(re).map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="bg-yellow-200 rounded px-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};

type DataRow = {
  id: string | number;
  reviewed: string;
  first_name?: string;
  organization_name?: string;
  email?: string;
  first_name1?: string;
  email1?: string;
  date?: string;
  reviews?: string;
  rating?: number;
  image?: string;
  status?: string;
};

// ReviewRecord type from backend
type ReviewRecord = {
  feedback: { review_id: string | number };
  id: string | number;
  care_provider?: {
    id: string | number;
    first_name?: string;
    last_name?: string;
    email?: string;
    organization_name?: string;
    image?: string;
  };
  patient?: { first_name?: string; last_name?: string; email?: string };
  organization_name?: string;
  created_at: string;
  content: string;
  rating: number;
};

const ReviewsTable: React.FC = () => {
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedRating, setSelectedRating] = useState<string>("");
  const [tableData, setTableData] = useState<DataRow[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [data, setData] = useState();
  // --- Pagination (SERVER-SIDE) ---
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 3;
  const [totalRecords, setTotalRecords] = useState<number>(0);
  // --------------------------

  // Debounce for search -> server request
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sequence guard to prevent stale response overwrites
  const requestSeq = useRef(0);

  // ---------------- Columns (with highlight support)
  const columns: TanDataTableColumn<DataRow>[] = useMemo(
    () => [
      {
        accessor: "reviewed",
        header: "Review ID",
        showSort: true,
        cell: ({ row }) => (
          <Highlighter text={row.original.reviewed} query={searchText} />
        ),
      },
      {
        accessor: "first_name",
        header: "Provider’s Name",
        showSort: true,
        cell: ({ row }) => {
          const { first_name, organization_name, email, image } = row.original;
          const providerName = first_name;
          return (
            <div className="flex w-55 items-center gap-3">
              {/* <img
              src={`${import.meta.env.VITE_APP_API_IMG_URL}${image}`}
              alt={`${providerName ?? "Provider"}`}
              className="w-[38px] h-[38px] rounded-full object-cover border border-gray-200"
            /> */}
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
                {/* Name (always first line) */}
                <span className="font-medium text-sm text-[#252525] leading-tight">
                  <Highlighter text={providerName} query={searchText} />
                </span>

                {/* Organization (second line, when present) */}
                {organization_name ? (
                  <span className="text-xs text-[#252525] leading-tight">
                    <Highlighter text={organization_name} query={searchText} />
                  </span>
                ) : null}

                {/* Email (last line) */}
                <span className="text-xs text-gray-500 leading-tight">
                  <Highlighter text={email} query={searchText} />
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
        cell: ({ row }) => {
          const { first_name1, email1, image } = row.original;
          return (
            <div className="flex w-55 items-center gap-3">
              <img
                src={
                  image
                    ? `${import.meta.env.VITE_APP_API_IMG_URL}${
                        image
                      }`
                    : dummyImage
                }
                onError={(e) => {
                  // if broken URL, fallback to dummyImage
                  (e.currentTarget as HTMLImageElement).src = dummyImage;
                }}
                alt={first_name1 || "Patient"}
                className="w-[38px] h-[38px] rounded-full object-cover border border-gray-200"
              />
              <div className="flex flex-col">
                <span className="font-medium text-sm text-[#252525] leading-tight">
                  <Highlighter text={first_name1} query={searchText} />
                </span>
                <span className="text-xs text-gray-500 leading-tight">
                  <Highlighter text={email1} query={searchText} />
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
        cell: ({ row }) => (
          <RatingStars value={row.original.rating ?? 0} isDisabled={true} />
        ),
      },
      {
        accessor: "reviews",
        header: "Reviews",
        showSort: true,
        cell: ({ row }) => (
          <div className="w-[225px] whitespace-normal break-words text-sm text-gray-700">
            <Highlighter text={row.original.reviews} query={searchText} />
          </div>
        ),
      },
      {
        accessor: "date",
        header: "Date Posted",
        showSort: true,
        cell: ({ row }) => (
          <Highlighter text={row.original.date} query={searchText} />
        ),
      },
    ],
    [searchText]
  );

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

  // Function to fetch reviews — supports server-side pagination + optional search
  const fetchReviews = async (ratingFilter: string, page = 1, search = "") => {
    const seq = ++requestSeq.current;
    setIsLoading(true);

    // Always send page & limit
    let url = `feedback?page=${page}&limit=${pageSize}`;
    const params: string[] = [];
    if (ratingFilter) params.push(`rating=${encodeURIComponent(ratingFilter)}`);
    if (search.trim())
      params.push(`search=${encodeURIComponent(search.trim())}`); // only send when user searched

    if (params.length) url += `&${params.join("&")}`;

    try {
      const response = await apiServices.get(url);

      if (seq !== requestSeq.current) return;

      const records = response?.data?.payload?.records ?? [];
      const total =
        response?.data?.payload?.totalRecords ?? records.length ?? 0;

      if (response?.data?.success) {
        const transformed: DataRow[] = records.map(
          (item: ReviewRecord, index: number) => ({
            id: item?.feedback?.review_id ?? item?.id,
            // care_provider_id: item?.care_provider?.id,
            reviewed: `RV-${(page - 1) * pageSize + (index + 1)}`,
            first_name: `${item.care_provider?.first_name ?? ""} ${
              item.care_provider?.last_name ?? ""
            }`.trim(),
            organization_name: item.care_provider?.organization_name ?? "",
            email: item.care_provider?.email ?? "",
            first_name1: `${item.patient?.first_name ?? ""} ${
              item.patient?.last_name ?? ""
            }`.trim(),
            email1: item.patient?.email ?? "",
            date: new Date(item.created_at).toLocaleDateString(),
            reviews: item.content ?? "",
            rating: item.rating,
            image: item.care_provider?.image ?? dummyImage,
          })
        );
        setTableData(transformed);
        setTotalRecords(total);
      } else {
        setTableData([]);
        setTotalRecords(0);
      }
    } catch (error) {
      console.error("🔥 Error fetching reviews", error);
      if (seq === requestSeq.current) {
        setTableData([]);
        setTotalRecords(0);
      }
    } finally {
      if (seq === requestSeq.current) setIsLoading(false);
    }
  };

  // Initial load & when rating changes -> reset to page 1 (include current search)
  useEffect(() => {
    setCurrentPage(1);
    fetchReviews(selectedRating, 1, searchText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRating]);

  // Re-fetch when page changes (include current search)
  useEffect(() => {
    fetchReviews(selectedRating, currentPage, searchText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // Debounced server search when searchText changes -> reset to page 1
  useEffect(() => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      setCurrentPage(1);
      fetchReviews(selectedRating, 1, searchText);
    }, 500);
    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  // Input handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // Rating selection
  const handleRatingSelect = (rating: string) => {
    setSelectedRating(rating);
  };

  // local highlight filtering (now also checks organization_name)
  const filteredReviews = useMemo(() => {
    const q = searchText.trim();
    if (!q) return tableData;

    // Escape regex characters from user input
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Word-boundary exact match for human names/review text
    const wordBoundary = new RegExp(`\\b${escaped}\\b`, "i");

    // Equality / soft contains for IDs or emails
    const equalsCI = (a?: string | number) =>
      a !== undefined &&
      a !== null &&
      a.toString().toLowerCase() === q.toLowerCase();

    const containsCI = (a?: string | number) =>
      a !== undefined &&
      a !== null &&
      a.toString().toLowerCase().includes(q.toLowerCase());

    return tableData.filter((r) => {
      const inProviderName = r.first_name
        ? wordBoundary.test(r.first_name)
        : false;
      const inOrgName = r.organization_name
        ? wordBoundary.test(r.organization_name)
        : false;
      const inPatientName = r.first_name1
        ? wordBoundary.test(r.first_name1)
        : false;
      const inReviewText = r.reviews ? wordBoundary.test(r.reviews) : false;

      const inProviderEmail = equalsCI(r.email) || containsCI(r.email);
      const inPatientEmail = equalsCI(r.email1) || containsCI(r.email1);
      const inReviewId = equalsCI(r.reviewed) || containsCI(r.reviewed);
      const inBackendId = equalsCI(r.id) || containsCI(r.id);

      return (
        inProviderName ||
        inOrgName ||
        inPatientName ||
        inReviewText ||
        inProviderEmail ||
        inPatientEmail ||
        inReviewId ||
        inBackendId
      );
    });
  }, [searchText, tableData]);

  // ---------- Pagination calculations (SERVER totals) ----------
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage, totalRecords]);

  // Approve / Delete logic
  const [selectedToApprove, setSelectedToApprove] = useState<null | DataRow>(
    null
  );
  const [showApproveModel, setShowApproveModel] = useState(false);

  const handleApproveReview = async () => {
    if (!selectedToApprove) return;

    try {
      const response = await apiServices.update(
        { status: "APPROVED" },
        apiEndpoint.approveFeedback(selectedToApprove.id)
      );

      if (response?.data?.success) {
        toast({
          description: "Review approved successfully.",
          variant: "success",
        });
        // Update the table data to reflect the approval status
        setTableData((prev) =>
          prev.map((item) =>
            item.id === selectedToApprove.id
              ? { ...item, status: "APPROVED" }
              : item
          )
        );

        setShowApproveModel(false);
      } else {
        toast({ description: "Failed to approve review.", variant: "error" });
      }
    } catch (error) {
      console.error("🔥 Error approving review", error);
      toast({ description: "Something went wrong.", variant: "error" });
    }
  };

  // Delete Api Integration
  const [selectedToDelete, setSelectedToDelete] = useState<null | DataRow>(
    null
  );
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [deleteCompleted, setDeleteCompleted] = useState(false);

  const handleDeleteReview = async () => {
    if (!selectedToDelete) return;
    try {
      const response = await apiServices.delete(
        `${apiEndpoint.deleteFeedback}/${selectedToDelete.id}`
      );
      if (response?.data?.success) {
        toast({
          description: "Review deleted successfully.",
          variant: "success",
        });
        setTableData((prev) =>
          prev.filter((item) => item.id !== selectedToDelete.id)
        );
        setDeleteCompleted(true);
      } else {
        toast({ description: "Failed to delete review.", variant: "error" });
      }
    } catch (error) {
      console.error("🔥 Error deleting review", error);
      toast({ description: "Something went wrong.", variant: "error" });
    }
  };
  return (
    <div className="mb-10">
      <h2 className="space-grotesk text-[25px] font-bold text-heading leading-8 tracking-normal text-brand-ink">
        Reviews List
      </h2>

      <div className="mt-6 bg-[#FFFFFF] rounded-[10px] px-4 py-6 ">
        <div className="mb-6 flex md:flex-row flex-col md:items-center md:justify-between">
          <h3 className="md:mb-0 space-grotesk text-[20px] font-bold mb-3">All Reviews</h3>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end px-5">
            <CommonInput
              placeholder="Search by Reviewer Name, Email, Review ID, or Provider Name"
              value={searchText}
              onChange={handleSearchChange}
              showImg={true}
              imgSrc={searchIcon}
              imgLeft={true}
              inputClassName="text-sm inter placeholder-[#252525]"
              containerClassName="rounded-[10px]"
            />
          </div>

          <div className="flex md:flex-row flex-col md:items-center gap-3">
            <p className="text-[#252525] font-medium inter text-sm">Filter by</p>
            <div className="relative" ref={dropdownRef}>
              <PrimaryButton
                btnText={
                  selectedRating ? `Ratings: ${selectedRating}+` : "Ratings"
                }
                showImg={true}
                imgClass="w/[24px] h/[24px] object-cover"
                img={filterIcon}
                imgPosition="left"
                btnClass="border inter border-[#252525] !px-4 md:w/[101px] h-[44px] w/full py-[10px] rounded-lg text-[#252525] text-sm font-medium"
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
                    <AdminRatingFilterDropDown onRatingSelect={handleRatingSelect} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* If no reviews are found, display the message */}

        {isLoading ? (
          <div className="text-center text-gray-500 px-10 mt-6">
            <SkeletonTableLoader />
          </div>
        ) : (
          <>
            <TanDataTable<DataRow>
              columns={columns}
              data={
                filteredReviews
              } /* server returns the current page; we keep local highlight-only filtering */
              showCheckbox={false}
              onRowSelect={(row) => console.log("Selected row:", row)}
              showActions={true}
              className="my-custom-class"
              actions={(row) => (
                <AdminDropdownAction
                  variant="default"
                  actions={[
                    {
                      label: "View Details",
                      onClick: () => navigate(`/admin/reviewdetail/${row.id}`),
                      type: "view",
                    },
                    // {
                    //   label: "Approve Review",
                    //   onClick: () => {
                    //     setSelectedToApprove(row);
                    //     setShowApproveModel(true);
                    //   },
                    //   type: "edit",
                    // },
                    // {
                    //   label: "Delete Review",
                    //   onClick: () => {

                    //     setSelectedToDelete(row);
                    //     setShowDeleteModel(true);
                    //   },
                    //   type: "delete",
                    // },
                  ]}
                />
              )}
            />
            {/* <Pagination /> */}
            {/* Pagination */}
          </>
        )}
      </div>
      <div>
        <Pagination
          rowsPerPage={pageSize}
          totalRows={totalRecords || 0} // ✅ API ka totalRecords use karo
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
      {/* {showDeleteModel && (
        <Model className="max-w-lg" setIsOpen={setShowDeleteModel}>
          <DeleteReview />
        </Model>
      )} */}
      {/* Delete review modal */}
      {showDeleteModel && (
        <Model className="max-w-lg" setIsOpen={setShowDeleteModel}>
          {!deleteCompleted ? (
            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold mb-4 text-[#2F3542]">
                Are you sure you want to delete this review?
              </h2>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => setShowDeleteModel(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteReview}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <DeleteReview />
          )}
        </Model>
      )}

      {/* Approve review modal */}
      {showApproveModel && (
        <Model className="max-w-lg" setIsOpen={setShowApproveModel}>
          <div className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4 text-[#2F3542]">
              Are you sure you want to approve this review?
            </h2>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setShowApproveModel(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleApproveReview}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Approve
              </button>
            </div>
          </div>
        </Model>
      )}
    </div>
  );
};

export default ReviewsTable;

function toast(arg0: { description: string; variant: string }) {
  console.log(`[${arg0.variant.toUpperCase()}] ${arg0.description}`);
}
