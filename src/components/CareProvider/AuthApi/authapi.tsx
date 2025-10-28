import axios from "axios";
import toast from "react-hot-toast";

export const ApiLogin = async (data) => {
  try {
    const BASE_URL = `${import.meta.env.VITE_APP_API_URL}auth/login`;

    const response = await axios.post(BASE_URL, data);
    localStorage.setItem(
      "token",
      JSON.stringify(response?.data?.payload?.accessToken)
    );
    localStorage.setItem(
      "userInfo",
      JSON.stringify(response?.data?.payload?.user)
    );
    return response.data.payload.records;
  } catch (error) {
    throw new error();
  }
};

export const ApiForgot = async (data) => {
  try {
    const BASE_URL = `${import.meta.env.VITE_APP_API_URL}auth/forgot`;

    const response = await axios.post(BASE_URL, data);
    localStorage.setItem("id", response?.data?.payload?.id);

    return response.data.payload.records;
  } catch (error) {
    throw new error();
  }
};

export const ApiRegister = async (data) => {
  try {
    const BASE_URL = `${import.meta.env.VITE_APP_API_URL}auth/register`;

    const response = await axios.post(BASE_URL, data);
    localStorage.setItem("id", response?.data?.payload?.id);

    return response.data.payload.records;
  } catch (error) {
    throw new error();
  }
};

export const ApiVerifyOtp = async (data) => {
  const otpId = JSON.parse(localStorage.getItem("id"));

  try {
    const BASE_URL = `${import.meta.env.VITE_APP_API_URL}auth/verify/${otpId}`;

    const response = await axios.post(BASE_URL, data);
    localStorage.setItem("resetToken", response?.data?.payload?.resetToken);

    return response.data.payload.records;
  } catch (error) {
  }
};

export const ApiResetPassword = async (data) => {

  const resetToken = localStorage.getItem("resetToken"); 
  const id = localStorage.getItem("id");

  try {
    const BASE_URL = `${import.meta.env.VITE_APP_API_URL}auth/reset/${id}`;

    const response = await axios.post(BASE_URL, data, {
      headers: {
        Authorization: `Bearer ${resetToken}`,
      },
    });

    return response.data?.payload?.records;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Password reset failed");
  }
};

export const ApiChangePassword = async (data) => {

  try {
    const BASE_URL = `${import.meta.env.VITE_APP_API_URL}auth/change-password`;
    const token=JSON.parse(localStorage.getItem("token"))
    const response = await axios.post(BASE_URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data?.payload?.records;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Password reset failed");
  }
};
