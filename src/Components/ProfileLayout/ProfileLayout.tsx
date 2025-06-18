import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import DashboardHeader from "@components/Dashboard-components/Dashboard-header/DashboardHeader";
import Sidebar from "@components/Dashboard-components/Sidebar/Sidebar";
import ProfileSidebar from "@components/Dashboard-components/Sidebar/ProfileSidebar";
import {
  AdminSidebarLinks,
  ProfileSidebarLinks,
} from "@components/Dashboard-components/Sidebar/SidebarLinks";

const ProfileLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Determine if profile-specific sidebar should be shown
  const showProfileSidebar = ["/profile", "/manage-password", "/feature"].some(
    (path) => location.pathname.startsWith(path)
  );

  // Adjust main content margin based on active sidebar
  const mainMargin = showProfileSidebar ? "lg:ml-[357px]" : "lg:ml-[89px]";

  return (
    <div className="dashboard flex min-h-screen">
      {/* Main Sidebar */}
      <Sidebar
        sidebarData={AdminSidebarLinks}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Conditional Profile Sidebar */}
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
