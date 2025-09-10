import {
  ApiBlog,
  ApiCategories,
  ApiRecentBlogs,
  ApiSingleBlog,
  ApiSingleCategory,
  ApiAllReviews,
  ApiFeaturedWeakReviews,
  ApiGetPopularCommunities,
  ApiGetPopularDoctors,
  ApiGetPopularPost,
  ApiGetCategoryBlogs,
  ApiGetBlogs,
} from "@src/api/ApiWebsite";
import { useQuery } from "@tanstack/react-query";

//  category api ------------------------

export const useCategory = () => {
  return useQuery({
    queryKey: ["useCategory"],
    queryFn: () => ApiCategories(),
  });
};

export const useSingleCategory = (id) => {
  return useQuery({
    queryKey: ["useSingleCategory", id],
    queryFn: () => ApiSingleCategory(id),
  });
};

//  blog api --------------------------

export const useBlog = (search) => {
  return useQuery({
    queryKey: ["useBlog", search],
    queryFn: () => ApiBlog(search),
  });
};

export const useSingleBlog = (id) => {
  return useQuery({
    queryKey: ["useBlog", id],
    queryFn: () => ApiSingleBlog(id),
  });
};

export const useRecentBlogs = () => {
  return useQuery({
    queryKey: ["useRecentBlogs"],
    queryFn: () => ApiRecentBlogs(),
  });
};

// review api -------------------------

export const useFeaturedWeakReviews = () => {
  return useQuery({
    queryKey: ["useReview"],
    queryFn: () => ApiFeaturedWeakReviews(),
  });
};

export const useGetPopularDoctors = (search) => {
  return useQuery({
    queryKey: ["useGetPopularDoctors", search],
    queryFn: () => ApiGetPopularDoctors(search),
  });
};

export const useGetPopularPost = () => {
  return useQuery({
    queryKey: ["useGetPopularPost"],
    queryFn: () => ApiGetPopularPost(),
  });
};

export const useGetCategoryBlogs = (id) => {
  return useQuery({
    queryKey: ["useGetCategoryBlogs",id],
    queryFn: () => ApiGetCategoryBlogs(id),
  });
};


export const useGetBlogs = () => {
  return useQuery({
    queryKey: ["useGetBlogs"],
    queryFn: () => ApiGetBlogs(),
  });
};
