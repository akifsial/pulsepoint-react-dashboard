// import Router from "@routes/router";
import Router from "./Routes/Router";
import React, { useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { setupInterceptors } from "./interceptor";
import { useMeApi } from "./hooks/use-users";

const App: React.FC = () => {
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
