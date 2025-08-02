import axios from "axios";

export const ApiStats = async () => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}stats`;
  // const token = JSON.parse(localStorage.getItem("token"));
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiGetCareProviders = async (search: string, rating: number) => {
  let BASE_URL = `${
    import.meta.env.VITE_APP_API_URL
  }user?role_type=CARE_PROVIDER`;
  if (search) {
    BASE_URL += `&organization_name=${search}`;
  }
  if (rating) {
    BASE_URL += `&total_rating=${rating}`;
  }
  // const token = JSON.parse(localStorage.getItem("token"));
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response?.data?.payload?.records;
};

// export const ApiGetCareProviders = async (params:ProviderProps) => {

//   const BASE_URL = `${
//     import.meta.env.VITE_APP_API_URL
//   }user?role_type=CARE_PROVIDER`;
//   const token = JSON.parse(localStorage.getItem("token"));

//   const response = await axios.get(BASE_URL, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   return response?.data?.payload?.records;
// };

export const ApiGetCareProvidersSingle = async (id: number) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}user/${id}`;
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );
  // const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response?.data?.payload;
};

export const apiDeleteCareProvider = async (id: number) => {
  //   const BASE_URL = `${import.meta.env.VITE_APP_API_URL}v1/user/customers?page=${page}&limit=${5}`;
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}user/${id}`;

  // const token = JSON.parse(localStorage.getItem("token"));
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.delete(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
    // params: queryParams,
  });

  return response.data.payload;
};

export const ApiCareProviderStatusUpdate = async (
  data: { status: string },
  id: number
) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}user/${id}`;
  // const token = JSON.parse(localStorage.getItem("token"));
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.put(BASE_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const ApiCreateFeedback = async (responses) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}feedback`;
  // const token = JSON.parse(localStorage.getItem("token"));
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.post(BASE_URL, responses, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiSavedCareProviders = async (id: number) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}user/save-care-provider`;
  // const token = JSON.parse(localStorage.getItem("token"));
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.post(BASE_URL, id, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};
export const ApiGetRecentSearches = async (id: number) => {
  const userId = JSON.parse(localStorage.getItem("userInfo")).id;
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}recent-search/${userId}`;
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );
  // const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response?.data?.payload;
};

export const ApiDeleteRecentSearches = async () => {
  const userId = JSON.parse(localStorage.getItem("userInfo")).id;
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}recent-search/user/${userId}`;
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );
  // const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.delete(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response?.data?.payload;
};
