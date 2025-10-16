import SiteHeader from "@components/web-components/site-header/site-header";
import React from "react";

const WebMainLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="website">
      <SiteHeader/>
      <main>{children}</main>
    </div>
  );
};

export default WebMainLayout;
