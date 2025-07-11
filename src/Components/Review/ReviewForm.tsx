import React, { useState } from "react";
import RatingStars from "@components/Shared-components/RatingStars";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import TextField from "@components/CareProvider/CommunityForum/TextField";
import HospitalHeader from "@components/HospitalHeader";
import ProfilePic from "@assets/media/svgs/patient-db-svgs/hospital-prof-img.svg";
import FeedbackForm from "@pages/PatientPages/EditFeedbackForm";
import EditFeedbackForm from "@pages/PatientPages/EditFeedbackForm";

interface ReviewFormProps {
  currentReview: {
    rating: number;
    comment: string;
  };
  onSave: (updatedReview: { rating: number; comment: string }) => void;
  onCancel?: () => void;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  currentReview,
  onSave,
  onCancel,
  setShowToast,
}) => {
  const [rating, setRating] = useState(currentReview.rating);
  const [comment, setComment] = useState(currentReview.comment);

  const handleSave = () => {
    // Save the review
    onSave({ rating, comment });

    // Show success toast
    setShowToast(true); 
  };

  const handleCancel = () => {
    // Reset form to original values
    setRating(currentReview.rating);
    setComment(currentReview.comment);

    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="w-full max-w-md h-[350px]">
      {/* <div className="max-w-2xl mx-auto">
        <div className="space-y-6">
          <HospitalHeader
            name="Johns Hopkins Hospital"
            imageUrl={ProfilePic}
            email="support@hopkinshospital.org"
          />
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              Add A Rating
            </label>
            <RatingStars value={rating} onChange={setRating} />
          </div>

          <div className="mb-4">
            <TextField
              label="Add A Comment"
              id="comment"
              placeholder="Enter your comment here..."
              row={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <PrimaryButton
              btnText="Post A Comment"
              showImg={false}
              btnClass="border-1 w-[252px] h-[46px] !rounded-[10px] px-4 py-[10px] text-white font-semibold leading-[33px] gap-[10px] flex items-center justify-center bg-[#28A2FF] hover:bg-[#2196F3] transition-colors"
              onClick={handleSave}
            />
          </div>
        </div>
      </div> */}
      {/* <EditFeedbackForm/> */}
    </div>
  );
};

export default ReviewForm;
