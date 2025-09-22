import React from "react";
import { Link } from "react-router-dom";

function BannerWeb({ pageName }) {
  return (
    <div className="bg-[#111111] text-white relative flex justify-center items-center h-[300px]">
      <div className="flex flex-col justify-center items-center">
        <p className="flex">
          <span className="font-nomal text-[#ffffff63]">Homepage</span>{" "}
          <span className="ms-1.5 me-1.5 text-[#ffffff63]"> {">"} </span>{" "}
          <p className="font-semibold ">
            {" "}
            {pageName
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")}
          </p>{" "}
        </p>
        <p className="md:text-[44px] text-[26px] font-bold">
          {" "}
          {pageName
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ")}
        </p>
      </div>
    </div>
  );
}

export default BannerWeb;
