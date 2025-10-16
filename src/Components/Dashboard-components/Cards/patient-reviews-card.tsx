import React, { useState } from "react";
import userImage from "@assets/media/svgs/dashboard-svgs/userImage.svg";
import userReview from "@assets/media/svgs/dashboard-svgs/userReview.svg";
import flag from "@assets/media/svgs/dashboard-svgs/flag2.svg";
import { useApiMyReviews } from "@src/hooks/use-my-reviews";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ApiFlagReview } from "@src/api/api-my-reviews";
import { Flag, Send, Star } from "lucide-react";
import FlagReviewIcon from "@assets/media/svgs/dashboard-svgs/flag4.svg";
import { ApiReplyOnReview } from "@src/api/api-community-forum";
import { useForm } from "react-hook-form";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import FlagModal from "@components/model/flag-modal";
import PatientReviewLoader from "@components/loaders/patient-review-loader";
import DummyUser from "@assets/media/images/dashboard-images/userDummy.png";

interface PatientReviewsCardProps {
  filterValue: string;
}

const PatientReviewsCard: React.FC<PatientReviewsCardProps> = ({
  filterValue,
  rating,
}) => {

  const { register, handleSubmit } = useForm();

  const [reviewReplyValue, setReviewReplyValue] = useState("");
  const [selectedFeedbackToFlag, setSelectedFeedbackToFlag] = useState(null);
  const [flagModalOpen, setFlagModalOpen] = useState(false);
  const [isFlagging, setIsFlagging] = useState(false);

  const { data, isLoading } = useApiMyReviews("", rating, filterValue);

  const queryClient = useQueryClient();

  const confirmFlagReview = async () => {
    if (!selectedFeedbackToFlag) return;

    setIsFlagging(true);

    flagReviewMutation(selectedFeedbackToFlag)
      .then(() => {
        setFlagModalOpen(false);
        setSelectedFeedbackToFlag(null);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsFlagging(false);
      });
  };

  const {
    mutateAsync: flagReviewMutation,
    // isPending: savedCareProvidersPending,
  } = useMutation({
    mutationFn: (feedbackId) => ApiFlagReview(feedbackId),

    onSuccess: async (data) => {
      queryClient.invalidateQueries(["useApiMyReviews"]); // refetch list
    },
    onError: (error) => {
      // toast.error("Something Went Wrong");
    },
  });

  const handleFlagReview = async (feedbackId, reviewFlag) => {
    await flagReviewMutation(feedbackId);
  };
  // ___________________

  const {
    mutateAsync: ReviewReplyMutation,
    // isPending: savedCareProvidersPending,
  } = useMutation({
    mutationFn: (data) => ApiReplyOnReview(data),

    onSuccess: async () => {
      toast.success("Reply Added Successfully");
      setReviewReplyValue("");
      queryClient.invalidateQueries(["useApiMyReviews"]); // refetch list
    },
    onError: (error) => {
      // toast.error("Something Went Wrong");
    },
  });

  const handleReviewReply = async (reviewId, reviewFlag) => {
    const data = {
      review_id: reviewId,
      content: reviewReplyValue,
    };
    await ReviewReplyMutation(data);
  };

  function StarRating({
    rating,
    className = "",
    avg_rating,
  }: {
    rating: number;
    className?: string;
  }) {
    return (
      <div className={`flex items-center gap-1 ${className}`.trim()}>
        {[1, 2, 3, 4, 5].map((star) => {
          return (
            <Star
              key={star}
              className={`h-4 w-4 ${
                star <= rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300 fill-gray-300"
              }`}
            />
          );
        })}
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <PatientReviewLoader />
      ) : data?.records?.length > 0 ? (
        data?.records?.map((item, index) => (
          // <div key={index} className="bg-[#FAFAFA] rounded-[8px] p-5 mb-5">
          //   <div className="flex items-center justify-between mb-3">
          //     <div className="flex items-center gap-[10px] text-[#252525] text-[16px]">
          //       <img
          //         src={
          //           item?.patient?.image
          //             ? `${import.meta.env.VITE_APP_API_IMG_URL}${
          //                 item?.patient?.image
          //               } `
          //             : dummyImage
          //         }
          //         alt="User"
          //         className="w-[50px] h-[50px] object-cover rounded-full"
          //       />

          //       <p className=" font-bold mb-0.5">
          //         {item.patient?.first_name} {item.patient?.first_name}
          //       </p>
          //       <span className="text-[13px]">{item.userHour}</span>
          //     </div>

          //     <div
          //       onClick={() => {
          //         // handleFlagReview(item?.feedback?.id, item?.review_flag)
          //         setSelectedFeedbackToFlag(item?.feedback?.id);
          //         setFlagModalOpen(true);
          //       }}
          //       className="border cursor-pointer border-[#D3D3D3] rounded-[10px] px-[7px] py-[9.5px] flex items-center gap-2"
          //     >
          //       {item?.review_flag.length > 0 ? (
          //         <img src={flag} alt="flag" className="w-[24px] h-[24px]" />
          //       ) : (
          //         <Flag />
          //       )}
          //       <p className="text-[16px] text-[#252525]">{item.flagged}</p>
          //     </div>
          //   </div>
          //   {/* <FlagModal onDelete={()=>handleFlagReview(item?.feedback?.id,item?.review_flag)} isOpen={true} /> */}

          //   <div className="flex items-center gap-0.5 mb-2">
          //     {/* <RatingStars value={item.review} isDisabled={true} /> */}
          //     <StarRating
          //       rating={item?.rating}
          //       // avg_rating={data?.ratingData?.avg_rating}
          //     />
          //     <p className="text-[16px] text-[#252525]"> ({item.rating})</p>
          //   </div>

          //   <p className="text-[16px] text-[#252525] mb-4">“{item.content}”</p>

          //   {item?.replies?.map((reply) => (
          //     <div className="bg-[#E4F1F9] flex items-center gap-5 p-[10px]">
          //       <img
          //         src={ item.care_provider.image ? ` ${import.meta.env.VITE_APP_API_IMG_URL}${
          //           item.care_provider.image
          //         }` : DummyUser}
          //         alt=""
          //         className="w-[43px] h-[43px] object-cover rounded-full"
          //       />
          //       <p className="text-[16px] text-[#252525] ">{reply?.content}</p>
          //     </div>
          //   ))}

          //   <div
          //     className="flex items-center gap-4 px-4 py-2.5 rounded-[5px]"
          //     style={item.comment ? { backgroundColor: "#EEF2F5" } : {}}
          //   >
          //     {/* <img
          //     src={`${import.meta.env.VITE_APP_API_IMG_URL}${
          //       item.care_provider.image
          //     }`}
          //     alt=""
          //     className="w-[43px] h-[43px] object-cover rounded-full"
          //   /> */}

          //     {item.comment ? (
          //       <p>{item.comment}</p>
          //     ) : item?.replies?.length == 0 ? (
          //       <div className="relative w-full">
          //         <input
          //           placeholder="Add a reply"
          //           value={reviewReplyValue}
          //           className="w-full border border-[#D3D3D3] bg-white outline-0 border-[1px] rounded-[5px] !p-2.5  text-sm"
          //           onChange={(e) => setReviewReplyValue(e.target.value)}
          //         />
          //         <div className="absolute cursor-pointer top-[20%] cursor right-2">
          //           <button
          //           className="cursor-pointer"
          //             onClick={() => handleReviewReply(item?.feedback?.id)}
          //           >
          //             <Send />
          //           </button>
          //         </div>
          //       </div>
          //     ) : (
          //       ""
          //     )}
          //     <FlagModal
          //       isOpen={flagModalOpen}
          //       onClose={() => {
          //         setFlagModalOpen(false);
          //         setSelectedFeedbackToFlag(null);
          //       }}
          //       onDelete={confirmFlagReview}
          //       loading={isFlagging}
          //       data={item?.review_flag}
          //     />
          //   </div>
          // </div>
          <div
            key={index}
            className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6 mb-6 hover:shadow-md transition"
          >
            {/* Header - User Info & Flag */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={
                    item?.patient?.image
                      ? `${import.meta.env.VITE_APP_API_IMG_URL}${
                          item?.patient?.image
                        }`
                      : dummyImage
                  }
                  alt="User"
                  className="w-12 h-12 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <p className="text-sm space-grotesk font-semibold text-gray-900">
                    {item.patient?.first_name} {item.patient?.last_name}
                  </p>
                  <span className="text-xs text-gray-500">{item.userHour}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedFeedbackToFlag(item?.feedback?.id);
                  setFlagModalOpen(true);
                }}
                className="flex items-center gap-2 text-sm text-gray-500 border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50"
              >
                {item?.review_flag.length > 0 ? (
                  <img src={flag} alt="flagged" className="w-4 h-4" />
                ) : (
                  // <FlagReviewIcon size={16} />
                  <img src={FlagReviewIcon} alt="flagged" className="w-4 h-4" />
                )}
                <span>{item.flagged || "Flag"}</span>
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <StarRating rating={item?.rating} />
              <span className="text-sm text-gray-700 font-medium">
                ({item.rating})
              </span>
            </div>

            {/* Review Content */}
            <p className="text-gray-700 text-sm leading-relaxed italic mb-4">
              “{item.content}”
            </p>

            {/* Provider Reply */}
            {item?.replies?.map((reply) => (
              <div
                key={reply.id}
                className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3 mb-4"
              >
                <img
                  src={
                    item.care_provider?.image
                      ? `${import.meta.env.VITE_APP_API_IMG_URL}${
                          item.care_provider?.image
                        }`
                      : DummyUser
                  }
                  alt="Provider"
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <p className="text-sm space-grotesk font-semibold text-gray-900">
                    {item?.care_provider?.organization_name ||
                      item?.care_provider?.user_name}
                  </p>
                  <p className="text-sm text-gray-700">{reply?.content}</p>
                </div>
              </div>
            ))}

            {/* Reply Input */}
            {item?.replies?.length === 0 && (
              <div className="relative mt-3">
                <input
                  placeholder="Write a reply..."
                  // value={reviewReplyValue}
                  onChange={(e) => setReviewReplyValue(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 pr-10 text-sm focus:ring-2 focus:ring-blue-200 outline-none"
                />
                <button
                  onClick={() => handleReviewReply(item?.feedback?.id)}
                  className="cursor-pointer absolute right-3 top-2.5 text-blue-600 hover:text-blue-800"
                >
                  <Send size={18} />
                </button>
              </div>
            )}

            {/* Flag Modal */}
            <FlagModal
              isOpen={flagModalOpen}
              onClose={() => {
                setFlagModalOpen(false);
                setSelectedFeedbackToFlag(null);
              }}
              onDelete={confirmFlagReview}
              loading={isFlagging}
              data={item?.review_flag}
            />
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 text-lg py-10">
          No data found.
        </div>
      )}
    </>
  );
};

export default PatientReviewsCard;
