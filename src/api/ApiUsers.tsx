import axios from "axios";
import toast from "react-hot-toast";

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
  rating: number,
  sort
) => {
  console.log("SSSSSSSSSSSSSSSoooooooooooooooooooooooooooo",sort)
  let BASE_URL = `${
    import.meta.env.VITE_APP_API_URL
  }user/save-care-provider?search=${search}`;
  if (rating) {
    BASE_URL += `&total_rating=${rating}`;
  }
  //   if (sort) {
  //   BASE_URL += `&sort=created_at:${sort}`;
  // }
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

// export const ApiUpdateUser = async (id: number, data) => {
//   const userId = JSON.parse(localStorage.getItem("userInfo"))?.id;

//   const BASE_URL = `${import.meta.env.VITE_APP_API_URL}user/${userId}`;
//   const token = JSON.parse(localStorage.getItem("token"));
//   // const token = localStorage.getItem("token");

//   const response = await axios.put(BASE_URL, data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   return response.data.payload;
// };

export const ApiUpdateUser = async (id: number, data) => {
  try {
    const userId = JSON.parse(localStorage.getItem("userInfo"))?.id;
    const BASE_URL = `${import.meta.env.VITE_APP_API_URL}user/${userId}`;
    const token = JSON.parse(localStorage.getItem("token"));

    const response = await axios.put(BASE_URL, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.payload;
  } catch (error) {
    console.error("Error updating user:", error);
    toast.error(error?.response?.data?.errors[0]?.message)
    throw error; // rethrow so calling code can handle it
  }
};

export const ApiProviderTypes = async () => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}user/provider-type`;

  const response = await axios.get(
    BASE_URL
    // headers: { Authorization: `Bearer ${token}` },
  );

  return response.data.payload;
};

export const ApiInsuranceTypes = async () => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}user/insurance-type`;
  // const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.get(
    BASE_URL
    // headers: { Authorization: `Bearer ${token}` },
  );

  return response.data.payload;
};
