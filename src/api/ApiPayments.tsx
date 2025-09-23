import axios from "axios";

export const ApiPaymentsHistory = async () => {
  try {
    let BASE_URL = `${import.meta.env.VITE_APP_API_URL}payment/history`;

    const token = JSON.parse(localStorage.getItem("token"));

    const response = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response?.data?.payload;
  } catch (error) {
    throw error;
  }
};
