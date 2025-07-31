import { useCareProviderSingle } from "@src/hooks/useDashboard";
import { Star } from "lucide-react";

/**
 * Review object shape.
 */
export type Review = {
  id: string | number;
  authorName: string;
  authorTitle?: string;
  authorAvatar?: string;
  rating: number; // 1‒5
  content: string;
  createdAt: string | Date;
};

/**
 * Stars 1‑5 (filled).
 */
function StarRating({
  rating,
  className = "",
  avg_rating,
}: {
  rating: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-1 ${className}`.trim()}>
      {[1, 2, 3, 4, 5].map((star) => {
        return (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= avg_rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300 fill-gray-300"
            }`}
          />
        );
      })}
    </div>
  );
}

/**
 * Individual review card.
 */
function ReviewCard({ review, data }: { review: Review }) {
  console.log("REW", data);
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Rating stars at top */}
      <div className="flex items-center gap-2 mb-4">
        <StarRating
          rating={review.rating}
          avg_rating={data?.ratingData?.avg_rating}
        />
        {/* <span className="text-sm font-medium text-gray-900">({review.rating.toFixed(1)})</span> */}
      </div>

      {/* Review content */}
      <p className="text-gray-700 text-sm leading-relaxed mb-4">
        "{review.content}"
      </p>

      {/* Author info */}
      <div className="flex items-center gap-3">
        {/* Reviewer Details */}

        {/* <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
          {review?.authorAvatar ? (
            <img 
              src={review.authorAvatar} 
              alt={review.authorName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white font-semibold text-lg">
              {review.authorName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">{review.authorName}</h4>
          {review.authorTitle && (
            <p className="text-xs text-gray-500">{review.authorTitle}</p>
          )}
        </div> */}

        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">A</span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">
              Alex Johnson
            </h4>
            <p className="text-xs text-gray-500">Product Manager</p>
          </div>
        </div>

        {/* Reviewer Details */}

        {/* Quote mark */}
        <div className="ml-auto">
          <svg
            className="w-8 h-8 text-gray-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/**
 * Ratings & Reviews section props.
 */
export interface RatingsReviewsSectionProps {
  rating?: number; // average rating 0‑5
  reviewCount?: number;
  reviews?: Review[];
}

/**
 * Ratings & Reviews section matching the provided design.
 */
export default function RatingsReviewsSection({
  rating = 4.2,
  reviewCount = 37,
  reviews = [],
  id,
}: RatingsReviewsSectionProps) {
  // Sample data if no reviews provided
  const { data } = useCareProviderSingle(id);

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center flex-wrap md:justify-between justify-center md:gap-0 gap-5 justify-between mb-8">
        <h2 className="text-xl font-semibold text-gray-900">
          Ratings & Reviews
        </h2>
        <div className="flex items-center flex-wrap md:justify-between justify-center gap-2">
          <StarRating rating={Math.round(rating)} />

          <span className="font-semibold text-gray-900">
            {" "}
            {data?.ratingData?.display}
          </span>
        </div>
      </div>

      {/* Reviews grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {data?.reviews_to_careprovider?.map((review) => (
          <ReviewCard key={review.id} review={review} data={data} />
        ))}
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {data?.reviews_to_careprovider?.length === 0 ? (
          <p>No Review Found</p>
        ) : (
          data.reviews_to_careprovider.map((review) => (
            <ReviewCard key={review.id} review={review} data={data} />
          ))
        )}
      </div> */}
    </div>
  );
}
