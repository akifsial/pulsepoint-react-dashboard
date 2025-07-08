import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoutes: React.FC = ({ children }) => {
  const isAuthenticate = localStorage.getItem("userInfo");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticate) {
      navigate("/login");
    }
  }, [navigate, isAuthenticate]);

  if (!isAuthenticate) {
    {
      return navigate("/login");
    }
  }

  return children;
};

export const PublicProtectRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true); // for preventing render during redirect

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("userInfo");

    if (isAuthenticated) {
      navigate(`/patient/dashboard`);
    } else {
      setCheckingAuth(false); // only render children if not authenticated
    }
  }, [navigate]);

  if (checkingAuth) {
    return null; // don’t flash the login page while checking
  }

  return <>{children}</>;
};
