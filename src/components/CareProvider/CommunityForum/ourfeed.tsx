import React from "react";
import CommunityFeed from "./communityfeed";
import PopularCommunity from "./popularcommunity";
import CommunityAccountPosts from "@components/communityaccountposts";

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
