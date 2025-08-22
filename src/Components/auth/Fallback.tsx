import { useMeApi } from "@src/hooks/useUsers";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Fallback() {
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  // ✅ API will run only after token exists
  const { data, isSuccess, isFetching } = useMeApi(!!token);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    if (urlToken) {
      // save token to localStorage
      localStorage.setItem("token", JSON.stringify(urlToken));
      setToken(urlToken); // triggers useMeApi
    }
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("userInfo", JSON.stringify(data));

      // redirect based on role
      switch (data.role_type) {
        case "PATIENT":
          navigate("/patient/dashboard", { replace: true });
          break;
        case "CARE_PROVIDER":
          navigate("/care-provider", { replace: true });
          break;
        case "ADMIN":
          navigate("/admin", { replace: true });
          break;
        default:
          navigate("/login", { replace: true });
      }
    }
  }, [isSuccess, data, navigate]);

  if (isFetching) return <div>Loading...</div>;

  return <div>Loading...</div>;
}

export default Fallback;
