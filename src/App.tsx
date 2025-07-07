import Router from "@routes/Router";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Router />
    </div>
  );
};

export default App;
