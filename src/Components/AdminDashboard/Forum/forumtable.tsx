import React, { useEffect, useState, useMemo } from "react";
import TanDataTable from "@components/dashboard-components/tanstack-data-table/tan-data-table";
import DropdownActions from "@src/Components/Dashboardcomponents/dropdownactions/dropdownactions";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import searchIcon from "@assets/media/svgs/patient-db-svgs/search-icon.svg";
import CommonInput from "@src/Components/Sharedcomponents/Inputs/CommonInput/commoninput";
import { TanDataTableColumn } from "@components/dashboard-components/tanstack-data-table/types";
import ViewCommunity from "./viewcommunity";
import Model from "@components/model/model";
import { AnimatePresence, motion } from "framer-motion";
import RatingFilterDropdown from "@src/Components/Dashboardcomponents/dropdowns/rating-filter-dropdown";
import { apiServices } from "@src/shared/apiservices";
import apiEndpoint from "@src/shared/apiendpoint";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { apiGet, apiPost, apiPut } from "@src/auth/auth";
import Pagination from "@src/Components/Pagination/pagination";
import SkeletonTableLoader from "@src/Components/loader/skeltontableloader";
import AdminDropdownAction from "../admindropdownaction/admindropdownaction";

type dataTypes = {
  id?: number;
  name?: string;
  first_name?: string;
  first_name1?: string;
  second_name?: string;
  email1?: string;
  content?: string;
  post?: string;
  type?: string;
  date?: string;
  reviews?: string;
  status?: string;
  patient?: number;
  rating?: number | string | React.ReactNode;
  email?: string;
  image?: string;
  actions?: string;
  community_id?: number;
  identifier?: number;
};

const ForumTable: React.FC = () => {
  const [showRatingDropdown] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<dataTypes | null>(
    null
  );
  const [searchText, setSearchText] = useState<string>("");
  const [data, setData] = useState();
  const [showApproveModel, setShowApproveModel] = useState(false);
  const [selectedToApprove, setSelectedToApprove] = useState<dataTypes | null>(
    null
  );

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState<dataTypes | null>(
    null
  );

  const [forumData, setForumData] = useState<dataTypes[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [expandedContentId, setExpandedContentId] = useState<number | null>(
    null
  );

  const { type, id } = useParams(); 

  const [searchParams] = useSearchParams();
  const singleId = searchParams.get("id");
  const isType = searchParams.get("type");

  const pageSize = 3;

  useEffect(() => {
    fetchForumData(searchText);
  }, [searchText]);

  const [currentPage, setCurrentPage] = useState(1);

  const fetchForumData = async (search: string = "", page: number = 1) => {
    try {
      setLoading(true);

      const response = await apiServices.get(
        `${apiEndpoint.forum}?search=${encodeURIComponent(
          search
        )}&sort=created_at:desc&limit=${pageSize}&page=${page}`
      );

      if (response.data.success && response.data.payload?.records) {
        setData(response.data.payload);

        const transformedData = response.data.payload.records.map(
          (item: any, index: number) => {
            const identifier =
              item.type === "POST" ? item.post_id : item.comment_id;

            return {
              forumId: item?.id,
              id: identifier,
              post_id: item.post_id,
              comment_id: item.comment_id,
              community_id: item.community?.id,
              post_report_id: item.post_report_id,

              post: `FM-${(page - 1) * pageSize + (index + 1)}`, 
              first_name: item.community?.title,
              first_name1: item.user?.first_name
                ? `${item.user?.first_name ?? ""} ${
                    item.user?.last_name ?? ""
                  }`.trim()
                : item.user?.user_name ?? "N/A",

              second_name: `(${item.user?.role_type ?? ""})`,
              content: item.post?.content,
              type: item.type,
              date: new Date(item.created_at).toLocaleDateString(),
              status: item.post?.status ?? "Pending",
              community: item?.community ?? "Pending",
              user: item?.user ?? "Pending",
              post_data: item?.post,
              post_report: item?.post_report,
              image: item.user?.image || dummyImage,
            };
          }
        );

        setForumData(transformedData);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForumData(searchText, currentPage);
  }, [searchText, currentPage]);

  const breakContentIntoLines = (content: string, wordLimit: number = 12) => {
    const words = content.split(" ");
    const lines = [];

    for (let i = 0; i < words.length; i += wordLimit) {
      lines.push(words.slice(i, i + wordLimit).join(" "));
    }

    return lines;
  };

  const handleApproveReview = async () => {
    if (!selectedToApprove?.id) return;

    const formData = new FormData();
    formData.append("status", "APPROVED");

    let res;
    if (selectedToApprove.type === "POST") {
      formData.append("post_id", String(selectedToApprove.id));
      res = await apiServices.update(
        formData,
        apiEndpoint.approveCommunityPost(selectedToApprove.id)
      );
    } else if (selectedToApprove.type === "COMMENT") {
      formData.append("comment_id", String(selectedToApprove.id));
      res = await apiServices.update(
        formData,
        apiEndpoint.postCommentUpdate(selectedToApprove.id)
      );
    }

    if (res?.data?.success) {
      setShowApproveModel(false); 
      fetchForumData();
    }
  };

  const handleDelete = async () => {
    if (!selectedToDelete?.id) return;

    let res;
    if (selectedToDelete.type === "POST") {
      res = await apiServices.delete(
        apiEndpoint.deleteCommunityPost(selectedToDelete.id)
      );
    } else if (selectedToDelete.type === "COMMENT") {
      res = await apiServices.delete(
        apiEndpoint.deleteComment(selectedToDelete.id)
      );
    }

    if (res?.data?.success) {
      setShowDeleteModal(false); 
      fetchForumData();
    }
  };

  const [typeOf, setTypeOf] = useState();

  const totalPages = Math.max(1, Math.ceil(forumData.length / pageSize));

  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if ((type || id) && !hasFetched) {
      navigate(window.location.pathname, { replace: true });
    }
  }, []);

  const navigate = useNavigate();


  const handleButtonClick = () => {
    if (selectedCommunity?.type && selectedCommunity?.id) {
      navigate(
        `/admin/forum-moderation/view/${selectedCommunity.type}/${selectedCommunity.id}`
      );
    } else {
    }
  };

  useEffect(() => {
    handleButtonClick();
  }, [selectedCommunity]);

  const [selectedRow, setSelectedRow] = useState<dataTypes | null>(null);

  const columns: TanDataTableColumn<dataTypes>[] = [
    { accessor: "post", header: "Forum ID", showSort: true },
    {
      accessor: "first_name",
      header: "Community Name",
      showSort: true,
      cell: ({ row }) => {
        const { forumId, first_name, profile_icon_image, community, user } =
          row.original;

        return (
          <div
            className="flex cursor-pointer items-center gap-3"
            onClick={() => {
              setSelectedCommunity(row.original);
              setTypeOf(row?.original?.id);

              const idToUse =
                row.original.type === "POST"
                  ? row.original.post_id
                  : row.original.type === "COMMENT"
                  ? row.original.comment_id
                  : row.original.type === "REPORT"
                  ? row.original.post_report_id
                  : null;

              if (idToUse) {
                navigate(
                  `/admin/forum-moderation/view/${row.original.type}/${idToUse}?forumId=${row.original.forumId}`,
                  { replace: true }
                );
              } else {
              }
            }}
          >
            <img
              src={
                community?.profile_icon_image
                  ? `${import.meta.env.VITE_APP_API_IMG_URL}${
                      community?.profile_icon_image
                    }`
                  : dummyImage
              }
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = dummyImage;
              }}
              alt={row.original.first_name || "Patient"}
              className="w-[38px] h-[38px] rounded-full object-cover border border-gray-200"
            />
            <div className="flex flex-col me-8">
              <span className="font-medium text-sm text-[#252525] leading-tight">
                {first_name}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessor: "first_name1",
      header: "Posted By",
      showSort: true,
      cell: ({ row }) => {
        const { first_name1, second_name, email, image, user } = row.original;
        return (
          <div className="me-9 flex items-center gap-3">
            <img
              src={
                user?.image
                  ? `${import.meta.env.VITE_APP_API_IMG_URL}${user?.image}`
                  : dummyImage
              }
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = dummyImage;
              }}
              alt={first_name1 || user?.user_name || "User"}
              className="w-[38px] h-[38px] rounded-full object-cover border border-gray-200"
            />
            <div className="flex flex-col">
              <span className="font-medium text-sm text-[#252525] leading-tight">
                {first_name1 || user?.user_name || "Unknown User"}
              </span>
              <span className="text-xs text-gray-500 leading-tight">
                {second_name}
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
      accessor: "content",
      header: "Content Preview",
      showSort: true,
      cell: ({ row }) => {
        const { content, id } = row.original;
        const isExpanded = expandedContentId === id;
        const previewLines = breakContentIntoLines(content ?? "", 12);

        return (
          <div>
            {isExpanded ? (
              <div className="text-sm text-gray-600 leading-relaxed">
                {previewLines.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600 leading-relaxed">
                {previewLines.slice(0, 1).join(" ")}...
              </p>
            )}
            {content && !isExpanded && (
              <button
                onClick={() => setExpandedContentId(isExpanded ? null : id)}
                className="text-blue-600 text-sm mt-1"
              >
                Show More
              </button>
            )}
          </div>
        );
      },
    },
    { accessor: "type", header: "Type", showSort: true },
    {
      accessor: "status",
      header: "Status",
      showSort: true,
      cell: ({ row }) => {
        const status =
          row?.original?.type == "POST"
            ? row.original.post_data?.status?.toLowerCase()
            : row.original.post_report?.status?.toLowerCase();

        const statusStyles = {
          approved: "text-[#067647] border-[1.5px] border-[#079455]",
          pending: "text-[blue] border-[1.5px] border-[blue]",
          flagged: "text-[#C22E00] border-[1.5px] border-[#C22E00]",
        };

        return (
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              statusStyles[status as keyof typeof statusStyles] ||
              "bg-gray-200 text-gray-700"
            }`}
          >
            {status?.charAt(0).toUpperCase() + status?.slice(1)}
          </span>
        );
      },
    },
    { accessor: "date", header: "Date Posted", showSort: true },

    {
      accessor: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <AdminDropdownAction
          variant="default"
          onAction={() => setSelectedRow(row.original)} 
          actions={[
            {
              label:
                row.original.type === "POST"
                  ? "View Post"
                  : row.original.type === "COMMENT"
                  ? "View Comment"
                  : row.original.type === "REPORT"
                  ? "View Report"
                  : "",
              onClick: () => {
                setSelectedCommunity(row.original);
                setTypeOf(row?.original?.id);

                const idToUse =
                  row.original.type === "POST"
                    ? row.original.post_id
                    : row.original.type === "COMMENT"
                    ? row.original.comment_id
                    : 
                    row.original.type === "REPORT"
                    ? row.original.post_report_id
                    : null;

                if (idToUse) {
                  navigate(
                    `/admin/forum-moderation/view/${row.original.type}/${idToUse}?forumId=${row.original.forumId}`,
                    { replace: true }
                  );

                } else {
                }
              },
              type: "view",
            },
          ]}
        />
      ),
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mb-10">
    
      <>
        <h2 className="text-[25px] space-grotesk font-bold text-heading leading-8 text-brand-ink">
          Forum Moderation
        </h2>

        <div className="mt-6 bg-white rounded-[10px] px-4 py-6">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <h3 className="mb-3 space-grotesk text-[20px] font-bold md:mb-0">Patient's Details</h3>

            <div className="flex items-center gap-3">
              <CommonInput
                placeholder="Search by Name, Email, or ID"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setCurrentPage(1); 
                }}
                showImg={true}
                imgSrc={searchIcon}
                imgLeft={true}
                inputClassName="text-sm inter placeholder-[#252525]"
                containerClassName="rounded-[10px]"
              />

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
          {loading ? (
            <div className="text-center px-10 py-6">
              <SkeletonTableLoader />
            </div>
          ) : (
            <>
              <TanDataTable<dataTypes>
                columns={columns}
                data={forumData}
                showCheckbox={false}
              />
              <Pagination
                rowsPerPage={pageSize}
                totalRows={data?.totalRecords || 0}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </>
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
      {showDeleteModal && selectedToDelete && (
        <Model className="max-w-lg" setIsOpen={setShowDeleteModal}>
          <div className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4 text-[#2F3542]">
              Are you sure you want to delete this{" "}
              {selectedToDelete.type === "POST" ? "post" : "comment"}?
            </h2>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </Model>
      )}
    </div>
  );
};

export default ForumTable;
