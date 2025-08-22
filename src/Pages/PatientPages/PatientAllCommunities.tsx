import React, { useState, useEffect, useRef } from "react";
import TanDataTable from "@components/Dashboard-components/Tanstack-data-table/TanDataTable";
import DropdownActions from "@components/Dashboard-components/Dropdown-actions/DropdownActions";
import filterIcon from "@assets/media/svgs/dashboard-svgs/filter-icon.svg";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import { AnimatePresence, motion } from "framer-motion";
import RatingFilterDropdown from "@components/Dashboard-components/Dropdowns/RatingFilterDropdown";
import RatingStars from "@components/Shared-components/RatingStars";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import searchIcon from "@assets/media/svgs/patient-db-svgs/search-icon.svg";
import CommonInput from "@components/Shared-components/Inputs/Common-Input/CommonInput";
import { TanDataTableColumn } from "@components/Dashboard-components/Tanstack-data-table/types";
import ReviewForm from "@components/Review/ReviewForm";
import Toast from "@components/Toast/Toast";
import Pagination from "@components/Pagination/Pagination";
import { useApiMyReviews } from "@src/hooks/useMyReviews";
import dayjs from "dayjs";
import DeleteModal from "@src/components/Model/DeleteModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteMyReviews } from "@src/api/ApiMyReviews";
import { useNavigate } from "react-router-dom";
import { useGetAllCommunities } from "@src/hooks/useCommunity";
import JoinModal from "@components/Model/JoinModal";
import { Trash, XCircleIcon } from "lucide-react";
import {
  ApiGetPopularCommunities,
  ApiJoinCommunity,
} from "@src/api/ApiCommunityForum";
import TableSkeletonLoader from "@components/Loaders/TableSkeletonLoader";

const PatientAllCommunites: React.FC = () => {
  const [showRatingDropdown, setShowRatingDropdown] = React.useState(false);
  const [searchText, setSearchText] = React.useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
  const [isUnSubscribeModalOpen, setIsUnSubscribeModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(true);

  const {
    data,
    isLoading: isLoadingUseGetAllCommunities,
    refetch,
  } = useGetAllCommunities(
    debouncedSearchText,
    page,
    sort == true ? "asc" : "desc"
  );

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // State for managing the review form page
  const [currentView, setCurrentView] = React.useState<"table" | "form">(
    "table"
  );

  const onSortClick = () => {
    setSort(!sort);
    refetch();
  };
  const [currentEditingReview, setCurrentEditingReview] =
    React.useState<ReviewDataTypes | null>(null);

  // Add toast state
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

  // Handler functions for the review form
  const handleEditReview = (id: number | string) => {
    // setCurrentEditingReview(row);
    // setCurrentView("form");
    // navigate(`/patient/patient-feedback/edit/${id}`);
  };

  const { mutateAsync: deleteMutation, isPending: deleteMutationLoading } =
    useMutation({
      mutationFn: () => apiDeleteMyReviews(selectedRowId),
      onSuccess: async () => {
        queryClient.invalidateQueries(["useApiMyReviews"]); // refetch list
        setIsDeleteModalOpen(false);

        // queryClient.invalidateQueries(["detailersFranchise"]);
      },
      onError: (error) => {
        console.error("Error deleting user:", error);
      },
    });

  const handleDelete = async () => {
    if (selectedRowId !== null) {
      await deleteMutation(selectedRowId);
    }
  };

  // Updated handleSaveReview function with toast
  const handleSaveReview = (updatedReview: {
    rating: number;
    comment: string;
  }) => {
    if (currentEditingReview) {
      // Here you would typically update your data source (API call, state update, etc.)

      // You can update the reviewsData here or make an API call
      // For now, we'll just log it and show success toast

      // Show success toast
      setShowSuccessToast(true);

      // Go back to table view after a short delay to show the toast
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

  // Add toast close handler
  const handleToastClose = () => {
    setShowSuccessToast(false);
    // Ensure we go back to table view when toast is closed
    if (currentView === "form") {
      setCurrentView("table");
      setCurrentEditingReview(null);
    }
  };

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
        // console.log("ssssssssss",row)

        return (
          <div
            className="flex cursor-pointer items-center gap-3 pe-10"
            onClick={() => navigate(`/patient/community-account/${id}`)}
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

    //  {
    //   accessor: "status",
    //   width: "150px",
    //   header: "Status",
    //   showSort: true,
    //   // cell: (row) => (
    //   //   <i>{dayjs(row?.original?.status)}</i>
    //   // ),
    // },
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

  //   const { mutateAsync: deleteMutation, isPending: deleteMutationLoading } =
  //     useMutation({
  //       mutationFn: () => apiDeleteMyReviews(selectedRowId),
  //       onSuccess: async () => {
  //         queryClient.invalidateQueries(["useApiMyReviews"]); // refetch list
  //         setIsDeleteModalOpen(false);

  //         // queryClient.invalidateQueries(["detailersFranchise"]);
  //       },
  //       onError: (error) => {
  //         console.error("Error deleting user:", error);
  //       },
  //     });

  //   const handleDelete = async () => {
  //     if (selectedRowId !== null) {
  //       await deleteMutation(selectedRowId);
  //     }
  //   };

  const {
    mutateAsync: LeaveCommunityMutation,
    isPending: isPendingLeaveCommunity,
  } = useMutation({
    mutationFn: (data) => ApiJoinCommunity(data),
    onSuccess: async () => {
      // queryClient.invalidateQueries(["useApiMyReviews"]); // refetch list
      setIsUnSubscribeModalOpen(false);
      queryClient.invalidateQueries(["useGetAllCommunities"]);
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
    },
  });

  const handleLeaveCommunity = async (postId) => {
    const data = {
      community_id: selectedCommunityId,
    };
    await LeaveCommunityMutation(data);
  };

  const userId = JSON.parse(localStorage.getItem("userInfo"))?.id;
  // console.log("ddddffff",data?.record)

  // Render the Reviews Table View
  const renderTableView = () => (
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
        My Comunities
      </h2>
      <div className="bg-[#FFFFFF] h-[400px] rounded-tr-[10px] rounded-tl-[10px] px-4 py-6">
        <div className="mb-6 flex md:flex-row flex-col md:items-center md:justify-between">
          <h3 className="md:mb-0 mb-3">All Communities</h3>
        
        </div>

        <div>
          {isLoadingUseGetAllCommunities ? (
            <TableSkeletonLoader />
          ) : (
            <div className="h-[300px] overflow-x-auto w-[100%] overflow-y-auto">
              <TanDataTable<ReviewDataTypes>
                columns={columns ?? []}
                // data={data?.records ?? []}
                // data={data ?? []}
                // data={
                //   data?.records?.filter((row) => row?.creator_id !== userId) ??
                //   []
                // }
                data={data?.records ?? []}
                showCheckbox={false}
                onRowSelect={handleRowSelect}
                onSortClick={onSortClick}
                showActions={true}
                className="my-custom-class"
                actions={(row) => {
                  //   <DropdownActions
                  //     onJoin={() => handleEditReview(row?.feedback?.review_id)}
                  //     variant="reviews"
                  //     // onDelete={() => {
                  //     //   setSelectedRowId(row.id);
                  //     //   setIsDeleteModalOpen(true);
                  //     // }}
                  //   />
                  // <PrimaryButton btnClass="bg-red-500" btnText="Unjoin" />
                  return (
                    <div className="flex justify-center gap-3 items-center">
                      {/* <Trash onClick={()=>(handleDeleteMyCommunity(row))} className="text-red-500 cursor-pointer"/> */}

                      <PrimaryButton
                        btnText="Leave"
                        btnClass="bg-red-100 text-red-700 hover:bg-red-200 border border-red-300 font-medium rounded-md !px-4 py-1.5 flex items-center gap-2"
                        onClick={() => {
                          setIsUnSubscribeModalOpen(true);
                          setSelectedCommunityId(row.id);
                        }}
                      >
                        <XCircleIcon className="w-4 h-4" />{" "}
                        {/* Use Lucide or Heroicons */}
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
