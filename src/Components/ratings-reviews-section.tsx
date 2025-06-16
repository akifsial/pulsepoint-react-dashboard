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
function StarRating({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <div className={`flex items-center gap-1 ${className}`.trim()}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"}`}
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
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Rating stars at top */}
      <div className="flex items-center gap-2 mb-4">
        <StarRating rating={review.rating} />
        <span className="text-sm font-medium text-gray-900">({review.rating.toFixed(1)})</span>
      </div>
      
      {/* Review content */}
      <p className="text-gray-700 text-sm leading-relaxed mb-4">
        "{review.content}"
      </p>
      
      {/* Author info */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
          {review.authorAvatar ? (
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
        </div>
        
        {/* Quote mark */}
        <div className="ml-auto">
          <svg 
            className="w-8 h-8 text-gray-300" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
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
  reviews = [] 
}: RatingsReviewsSectionProps) {
  
  // Sample data if no reviews provided
  const sampleReviews: Review[] = [
    {
      id: 1,
      authorName: "Patricia M.",
      authorTitle: "Dash Private Villa Project Investor",
      rating: 5.0,
      content: "Golden Years Rehab treated my mother like family. The staff was patient, kind, and always available. I could finally breathe knowing she was in good hands.",
      createdAt: new Date()
    },
    {
      id: 2,
      authorName: "Patricia M.",
      authorTitle: "Dash Private Villa Project Investor",
      rating: 5.0,
      content: "Golden Years Rehab treated my mother like family. The staff was patient, kind, and always available. I could finally breathe knowing she was in good hands.",
      createdAt: new Date()
    },
    {
      id: 3,
      authorName: "Patricia M.",
      authorTitle: "Dash Private Villa Project Investor",
      rating: 5.0,
      content: "Golden Years Rehab treated my mother like family. The staff was patient, kind, and always available. I could finally breathe knowing she was in good hands.",
      createdAt: new Date()
    },
    {
      id: 4,
      authorName: "Patricia M.",
      authorTitle: "Dash Private Villa Project Investor",
      rating: 5.0,
      content: "Golden Years Rehab treated my mother like family. The staff was patient, kind, and always available. I could finally breathe knowing she was in good hands.",
      createdAt: new Date()
    },
    {
      id: 5,
      authorName: "Patricia M.",
      authorTitle: "Dash Private Villa Project Investor",
      rating: 5.0,
      content: "Golden Years Rehab treated my mother like family. The staff was patient, kind, and always available. I could finally breathe knowing she was in good hands.",
      createdAt: new Date()
    },
  ];

  const displayReviews = reviews.length > 0 ? reviews : sampleReviews;

  return (
    <div className="bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-gray-900">Ratings & Reviews</h2>
        <div className="flex items-center gap-2">
          <StarRating rating={Math.round(rating)} />
          <span className="font-semibold text-gray-900">{rating.toFixed(1)} / 5</span>
          <span className="text-gray-600">based on</span>
          <span className="font-semibold text-gray-900">{reviewCount} reviews</span>
        </div>
      </div>

      {/* Reviews grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {displayReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}