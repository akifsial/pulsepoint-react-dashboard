import React, { useEffect, useState } from "react";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import { apiServices } from "@src/shared/api-services";
import apiEndpoint from "@src/shared/api-end-point";

type CommentData = {
  id: number;
  post_id: number;
  user_id: number;
  parent_id: number | null;
  status: string;
  content: string;
  deleted: boolean;
  created_at: string;
  updated_at: string;
  user?: {
    first_name: string;
    last_name: string;
    image?: string;
  };
};

interface CommentsForumProps {
  commentId: number | string;
}

const CommentsForum: React.FC<CommentsForumProps> = ({ commentId }) => {
  const [comment, setComment] = useState<CommentData | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (commentId === undefined || commentId === null) return;

  const fetchComment = async () => {
    try {
      const res = await apiServices.get(apiEndpoint.getCommentsType(commentId));
      if (res?.data?.success) {
        setComment(res?.data?.payload);

      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  fetchComment();
}, [commentId]);

  if (loading) {
    return <div className="ml-4 mt-3 text-gray-500">Loading comment...</div>;
  }

  if (!comment) {
    return <div className="ml-4 mt-3 text-red-500">Comment not found.</div>;
  }
  

  return (
    <div className="ml-4 mt-3">
      <div className="flex items-start relative gap-3 mb-3">
        <img
          src={
            comment.user?.image
              ? `${import.meta.env.VITE_APP_API_IMG_URL}${comment.user.image}`
              : dummyImage
          }
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = dummyImage;
          }}
          className="w-[43px] h-[43px] rounded-full object-cover border border-gray-200"
          alt="userIcon"
        />
        <div className="flex flex-col text-[#252525] font-normal">
          <div>
            <p className="font-semibold text-[14px]">
              John
            </p>
            <p className="text-[#000000] text-[12px]">
              {new Date(comment.created_at).toLocaleString()}
            </p>
            <p className="text-sm text-gray-700 mb-2.5">{comment.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsForum;