import React, { useState, useEffect, useRef } from "react";
import TanDataTable from "@components/dashboard-components/tanstack-data-table/tan-data-table";
import DropdownActions from "@components/dashboard-components/dropdown-actions/dropdown-actions";
import filterIcon from "@assets/media/svgs/dashboard-svgs/filter-icon.svg";
import { PrimaryButton } from "@components/shared-components/buttons/common-button/common-button";
import { AnimatePresence, motion } from "framer-motion";
import RatingFilterDropdown from "@components/dashboard-components/dropdowns/rating-filter-dropdown";
import addBlog from "@assets/media/images/dashboard-images/addBlog.png";
import postFallbackImage from "@assets/media/images/dashboard-images/postFallback.png";

import searchIcon from "@assets/media/svgs/patient-db-svgs/search-icon.svg";

import CommonInput from "@components/shared-components/inputs/common-input/common-input";
import { TanDataTableColumn } from "@components/dashboard-components/tanstack-data-table/types";
import ReviewForm from "@components/review/review-form";
import Toast from "@components/toast/toast";
import { useApiMyReviews } from "@src/hooks/use-my-reviews";
import dayjs from "dayjs";
import Pagination from "@components/pagination/pagination";
import DeleteModal from "@components/model/delete-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteMyReviews } from "@src/api/api-my-reviews";
import { useNavigate } from "react-router-dom";
import TableSkeletonLoader from "@components/loaders/table-skeleton-loader";
import { useMeApi } from "@src/hooks/use-users";
import { useBlog } from "@src/hooks/use-website";
import AddBlogs from "./add-blogs";
import { ApiDeleteBlog } from "@src/api/api-website";
import toast from "react-hot-toast";
import EditBlogs from "./edit-blogs";

const Blogs: React.FC = () => {
  const [showRatingDropdown, setShowRatingDropdown] = React.useState(false);
  const [searchText, setSearchText] = React.useState<string>("");
  const [rating, setRating] = useState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(true);
  const [filterValue, setFilterValue] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();
  const { data: MeData, refetch: MeDataFetch } = useMeApi(navigate);

  const { data: blogsData } = useBlog(debouncedSearchText);

  useEffect(() => {
    MeDataFetch();
  });

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
    sort == true ? "asc" : "desc"
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
  const [showAddModal, setShowAddModal] = useState(false);
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
    mutationFn: (id: number) => ApiDeleteBlog(id),
    onSuccess: () => {
      toast.success("Post Deleted Successfully");

      queryClient.invalidateQueries("useBlog");
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
      accessor: "image",
      header: <span className="">Post Image</span>,
      width: "50px",
      showSort: true,
      cell: (row) => {
        return (
          <i className="flex justify-center">
            <img
              className=" w-[40px] h-[40px] object-cover rounded-full"
              src={
                row?.row?.original?.image
                  ? `${import.meta.env.VITE_APP_API_IMG_URL}${
                      row?.row?.original?.image
                    }`
                  : postFallbackImage
              }
              alt=""
            />
          </i>
        );
      },
    },
    {
      accessor: "title",
      header: "Title",
      width: "150px",
      showSort: false,
    },
    {
      accessor: "date",
      header: <span className="">Date</span>,
      width: "200px",
      showSort: true,
      cell: (row) => (
        <i className=" ">
          {dayjs(row?.original?.created_at).format("DD/MM/YY")}
        </i>
      ),
    },

    {
      accessor: "content",
      header: "Content",
      width: "150px",
      showSort: false,
      cell: ({ row }) => {
        const content: string = row.original.content;
        const maxLength = 50; 
        return content.length > maxLength
          ? content.slice(0, maxLength) + "..."
          : content;
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


  const handleEditBlogs=(id)=>{
    setSelectedRowId(id)
    setShowEditModal(true)
  }

  const renderTableView = () => (
    <div className="mb-10">
      <div className="flex justify-between mb-5 ">
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
          Blogs
        </h2>
        <div>
          <PrimaryButton
            btnText={`Add Blog`}
            showImg={true}
            onClick={() => setShowAddModal(true)}
            imgClass="w-4 h-4"
            btnClass="flex items-center justify-center gap-[5px] h-[46px] cursor-pointer w-[159px] bg-[#28A2FF] text-white px-4 rounded-lg font-semibold text-sm"
          />
        </div>
      </div>
      <div className="bg-[#FFFFFF] min-h-[400px] rounded-tr-[10px] rounded-tl-[10px] px-4 py-6">
        <div className="mb-6 flex md:flex-row flex-col md:items-center justify-end">
          <div className=" flex justify-end px-5">
            <CommonInput
              placeholder="Search with blog title"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              showImg={true}
              imgSrc={searchIcon}
              imgLeft={true}
              inputClassName="text-sm"
              containerClassName="w-full border-gray-200 rounded-lg py-3 max-w-sm"
            />
          </div>
        </div>

        <div>
          {isLoadingUseApiMyReviews ? (
            <TableSkeletonLoader />
          ) : (
            <div className="overflow-x-auto">
              <TanDataTable<ReviewDataTypes>
                columns={columns ?? []}
                data={blogsData?.records ?? []}
                showCheckbox={false}
                onRowSelect={handleRowSelect}
                showActions={true}
                onSortClick={onSortClick}
                className="my-custom-class"
                actions={(row) => (
                  <DropdownActions
                    onEdit={() => handleEditBlogs(row?.id)}
                    variant="reviews"
                    onDelete={() => {
                      setSelectedRowId(row?.id); 
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
        </div>

        {showAddModal ? (
          <AddBlogs setShowAddModal={setShowAddModal} isOpen={false} />
        ) : (
          ""
        )}

        {showEditModal ? (
          <EditBlogs blogId={selectedRowId} setShowEditModal={setShowEditModal} isOpen={false} />
        ) : (
          ""
        )}
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

export default Blogs;
