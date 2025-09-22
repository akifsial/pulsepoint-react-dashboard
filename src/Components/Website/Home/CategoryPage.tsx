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

import {
  useGetBlogsCategory,
  useGetCategoryBlogs,
} from "@src/hooks/useWebsite";
import React, { useState, useEffect } from "react";
import TopBar from "../Layout/TopBar";
import UtilityRow from "../Layout/UtilityRow";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Spinner from "@components/Loaders/Spinner";
import BannerWeb from "@pages/Web-pages/Components/BannerWeb";
import PostWeb from "@pages/Web-pages/Components/PostWeb";
import CategoriesTab from "@pages/Web-pages/Components/CategoriesTab";
import CategorySidebar from "@pages/Web-pages/Components/CategorySidebar";
import Pagination from "@components/Pagination/Pagination";
import WebPagination from "@components/Pagination/WebPagination";

const CategoryPage: React.FC = () => {
  // const [categoryId, setCategoryId] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  console.log();
  const [expandedPosts, setExpandedPosts] = useState<Record<number, boolean>>(
    {}
  );
  const location = useLocation();
  const navigate = useNavigate(); // <-- useNavigate hook
  const [currentPage, setCurrentPage] = useState<number>(1);

  const queryParams = new URLSearchParams(location.search);
  useEffect(() => {
    const id = queryParams.get("id");
    const category = queryParams.get("category");

    setCategory(category);
    // setCategoryId(id);
  }, [location.search]);

  const {
    data: blogsCategories,
    isLoading,
    refetch,
  } = useGetBlogsCategory(category, currentPage);

  console.log("------------------------------------", blogsCategories);

  const categoryParam = queryParams.get("category");

  // const {
  //   data: categoryBlogs,
  //   isLoading,
  //   isError,
  //   refetch,
  // } = useGetCategoryBlogs(categoryId);

  const [categoryName, setCategoryName] = useState<string>("");

  // const filteredBlogs = categoryBlogs?.records?.filter(
  //   (cat) => cat?.id === categoryId
  // );

  useEffect(() => {
    refetch();
  }, [currentPage]);

  return (
    <div className="w-full">
      <TopBar />
      <UtilityRow />

      <BannerWeb pageName={categoryParam} />

      {isLoading ? (
        <p className="text-center mt-20">Loading...</p>
      ) : blogsCategories?.data?.length === 0 ? (
        <p className="text-center text-gray-500 mt-5 text-lg">
          No posts found.
        </p>
      ) : (
        <>
          <div className="grid mt-5 py-4 mx-auto w-full max-w-screen-xl px-8 sm:grid-cols-1 md:grid-cols-3 gap-8">
            {/* First 2 blog posts in col-span-2 */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              <PostWeb
                data={blogsCategories}
                setCategoryName={setCategoryName}
                categoryId={category}
              />
            </div>
            {/* Right side single column */}
            <div className="col-span-1">
              <CategorySidebar categoryId={category} />
            </div>
          </div>
          <div className=" flex justify-center w-full">
            <div className="w-fit mb-5">
              <WebPagination
                // rowsPerPage={pageSize}
                rowsPerPage={10} // 3 rows per page
                totalRows={blogsCategories?.data?.pagination?.total_posts}
                currentPage={blogsCategories?.data?.pagination?.current_page}
                onPageChange={setCurrentPage}
              />{" "}
            </div>
          </div>
        </>
      )}

      {/* Pagination (if needed) */}
      {/* <div className="bg-red-500 w-full">
      <Pagination />
    </div> */}
    </div>
  );
};

export default CategoryPage;
