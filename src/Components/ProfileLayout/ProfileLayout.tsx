import DashboardHeader from "@components/Dashboard-components/Dashboard-header/DashboardHeader";
import ProfileSidebar from "@components/Dashboard-components/Sidebar/ProfileSidebar";
import Sidebar from "@components/Dashboard-components/Sidebar/Sidebar";
import { AdminSidebarLinks, ProfileSidebarLinks } from "@components/Dashboard-components/Sidebar/SidebarLinks";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const ProfileLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profileSidebarOpen, setProfileSidebarOpen] = useState(false);
  const location = useLocation();

  const showProfileSidebar = ["/profile", "/manage-password","/feature"].some(path =>
  location.pathname.startsWith(path)
);
  const mainMargin = showProfileSidebar ? "lg:ml-[357px]" : "lg:ml-[89px]";
  return (
    <div className="dashboard flex min-h-screen">
      <Sidebar
        sidebarData={AdminSidebarLinks}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      {showProfileSidebar && (
        <ProfileSidebar sidebarData={ProfileSidebarLinks}  isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)} />
      )}

      <div
      className={`flex flex-col flex-1 px-4 pt-3 ml-0 ${
         mainMargin
        }`}
      >
        <DashboardHeader
        showProfileSidebar={showProfileSidebar}
          sidebarOpen={isSidebarOpen}
          setSidebarOpen={setIsSidebarOpen}
        />
        <main className="mt-28">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProfileLayout;
