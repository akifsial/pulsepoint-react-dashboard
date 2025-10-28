
import React, { useState } from 'react';
import EditReviewPage from '@src/Pages/patientpages/editreviewpage';

interface Review {
  currentReview: {
    rating: number;
    comment: string;
  };
  onSave: (updatedReview: { rating: number; comment: string }) => void;
}

const Review: React.FC<ReviewProps> = ({ currentReview, onSave }) => {
    const [showRating, setShowRating] = useState(false);

  return (
  <>
  {showRating?(<ReviewForm/>):(<EditReviewPage/>)}
  </>
  );
};

export default Review;
