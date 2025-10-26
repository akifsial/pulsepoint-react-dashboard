import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReviewForm from "@components/review/review-form";
import { PrimaryButton } from "@components/shared-components/buttons/common-button/common-button";

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

const EditReviewPage: React.FC = ({setShowAddModal}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  React.useEffect(() => {
    if (!state?.reviewData) {
    }
  }, [state, navigate]);

  const handleSaveReview = (updatedReview: {
    rating: number;
    comment: string;
  }) => {
    navigate("/patient/patient-reviews", {
      state: {
        message: "Review updated successfully!",
        updatedReviewId: state.reviewData.id,
      },
    });
  };

  const handleCancel = () => {
    navigate("/patient/patient-reviews");
  };

  if (!state?.reviewData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No review data found</p>
          <PrimaryButton
            btnText="Back to Reviews"
            onClick={() => navigate("/patient/patient-reviews")}
          />
        </div>
      </div>
    );
  }

  const { reviewData } = state;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Edit Review
              </h1>
              <p className="text-gray-600">
                Update your review for {reviewData.provider_name}
              </p>
            </div>
            <PrimaryButton
              btnText="← Back to Reviews"
              onClick={handleCancel}
              btnClass="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <img
              src={reviewData.provider_logo || "/path/to/default-image.png"}
              alt={reviewData.provider_name}
              className="w-16 h-16 rounded-full object-cover border border-gray-200"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {reviewData.provider_name}
              </h3>
              <p className="text-gray-600">{reviewData.provider_email}</p>
              <p className="text-sm text-gray-500">{reviewData.location}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <ReviewForm
              currentReview={{
                rating: reviewData.numericRating || 0,
                comment: reviewData.reviews || "",
              }}
              onSave={handleSaveReview}
            />
          </div>
        </div>

        <div className="mt-6 flex gap-4 justify-end">
          <PrimaryButton
            btnText="Cancel"
            onClick={()=>(setShowAddModal(false))}
            btnClass="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default EditReviewPage;
