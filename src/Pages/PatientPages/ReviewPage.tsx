import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Review from '@components/Review';

interface LocationState {
  reviewData: {
    id?: number;
    provider_name?: string;
    provider_email?: string;
    date?: string;
    rating?: number | string | React.ReactNode;
    numericRating?: number;
    reviews?: string;
    location?: string;
    provider_logo?: string;
  };
}

const ReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  // If no review data is passed, redirect back to reviews page
  React.useEffect(() => {
    if (!state?.reviewData) {
      navigate('/patient/patient-reviews'); // Updated path
    }
  }, [state, navigate]);

  
  return (
    <>
    <Review/>
    </>
  );
};

export default ReviewPage;