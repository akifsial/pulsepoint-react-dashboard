import React from "react";
import { Send } from "lucide-react";
// import DummyUser from "@assets/DummyUser.jpg";
// import commentIcon from "@assets/commentIcon.svg";
import commentIcon from "@assets/media/svgs/dashboard-svgs/comment.svg";
import DummyUser from "@assets/media/images/dashboard-images/userDummy.png";

// import arrowUpTrans from "@assets/arrowUpTrans.svg";
import arrowUpTrans from "@assets/media/svgs/dashboard-svgs/arrowUp.svg";
import dayjs from "dayjs";
import { IoEllipsisHorizontal, IoEllipsisVerticalSharp } from "react-icons/io5";
import DropdownActions from "@components/Dashboard-components/Dropdown-actions/DropdownActions";
// import { ApiLikeComment } from "@src/api/ApiCommunityForum";
// import { useQueryClient } from "@tanstack/react-query";

export const CommentItem = ({
  comment,
  myId,
  postId,
  LikeIsPending,
  PostsPending,
  handleCommentReaction,
  parentCommentReplyId,
  handleParentComment,
  parentCommentReplyValue,
  setParentCommentReplyValue,
  handleParentCommentReply,
  IsCommentReply,
  setIsCommentReply,
  replyId,
  setReplyParentId,
}) => {
  const isReplyVisible = parentCommentReplyId.includes(comment.id);

  const toggleReplies = () => {
    if (isReplyVisible) {
      // Remove from state
      handleParentComment(null, comment.id); // send second arg to remove
    } else {
      // Add to state
      handleParentComment(comment.id);
    }
  };



  return (
    <div className="ml-4 mt-3">
      {/*  */}

      {/*  */}
      <div className="flex items-start gap-3 mb-3">
        <img
          src={
            comment?.user?.image
              ? `${import.meta.env.VITE_APP_API_IMG_URL}${comment?.user?.image}`
              : DummyUser
          }
          className="w-[43px] h-[43px] rounded-full object-cover border border-gray-200"
          alt="userIcon"
        />
        <div className="flex  flex-col text-[#252525] font-normal">
          <p className="font-semibold">
            {comment?.user?.first_name} {comment?.user?.last_name}
          </p>
          <p className="text-[#00000] text-[12px]">
            Today at {dayjs(comment?.created_at).format("h:mm A")}
          </p>
          <p className="text-sm text-gray-700 mb-2.5">{comment?.content}</p>

          {/* Like & Reply Buttons */}
          <div className="flex gap-2.5 mb-2.5">
            <div className="flex items-center gap-2 bg-[#E6E9EB] rounded-[32px] px-1.5 py-1.5 min-w-[88px] justify-center">
              <button
                disabled={LikeIsPending}
                className="flex items-center gap-2"
                onClick={() => handleCommentReaction("like", comment, postId)}
              >
                {/* <img src={arrowUpTrans} alt="Like" /> */}

                {/* <img src={arrowUpTrans} alt="Liked" /> */}
                {comment?.userLike?.is_like == true ? (
                  <div className="bg-black p-1.5 rounded-full">
                    <img src={arrowUpTrans} alt="Liked" />
                  </div>
                ) : (
                  <div className=" p-1.5 rounded-full">
                    <img src={arrowUpTrans} alt="Liked" />
                  </div>
                )}

                {comment?.likeCount || 0}
              </button>
              <button
                className="ps-2"
                disabled={LikeIsPending}
                onClick={() =>
                  handleCommentReaction("dislike", comment, postId)
                }
              >
                {/* <img src={arrowUpTrans} alt="Dislike" /> */}
                {comment?.userLike?.is_like == false ? (
                  <div className="bg-black p-1.5 rounded-full">
                    <img src={arrowUpTrans} alt="Liked" />
                  </div>
                ) : (
                  <div className=" p-1.5 rounded-full">
                    <img src={arrowUpTrans} alt="Liked" />
                  </div>
                )}
              </button>
            </div>

            {/* Reply Icon Button */}
            <button
              onClick={toggleReplies}
              className="flex items-center gap-2 bg-[#E6E9EB] rounded-[32px] px-2 py-1 justify-center min-w-[78px]"
            >
              {/* <img src={commentIcon} alt="reply" /> */}
              <img src={commentIcon} alt="Comments" />
            </button>
          </div>

          {/* Input Box for Reply */}
          {isReplyVisible && (
            <div className="relative mb-3">
              <input
                type="text"
                // value={parentCommentReplyValue}
                onChange={(e) => setParentCommentReplyValue(e.target.value)}
                placeholder="Reply..."
                className="w-full bg-500-red outline-none border border-gray-300 rounded-[32px] py-3 pr-14 pl-6 text-sm"
              />
              <button
                disabled={!comment}
                className={`absolute top-1/2 -translate-y-1/2 right-3 w-9 h-9 rounded-full flex items-center justify-center transition ${
                  comment
                    ? "bg-[#007AB2] hover:bg-[#005f8e] cursor-pointer"
                    : "bg-gray-300"
                }`}
                onClick={() => handleParentCommentReply(postId, comment?.id)}
              >
                {PostsPending ? (
                  "..."
                ) : (
                  <Send className="w-3.5 h-3.5 text-white" />
                )}
              </button>
            </div>
          )}

          {/* Show Replies if toggled */}
          {isReplyVisible && comment?.replies?.length > 0 && (
            <div className="mt-2">
              {comment.replies.map((reply) => (
                <div className="flex items-center gap-5">
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    myId={myId}
                    postId={postId}
                    LikeIsPending={LikeIsPending}
                    PostsPending={PostsPending}
                    handleCommentReaction={handleCommentReaction}
                    parentCommentReplyId={parentCommentReplyId}
                    handleParentComment={handleParentComment}
                    parentCommentReplyValue={parentCommentReplyValue}
                    setParentCommentReplyValue={setParentCommentReplyValue}
                    handleParentCommentReply={handleParentCommentReply}
                    IsCommentReply={IsCommentReply}
                    setIsCommentReply={setIsCommentReply}
                    replyId={replyId}
                    setReplyParentId={setReplyParentId}
                  />

                  {/* <div className="bg-grey-500 mb-10 cursor-pointer">
                    <DropdownActions
                      // onView={() => console.log("View Detail")}
                      // onEdit={() => console.log("Edit Detail")}
                      onDelete={() => handleDelete(reply?.id)}
                      variant="simple"
                    />
                  </div> */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
