import { useMeApi } from "@src/hooks/use-users";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Fallback() {
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const { data, isSuccess, isFetching } = useMeApi(!!token,navigate);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    if (urlToken) {
      localStorage.setItem("token", JSON.stringify(urlToken));
      setToken(urlToken); 
    }
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("userInfo", JSON.stringify(data));

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
