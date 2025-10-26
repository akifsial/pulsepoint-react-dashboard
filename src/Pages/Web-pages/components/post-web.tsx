import Pagination from "@components/pagination/pagination";
import {
  useGetBlogsCategory,
  useGetCategoryBlogs,
} from "@src/hooks/use-website";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function PostWeb({ categoryId, setCategoryName ,data }) {
  const { data: blogsCategories, isLoading } = useGetBlogsCategory(categoryId);

 


  const navigate=useNavigate()

  return (
    <>
      {data?.data?.data?.map((post) => {
        return (
          
          <div
            key={post?.id}
            className="bg-white cursor-pointer rounded-xl transition flex flex-col justify-between"
            onClick={()=>(navigate(`/blog/${post?.id}`))}
          >
            <img
              src={`${post?.featured_image?.url}`}
              alt={post?.title}
              className="w-full h-52 object-cover rounded-lg mb-4 shadow-sm"
            />
            <div className="flex-1">
              {post?.categories?.map((cat, index) => (
                <span
                  key={index}
                  className="inline-block text-[15px] py-1 font-medium text-[#252525] rounded-full"
                >
                  {cat?.name}
                </span>
              ))}

              <h2  className="cursor-pointer text-[22px] font-bold text-[#252525] mb-2">
                {post?.title?.length > 50 ? (
                  <Link to={`/blog/${post?.id}`}>
                    {post?.title.slice(0, 50)}...{" "}
                    <span className="text-[#2DB3FF] text-[16px] cursor-pointer font-semibold">
                      Read More
                    </span>
                  </Link>
                ) : (
                  <Link to={`/blog/${post?.id}`}>
                  {  post?.title}
                  </Link>
                  
                )}
              </h2>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default PostWeb;
