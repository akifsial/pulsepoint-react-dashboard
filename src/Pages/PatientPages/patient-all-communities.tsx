import React, { useState, useEffect, useRef } from "react";
import TanDataTable from "@components/dashboard-components/tanstack-data-table/tan-data-table";
import DropdownActions from "@components/dashboard-components/dropdown-actions/dropdown-actions";
import filterIcon from "@assets/media/svgs/dashboard-svgs/filter-icon.svg";
import { PrimaryButton } from "@components/shared-components/buttons/common-button/common-button";
import { AnimatePresence, motion } from "framer-motion";
import RatingFilterDropdown from "@components/dashboard-components/dropdowns/rating-filter-dropdown";
import RatingStars from "@components/shared-components/rating-stars";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import searchIcon from "@assets/media/svgs/patient-db-svgs/search-icon.svg";
import CommonInput from "@components/shared-components/inputs/common-input/common-input";
import { TanDataTableColumn } from "@components/dashboard-components/tanstack-data-table/types";
import ReviewForm from "@components/review/review-form";
import Toast from "@components/toast/toast";
import Pagination from "@components/pagination/pagination";
import { useApiMyReviews } from "@src/hooks/use-my-reviews";
import dayjs from "dayjs";
import DeleteModal from "@components/model/delete-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteMyReviews } from "@src/api/api-my-reviews";
import { useNavigate } from "react-router-dom";
import { useGetAllCommunities } from "@src/hooks/use-community";
import JoinModal from "@components/model/join-modal";
import { Trash, XCircleIcon } from "lucide-react";
import {
  ApiGetPopularCommunities,
  ApiJoinCommunity,
} from "@src/api/api-community-forum";
import TableSkeletonLoader from "@components/loaders/table-skeleton-loader";
import { useMeApi } from "@src/hooks/use-users";

const PatientAllCommunites: React.FC = () => {
  const [showRatingDropdown, setShowRatingDropdown] = React.useState(false);
  const [searchText, setSearchText] = React.useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
  const [isUnSubscribeModalOpen, setIsUnSubscribeModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(true);
  const navigate=useNavigate()
    const { data:MeData,refetch:MeDataFetch } = useMeApi(navigate);
  
    useEffect(()=>{
      MeDataFetch()
    })
  

  const {
    data,
    isLoading: isLoadingUseGetAllCommunities,
    refetch,
  } = useGetAllCommunities(
    debouncedSearchText,
    page,
    sort == true ? "desc" : "asc"
  );

  const queryClient = useQueryClient();
  const [currentView, setCurrentView] = React.useState<"table" | "form">(
    "table"
  );

  const onSortClick = () => {
    setSort(!sort);
    refetch();
  };
  const [currentEditingReview, setCurrentEditingReview] =
    React.useState<ReviewDataTypes | null>(null);

  const [showSuccessToast, setShowSuccessToast] = React.useState(false);
  const [selectedCommunityId, setSelectedCommunityId] = useState();
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

  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchText]);

  const dropdownRef = useRef<HTMLDivElement>(null);

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
  };

  const { mutateAsync: deleteMutation, isPending: deleteMutationLoading } =
    useMutation({
      mutationFn: () => apiDeleteMyReviews(selectedRowId),
      onSuccess: async () => {
        queryClient.invalidateQueries(["useApiMyReviews"]); 
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

  const userInfo=JSON.parse(localStorage.getItem("userInfo"))
  const columns: TanDataTableColumn<ReviewDataTypes>[] = [
    {
      accessor: "provider_name",
      header: "Creator's Name",
      width: "200px",
      showSort: true,
      cell: ({ row }: { row: { original: ReviewDataTypes } }) => {
        const { creator, id } = row.original;
        const imageUrl = creator?.image
          ? `${import.meta.env.VITE_APP_API_IMG_URL}${creator.image}`
          : dummyImage;

        return (
          <div
            className="flex me-3 cursor-pointer items-center gap-3 pe-10"
            onClick={() => ( userInfo?.role_type=="PATIENT" ? navigate(`/patient/community-account/${id}`) : navigate(`/care-provider/community-account/${id}`))}
          >
            <img
              src={imageUrl}
              alt={`${creator?.first_name ?? creator?.user_name ?? "User"} ${
                creator?.last_name ?? ""
              }`}
              className="w-[38px] h-[38px] rounded-full object-cover border border-gray-200"
            />
            <div className="flex flex-col">
              <span className="font-medium text-sm text-[#252525] leading-tight">
                {creator?.first_name ?? creator?.user_name} {creator?.last_name}
              </span>
              <span className="text-xs text-gray-500 leading-tight">
                {creator?.email}
              </span>
            </div>
          </div>
        );
      },
    },

    {
      accessor: "title",
      width: "200px",
      header: "Community Name",
      showSort: false,
    },
    {
      accessor: "description",
      width: "600px",
      header: "Description",
      showSort: true,
    },
    {
      accessor: "date",
      width: "150px",
      header: "Date",
      showSort: true,
      cell: (row) => (
        <i>{dayjs(row?.original?.created_at).format("DD-MMMM-YYYY")}</i>
      ),
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



  const {
    mutateAsync: LeaveCommunityMutation,
    isPending: isPendingLeaveCommunity,
  } = useMutation({
    mutationFn: (data) => ApiJoinCommunity(data),
    onSuccess: async () => {
      setIsUnSubscribeModalOpen(false);
      queryClient.invalidateQueries(["useGetAllCommunities"]);
    },
    onError: (error) => {
    },
  });

  const handleLeaveCommunity = async (postId) => {
    const data = {
      community_id: selectedCommunityId,
    };
    await LeaveCommunityMutation(data);
  };

  const userId = JSON.parse(localStorage.getItem("userInfo"))?.id;

  const renderTableView = () => (
    <div className="mb-10">
      <h2
        className="
          space-grotesk
          font-bold
          text-heading
          leading-8
          tracking-normal
          text-brand-ink
          align-middle
          mb-6
          text-[25px]
        "
      >
        My Comunities
      </h2>
      <div className="bg-[#FFFFFF] h-fit rounded-tr-[10px] rounded-tl-[10px] px-4 py-6">
        <div className="mb-6 flex md:flex-row flex-col md:items-center md:justify-between">
          <h3 className="md:mb-0 mb-3 text-[20px] font-bold space-grotesk">All Communities</h3>
        
        </div>

        <div className="overflow-x-auto w-full h-fit overflow-y-auto">
          {isLoadingUseGetAllCommunities ? (
            <TableSkeletonLoader />
          ) : (
            <div className="h-[300px] overflow-x-auto w-[100%] overflow-y-auto">
              <TanDataTable<ReviewDataTypes>
                columns={columns ?? []}
               
                data={data?.records ?? []}
                showCheckbox={false}
                onRowSelect={handleRowSelect}
                onSortClick={onSortClick}
                showActions={true}
                className="my-custom-class"
                actions={(row) => {
                  return (
                    <div className="flex justify-center gap-3 items-center">

                      <PrimaryButton
                        btnText="Leave"
                        btnClass="bg-red-100 text-red-700 hover:bg-red-200 border border-red-300 font-medium rounded-md !px-4 py-1.5 flex items-center gap-2"
                        onClick={() => {
                          setIsUnSubscribeModalOpen(true);
                          setSelectedCommunityId(row.id);
                        }}
                      >
                        <XCircleIcon className="w-4 h-4" />{" "}
                      </PrimaryButton>
                    </div>
                  );
                }}
              />
            </div>
          )}

          <JoinModal
            isOpen={isUnSubscribeModalOpen}
            onClose={() => {
              setIsUnSubscribeModalOpen(false);
              setSelectedRowId(null);
            }}
            OnUnjoin={handleLeaveCommunity}
            loading={isPendingLeaveCommunity}
          />
        </div>
      </div>
      <div>
        <Pagination
          onPageChange={handlePageChange}
          totalRows={data?.totalRecords}
          currentPage={page}
          rowsPerPage={3}
        />
      </div>
    </div>
  );

  // Render the Review Form View
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

  // Main render - conditionally show table or form with toast
  return (
    <>
      {currentView === "table" ? renderTableView() : renderFormView()}

      {/* Global Success Toast */}
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

export default PatientAllCommunites;
