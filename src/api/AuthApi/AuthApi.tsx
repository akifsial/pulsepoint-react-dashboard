import axios from "axios";
import toast from "react-hot-toast";

export const ApiLogin = async (data) => {
  console.log("Login data", data);
  try {
    const BASE_URL = `${import.meta.env.VITE_APP_API_URL}auth/login`;

    const response = await axios.post(BASE_URL, data);
    localStorage.setItem(
      "token",
      JSON.stringify(response?.data?.payload?.accessToken)
    );

    console.log("reererer", response);

    // if(response.status==200){
    //   console.log(")))))))))))))))))))))))))")
    // }

    // if (response.status == 200) {
    //   if (response.data.payload.user.role_type == "PATIENT") {
    //     navigate("/patient/dashboard");
    //   }else{
    //     navigate("/care-provider")
    //   }
    // }

    localStorage.setItem(
      "userInfo",
      JSON.stringify(response?.data?.payload?.user)
    );
    return response.data.payload;
  } catch (error) {
    throw error;
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
  console.log("juju", data);
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
    console.log(error, "asdasdasd");
  }
};

export const ApiResetPassword = async (data) => {
  console.log("pogo", data);

  const resetToken = localStorage.getItem("resetToken"); // no need to parse
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
    // ✅ Proper error throwing
    throw new Error(error?.response?.data?.message || "Password reset failed");
  }
};

export const ApiChangePassword = async (data) => {
  console.log("pogo", data);

  try {
    const BASE_URL = `${import.meta.env.VITE_APP_API_URL}auth/change-password`;
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await axios.post(BASE_URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data?.payload?.records;
  } catch (error) {
    // ✅ Proper error throwing
    throw new Error(error?.response?.data?.message || "Password reset failed");
  }
};
