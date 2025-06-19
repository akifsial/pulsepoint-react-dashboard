import DashboardHeader from "@components/Dashboard-components/Dashboard-header/DashboardHeader";
import Sidebar from "@components/Dashboard-components/Sidebar/Sidebar";
import {AdminSidebarLinks } from "@components/Dashboard-components/Sidebar/SidebarLinks";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className=" dashboard flex min-h-screen">
      <Sidebar sidebarData={AdminSidebarLinks} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex flex-col flex-1 px-4 pt-3 lg:ml-68 ml-0">
        <DashboardHeader
          sidebarOpen={isSidebarOpen}
          setSidebarOpen={setIsSidebarOpen}
          routeProfile="/admin/profile"
        />
        <main className="mt-28">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;