import React, { useEffect, useMemo, useRef, useState } from "react";
import TanDataTable from "@components/dashboard-components/tanstack-data-table/tan-data-table";
import DropdownActions from "@src/Components/Dashboardcomponents/dropdownactions/dropdownactions";
import filterIcon from "@assets/media/svgs/dashboard-svgs/filter-icon.svg";
import searchIcon from "@assets/media/svgs/patient-db-svgs/search-icon.svg";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import { PrimaryButton } from "@src/Components/Sharedcomponents/Buttons/Commonbutton/commonbutton";
import CommonInput from "@src/Components/Sharedcomponents/Inputs/CommonInput/commoninput";
import { TanDataTableColumn } from "@components/dashboard-components/tanstack-data-table/types";
import RatingStars from "@src/Components/Sharedcomponents/ratingstars";
import { AnimatePresence, motion } from "framer-motion";
import RatingFilterDropdown from "@src/Components/Dashboardcomponents/dropdowns/rating-filter-dropdown";
import { useNavigate } from "react-router-dom";
import Model from "@components/model/model";
import Pagination from "@src/Components/Pagination/pagination";
import DeleteReview from "../Forum/deletereview";
import apiEndpoint from "@src/shared/apiendpoint";
import { apiServices } from "@src/shared/apiservices";
import SkeletonTableLoader from "@src/Components/loader/skeltontableloader";
import AdminDropdownAction from "../admindropdownaction/admindropdownaction";
import AdminRatingFilterDropDown from "../admindropdownaction/adminratingfilterdropdown";

const Highlighter: React.FC<{ text?: string | number; query: string }> = ({
  text,
  query,
}) => {
  const source = (text ?? "").toString();
  const q = query.trim();
  if (!q) return <>{source}</>;

  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const re = new RegExp(`\\b(${escaped})\\b`, "gi");

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 3;
  const [totalRecords, setTotalRecords] = useState<number>(0);

  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const requestSeq = useRef(0);

  const dummyData = [
    {
      id: 1,
      reviewed: "RVW-001",
      first_name: "Dr. Sarah Johnson",
      organization_name: "CareWell Clinic",
      email: "sarah.johnson@carewellclinic.com",
      image: "uploads/providers/sarah-johnson.jpg",
      first_name1: "Emma Brown",
      email1: "emma.brown@example.com",
      rating: 5,
      reviews:
        "Dr. Sarah was very attentive and professional. Highly recommended!",
      date: "2025-09-12",
    },
    {
      id: 2,
      reviewed: "RVW-002",
      first_name: "Dr. James Carter",
      organization_name: "HealthLine Associates",
      email: "james.carter@healthline.co.uk",
      image: "",
      first_name1: "Oliver Smith",
      email1: "oliver.smith@example.com",
      rating: 4,
      reviews:
        "The appointment started a bit late, but overall I received excellent care.",
      date: "2025-08-29",
    },
    {
      id: 3,
      reviewed: "RVW-003",
      first_name: "Dr. Aisha Khan",
      organization_name: "London Health Centre",
      email: "aisha.khan@londonhealth.co.uk",
      image: "",
      first_name1: "Sophie Taylor",
      email1: "sophie.taylor@example.com",
      rating: 5,
      reviews:
        "Very understanding and helpful. Answered all my questions clearly.",
      date: "2025-09-05",
    },
    {
      id: 4,
      reviewed: "RVW-004",
      first_name: "Dr. Robert Allen",
      organization_name: "VisionCare Optics",
      email: "robert.allen@visioncare.co.uk",
      image: "",
      first_name1: "Jack Wilson",
      email1: "jack.wilson@example.com",
      rating: 3,
      reviews:
        "The eye exam was thorough, but the waiting time was longer than expected.",
      date: "2025-07-15",
    },
    {
      id: 5,
      reviewed: "RVW-005",
      first_name: "Dr. Olivia Green",
      organization_name: "NHS Specialist Dermatology",
      email: "olivia.green@nhs.uk",
      image: "",
      first_name1: "Mia Johnson",
      email1: "mia.johnson@example.com",
      rating: 4,
      reviews:
        "Good experience overall, but I wish the follow-up instructions were clearer.",
      date: "2025-08-03",
    },
    {
      id: 6,
      reviewed: "RVW-006",
      first_name: "Dr. David Patel",
      organization_name: "Medicare Plus",
      email: "david.patel@medicareplus.co.uk",
      image: "",
      first_name1: "Lucas Anderson",
      email1: "lucas.anderson@example.com",
      rating: 5,
      reviews: "Dr. Patel’s consultation was very detailed and reassuring.",
      date: "2025-09-20",
    },
    {
      id: 7,
      reviewed: "RVW-007",
      first_name: "Dr. Emma Thompson",
      organization_name: "BrightSmile Dental",
      email: "emma.thompson@brightsmile.com",
      image: "",
      first_name1: "Charlotte Evans",
      email1: "charlotte.evans@example.com",
      rating: 4,
      reviews:
        "Professional and caring staff, but dental prices were quite high.",
      date: "2025-07-28",
    },
    {
      id: 8,
      reviewed: "RVW-008",
      first_name: "Dr. Michael Ross",
      organization_name: "EverCare Health",
      email: "michael.ross@evercare.com",
      image: "",
      first_name1: "Harry White",
      email1: "harry.white@example.com",
      rating: 5,
      reviews: "One of the best neurologists I’ve visited. Strongly recommend.",
      date: "2025-09-10",
    },
    {
      id: 9,
      reviewed: "RVW-009",
      first_name: "Dr. Emily Davis",
      organization_name: "WellMind Psychiatry",
      email: "emily.davis@wellmind.co.uk",
      image: "",
      first_name1: "Isabella Moore",
      email1: "isabella.moore@example.com",
      rating: 4,
      reviews: "A very calm and empathetic doctor. Helped me feel comfortable.",
      date: "2025-09-18",
    },
    {
      id: 10,
      reviewed: "RVW-010",
      first_name: "Dr. Daniel Lee",
      organization_name: "CityCare Clinic",
      email: "daniel.lee@citycare.co.uk",
      image: "",
      first_name1: "William Harris",
      email1: "william.harris@example.com",
      rating: 3,
      reviews: "The doctor was good but the clinic was a bit crowded.",
      date: "2025-08-17",
    },
  ];

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
              <img
                src={
                  row.original.image
                    ? `${import.meta.env.VITE_APP_API_IMG_URL}${
                        row.original.image
                      }`
                    : dummyImage
                }
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = dummyImage;
                }}
                alt={row.original.first_name || "Patient"}
                className="w-[38px] h-[38px] rounded-full object-cover border border-gray-200"
              />
              <div className="flex flex-col">
                <span className="font-medium text-sm text-[#252525] leading-tight">
                  <Highlighter text={providerName} query={searchText} />
                </span>

                {organization_name ? (
                  <span className="text-xs text-[#252525] leading-tight">
                    <Highlighter text={organization_name} query={searchText} />
                  </span>
                ) : null}

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
                    ? `${import.meta.env.VITE_APP_API_IMG_URL}${image}`
                    : dummyImage
                }
                onError={(e) => {
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

  const fetchReviews = async (ratingFilter: string, page = 1, search = "") => {
    const seq = ++requestSeq.current;
    setIsLoading(true);

    let url = `feedback?page=${page}&limit=${pageSize}`;
    const params: string[] = [];
    if (ratingFilter) params.push(`rating=${encodeURIComponent(ratingFilter)}`);
    if (search.trim())
      params.push(`search=${encodeURIComponent(search.trim())}`); 

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
      if (seq === requestSeq.current) {
        setTableData([]);
        setTotalRecords(0);
      }
    } finally {
      if (seq === requestSeq.current) setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchReviews(selectedRating, 1, searchText);
  }, [selectedRating]);

  useEffect(() => {
    fetchReviews(selectedRating, currentPage, searchText);
  }, [currentPage]);

  useEffect(() => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      setCurrentPage(1);
      fetchReviews(selectedRating, 1, searchText);
    }, 500);
    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    };
  }, [searchText]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleRatingSelect = (rating: string) => {
    setSelectedRating(rating);
  };

  const filteredReviews = useMemo(() => {
    const q = searchText.trim();
    if (!q) return tableData;

    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const wordBoundary = new RegExp(`\\b${escaped}\\b`, "i");

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

  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage, totalRecords]);

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
      toast({ description: "Something went wrong.", variant: "error" });
    }
  };

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
          <h3 className="md:mb-0 space-grotesk text-[20px] font-bold mb-3">
            All Reviews
          </h3>

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
            <p className="text-[#252525] font-medium inter text-sm">
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
                    <AdminRatingFilterDropDown
                      onRatingSelect={handleRatingSelect}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>


        {isLoading ? (
          <div className="text-center text-gray-500 px-10 mt-6">
            <SkeletonTableLoader />
          </div>
        ) : (
          <>
            <TanDataTable<DataRow>
              columns={columns}
              data={dummyData}
              showCheckbox={false}
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
                  ]}
                />
              )}
            />
          </>
        )}
      </div>
      <div>
        <Pagination
          rowsPerPage={pageSize}
          totalRows={totalRecords || 0} 
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
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

function toast(arg0: { description: string; variant: string }) {}
