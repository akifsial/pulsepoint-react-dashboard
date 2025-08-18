import Router from "@routes/Router";
import React, { useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { setupInterceptors } from "./interceptor";
// import { connectSocket } from "@src/socket/";

const App: React.FC = () => {
  const socketRef = useRef(null);

  // useEffect(() => {
  //   // const token = JSON.stringify(localStorage.getItem("token")); // or however you're getting it
  //   const token = JSON.stringify(localStorage.getItem("token")); // or however you're getting it


  //   // Step 1: Create socket instance and store in ref
  //   if (token !== 'null') {
  //     console.log("token is coming")
  //     socketRef.current = connectSocket(token);
  //   }

  //   // Step 2: Optional — connect if not auto-connected
  //   // socketRef.current.connect(); // Usually not needed as io() auto-connects

  //   // Step 3: Tell server when closing tab
  //   const handleBeforeUnload = () => {
  //     if (socketRef.current?.connected) {
  //       socketRef.current.emit("manual_disconnect");
  //     }
  //   };
  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //     if (socketRef.current) {
  //       socketRef.current.emit("manual_disconnect");
  //       socketRef.current.disconnect();
  //     }
  //   };
  // }, []);

  const navigate=useNavigate()
  

const location = useLocation();

  // useEffect(() => {
  //   setupInterceptors(navigate);
  // }, [navigate]);


// useEffect(() => {
//   const params = new URLSearchParams(location.search);
//   const token = params.get("token");
//   if (token) {
//     // localStorage.setItem("token", token);
//     localStorage.setItem("token", JSON.stringify(token));

//     // localStorage.setItem("userInfo", token);

//     console.log("✅ Token stored from router:", token);
//     navigate("/patient/dashboard")
//   }
// }, [location]);


  return (
    <div>
      <Router />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              background: "#4BB543",
              color: "white",
            },
          },
          error: {
            style: {
              background: "#FF4C4C",
              color: "white",
            },
          },
        }}
      />
    </div>
  );
};

export default App;
