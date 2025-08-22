import React, { useState } from "react";
import CommunityFeed from "./CommunityFeed";
import PopularCommunity from "./PopularCommunity";
import WhiteHome from "@assets/media/svgs/dashboard-svgs/homeWhite.svg";
import Whitepopular from "@assets/media/svgs/dashboard-svgs/popularWhite.svg";
import home from "@assets/media/svgs/dashboard-svgs/home.svg";
import popular from "@assets/media/svgs/dashboard-svgs/popular.svg";
import BackFeed from "./BackFeed/BackFeed";
import Saved from "@assets/media/svgs/dashboard-svgs/save.svg";
import SavedBlue from "@assets/media/svgs/dashboard-svgs/saveBlue.svg";
import SaveWhite from "@assets/media/svgs/dashboard-svgs/save-white.svg";
import SaveBlack from "@assets/media/svgs/dashboard-svgs/save-black.svg";

import SavedCommunityFeed from "./SavedCommunityFeed";
import PopularPostsCommunity from "./PopularPostsCommunity";
// import ReactSVG from "react-svg";

const Community = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [openBackFeed, setOpenBackFeed] = useState(false);
  const [postIdFeed, setPostIdFeed] = useState();
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  return (
    <>
      {openBackFeed ? (
        <BackFeed
          setOpenBackFeed={setOpenBackFeed}
          setPostIdFeed={setPostIdFeed}
          selectedCommunity={selectedCommunity}
        />
      ) : (
        <div className="w-full block justify-between mb-8 md:flex md:items-start md:gap-6">
          <div className="flex-1 md:mb-0 mb-8">
            <h2 className="text-xl font-semibold mb-3.5 text-[#252525] font-[Space Grotesk]">
              Your Feed
            </h2>
            <div className="flex flex-wrap gap-[5px] mb-6">
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
                {activeTab === "Saved" ? (
                  <img src={SaveWhite} alt="Saved" className="w-5 h-5" />
                ) : (
                  <img src={SaveBlack} alt="Saved" className="w-5 h-5" />
                )}
                {/* <img
                  src={activeTab === "Saved" ? Saved : Saved}
                  alt="Popular"
                /> */}
                {/* {activeTab == "Saved" ? (
                  <ReactSVG src={Saved} />
                ) : (
                  <ReactSVG src={Saved} />
                )} */}
                Save Posts
              </button>
            </div>
            {activeTab == "home"  ? (
              <CommunityFeed
                setOpenBackFeed={setOpenBackFeed}
                setPostIdFeed={setPostIdFeed}
              />
            ): activeTab=="Popular" ? <PopularPostsCommunity/> : (
              <SavedCommunityFeed />
            )}
          </div>

          <div className="flex-shrink-0 md:w-[292px]">
            <PopularCommunity />
          </div>
        </div>
      )}
    </>
  );
};

export default Community;
