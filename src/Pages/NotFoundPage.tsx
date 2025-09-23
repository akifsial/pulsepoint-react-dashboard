import React from "react";
import Lottie from "lottie-react";
import notFoundAnimation from "@assets/animations/Not-found.json.json";
import { Link } from "react-router-dom";

const NotFoundPage:React.FC = () => {
  const userRole=JSON.parse(localStorage.getItem("userInfo"))?.user_role
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white text-center px-4"
      style={{
        background:
          "linear-gradient(99.67deg, #0071BC 10.16%, #003456 100.87%)",
      }}
    >
      <div className="max-w-md w-full">
        <Lottie animationData={notFoundAnimation} loop={true} />
        <p className="text-[20px] mt-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/login"
          className="inline-block mt-6 px-6 py-3 bg-[#00B57A] text-white rounded-[8px] hover:bg-green-600 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
