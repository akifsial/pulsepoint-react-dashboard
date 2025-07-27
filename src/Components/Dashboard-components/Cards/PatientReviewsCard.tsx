import React, { useState } from "react";
import userImage from "@assets/media/svgs/dashboard-svgs/userImage.svg";
import userReview from "@assets/media/svgs/dashboard-svgs/userReview.svg";
import flag from "@assets/media/svgs/dashboard-svgs/flag2.svg";
import { useApiMyReviews } from "@src/hooks/useMyReviews";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ApiFlagReview } from "@src/api/ApiMyReviews";
import { Flag, Star } from "lucide-react";
import { ApiReplyOnReview } from "@src/api/ApiCommunityForum";
import { useForm } from "react-hook-form";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import FlagModal from "@components/Model/FlagModal";
import PatientReviewLoader from "@components/Loaders/PatientReviewLoader";

interface PatientReviewsCardProps {
  filterValue: string;
}

const PatientReviewsCard: React.FC<PatientReviewsCardProps> = ({
  filterValue,
}) => {
  const sliders = [
    {
      image: userImage,
      userName: "Patricia M.",
      userHour: "5 hours ago",
      flagIcon: flag,
      review: "5.0",
      userIcon: userReview,
      sliderDesc:
        "Golden Years Rehab treated my mother like family. The staff was patient, kind, and always available. I could finally breathe knowing she was in good hands.",
      flagged: "Flagged",
      comment: "Thank you so much for your honest feedback.😊🙏",
    },
    {
      image: userImage,
      userName: "John D.",
      userHour: "10 hours ago",
      flagIcon: flag,
      review: "4.5",
      userIcon: userReview,
      sliderDesc:
        "Golden Years Rehab treated my mother like family. The staff was patient, kind, and always available. I could finally breathe knowing she was in good hands.",
      flagged: "Flagged",
    },
    {
      image: userImage,
      userName: "John D.",
      userHour: "10 hours ago",
      flagIcon: flag,
      review: "4.5",
      userIcon: userReview,
      sliderDesc:
        "Golden Years Rehab treated my mother like family. The staff was patient, kind, and always available. I could finally breathe knowing she was in good hands.",
      flagged: "Flagged",
    },
  ];

  const { register, handleSubmit } = useForm();

  const [reviewReplyValue, setReviewReplyValue] = useState("");
  const [selectedFeedbackToFlag, setSelectedFeedbackToFlag] = useState(null);
  const [flagModalOpen, setFlagModalOpen] = useState(false);
  const [isFlagging, setIsFlagging] = useState(false);

  const { data, isLoading } = useApiMyReviews("", "", filterValue);

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

    onSuccess: async () => {
      toast.success("Review Flagged Successfully");
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
      ) : data?.length > 0 ? (
        data?.map((item, index) => (
          <div key={index} className="bg-[#FAFAFA] rounded-[8px] p-5 mb-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-[10px] text-[#252525] text-[16px]">
                <img
                  src={
                    item?.patient?.image
                      ? `${import.meta.env.VITE_APP_API_IMG_URL}${
                          item?.patient?.image
                        } `
                      : dummyImage
                  }
                  alt="User"
                  className="w-[50px] h-[50px] object-cover rounded-full"
                />

                <p className=" font-bold mb-0.5">
                  {item.patient?.first_name} {item.patient?.first_name}
                </p>
                <span className="text-[13px]">{item.userHour}</span>
              </div>

              <div
                onClick={() => {
                  // handleFlagReview(item?.feedback?.id, item?.review_flag)
                  setSelectedFeedbackToFlag(item?.feedback?.id);
                  setFlagModalOpen(true);
                }}
                className="border cursor-pointer border-[#D3D3D3] rounded-[10px] px-[7px] py-[9.5px] flex items-center gap-2"
              >
                {item?.review_flag.length > 0 ? (
                  <img src={flag} alt="flag" className="w-[24px] h-[24px]" />
                ) : (
                  <Flag />
                )}
                <p className="text-[16px] text-[#252525]">{item.flagged}</p>
              </div>
            </div>
            {/* <FlagModal onDelete={()=>handleFlagReview(item?.feedback?.id,item?.review_flag)} isOpen={true} /> */}

            <div className="flex items-center gap-0.5 mb-2">
              {/* <RatingStars value={item.review} isDisabled={true} />xxx */}
              <StarRating
                rating={item?.rating}
                // avg_rating={data?.ratingData?.avg_rating}
              />
              <p className="text-[16px] text-[#252525]"> ({item.rating})</p>
            </div>

            <p className="text-[16px] text-[#252525] mb-4">“{item.content}”</p>

            {item?.replies?.map((reply) => (
              <div className="bg-[#E4F1F9] flex items-center gap-5 p-[10px]">
                <img
                  src={`${import.meta.env.VITE_APP_API_IMG_URL}${
                    item.care_provider.image
                  }`}
                  alt=""
                  className="w-[43px] h-[43px] object-cover rounded-full"
                />
                <p className="text-[16px] text-[#252525] ">{reply?.content}</p>
              </div>
            ))}

            <div
              className="flex items-center gap-4 px-4 py-2.5 rounded-[5px]"
              style={item.comment ? { backgroundColor: "#EEF2F5" } : {}}
            >
              {/* <img
              src={`${import.meta.env.VITE_APP_API_IMG_URL}${
                item.care_provider.image
              }`}
              alt=""
              className="w-[43px] h-[43px] object-cover rounded-full"
            /> */}

              {item.comment ? (
                <p>{item.comment}</p>
              ) : (
                // <div className="relative w-full">
                //   <input
                //     placeholder="Add a reply"
                //     value={reviewReplyValue}
                //     className="w-full border border-[#D3D3D3] bg-white outline-0 border-[1px] rounded-[5px] !p-2.5  text-sm"
                //     onChange={(e) => setReviewReplyValue(e.target.value)}
                //   />
                //   <div className="absolute top-[20%] cursor right-2">
                //     <button onClick={() => handleReviewReply(item?.feedback?.id)}>
                //       <Send />
                //     </button>
                //   </div>
                // </div>
                ""
              )}
              <FlagModal
                isOpen={flagModalOpen}
                onClose={() => {
                  setFlagModalOpen(false);
                  setSelectedFeedbackToFlag(null);
                }}
                onDelete={confirmFlagReview}
                loading={isFlagging}
              />
            </div>
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
