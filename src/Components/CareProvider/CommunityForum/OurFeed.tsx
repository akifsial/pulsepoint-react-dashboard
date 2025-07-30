import React from "react";
import CommunityFeed from "./CommunityFeed";
import PopularCommunity from "./PopularCommunity";

const OurFeed = (data) => {
  return (
    <>
      <div className="block sm:flex sm:items-start sm:gap-6">
        <CommunityFeed data={data} />
        <PopularCommunity />
      </div>
    </>
  );
};

export default OurFeed;
