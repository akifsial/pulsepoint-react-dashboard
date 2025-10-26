import { useCareProviderSingle } from "@src/hooks/use-dashboard";
import { Star } from "lucide-react";
import DummyImage from "@src/assets/media/images/dashboard-images/userDummy.png";
export type Review = {
  id: string | number;
  authorName: string;
  authorTitle?: string;
  authorAvatar?: string;
  rating: number; 
  content: string;
  createdAt: string | Date;
};


function StarRating({
  rating,
  className = "",
}: {
  rating: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-1 ${className}`.trim()}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= rating
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300 fill-gray-300"
            }`}
        />
      ))}
    </div>
  );
}


function ReviewCard({ review, data }: { review: Review; data?: any }) {
  return (
    <>
      {data?.reviews_to_careprovider
        ?.filter((single_review) => !single_review.review_flag)?.map((single_review) => (
          <div
            key={single_review.id}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-4">
              <StarRating rating={single_review.rating} />
              <span className="text-xs text-gray-400">
                {new Date(single_review.created_at).toLocaleDateString()}
              </span>
            </div>

            <p className="text-gray-700 text-base leading-relaxed mb-5 italic">
              “{single_review.content}”
            </p>

            <div className="flex items-center gap-3">
              <img
                src={
                  single_review?.patient?.image
                    ? `${import.meta.env.VITE_APP_API_IMG_URL}${single_review.patient.image}`
                    : DummyImage
                }
                alt="Reviewer"
                className="rounded-full w-12 h-12 object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  {single_review?.patient?.first_name}{" "}
                  {single_review?.patient?.last_name}
                </h4>
                <p className="text-xs text-gray-500">
                  {single_review?.patient?.email}
                </p>
              </div>
            </div>

            {single_review?.replies?.length > 0 && (
              <div className="mt-6 pl-4 border-l-4 border-blue-200">
                <p className="text-sm font-medium text-gray-800 mb-2">
                  Provider’s Reply:
                </p>
                {single_review.replies.map((reply: any) => (
                  <div key={reply.id} className="flex items-start gap-3 mt-2">
                    <img
                      src={
                        data?.image
                          ? `${import.meta.env.VITE_APP_API_IMG_URL}${data.image}`
                          : DummyImage
                      }
                      alt="Provider"
                      className="rounded-full w-10 h-10 object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {data?.first_name} {data?.last_name}
                      </h4>
                      <p className="text-xs text-gray-500">{data?.email}</p>
                      <p className="mt-1 text-gray-700 text-sm">
                        {reply.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
    </>
  );
}

export interface RatingsReviewsSectionProps {
  rating?: number; 
  reviewCount?: number;
  reviews?: Review[];
}

export default function RatingsReviewsSection({
  rating = 4.2,
  reviewCount = 37,
  reviews = [],
  id,
}: RatingsReviewsSectionProps) {
  const { data } = useCareProviderSingle(id);

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
      <div className="flex items-center flex-wrap md:justify-between justify-center md:gap-0 gap-5 justify-between mb-8">
        <h2 className="text-xl space-grotesk font-semibold text-gray-900">
          Ratings & Reviews
        </h2>
        {
          data?.ratingData?.total_reviews === 0 &&
            data?.overall_rating !== 0 &&
            data?.overall_rating !== null
            ?

            <div className="flex items-center flex-wrap md:justify-between justify-center gap-2">
              <StarRating
                rating={Math.round(data?.overall_rating)}
                avg_rating={Math.round(data?.overall_rating)}
              />

              <span className="font-semibold space-grotesk text-gray-900">
                {" "}
                {data?.overall_rating}/5 reviews
              </span>
            </div>

            :

            <div className="flex items-center flex-wrap md:justify-between justify-center gap-2">
              <StarRating
                rating={Math.round(rating)}
                avg_rating={Math.round(rating)}
              />

              <span className="font-semibold space-grotesk text-gray-900">
                {" "}
                {data?.ratingData?.display}
              </span>
            </div>
        }
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <ReviewCard data={data} />
      </div>


    </div>
  );
}
