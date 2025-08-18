import axios from "axios";
import { NavigateFunction } from "react-router-dom";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

// Add interceptor
export const setupInterceptors = (navigate: NavigateFunction) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        navigate("/login"); // redirect to login
      }
      return Promise.reject(error);
    }
  );
};

export default api;
