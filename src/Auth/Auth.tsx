import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
// import { ToastContainer, toast } from "react-toastify";

// Define types for API responses
interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

interface ErrorResponse {
  success: false;
  message: string;
}

// POST Request
export async function apiPost<T>(
  url: string,
  params: any,
  token: string | undefined
): Promise<ApiResponse<T> | ErrorResponse> {
  try {
    const isFormData = params instanceof FormData;
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      },
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const response: AxiosResponse = await axios.post(url, params, config);

    if (response.data.success) {
    //   toast.success(response.data.message);
    } else {
    //   toast.error(response.data.message);
    }

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.errors && error.response.data.errors.length > 0
        ? error.response.data.errors[0].message
        : error?.response?.data?.message || "Network error";
    // toast.error(errorMessage);

    return {
      success: false,
      message: errorMessage,
    };
  }
}

// GET Request with authorization
export const apiGet = async (
  url: string,
  params: object = {},
  token: string | undefined
): Promise<ApiResponse<any> | ErrorResponse> => {
  if (!token) {
    // toast.error("Authorization token is missing.");
    return { success: false, message: "Authorization token is required." };
  }

  try {
    const response: AxiosResponse = await axios.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      return { success: true, data: response.data.payload };
    } else {
    //   toast.error(response.data.message || "Request failed.");
      return { success: false, message: response.data.message || "Request failed." };
    }
  } catch (error: any) {
    return { success: false, message: "Network error" };
  }
};

// GET Request without authorization (Public API)
export const apiGetPublic = async (
  url: string,
  params: object = {}
): Promise<ApiResponse<any> | ErrorResponse> => {
  try {
    const response: AxiosResponse = await axios.get(url, { params });

    if (response.data.success) {
      return { success: true, data: response.data };
    } else {
    //   toast.error(response.data.message || "Request failed.");
      return { success: false, message: response.data.message || "Request failed." };
    }
  } catch (error: any) {
    return { success: false, message: "Network error" };
  }
};

// PUT Request
export async function apiPut<T>(
  url: string,
  data: any = {},
  token: string | undefined
): Promise<ApiResponse<T> | ErrorResponse> {
  try {
    const isFormData = data instanceof FormData;
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      },
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const response: AxiosResponse = await axios.put(url, data, config);

    if (response.data.success) {
    //   toast.success(response.data.message);
    } else {
    //   toast.error(response.data.message);
    }

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.errors && error.response.data.errors.length > 0
        ? error.response.data.errors[0].message
        : error?.response?.data?.message || "Network error";
    // toast.error(errorMessage);

    return {
      success: false,
      message: "custom error",
    };
  }
}

// DELETE Request
export const apiDelete = async (
  url: string,
  token: string | undefined
): Promise<ApiResponse<any> | ErrorResponse> => {
  if (!token) {
    // toast.error("Authorization token is missing.");
    return { success: false, message: "Authorization token is required." };
  }

  try {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response: AxiosResponse = await axios.delete(url, config);

    if (response.data.success) {
    //   toast.success(response.data.message);
    } else {
    //   toast.error(response.data.message);
    }

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.errors && error.response.data.errors.length > 0
        ? error.response.data.errors[0].message
        : error.response?.data?.message || "Network error";
    // toast.error(errorMessage);

    return {
      success: false,
      message: errorMessage,
    };
  }
};

export default {
  apiPost,
  apiGet,
  apiPut,
};
