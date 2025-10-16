import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import DashboardHeader from "@components/dashboard-components/dashboard-header/dashboard-header";
import Sidebar from "@components/dashboard-components/sidebar/sidebar";
import ProfileSidebar from "@components/dashboard-components/sidebar/profile-sidebar";
import {
  AdminSidebarLinks,
  CareProfileSidebarLinks,
  PatientSidebarLinks,
  ProfileSidebarLinks,
  sidebarLinks,
} from "@components/dashboard-components/sidebar/sidebar-links";

const CareProfileLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sdData, setSdData] = useState([]);
  const location = useLocation();
  

  const showProfileSidebar = [
    "/care-provider/profile",
    "/care-provider/manage-password",
    "/care-provider/feature",
    "/care-provider/payment-history",
  ].some((path) => location.pathname.startsWith(path));
  const mainMargin = showProfileSidebar ? "lg:ml-[357px]" : "lg:ml-[89px]";

  return (
    <div className="dashboard flex min-h-screen">
      {/* Main Sidebar */}
      <Sidebar
        sidebarData={sidebarLinks}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {showProfileSidebar && (
        <ProfileSidebar
          sidebarData={CareProfileSidebarLinks}
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
          routeProfile="/admin/profile"
          routeSetting="/admin/manage-password"
        />
        <main className="mt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CareProfileLayout;
