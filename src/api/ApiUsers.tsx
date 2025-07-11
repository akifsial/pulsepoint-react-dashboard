import axios from "axios";

export const ApiMe = async () => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}auth/me`;
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiAllSavedCareProviders = async (
  search: string,
  rating: number
) => {
  let BASE_URL = `${
    import.meta.env.VITE_APP_API_URL
  }user/save-care-provider?organization_name=${search}`;
  if (rating) {
    BASE_URL += `&total_rating=${rating}`;
  }
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload.records;
};

export const ApiUpdateUser = async (id: number, data) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}user/${id}`;
  const token = JSON.parse(localStorage.getItem("token"));
  // const token = localStorage.getItem("token");

  const response = await axios.put(BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};
