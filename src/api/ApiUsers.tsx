import axios from "axios";

export const ApiMe = async () => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}v1/auth/me`;
  const token = localStorage.getItem("token");

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload.records;
};
