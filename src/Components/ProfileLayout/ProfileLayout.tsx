<<<<<<< HEAD
import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import DashboardHeader from "@components/Dashboard-components/Dashboard-header/DashboardHeader";
import ProfileSidebar from "@components/Dashboard-components/Sidebar/ProfileSidebar";
import Sidebar from "@components/Dashboard-components/Sidebar/Sidebar";
import {
  AdminSidebarLinks,
  PatientSidebarLinks,
  sidebarLinks as CareProviderSidebarLinks,
  ProfileSidebarLinks,
} from "@components/Dashboard-components/Sidebar/SidebarLinks";
=======
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
>>>>>>> 43384e7c1a36bd4d89fe65748da3a78e29ec0211

import DashboardHeader from "@components/Dashboard-components/Dashboard-header/DashboardHeader";
import Sidebar from "@components/Dashboard-components/Sidebar/Sidebar";
import ProfileSidebar from "@components/Dashboard-components/Sidebar/ProfileSidebar";
import {
  AdminSidebarLinks,
  ProfileSidebarLinks,
} from "@components/Dashboard-components/Sidebar/SidebarLinks";

const ProfileLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sdData, setSdData] = useState([]);
  const location = useLocation();
  const prevPathRef = useRef(null); // Ref to store previous pathname

  // Store current path as previous before updating
  useEffect(() => {
    prevPathRef.current = location.pathname;
  }, [location.pathname]);

  // Log previous path
  useEffect(() => {
    const prevPath = prevPathRef.current;
    console.log("Previous Path:", prevPath);

    if (prevPath?.includes("/admin")) {
      setSdData(AdminSidebarLinks);
      console.log("Using AdminLinks (prevPath)");
    } else if (prevPath?.includes("/patient")) {
      setSdData(PatientSidebarLinks);
      console.log("Using PatientLinks (prevPath)");
    } else if (prevPath?.includes("/care-provider")) {
      setSdData(CareProviderSidebarLinks);
      console.log("Using CareProviderSidebarLinks (prevPath)");
    } else {
      setSdData([]);
      console.warn("No matching sidebar links for prevPath:", prevPath);
    }
  }, []);

  const showProfileSidebar = ["/profile", "/manage-password", "/feature"].some(path =>
    location.pathname.startsWith(path)
  );
  const mainMargin = showProfileSidebar ? "lg:ml-[357px]" : "lg:ml-[89px]";

  return (
    <div className="dashboard flex min-h-screen">
      {/* Main Sidebar */}
      <Sidebar
        sidebarData={PatientSidebarLinks}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {showProfileSidebar && (
        <ProfileSidebar
          sidebarData={ProfileSidebarLinks}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className={`flex flex-col flex-1 px-4 pt-3 ml-0  ${mainMargin}`}>
        <DashboardHeader
          showProfileSidebar={showProfileSidebar}
          sidebarOpen={isSidebarOpen}
          setSidebarOpen={setIsSidebarOpen}
        />
        <main className="mt-24">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProfileLayout;
