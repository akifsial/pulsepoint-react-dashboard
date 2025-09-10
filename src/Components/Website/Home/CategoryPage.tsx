// import { useParams } from "react-router-dom";
// import { useCategory, useSingleCategory } from "@src/hooks/useWebsite";
// import fallbackImage from "@assets/media/images/client.png";

// const CategoryPage = () => {
//   const { url_key } = useParams();

//   // 1️⃣ fetch all categories
//   const { data: categories } = useCategory();

//   // 2️⃣ find the ID that matches url_key
//   const categoryId = categories?.records?.find(c => c.url_key === url_key)?.id;

//   // 3️⃣ fetch single category by ID
//   const { data: category, isLoading, isError } = useSingleCategory(categoryId);

//   if (isLoading) return <p className="text-center">Loading...</p>;
//   if (isError || !category) return <p className="text-center text-red-500">Failed to load category</p>;

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">{category.name}</h1>
//       <img
//         src={
//           category.image
//             ? `${import.meta.env.VITE_APP_API_IMG_URL}${category.image}`
//             : fallbackImage
//         }
//         alt={category.name}
//         className="w-64 h-64 object-cover mt-4"
//       />
//       <p className="mt-2 text-gray-700">{category.description}</p>
//     </div>
//   );
// };

// export default CategoryPage;

// import { useGetCategoryBlogs } from "@src/hooks/useWebsite";
// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import TopBar from "../Layout/TopBar";
// import UtilityRow from "../Layout/UtilityRow";

// interface Post {
//   id: number;
//   title: string;
//   content: string;
//   category: string;
// }

// const posts: Post[] = [
//   {
//     id: 1,
//     title: "How to Stay Healthy",
//     content: "Some health tips...",
//     category: "Health",
//   },
//   {
//     id: 2,
//     title: "React Basics",
//     content: "Learn React step by step...",
//     category: "Programming",
//   },
//   {
//     id: 3,
//     title: "Gym Workout",
//     content: "Best workout routines...",
//     category: "Fitness",
//   },
//   {
//     id: 4,
//     title: "Advanced JavaScript",
//     content: "Closures, promises, async...",
//     category: "Programming",
//   },
//   {
//     id: 5,
//     title: "Nutrition Tips",
//     content: "Healthy food habits...",
//     category: "Health",
//   },
// ];

// const categories = ["All", "Health", "Programming", "Fitness"];

// const CategoryPage: React.FC = () => {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   // const { id } = useParams();
//   const queryParams = new URLSearchParams(location.search);
//   const id = queryParams.get("id"); // "10"

//   const { data: categoryBlogs } = useGetCategoryBlogs(id);


//   // const filteredPosts =
//   //   selectedCategory === "All"
//   //     ? posts
//   //     : posts.filter((post) => post.category === selectedCategory);

//   return (
//     <div className="w-full mx-auto p-0">
//       {/* Page Title */}
//       {/* <h1 className="text-2xl font-bold mb-6">Browse by Categories</h1> */}

//       <TopBar />
//       <UtilityRow />
//       {/* Categories Filter */}
//       <div className="flex flex-wrap gap-3 mb-8"></div>

//       {/* Posts List */}
//       <div className="grid md:grid-cols-2 gap-6">
//         {categoryBlogs?.records?.map((post) => (
//           <div
//             key={post.id}
//             className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition"
//           >
//             <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
//             <p className="text-gray-600 text-sm mb-3">{post.content}</p>
//             <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
//               {post?.category?.name}
//             </span>

//             <img
//               src={`${import.meta.env.VITE_APP_API_IMG_URL}${post?.image}`}
//               alt="blueprint icon"
//               className="w-[250px] h-[250px] mt-5 object-cover"
//             />
//           </div>
//         ))}
//       </div>

//       {categoryBlogs?.length === 0 && (
//         <p className="text-center text-gray-500 mt-10">No posts found.</p>
//       )}
//     </div>
//   );
// };

// export default CategoryPage;

import { useGetCategoryBlogs } from "@src/hooks/useWebsite";
import React, { useState, useEffect } from "react";
import TopBar from "../Layout/TopBar";
import UtilityRow from "../Layout/UtilityRow";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Spinner from "@components/Loaders/Spinner";

const CategoryPage: React.FC = () => {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [expandedPosts, setExpandedPosts] = useState<Record<number, boolean>>(
    {}
  );
  const location = useLocation();
  const navigate = useNavigate(); // <-- useNavigate hook

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");
    setCategoryId(id);
  }, [location.search]);

  const {
    data: categoryBlogs,
    isLoading,
    isError,
    refetch,
  } = useGetCategoryBlogs(categoryId);

  useEffect(() => {
    if (categoryId) {
      refetch();
    }
  }, [categoryId, refetch]);

  const toggleExpand = (postId: number) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  if (isLoading)
    return <p className="text-center mt-20 ">Loading...</p>;
  // if (isError)
  //   return (
  //     <p className="text-center mt-20 text-red-500">Failed to load category</p>
  //   );

  return (
    <div className="w-full">
      <TopBar />
      <UtilityRow />

      {/* Page Title */}
      {/* <h1 className="text-3xl font-bold text-gray-800 mt-6 mb-6 text-center">
        Browse Posts by Category
      </h1> */}

      <div className="mt-6 px-5 mx-auto w-full max-w-screen-xl">
        <p
          onClick={() => navigate("/")}
          className="px-4 flex gap-2 py-2 items-center w-[200px] text-gray-800 rounded-lg cursor-pointer text-[28px] font-medium"
        >
          <ArrowLeft /> Go Back
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid mt-12 py-4 mx-auto w-full max-w-screen-xl px-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoryBlogs?.records?.map((post) => {
          const isExpanded = expandedPosts[post.id] || false;
          return (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col justify-between"
            >
              <img
                src={`${import.meta.env.VITE_APP_API_IMG_URL}${post?.image}`}
                alt={post.title}
                className="w-full h-52 object-cover rounded-lg mb-4 shadow-sm"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm mb-3">
                  {isExpanded
                    ? post.content
                    : post.content.slice(0, 100) +
                      (post.content.length > 100 ? "..." : "")}
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                  {post?.category?.name}
                </span>
                {post.content.length > 100 && (
                  <button
                    className="text-blue-600 cursor-pointer hover:underline text-sm font-medium"
                    onClick={() => toggleExpand(post.id)}
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {categoryBlogs?.records?.length === 0 && (
        <p className="text-center text-gray-500 mt-20 text-lg">
          No posts found.
        </p>
      )}
    </div>
  );
};

export default CategoryPage;
