import axios, { AxiosResponse } from "axios";
// For live
// const API_URL = "http://192.168.88.97:7000/api/v1/";
// const API_URL = "https://phpstack-1250693-5681983.cloudwaysapps.com/api/v1/";
const API_URL = import.meta.env.VITE_APP_API_URL;

// for local api 21-07-2025
// const API_URL = "http://192.168.88.97:7000/api/v1/";

// Optional default headers
// const headers = {
//   "Content-Type": "application/json",
//   // Add other headers as needed
// };

// if status code is 401, clear localStorage and redirect to login
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for handling 401
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.clear();
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export const apiServices = {
  // get: async (
  //   endPoint: string,
  //   params?: Record<string, any>,
  //   responseType?: AxiosRequestConfig["responseType"]
  // ): Promise<AxiosResponse> => {
  //   return axios.get(API_URL + endPoint, {
  //     headers,
  //     params,
  //     responseType: responseType ?? "json",
  //   });
  // },

  get: async (endPoint: string, paramData?: Record<string, unknown>) => {
    // const token = localStorage.getItem("token");
    const token: string | null = JSON.parse(
      localStorage.getItem("token") || "null"
    );
    return axiosInstance.get(endPoint, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      params: paramData,
    });
  },

  postWithToken: async (
    endPoint: string,
    data?: unknown
  ): Promise<AxiosResponse> => {
    // const token = localStorage.getItem("token");
    const token: string | null = JSON.parse(
      localStorage.getItem("token") || "null"
    );
    return axiosInstance.post(endPoint, data ?? {}, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },

  post: async (endPoint: string, data?: unknown): Promise<AxiosResponse> => {
    return axiosInstance.post(endPoint, data ?? {});
  },

  // update: async (data: unknown, endPoint: string): Promise<AxiosResponse> => {
  //   // const token = localStorage.getItem("token");
  //   const token: string | null = JSON.parse(
  //     localStorage.getItem("token") || "null"
  //   );
  //   return axiosInstance.put(endPoint, data, {
  //     headers: token ? { Authorization: `Bearer ${token}` } : {},
  //   });
  // },

  update: async (data: unknown, endPoint: string): Promise<AxiosResponse> => {
    const token: string | null = JSON.parse(
      localStorage.getItem("token") || "null"
    );

    const headers: Record<string, string> = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // 👇 Check if data is FormData, then set proper headers
    if (data instanceof FormData) {
      headers["Content-Type"] = "multipart/form-data";
    }

    return axiosInstance.put(endPoint, data, { headers });
  },

  deleteBodyParam: async (
    endPoint: string,
    body?: Record<string, unknown>
  ): Promise<AxiosResponse> => {
    // const token = localStorage.getItem("token");
    const token: string | null = JSON.parse(
      localStorage.getItem("token") || "null"
    );
    return axiosInstance.delete(endPoint, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      data: body,
    });
  },

  // delete: async (
  //   endPoint: string,
  //   params?: Record<string, unknown>
  // ): Promise<AxiosResponse> => {
  //   const token = localStorage.getItem("token");

  //   const headers = {
  //     "Content-Type": "application/json",
  //     ...(token && { Authorization: `Bearer ${token}` }),
  //   };

  //   return axios.delete(API_URL + endPoint, {
  //     headers,
  //     params,
  //   });
  // },

  delete: async (
    endPoint: string,
    params?: Record<string, unknown>
  ): Promise<AxiosResponse> => {
    // const token = localStorage.getItem("token");
    const token: string | null = JSON.parse(
      localStorage.getItem("token") || "null"
    );
    return axiosInstance.delete(endPoint, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      params,
    });
  },
};
