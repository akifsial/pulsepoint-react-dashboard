import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import DashboardHeader from "@src/components/Dashboard-components/Dashboard-header/DashboardHeader";
import Sidebar from "@src/components/Dashboard-components/Sidebar/Sidebar";
import ProfileSidebar from "@src/components/Dashboard-components/Sidebar/ProfileSidebar";
import {
  AdminSidebarLinks,
  CareProfileSidebarLinks,
  PatientSidebarLinks,
  ProfileSidebarLinks,
  sidebarLinks,
} from "@src/components/Dashboard-components/Sidebar/SidebarLinks";

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
