import React from "react";
import RatingStars from "@src/Components/Sharedcomponents/ratingstars";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";

interface Review {
  id: number;
  content: string;
  rating: number;
  created_at: string;
  patient: {
    id: number;
    first_name: string;
    last_name: string;
    image?: string | null;
  };
  replies?: {
    id: number;
    content: string;
  }[];
}

interface ClientReviewsProps {
  reviews: Review[];
}

const ClientReviews: React.FC<ClientReviewsProps> = ({ reviews }) => {
  return (
    <div className="flex flex-wrap gap-5">
      {reviews?.map((item) => (
        <div
          key={item.id}
          className="bg-[#FAFAFA] rounded-[8px] p-2 sm:p-5 mb-5 md:max-w-[49%] max-w-full w-full"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-[18px]">
              <img
                src={
                  item.patient?.image
                    ? `${import.meta.env.VITE_APP_API_IMG_URL}${item.patient.image}`
                    : dummyImage
                }
                alt={item.patient?.first_name}
                className="w-[50px] h-[50px] object-cover rounded-full"
              />
              <div className="flex gap-2.5 text-[#252525] text-[14px] sm:text-[16px]">
                <p className="font-bold mb-0.5 space-grotesk">
                  {item.patient?.first_name} {item.patient?.last_name}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(item.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <RatingStars value={item.rating} isDisabled={true} />
            <p className="text-[16px] text-[#252525]">({item.rating})</p>
          </div>

          <div>
            <p className="text-[16px] text-[#252525]">“{item.content}”</p>
          </div>

          {item.replies && item.replies.length > 0 && (
            <div
              className="flex items-start gap-4 px-4 py-2.5 rounded-[5px] mt-3"
              style={{ backgroundColor: "#EEF2F5" }}
            >
              <img
                src={dummyImage}
                alt="reply"
                className="w-[43px] h-[43px] object-cover rounded-full"
              />
              <div>
                {item.replies.map((reply) => (
                  <p key={reply.id} className="text-sm text-gray-700">
                    {reply.content}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ClientReviews;
