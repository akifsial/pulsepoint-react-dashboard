import Router from "@routes/Router";
import React from "react";
import { Toaster } from "react-hot-toast";

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
