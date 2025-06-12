
// AdminPatientReviews.tsx
import React, { useState, useEffect } from "react";

// Sample data for patient reviews (you can replace this with data from an API or database)
const sampleReviews = [
  {
    id: 1,
    patientName: "John Doe",
    review: "The care was excellent! Highly recommend.",
    rating: 5,
    date: "2025-06-01",
  },
  {
    id: 2,
    patientName: "Jane Smith",
    review: "Great experience, but could improve communication.",
    rating: 4,
    date: "2025-06-03",
  },
  {
    id: 3,
    patientName: "Michael Johnson",
    review: "Very professional and caring staff.",
    rating: 5,
    date: "2025-06-05",
  },
];

const AdminPatientReviews: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    // Here, you can fetch the real data from an API
    setReviews(sampleReviews); // Simulating data loading
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Patient Reviews</h1>

      {/* If no reviews */}
      {reviews.length === 0 ? (
        <p>No reviews available at the moment.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="font-semibold text-xl">{review.patientName}</h2>
              <p className="text-gray-600">{review.review}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-yellow-400">
                  {/* Here you could add stars for rating */}
                  {"⭐".repeat(review.rating)}
                </span>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <button
                onClick={() => alert(`Replying to review from ${review.patientName}`)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Reply
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPatientReviews;
