import { useEffect, useState } from "react";
import backArrow from "@assets/media/svgs/dashboard-svgs/arrow-left.svg";
import userProfile from "@assets/media/images/dashboard-images/userDummy.png";
import trash from "@assets/media/svgs/dashboard-svgs/trash.svg";
import eye from "@assets/media/svgs/dashboard-svgs/eye.svg";
import { PrimaryButton } from "@src/Components/Sharedcomponents/Buttons/Commonbutton/commonbutton";
import Model from "@src/Components/model/model";
import DeleteReview from "./deletereview";
import { apiServices } from "@src/shared/apiservices";
import apiEndpoint from "@src/shared/apiendpoint";
import CommentsForum from "./commentsforum";
import { useNavigate, useParams } from "react-router-dom";
import { apiPut } from "@src/Auth/Auth";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

interface User {
  first_name?: string;
  last_name?: string;
  role_type?: string;
  user_name?: string;
  image?: string;
}

interface PostData {
  id: number;
  title?: string;
  content?: string;
  like_count?: number;
  comment_count?: number;
  image?: string;
  status?: string;
  user?: User;
  patient_flag_count?: number;
  care_provider_flag_count?: number;
  community?: { title?: string };
  created_at?: string;
  // For REPORT
  post?: { title?: string; content?: string; image?: string };
  report_reason?: { name: string };
  comment?: string;
  image_url?: string;
}

const ViewCommunity = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const forumId = searchParams.get("forumId"); 

  const [postData, setPostData] = useState<PostData | null>(null);
  const [isApproveLoading, setIsApproveLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);



  useEffect(() => {
    if (!type || !id) return;

    const fetchData = async () => {
      try {
        let res;
        if (type === "POST") {
          res = await apiServices.get(apiEndpoint.getSinglePost((id)));
        } else if (type === "COMMENT") {
          res = await apiServices.get(apiEndpoint.getSingleComment((id)));
        } else if (type === "REPORT") {
          res = await apiServices.get(apiEndpoint.getSingleReport((id)));
        }

        if (res?.data?.success) {
          setPostData(res.data.payload);
        }
      } catch (err) {
      }
    };

    fetchData();
  }, [type, id]);

  

  const UpdatePost = async () => {
    if (!type || !postData) return;

    try {
      setIsApproveLoading(true);
        const token: string | null = JSON.parse(
      localStorage.getItem("token") || "null"
    );
      const params = { status: "APPROVED" };

      let url = "";
      if (type === "POST") {
        url = `${import.meta.env.VITE_APP_API_URL}community/post/${
          postData.id
        }`;
      } else if (type === "COMMENT") {
        url = `${import.meta.env.VITE_APP_API_URL}community/comment/${
          postData.id
        }`;
      } else if (type === "REPORT") {
        url = `${import.meta.env.VITE_APP_API_URL}community/post/report/${
          postData.id
        }`;
      }

      const response = await apiPut(url, params, token);

      if (response.success) {
        toast.success(
          type === "POST"
            ? "Post Approved Successfully"
            : type === "COMMENT"
            ? "Comment Approved Successfully"
            : "Report Approved Successfully"
        );
        setPostData((prev) => prev && { ...prev, status: "APPROVED" });
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsApproveLoading(false);
    }
  };

 const handleDelete = async () => {
  if (!type || !postData) return;

  try {
    setIsDeleteLoading(true);
    let apiId: number;

    if (type === "REPORT") {
      if (!forumId) {
        toast.error("Invalid forum ID for report");
        setIsDeleteLoading(false);
        return;
      }
      apiId = Number(forumId);
    } else {
      if (!postData.id) {
        toast.error("Invalid ID");
        setIsDeleteLoading(false);
        return;
      }
      apiId = postData.id;
    }

    const url =
      type === "POST"
        ? `${import.meta.env.VITE_APP_API_URL}community/post/${apiId}`
        : type === "COMMENT"
        ? `${import.meta.env.VITE_APP_API_URL}community/comment/${apiId}`
        : `${import.meta.env.VITE_APP_API_URL}community/post/report/${apiId}`; 

    const response = await apiServices.delete(url);

    if (response.data.success) {
      toast.success("Successfully Deleted!");
      setPostData(null);
      navigate("/admin/forum-moderation");
    }
  } catch (error) {
    toast.error("Failed to delete. Please try again.");
  } finally {
    setIsDeleteLoading(false);
  }
};


  
  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mb-[25px]">
        <div className="flex items-center mb-4.5 gap-2.5">
          <img
            src={backArrow}
            alt="backArrow"
            className="cursor-pointer"
            onClick={() => navigate("/admin/forum-moderation")}
          />
          <h2 className="text-xl space-grotesk font-semibold text-[#252525] font-[Space Grotesk]">
            {type} ID - {postData.id}
          </h2>
        </div>
      </div>

      <div className="post mb-6 relative">
        <div className="post_content bg-white rounded-[10px] p-4 pb-9 relative">
          <div className="md:flex justify-between">
            <div className="flex items-center gap-3 mb-6 mt-2.5">
              <img
                src={
                  postData?.user?.image
                    ? `${import.meta.env.VITE_APP_API_IMG_URL}${
                        postData.user?.image
                      }`
                    : userProfile
                }
                className="w-[43px] h-[43px] rounded-full object-cover border border-gray-200"
                alt="userProfile"
              />
              <div className="flex flex-col">
                <p className="font-semibold space-grotesk mb-1 text-[#252525] leading-tight">
                  {postData?.user?.user_name ??
                    `${postData?.user?.first_name ?? ""} ${
                      postData?.user?.last_name ?? ""
                    }`}
                  <span className="text-[#25252566] pl-2">
                    ({postData.user?.role_type})
                  </span>
                </p>
                <span className="text-sm text-gray-500 leading-tight">
                  Posted in <b>{postData.community?.title}</b> | Posted On{" "}
                  <b>{new Date(postData.created_at!).toLocaleString()}</b>
                </span>
              </div>
            </div>

            <div className="flex flex-wrap md:justify-start justify-center md:mb-0 mb-5 items-center gap-[13px]">
              <PrimaryButton
                btnText={
                  isApproveLoading
                    ? "Loading..."
                    : postData?.status === "APPROVED"
                    ? "Already Approved"
                    : type === "POST"
                    ? "Approve Post"
                    : type === "COMMENT"
                    ? "Approve Comment"
                    : "Approve Report"
                }
                showImg={true}
                img={eye}
                imgClass="w-[18px] h-[18px]"
                btnClass="bg-[#52C343]  cursor-pointer text-white rounded-lg px-4 py-2 !ps-1 !pe-1 text-[14px]"
                onClick={UpdatePost}
                disabled={postData?.status === "APPROVED"}
              />
              <PrimaryButton
                btnText={
                  isDeleteLoading
                    ? "Deleting..."
                    : type === "POST"
                    ? "Delete Post"
                    : type === "COMMENT"
                    ? "Delete Comment"
                    : "Delete Report"
                }
                showImg={true}
                img={trash}
                imgClass="w-[20px] h-[20px]"
                btnClass="bg-[#C22E00] text-white rounded-lg px-4 py-2 !ps-1 !pe-1 text-[14px]"
                onClick={handleDelete}
              />
            </div>
          </div>

          <div className="text-sm text-[#252525] mb-7 max-w-[755px]">
            <h3 className="mb-2 font-[Space Grotesk] space-grotesk  font-bold text-xl">
              {type === "REPORT" ? postData?.post?.title : postData?.title}
            </h3>
            <p>
              {type === "REPORT" ? postData?.post?.content : postData?.content}
            </p>
          </div>

          {type === "REPORT" && postData?.post?.image && (
            <img
              src={`${import.meta.env.VITE_APP_API_IMG_URL}${
                postData.post.image
              }`}
              alt="report"
              className="w-full object-cover rounded-md"
            />
          )}
          {type === "POST" && postData?.image && (
            <img
              src={`${import.meta.env.VITE_APP_API_IMG_URL}${postData.image}`}
              alt="post"
              className="w-full object-cover rounded-md"
            />
          )}

          <div className="mt-6 font-semibold text-[#252525]/50">
            <p className="mb-2.5 space-grotesk">Flag provided by Patient</p>
            <div className="flex items-center gap-3.5">
              <div className="border border-[#D3D3D3] rounded-[10px] px-2 py-3 flex items-center gap-2">
                <p className="text-[16px] font-bold text-[#252525]">
                  {postData.patient_flag_count} Flagged
                </p>
              </div>
            </div>

            <p className="mb-2.5 space-grotesk mt-7">Flag provided by Care Provider</p>

            <div className="flex items-center gap-3.5">
              <div className="border border-[#D3D3D3] rounded-[10px] px-2 py-3 flex items-center gap-2">
                <p className="text-[16px] font-bold text-[#252525]">
                  {postData.care_provider_flag_count} Flagged
                </p>
              </div>
            </div>

            {type === "REPORT" && (
              <div className="mt-10 text-black">
                <p>
                  Report Reason:{" "}
                  <span className="font-medium">
                    {postData.report_reason?.name ?? " "}
                  </span>
                </p>
                <p className="mt-7">
                  Report Comment:{" "}
                  <span className="font-medium">
                    {postData?.comment ?? " "}
                  </span>
                </p>
                {postData?.image_url && (
                  <div className="mt-5">
                    <p className="font-medium mb-3">Report Image:</p>
                    <img
                      src={`${import.meta.env.VITE_APP_API_IMG_URL}${
                        postData.image_url
                      }`}
                      alt="report-img"
                      className="w-full object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

      {isDeleteModalOpen && (
        <Model setIsOpen={setIsDeleteModalOpen} className="max-w-[488px]">
          <DeleteReview />
        </Model>
      )}
    </>
  );
};

export default ViewCommunity;
