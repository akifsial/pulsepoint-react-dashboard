import React from "react";
import CommunityFeed from "./community-feed";
import PopularCommunity from "./popular-community";
import CommunityAccountPosts from "@components/community-account-posts";

const OurFeed = (data) => {
  return (
    <>
      <div className="block md:flex md:items-start justify-between md:gap-6">
        <CommunityFeed data={data} />
        <PopularCommunity />
      </div>
    </>
  );
};

export default OurFeed;
