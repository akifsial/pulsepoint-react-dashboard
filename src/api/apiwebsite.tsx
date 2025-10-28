import axios from "axios";
import toast from "react-hot-toast";


export const ApiCategories = async () => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}category`;
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiSingleCategory = async (id) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}category/${id}`;

  const response = await axios.get(BASE_URL);

  return response.data.payload;
};


export const ApiBlog = async (search) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}blog?search=${search}`;
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiRecentBlogs = async () => {
  const BASE_URL = `${
    import.meta.env.VITE_APP_API_URL
  }blog/recent-blogs?limit=3`;

  const response = await axios.get(BASE_URL);

  return response.data.payload;
};

export const ApiSingleBlog = async (id) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}blog/${id}`;
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiAddBlog = async (data) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}blog`;
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.post(BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiDeleteBlog = async (id) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}blog/${id}`;
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.delete(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiEditBlog = async (id: string, data: any) => {
  try {
    const BASE_URL = `${import.meta.env.VITE_APP_API_URL}blog/${id}`;
    const token = JSON.parse(localStorage.getItem("token")); 

    const response = await axios.put(BASE_URL, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.payload;
  } catch (error: any) {
    toast.error("Edit blog error:", error?.response?.data?.errors[0]);
    throw error;
  }
};


export const ApiFeaturedWeakReviews = async (search) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}feedback/top-providers?search=${search}}`;
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiGetPopularDoctors = async (search: string) => {
  let BASE_URL = `${
    import.meta.env.VITE_APP_API_URL
  }community/popular?search=${search}`;


  const response = await axios.get(BASE_URL);

  return response.data.payload;
};

export const ApiGetPopularPost = async (search: string) => {
  let BASE_URL = `${import.meta.env.VITE_APP_API_URL}community/popular-post`;

  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const ApiGetCategoryBlogs = async (id) => {
  const BASE_URL = `${
    import.meta.env.VITE_APP_API_URL
  }blog/category/${id}?page=1&limit=5`;
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiGetBlogs = async () => {
  const BASE_URL = ` https://topseniorspot.com/wp-json/topsenior/v1/posts`;

  const response = await axios.get(BASE_URL);

  return response;
};

export const ApiGetCategories = async () => {
  const BASE_URL = `https://topseniorspot.com/wp-json/topsenior/v1/categories`;
  const response = await axios.get(BASE_URL);

  return response;
};

export const ApiGetBlogsCategory = async (id, currentPage) => {
  let BASE_URL = ` https://topseniorspot.com/wp-json/topsenior/v1/posts/category/${id}?per_page=10`;
  BASE_URL += `&page=${currentPage}`;

  const response = await axios.get(BASE_URL);

  return response;
};

export const ApiGetFeaturedPosts = async (id) => {
  const BASE_URL = `https://topseniorspot.com/wp-json/topsenior/v1/posts/featured`;

  const response = await axios.get(BASE_URL);

  return response;
};

export const ApiGetSingleBlog = async (id) => {
  const BASE_URL = ` https://topseniorspot.com/wp-json/topsenior/v1/posts/${id}`;

  const response = await axios.get(BASE_URL);

  return response;
};

export const ApiContactUs = async (data) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}contact`;

  try {
    const response = await axios.post(BASE_URL, data);
    return response.data.payload;
  } catch (error) {
    toast.error(error?.response?.data?.errors[0]?.message)
    throw error;
  }
};
