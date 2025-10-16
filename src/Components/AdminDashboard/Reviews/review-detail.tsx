import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import backArrow from "@assets/media/svgs/dashboard-svgs/arrow-left.svg";
import user1 from "@assets/media/images/user1.png";
import user2 from "@assets/media/images/user2.png";
import stars from "@assets/media/svgs/stars.svg";
import DummyImage from "@assets/media/images/dummyUser.png";
// import trash from "@assets/media/svgs/dashboard-svgs/trash.svg";
// import eye from "@assets/media/svgs/dashboard-svgs/eye.svg";
// import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import { apiServices } from "@src/shared/api-services";
import apiEndpoint from "@src/shared/api-end-point";

interface ReviewDetailType {
  care_provider?: {
    first_name?: string;
    last_name?: string;
    email?: string;
    organization_name?: string;
  };
  care_provider_id?: string;
  patient?: {
    first_name?: string;
    last_name?: string;
    email?: string;
  };
  rating?: number;
  content?: string;
  is_flagged?: boolean;
}

const ReviewDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [reviewDetail, setReviewDetail] = useState<ReviewDetailType>({});
  const [loading, setLoading] = useState(false);

  // Fetch review details from API
  const fetchReviewDetail = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const response = await apiServices.get(apiEndpoint.feedbackView(id));
      if (response.data.success) {
        setReviewDetail(response.data.payload);
      } else {
        console.error("Failed to fetch review detail");
      }
    } catch (err) {
      console.error("🔥 Error fetching review detail", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviewDetail();
  }, [id]);

  return (
    <>
      <div className="mb-[25px]">
        <div className="flex items-center mb-4.5 gap-2.5">
          <img
            src={backArrow}
            alt="backArrow"
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h2 className="text-xl space-grotesk font-semibold text-[#252525] font-[Space Grotesk]">
            RV - {id}
          </h2>
        </div>
      </div>

      {loading ? (
        <p>Loading review details...</p>
      ) : (
        <div className="mb-6 relative">
          <div className="bg-white rounded-[10px] p-4 pb-9 relative">
            <div className="flex items-center justify-between">
              <div>
                <h6 className="text-[#25252580] font-semibold">Provider:</h6>
              </div>
            </div>

            {/* Care Provider Info */}
            <div className="flex items-center gap-3 mb-6 mt-2.5">
              <img
                src={
                  reviewDetail.care_provider?.image
                    ? `${import.meta.env.VITE_APP_API_IMG_URL}${
                        reviewDetail.care_provider.image
                      }`
                    : DummyImage
                }
                onError={(e) => (e.currentTarget.src = DummyImage)}
                alt={reviewDetail.care_provider?.image || "Patient"}
                className="w-[50px] h-[50px] object-cover rounded-full"
              />

              <div className="flex flex-col">
                <p className="font-semibold mb-1 space-grotesk text-[#252525] leading-tight">
                  {/* {reviewDetail.care_provider?.organization_name} */}
                  {reviewDetail.care_provider?.first_name}
                  {reviewDetail.care_provider?.last_name}
                </p>
                <span className="text-sm text-gray-500 leading-tight">
                  {reviewDetail.care_provider?.email}
                </span>
              </div>
            </div>

            {/* Patient Info */}
            <div>
              <h6 className="text-[#25252580] font-semibold">Patient:</h6>
            </div>
            <div className="flex items-center gap-3 mb-6 mt-2.5">
              <img
                src={
                  reviewDetail.patient?.image
                    ? `${import.meta.env.VITE_APP_API_IMG_URL}${
                        reviewDetail.patient.image
                      }`
                    : DummyImage
                }
                onError={(e) => (e.currentTarget.src = DummyImage)}
                alt={reviewDetail.patient?.image || "Patient"}
                className="w-[50px] h-[50px] object-cover rounded-full"
              />
              <div className="flex flex-col">
                <p className="font-semibold mb-1 space-grotesk text-[#252525] leading-tight">
                  {reviewDetail.patient?.first_name}{" "}
                  {reviewDetail.patient?.last_name}
                </p>
                <span className="text-sm text-gray-500 leading-tight">
                  {reviewDetail.patient?.email}
                </span>
              </div>
            </div>

            {/* Rating */}
            <div className="mb-5">
              <h6 className="text-[#25252580] mb-1.5 font-semibold">Rating:</h6>
              <div className="flex gap-1.5">
                <img src={stars} alt="" />
                <span>({reviewDetail.rating})</span>
              </div>
            </div>

            {/* Comment */}
            <div className="mb-5">
              <h6 className="text-[#25252580] mb-2 font-semibold">Comment:</h6>
              <p>{reviewDetail.content}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewDetail;
function toast(arg0: { description: string; variant: string }) {
  alert(`${arg0.variant.toUpperCase()}: ${arg0.description}`);
}
