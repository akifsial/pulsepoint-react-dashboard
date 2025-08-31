import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

let unauthorizedHandled = false;


const handleUnauthorized = (error, navigate) => {
  // const navigate=useNavigate()

  // if (error=="remove") {
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("userInfo");
  //     // window.location.href = "/login"; // navigate to login
  //     navigate("/login") // navigate to login

  //   } else {
  //     return;
  //   }

  if (unauthorizedHandled) return; // ✅ prevent multiple executions
  unauthorizedHandled = true;

  if (
    error === "remove" ||
    (axios.isAxiosError(error) && error.response?.status === 401)
  ) {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    toast.error("Your account has been suspended!")
    // navigate("/login");
    setTimeout(() => {
      navigate("/login");
    }, 1000);

    // Swal.fire({
    //   title: "<strong>Error</strong>",
    //   icon: "error",
    //   html: `
    //     // ${"Your Session has been expired!"}
    //     <br/><br/>
    //   `,

    //  });

    // window.location.href = "/login"; // ✅ works anywhere
  }

  // if (axios.isAxiosError(error)) {
  //   if (error.response?.status === 401) {
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("userInfo");
  //     // window.location.href = "/login"; // navigate to login
  //     navigate("/login") // navigate to login

  //   } else {
  //     return;
  //   }
  // }
};

export const ApiMe = async (navigate) => {
  try {
    const BASE_URL = `${import.meta.env.VITE_APP_API_URL}auth/me`;
    const token = JSON.parse(localStorage.getItem("token"));

    const response = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("RRRRRRRRR", response?.data?.payload?.status);
    if (response?.data?.payload?.status == "INACTIVE") {
      // Swal.fire({
      //   title: "<strong>Error</strong>",
      //   icon: "error",
      //   html: `
      //     // ${"Your Session has been expired!"}
      //     <br/><br/>
      //   `,

      //  });

      handleUnauthorized("remove", navigate);
    }

    return response.data.payload;
  } catch (error) {
    handleUnauthorized(error, navigate);
    throw error;
  }
};

export const ApiAllSavedCareProviders = async (
  search: string,
  rating: number,
  page,
  sort
) => {
  let BASE_URL = `${
    import.meta.env.VITE_APP_API_URL
  }user/save-care-provider?search=${search}&limit=3&page=${page}`;
  if (rating) {
    BASE_URL += `&total_rating=${rating}`;
  }

  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

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
    console.error("x", error);
    handleUnauthorized(error);
    toast.error(error?.response?.data?.errors[0]?.message);
    throw error; // rethrow so calling code can handle it
  }
};

export const ApiProviderTypes = async () => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}user/provider-type`;

  const response = await axios.get(BASE_URL);

  return response.data.payload;
};

export const ApiInsuranceTypes = async () => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}user/insurance-type`;

  const response = await axios.get(BASE_URL);

  return response.data.payload;
};
