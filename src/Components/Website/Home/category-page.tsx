
import {
  useGetBlogsCategory,
  useGetCategoryBlogs,
} from "@src/hooks/use-website";
import React, { useState, useEffect } from "react";
import TopBar from "../layout/top-bar";
import UtilityRow from "../layout/utility-row";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Spinner from "@components/loaders/spinner";
import BannerWeb from "@pages/web-pages/components/banner-web";
import PostWeb from "@pages/web-pages/components/post-web";
import CategoriesTab from "@pages/web-pages/components/categories-tab";
import CategorySidebar from "@pages/web-pages/components/category-sidebar";
import Pagination from "@components/pagination/pagination";
import WebPagination from "@components/pagination/web-pagination";

const CategoryPage: React.FC = () => {
  const [category, setCategory] = useState<string | null>(null);
  const [expandedPosts, setExpandedPosts] = useState<Record<number, boolean>>(
    {}
  );
  const location = useLocation();
  const navigate = useNavigate(); 
  const [currentPage, setCurrentPage] = useState<number>(1);

  const queryParams = new URLSearchParams(location.search);
  useEffect(() => {
    const id = queryParams.get("id");
    const category = queryParams.get("category");

    setCategory(category);
  }, [location.search]);

  const {
    data: blogsCategories,
    isLoading,
    refetch,
  } = useGetBlogsCategory(category, currentPage);


  const categoryParam = queryParams.get("category");


  const [categoryName, setCategoryName] = useState<string>("");


  useEffect(() => {
    refetch();
  }, [currentPage]);

  return (
    <div className="w-full">
      <TopBar />
      <UtilityRow setCurrentPage={setCurrentPage} />

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
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              <PostWeb
                data={blogsCategories}
                setCategoryName={setCategoryName}
                categoryId={category}
              />
            </div>
            <div className="col-span-1">
              <CategorySidebar categoryId={category} />
            </div>
          </div>
          <div className=" flex justify-center w-full">
            <div className="w-fit mb-5">
              <WebPagination
                rowsPerPage={10} 
                totalRows={blogsCategories?.data?.pagination?.total_posts}
                currentPage={blogsCategories?.data?.pagination?.current_page}
                onPageChange={setCurrentPage}
              />{" "}
            </div>
          </div>
        </>
      )}

 
    </div>
  );
};

export default CategoryPage;
