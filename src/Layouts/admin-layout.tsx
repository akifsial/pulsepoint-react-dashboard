import DashboardHeader from "@components/dashboard-components/dashboard-header/dashboard-header";
import Sidebar from "@components/dashboard-components/sidebar/sidebar";
import {AdminSidebarLinks } from "@components/dashboard-components/sidebar/sidebar-links";
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
          noticationLink="/admin/notification"
          routeProfile="/admin/profile"
          routeSetting="/admin/manage-password"
        />
        <main className="mt-12 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;