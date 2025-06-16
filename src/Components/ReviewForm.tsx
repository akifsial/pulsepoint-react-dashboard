import React, { useState } from 'react';
import RatingStars from '@components/Shared-components/RatingStars';
import { PrimaryButton } from '@components/Shared-components/Buttons/Common-button/CommonButton';

interface ReviewFormProps {
  currentReview: {
    rating: number;
    comment: string;
  };
  onSave: (updatedReview: { rating: number; comment: string }) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ currentReview, onSave }) => {
  const [rating, setRating] = useState(currentReview.rating);
  const [comment, setComment] = useState(currentReview.comment);

  const handleSave = () => {
    onSave({ rating, comment });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Leave A Review</h3>
      <div className="mb-4">
        <span className="block text-gray-700 mb-2">Add A Rating</span>
        <RatingStars value={rating} onChange={setRating} />
      </div>
      <div className="mb-4">
        <span className="block text-gray-700 mb-2">Add A Comment</span>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder="Enter your comment here..."
        />
      </div>
      <PrimaryButton btnText="Post A Comment" onClick={handleSave} />
    </div>
  );
};

export default ReviewForm;
