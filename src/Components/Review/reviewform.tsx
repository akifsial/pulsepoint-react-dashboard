import React, { useState } from "react";
import RatingStars from "@src/Components/Sharedcomponents/ratingstars";
import { PrimaryButton } from "@src/Components/Sharedcomponents/Buttons/Commonbutton/commonbutton";
import TextField from "@src/Components/CareProvider/CommunityForum/textfield";
import HospitalHeader from "@src/Components/hospitalheader";
import ProfilePic from "@assets/media/svgs/patient-db-svgs/hospital-prof-img.svg";
import FeedbackForm from "@src/Pages/patientpages/editfeedbackform";
import EditFeedbackForm from "@src/Pages/patientpages/editfeedbackform";

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
