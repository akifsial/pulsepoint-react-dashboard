import React, { useState, useEffect, useRef } from "react";
import TanDataTable from "@src/Components/dashboard-components/tanstack-data-table/tan-data-table";
import DropdownActions from "@src/Components/Dashboard-components/dropdownactions/dropdownactions";
import filterIcon from "@assets/media/svgs/dashboard-svgs/filter-icon.svg";
import { PrimaryButton } from "@src/Components/Sharedcomponents/Buttons/Commonbutton/commonbutton";
import { AnimatePresence, motion } from "framer-motion";
import RatingFilterDropdown from "@src/Components/Dashboard-components/dropdowns/ratingfilterdropdown";
import RatingStars from "@src/Components/Sharedcomponents/ratingstars";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import searchIcon from "@assets/media/svgs/patient-db-svgs/search-icon.svg";
import CommonInput from "@src/Components/Sharedcomponents/Inputs/CommonInput/commoninput";
import { TanDataTableColumn } from "@src/Components/dashboard-components/tanstack-data-table/types";
import ReviewForm from "@src/Components/Review/reviewform";
import Toast from "@src/Components/Toast/toast";
import { useApiMyReviews } from "@src/hooks/usemyreviews";
import dayjs from "dayjs";
import Pagination from "@src/Components/Pagination/pagination";
import DeleteModal from "@src/Components/Model/deletemodal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteMyReviews } from "@src/api/apimyreviews";
import { useNavigate } from "react-router-dom";
import TableSkeletonLoader from "@src/Components/Loaders/tableskeletonloader";
import { useMeApi } from "@src/hooks/useusers";

const AdminPatientReviews: React.FC = () => {
  const [showRatingDropdown, setShowRatingDropdown] = React.useState(false);
  const [searchText, setSearchText] = React.useState<string>("");
  const [rating, setRating] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(true);
  const [filterValue, setFilterValue] = useState(false);
  const navigate = useNavigate();
  const { data: MeData, refetch: MeDataFetch } = useMeApi(navigate);

  useEffect(() => {
    MeDataFetch();
  });

  const [limit, setLimit] = useState(10);

  const {
    data,
    isLoading: isLoadingUseApiMyReviews,
    isFetching,
    refetch,
  } = useApiMyReviews(
    debouncedSearchText,
    rating,
    filterValue,
    page,
    sort == true ? "desc" : "asc",
    limit
  );

  const onSortClick = () => {
    setSort(!sort);
    refetch();
  };
  const queryClient = useQueryClient();
  const [currentView, setCurrentView] = React.useState<"table" | "form">(
    "table"
  );
  const [currentEditingReview, setCurrentEditingReview] =
    React.useState<ReviewDataTypes | null>(null);

  const [showSuccessToast, setShowSuccessToast] = React.useState(false);

  type ReviewDataTypes = {
    id?: number;
    provider_name?: string;
    provider_email?: string;
    date?: string;
    rating?: number | string | React.ReactNode;
    numericRating?: number;
    reviews?: string;
    location?: string;
    provider_logo?: string;
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    setPage(1);
  }, [searchText]);

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

  const handleEditReview = (id: number | string) => {
    navigate(`/patient/patient-feedback/edit/${id}`);
  };

  const { mutateAsync: deleteMutation } = useMutation({
    mutationFn: (id: number) => apiDeleteMyReviews(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["useApiMyReviews", debouncedSearchText, rating],
      });
      setIsDeleteModalOpen(false);
    },
  });

  const handleDelete = async () => {
    if (selectedRowId !== null) {
      await deleteMutation(selectedRowId);
    }
  };

  const handleSaveReview = (updatedReview: {
    rating: number;
    comment: string;
  }) => {
    if (currentEditingReview) {
      setShowSuccessToast(true);

      setTimeout(() => {
        setCurrentView("table");
        setCurrentEditingReview(null);
      }, 1500);
    }
  };

  const handleCancelEdit = () => {
    setCurrentView("table");
    setCurrentEditingReview(null);
  };

  const handleToastClose = () => {
    setShowSuccessToast(false);
    if (currentView === "form") {
      setCurrentView("table");
      setCurrentEditingReview(null);
    }
  };

  const columns: TanDataTableColumn<ReviewDataTypes>[] = [
    {
      accessor: "provider_name",
      header: "Provider's Name",
      showSort: true,
      width: "250px",
      cell: ({ row }: { row: { original: ReviewDataTypes } }) => {
        const { provider_name, care_provider, provider_email, provider_logo } =
          row.original;
        return (
          <div
            className="flex me-5 cursor-pointer items-center gap-3"
            onClick={() =>
              navigate(`/patient/care-provider/${care_provider?.id}`)
            }
          >
            <img
              src={provider_logo || dummyImage}
              alt={provider_name}
              className="w-[38px] h-[38px] rounded-full object-cover border border-gray-200"
            />
            <div className="flex flex-col">
              <span className="font-medium text-sm text-[#252525] leading-tight">
                {care_provider?.organization_name?.length>20 ? care_provider?.organization_name?.slice(0,20)+"..." : care_provider?.organization_name}
              </span>
              <span className="text-xs text-gray-500 leading-tight">
                {care_provider?.email}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessor: "date",
      header: <span className="">Date</span>,
      width: "200px",
      showSort: true,
      cell: (row) => (
        <i className="">
          {dayjs(row?.original?.created_at).format("DD/MM/YY")}
        </i>
      ),
    },

    {
      accessor: "rating",
      header: "Rating",
      showSort: true,
      cell: ({ getValue }) => {
        const rating = Number(getValue()) || 0;
        const totalStars = 5;

        if (rating === 0) {
          return <span className="text-gray-500 ">N/A</span>;
        }

        const StarIcon = ({ filled }: { filled: boolean }) => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={filled ? "#FACC15" : "#D1D5DB"} 
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
      header: "Content",
      width: "150px",
      showSort: false,
      cell: ({ getValue }) => (
        <div className="flex max-w-[180px] justify-center">
          {getValue() ? (
            <span className="truncate block w-[150px] text-left">
              {getValue()}
            </span>
          ) : (
            <span className="text-gray-500">N/A</span>
          )}
        </div>
      ),
    },
    {
      accessor: "address",
      header: "Location",
      showSort: true,
      cell: ({ row }: { row: { original: ReviewDataTypes } }) => {
        const { care_provider } = row.original;
        const address = care_provider?.address || "N/A";

        return (
          <div className="max-w-[150px]">
            <span
              className={
                address === "N/A"
                  ? "text-gray-500 flex justify-center w-[180px]"
                  : "truncate block w-[180px] text-left"
              }
              title={address !== "N/A" ? address : ""}
            >
              {address}
            </span>
          </div>
        );
      },
    },
  ];

  const handleRowSelect = (row: ReviewDataTypes) => {};

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  const renderTableView = () => (
    <div className="mb-10">
      <h2
        className="
          space-grotesk
          !font-bold
          text-heading
          leading-8
          tracking-normal
          text-brand-ink
          align-middle
          mb-6
          text-[25px]
        "
      >
        My Reviews
      </h2>
      <div className="bg-[#FFFFFF] h-fit rounded-tr-[10px] rounded-tl-[10px] px-4 py-6">
        <div className="mb-6 flex md:flex-row flex-col md:items-center md:justify-between">
          <h3 className="md:mb-0 mb-3 space-grotesk text-[20px] font-bold">
            Given Reviews
          </h3>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:px-5 px-0">
            <CommonInput
              placeholder="Search with Provider name, zipcode"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              showImg={true}
              imgSrc={searchIcon}
              imgLeft={true}
              inputClassName="text-sm placeholder-[#252525]"
              containerClassName="w-full border-[#252525] rounded-lg py-3 max-w-sm"
            />
          </div>
          <div className="flex md:flex-row flex-col md:items-center md:gap-4 gap-3">
            <p className="text-[#252525] font-medium inter text-sm">
              Filter By
            </p>
            <div className="relative" ref={dropdownRef}>
              <div className="flex items gap-4">
                <button
                  onClick={() => setShowRatingDropdown(!showRatingDropdown)}
                  className={`border border-[#252525] px-4 md:w-[110px] w-full py-[5px] cursor-pointer rounded-[30px] text-[#252525] text-sm font-medium flex items-center justify-center gap-1.5`}
                >
                  {rating ? rating : ""}
                  <span className="inter text-[14px] font-medium">Ratings</span>
                  <img
                    src={filterIcon}
                    alt="filter icon"
                    className="w-[24px] h-[24px] object-cover"
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
                    className="absolute md:left-[-100px] top-[50px] w-50 z-50"
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
          {isLoadingUseApiMyReviews ? (
            <TableSkeletonLoader />
          ) : (
            <div className="overflow-x-auto w-full h-fit overflow-y-auto">
              <TanDataTable<ReviewDataTypes>
                columns={columns ?? []}
                data={data?.records ?? []}
                showCheckbox={false}
                onRowSelect={handleRowSelect}
                showActions={true}
                onSortClick={onSortClick}
                className="my-custom-class"
                actions={(row) => (
                  <DropdownActions
                    onEdit={() => handleEditReview(row?.feedback?.review_id)}
                    variant="reviews"
                    onDelete={() => {
                      setSelectedRowId(row?.feedback?.review_id); 
                      setIsDeleteModalOpen(true);
                    }}
                  />
                )}
              />
            </div>
          )}

          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedRowId(null);
            }}
            onDelete={handleDelete}
          />
          <div>
            <Pagination
              onPageChange={handlePageChange}
              totalRows={data?.totalRecords}
              currentPage={page}
              rowsPerPage={10}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderFormView = () => (
    <div className="mb-10 w-full h-[474px] p-[20px_23px_20px_23px] gap-[25px] rounded-[10px]">
      <h2
        className="
          font-space-grotesk
          font-bold
          text-heading
          leading-8
          tracking-normal
          text-brand-ink
          align-middle
          mb-4
        "
      >
        Leave A Review
      </h2>

      <div className="mt-6 bg-white rounded-[10px] px-4 py-6 mb-6 gap-[25px]">
        <ReviewForm
          currentReview={{
            rating: currentEditingReview?.numericRating || 0,
            comment: currentEditingReview?.reviews || "",
          }}
          onSave={handleSaveReview}
          onCancel={handleCancelEdit}
        />
      </div>
    </div>
  );

  return (
    <>
      {currentView === "table" ? renderTableView() : renderFormView()}

      <Toast
        isVisible={showSuccessToast}
        title="Review Added Successfully"
        message="You have successfully changed password"
        type="success"
        duration={3000}
        onClose={handleToastClose}
        showCloseButton={true}
      />
    </>
  );
};

export default AdminPatientReviews;
