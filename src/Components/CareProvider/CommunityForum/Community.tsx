import React, { useState } from "react";
import CommunityFeed from "./CommunityFeed";
import PopularCommunity from "./PopularCommunity";
import WhiteHome from "@assets/media/svgs/dashboard-svgs/homeWhite.svg";
import Whitepopular from "@assets/media/svgs/dashboard-svgs/popularWhite.svg";
import home from "@assets/media/svgs/dashboard-svgs/home.svg";
import popular from "@assets/media/svgs/dashboard-svgs/popular.svg";
import BackFeed from "./BackFeed/BackFeed";
import Saved from "@assets/media/svgs/export.svg";
import SavedCommunityFeed from "./SavedCommunityFeed";

const Community = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [openBackFeed, setOpenBackFeed] = useState(false);
  const [postIdFeed, setPostIdFeed] = useState();

  return (
    <>
      {openBackFeed ? (
        <BackFeed
          setOpenBackFeed={setOpenBackFeed}
          setPostIdFeed={setPostIdFeed}
        />
      ) : (
        <div className="w-full block justify-between sm:flex sm:items-start sm:gap-6">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-3.5 text-[#252525] font-[Space Grotesk]">
              Your Feed
            </h2>
            <div className="flex gap-[5px] mb-6">
              <button
                onClick={() => setActiveTab("home")}
                className={`flex items-center cursor-pointer gap-2 px-4 py-[7px] rounded-[20px] transition-all ${
                  activeTab === "home"
                    ? "bg-[#28A2FF] text-white"
                    : "bg-[#D9E7EE] text-[#252525]"
                }`}
              >
                <img src={activeTab === "home" ? WhiteHome : home} alt="Home" />
                Home
              </button>
              <button
                onClick={() => setActiveTab("Popular")}
                className={`flex items-center cursor-pointer gap-2 px-4 py-[7px] rounded-[20px] transition-all ${
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
              <button
                onClick={() => setActiveTab("Saved")}
                className={`flex items-center cursor-pointer gap-2 px-4 py-[7px] rounded-[20px] transition-all ${
                  activeTab === "Saved"
                    ? "bg-[#28A2FF] text-white"
                    : "bg-[#D9E7EE] text-[#252525]"
                }`}
              >
                <img
                  src={activeTab === "Saved" ? Saved : Saved}
                  alt="Popular"
                />
                Save Posts
              </button>
            </div>
            {activeTab == "home" || activeTab == "Popular" ? (
              <CommunityFeed
                setOpenBackFeed={setOpenBackFeed}
                setPostIdFeed={setPostIdFeed}
              />
            ) : (
              <SavedCommunityFeed />
            )}
          </div>

          <div className="flex-shrink-0 w-[292px]">
            <PopularCommunity />
          </div>
        </div>
      )}
    </>
  );
};

export default Community;
