import SiteHeader from "@src/components/Web-components/Site-header/SiteHeader";
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
