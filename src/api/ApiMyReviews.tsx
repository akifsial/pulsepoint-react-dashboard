import axios from "axios";

export const ApiMyReviews = async (search: string, rating: number) => {
  let BASE_URL = `${import.meta.env.VITE_APP_API_URL}feedback`;

  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response?.data?.payload?.records;
};
