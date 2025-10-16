import DashboardHeader from "@components/dashboard-components/dashboard-header/dashboard-header";
import Sidebar from "@components/dashboard-components/sidebar/sidebar";
import { PatientSidebarLinks } from "@components/dashboard-components/sidebar/sidebar-links";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const PatientLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const location=useLocation()
const hideHeader=location.pathname.startsWith("/patient/chatbot")
  return (
    <div className=" dashboard flex min-h-screen">
      <Sidebar sidebarData={PatientSidebarLinks} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex flex-col flex-1 px-4 pt-3 lg:ml-68 ml-0" style={{background:" linear-gradient(107.76deg, #F4F7FF -2.99%, #DDEFF7 64.85%, #D6E0F9 113.61%)"}}>
      {!hideHeader &&  <DashboardHeader
          sidebarOpen={isSidebarOpen}
          setSidebarOpen={setIsSidebarOpen} 
          noticationLink="/patient/notification"
          routeProfile="/patient/profile"
          routeSetting="/patient/manage-password"
        />}
        
        <main className="mt-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PatientLayout;