import React, { useState } from "react";
import RatingStars from "@components/shared-components/rating-stars";
import { PrimaryButton } from "@components/shared-components/buttons/common-button/common-button";
import TextField from "@components/careprovider/communityforum/text-field";
import HospitalHeader from "@components/hospital-header";
import ProfilePic from "@assets/media/svgs/patient-db-svgs/hospital-prof-img.svg";
import FeedbackForm from "@pages/patientpages/edit-feedback-form";
import EditFeedbackForm from "@pages/patientpages/edit-feedback-form";

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
    onSave({ rating, comment });

    setShowToast(true); 
  };

  const handleCancel = () => {
    setRating(currentReview.rating);
    setComment(currentReview.comment);

    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="w-full max-w-md h-[350px]">
      
    </div>
  );
};

export default ReviewForm;
