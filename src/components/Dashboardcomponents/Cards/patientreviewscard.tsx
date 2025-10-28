import React, { useState } from "react";
import userImage from "@assets/media/svgs/dashboard-svgs/userImage.svg";
import userReview from "@assets/media/svgs/dashboard-svgs/userReview.svg";
import flag from "@assets/media/svgs/dashboard-svgs/flag2.svg";
import { useApiMyReviews } from "@src/hooks/usemyreviews";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ApiFlagReview } from "@src/api/apimyreviews";
import { Flag, Send, Star } from "lucide-react";
import FlagReviewIcon from "@assets/media/svgs/dashboard-svgs/flag4.svg";
import { ApiReplyOnReview } from "@src/api/apicommunityforum";
import { useForm } from "react-hook-form";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import FlagModal from "@components/Model/flagmodal";
import PatientReviewLoader from "@components/Loaders/patientreviewloader";
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
  } = useMutation({
    mutationFn: (feedbackId) => ApiFlagReview(feedbackId),

    onSuccess: async (data) => {
      queryClient.invalidateQueries(["useApiMyReviews"]); 
    },
    onError: (error) => {
    },
  });

  const handleFlagReview = async (feedbackId, reviewFlag) => {
    await flagReviewMutation(feedbackId);
  };

  const {
    mutateAsync: ReviewReplyMutation,
  } = useMutation({
    mutationFn: (data) => ApiReplyOnReview(data),

    onSuccess: async () => {
      toast.success("Reply Added Successfully");
      setReviewReplyValue("");
      queryClient.invalidateQueries(["useApiMyReviews"]); 
    },
    onError: (error) => {
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
          <div
            key={index}
            className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6 mb-6 hover:shadow-md transition"
          >
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
                  <img src={FlagReviewIcon} alt="flagged" className="w-4 h-4" />
                )}
                <span>{item.flagged || "Flag"}</span>
              </button>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <StarRating rating={item?.rating} />
              <span className="text-sm text-gray-700 font-medium">
                ({item.rating})
              </span>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed italic mb-4">
              “{item.content}”
            </p>

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

            {item?.replies?.length === 0 && (
              <div className="relative mt-3">
                <input
                  placeholder="Write a reply..."
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
