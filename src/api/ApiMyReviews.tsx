import axios from "axios";

export const ApiMyReviews = async (search: string, rating: number) => {
  let BASE_URL = `${import.meta.env.VITE_APP_API_URL}feedback?organization_name
=${search}`;

  if (rating) {
    BASE_URL += `&rating=${rating}`;
  }

  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response?.data?.payload?.records;
};


export const apiDeleteMyReviews = async (id:number) => {
  //   const BASE_URL = `${import.meta.env.VITE_APP_API_URL}v1/user/customers?page=${page}&limit=${5}`;
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}feedback/${id}`;

  // const token = JSON.parse(localStorage.getItem("token"));
  const token: string | null = JSON.parse(localStorage.getItem("token") || "null");


  const response = await axios.delete(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
    // params: queryParams,
  });

  return response.data.payload;
};