import React from "react";
import CommunityFeed from "./CommunityFeed";
import PopularCommunity from "./PopularCommunity";
import CommunityAccountPosts from "@components/CommunityAccountPosts";

const OurFeed = (data) => {
  // console.log("DATA.........--------", data)
  return (
    <>
      <div className="block md:flex md:items-start md:gap-6">
        <CommunityFeed data={data} />
        {/* <CommunityAccountPosts data={data} /> */}
        <PopularCommunity />
      </div>
    </>
  );
};

export default OurFeed;
