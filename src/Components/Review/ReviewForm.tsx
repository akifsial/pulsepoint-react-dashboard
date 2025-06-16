import React, { useState } from "react";
import RatingStars from "@components/Shared-components/RatingStars";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import TextField from "@components/CareProvider/CommunityForum/TextField";

interface ReviewFormProps {
  currentReview: {
    rating: number;
    comment: string;
  };
  onSave: (updatedReview: { rating: number; comment: string }) => void;
  onCancel?: () => void; // Optional cancel handler
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  currentReview,
  onSave,
  onCancel,
}) => {
  const [rating, setRating] = useState(currentReview.rating);
  const [comment, setComment] = useState(currentReview.comment);

  const handleSave = () => {
    onSave({ rating, comment });
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
    <div className="w-full max-w-md">
      <div className="max-w-2xl mx-auto">
        <div className="space-y-6">
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
              onChange={(e) => setComment(e.target.value)} // Ensure proper controlled input handling
            />
          </div>
          <PrimaryButton
            btnText="Post A Comment"
            showImg={true}
            btnClass="border-1 w-[252px] h-[46px] !rounded-[10px] px-4 py-[10px] text-white font-semibold leading-[33px] gap-[10px] flex items-center justify-center bg-[#28A2FF]"
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
