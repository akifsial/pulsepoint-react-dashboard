import { Star, User } from "lucide-react";

/**
 * Review object shape.
 */
export type Review = {
  id: string | number;
  authorName: string;
  rating: number; // 1‒5
  content: string;
  createdAt: string | Date;
};

/**
 * Very small "time‑ago" helper (minutes, hours, days, weeks, years).
 */
function timeAgo(date: string | Date): string {
  const now = new Date();
  const d = new Date(date);
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(diff / 3600);
  const days = Math.floor(diff / 86400);
  const weeks = Math.floor(diff / 604800);
  const years = Math.floor(diff / 31_536_000);

  if (years) return `${years}y ago`;
  if (weeks) return `${weeks}w ago`;
  if (days) return `${days}d ago`;
  if (hours) return `${hours}h ago`;
  if (minutes) return `${minutes}m ago`;
  return "just now";
}

/**
 * Stars 1‑5 (filled vs. outline).
 */
function StarRating({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <div className={`flex items-center space-x-1 ${className}`.trim()}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= rating ? "text-rating-gold fill-rating-gold" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

/**
 * Individual review card.
 */
function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-start space-x-3 mb-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          <User className="h-5 w-5 text-gray-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-gray-900">{review.authorName}</h4>
            <StarRating rating={review.rating} />
          </div>
          <p className="text-xs text-gray-500 mb-2">{timeAgo(review.createdAt)}</p>
        </div>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">{review.content}</p>
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
 * Ratings & Reviews section. Handles missing props gracefully so the UI can still render.
 */
export default function RatingsReviewsSection({ rating = 0, reviewCount = 0, reviews = [] }: RatingsReviewsSectionProps) {
  const roundedRating = Math.round(rating);

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Ratings & Reviews</h3>
        <div className="flex items-center space-x-3">
          <StarRating rating={roundedRating} />
          <span className="text-sm font-semibold text-gray-900">{rating.toFixed(1)}</span>
          <span className="text-sm text-gray-500">/ 5 based on</span>
          <span className="text-sm font-semibold text-gray-900">{reviewCount} reviews</span>
        </div>
      </div>

      {/* Reviews grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
