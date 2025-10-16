import React, { useState } from "react";
import { Star } from "lucide-react";
import TopBar from "@components/website/layout/top-bar";
import UtilityRow from "@components/website/layout/utility-row";
import { useFeaturedWeakReviews } from "@src/hooks/use-website";
import userDummy from "@assets/media/images/dummyUser.png"
import Spinner from "@components/loaders/spinner";

const reviewsData = [
    {
        id: 1,
        name: "Ali Khan",
        avatar: "https://i.pravatar.cc/100?img=1",
        rating: 5,
        comment:
            "Amazing experience! The staff was friendly and the service was excellent.",
        date: "Oct 10, 2025",
    },
    {
        id: 2,
        name: "Sara Ahmed",
        avatar: "https://i.pravatar.cc/100?img=2",
        rating: 4,
        comment:
            "Good overall experience, but the waiting time could be improved.",
        date: "Oct 8, 2025",
    },
    {
        id: 3,
        name: "Usman Malik",
        avatar: "https://i.pravatar.cc/100?img=3",
        rating: 5,
        comment:
            "Loved everything about it! Highly recommended for everyone.",
        date: "Oct 6, 2025",
    },
    {
        id: 4,
        name: "Ayesha Noor",
        avatar: "https://i.pravatar.cc/100?img=4",
        rating: 3,
        comment:
            "Average experience. Could be better in terms of customer service.",
        date: "Oct 5, 2025",
    },
];

const ExploreReviews = () => {
    const [search, setSearch] = useState("");
    const { data: featuredReviews, isLoading } = useFeaturedWeakReviews(search);

    const filteredReviews = reviewsData.filter((review) =>
        review.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen  bg-gradient-to-br from-blue-50 to-green-50  py-0 px-0">
            <TopBar />
            <UtilityRow />
            {/* Header */}
            <div className="max-w-4xl mx-auto text-center mt-12 mb-10">
                <h1 className="text-3xl font-bold text-gray-900 mt-5 mb-3">
                    Explore Reviews
                </h1>
                <p className="text-gray-600">
                    See what people are saying about their experiences.
                </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto mb-8">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex justify-center">
                {
                    isLoading ? <Spinner height={8} color={"red"} /> : ""
                }
            </div>

            {/* Reviews Grid */}
            <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredReviews?.records.map((review) => (
                    <div
                        key={review.id}
                        className="bg-white shadow-md rounded-2xl p-5 flex flex-col justify-between hover:shadow-lg transition"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <img
                                src={review.image ? `${import.meta.env.VITE_APP_API_IMG_URL}${review.image}` : userDummy}
                                alt={review.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="font-semibold text-gray-900">{review?.organization_name}</h3>
                                <p className="text-sm text-gray-500">{review?.specialization}</p>
                            </div>
                        </div>

                        <p className="text-gray-700 mb-3">{review.comment}</p>

                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={18}
                                    className={
                                        i < review?.total_rating
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-300"
                                    }
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-10">
                <button className="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Load More
                </button>
            </div>
        </div>
    );
};

export default ExploreReviews;
