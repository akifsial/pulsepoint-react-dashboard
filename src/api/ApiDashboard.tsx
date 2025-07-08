import axios from "axios";

export const ApiStats = async () => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}stats`;
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiGetCareProviders = async () => {
  const BASE_URL = `${
    import.meta.env.VITE_APP_API_URL
  }user?role_type=CARE_PROVIDER`;
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response?.data?.payload?.records;
};

export const ApiGetCareProvidersSingle = async (id) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}user/${id}`;
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response?.data?.payload;
};
