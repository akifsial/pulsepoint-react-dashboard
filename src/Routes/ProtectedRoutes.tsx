import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";



// export const ProtectedRoutes: React.FC = ({ children,allowedRoles }) => {
//   const isAuthenticate = localStorage.getItem("userInfo");
//   const navigate = useNavigate();
//   const userRole=JSON.parse(localStorage.getItem("userInfo"))?.role_type

//   console.log("nnnnnnnnmmmmmmmm",userRole)

//   useEffect(() => {
//     if (!isAuthenticate) {
//       navigate("/patient/login");
//     }
//   }, [navigate, isAuthenticate]);

//   if (!isAuthenticate) {
//     {
//       return navigate("/patient/login");
//     }
//   }

//   // if (!allowedRoles?.includes(userRole)) {
//   //   return <Navigate to="/unauthorized" replace />; // or your dashboard
//   // }

//   return children;
// };






// export const PublicProtectRoute: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const navigate = useNavigate();
//   const [checkingAuth, setCheckingAuth] = useState(true); // for preventing render during redirect

//   useEffect(() => {
//     const isAuthenticated = localStorage.getItem("userInfo");

//     if (isAuthenticated) {
//       navigate(`/patient/dashboard`);
//     } else {
//       setCheckingAuth(false); // only render children if not authenticated
//     }
//   }, [navigate]);

//   if (checkingAuth) {
//     return null; // don’t flash the login page while checking
//   }

//   return <>{children}</>;
// };





export const ProtectedRoutes: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({
  children,
  allowedRoles,
}) => {
    const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const isAuthenticated = !!user?.role_type 
  const userRole = user?.role_type;

  if (!isAuthenticated) {
    // redirect to login based on role or default
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // redirect unauthorized roles
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};





export const PublicProtectRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const token = localStorage.getItem("token");
  const isAuthenticated =  !!user?.role_type;

  if (isAuthenticated) {
    // redirect based on role
    switch (user.role_type) {
      case "PATIENT":
        return <Navigate to="/patient/dashboard" replace />;
      case "CARE_PROVIDER":
        return <Navigate to="/care-provider" replace />;
      case "ADMIN":
        return <Navigate to="/admin" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
};
