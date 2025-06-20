import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import DashboardHeader from "@components/Dashboard-components/Dashboard-header/DashboardHeader";
import Sidebar from "@components/Dashboard-components/Sidebar/Sidebar";
import ProfileSidebar from "@components/Dashboard-components/Sidebar/ProfileSidebar";
import {
  AdminSidebarLinks,
  CareProfileSidebarLinks,
  PatientSidebarLinks,
  ProfileSidebarLinks,
  sidebarLinks,
} from "@components/Dashboard-components/Sidebar/SidebarLinks";

const CareProfileLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sdData, setSdData] = useState([]);
  const location = useLocation();
//   useEffect(() => {
//     if (location.pathname === "/admin") {
//       setSdData(AdminSidebarLinks);
//       console.log("Using AdminLinks");
//     } else if (location.pathname === "/patient") {
//       setSdData(PatientSidebarLinks);
//       console.log("Using PatientLinks ");
//     } else if (location.pathname === "/care-provider") {
//       setSdData(sidebarLinks);
//       console.log("Using CareProviderSidebarLinks");
//     } else {
//       setSdData([]);
//       console.warn("No matching sidebar links for ");
//     }
//   }, [location.pathname]);

  const showProfileSidebar = ["/care-provider/profile", "/care-provider/manage-password", "/care-provider/feature"].some(
    (path) => location.pathname.startsWith(path)
  );
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
        <main className="mt-24">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CareProfileLayout;
