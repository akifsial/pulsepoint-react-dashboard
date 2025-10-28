import React from "react";
import { useSearchParams } from "react-router-dom";
import ViewCommunity from "./viewcommunity";

const ViewCommunityWrapper = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  if (!type || !id) return <div>Select a post/comment/report</div>;

  return <ViewCommunity type={type} id={id} />;
};

export default ViewCommunityWrapper;
