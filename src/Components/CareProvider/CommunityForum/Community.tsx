import React, { useState } from "react";
import CommunityFeed from "./CommunityFeed";
import PopularCommunity from "./PopularCommunity";
import WhiteHome from "@assets/media/svgs/dashboard-svgs/homeWhite.svg";
import Whitepopular from "@assets/media/svgs/dashboard-svgs/popularWhite.svg";
import home from "@assets/media/svgs/dashboard-svgs/home.svg";
import popular from "@assets/media/svgs/dashboard-svgs/popular.svg";
import BackFeed from "./BackFeed/BackFeed";

const Community = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [openBackFeed, setOpenBackFeed] = useState(false);
  return (
    <>
      {openBackFeed ? (
        <BackFeed setOpenBackFeed={setOpenBackFeed} />
      ) : (
        <div className="block sm:flex sm:items-start sm:gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-3.5 text-[#252525] font-[Space Grotesk]">
              Your Feed
            </h2>
            <div className="flex gap-[5px] mb-6">
              <button
                onClick={() => setActiveTab("home")}
                className={`flex items-center gap-2 px-4 py-[7px] rounded-[20px] transition-all ${
                  activeTab === "home"
                    ? "bg-[#28A2FF] text-white"
                    : "bg-[#D9E7EE] text-[#252525]"
                }`}
              >
                <img src={activeTab === "home" ? WhiteHome : home} alt="Home" />
                Home
              </button>
              <button
                onClick={() => setOpenBackFeed(true)}
                className={`flex items-center gap-2 px-4 py-[7px] rounded-[20px] transition-all ${
                  activeTab === "Popular"
                    ? "bg-[#28A2FF] text-white"
                    : "bg-[#D9E7EE] text-[#252525]"
                }`}
              >
                <img
                  src={activeTab === "Popular" ? Whitepopular : popular}
                  alt="Popular"
                />
                Popular
              </button>
            </div>
            <CommunityFeed />
          </div>
          <PopularCommunity />
        </div>
      )}
    </>
  );
};

export default Community;
