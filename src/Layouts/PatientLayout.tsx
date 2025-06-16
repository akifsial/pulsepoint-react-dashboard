import DashboardHeader from "@components/Dashboard-components/Dashboard-header/DashboardHeader";
import Sidebar from "@components/Dashboard-components/Sidebar/Sidebar";
import { PatientSidebarLinks } from "@components/Dashboard-components/Sidebar/SidebarLinks";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const PatientLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className=" dashboard flex min-h-screen">
      <Sidebar sidebarData={PatientSidebarLinks} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex flex-col flex-1 px-4 pt-3 lg:ml-68 ml-0">
        <DashboardHeader
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

export default PatientLayout;