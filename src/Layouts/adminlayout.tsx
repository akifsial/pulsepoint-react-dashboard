import DashboardHeader from "@src/Components/Dashboard-components/Dashboard-header/dashboardheader";
import Sidebar from "@components/dashboard-components/sidebar/sidebar";
import { AdminSidebarLinks } from "@src/Components/Dashboard-components/Side-bar/sidebarlinks";
import ModalRedirect from "@src/Components/Model/modalredirect";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className=" dashboard flex min-h-screen">
      <Sidebar
        sidebarData={AdminSidebarLinks}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex flex-col flex-1 px-4 pt-3 lg:ml-68 ml-0">
        <DashboardHeader
          sidebarOpen={isSidebarOpen}
          setSidebarOpen={setIsSidebarOpen}
          noticationLink="/admin/notification"
          routeProfile="/admin/profile"
          routeSetting="/admin/manage-password"
        />
        <div className="mt-6 flex items-end justify-end">
          <button
            onClick={() => setShowModal(true)}
            className="cursor-pointer h-10 min-w-[180px] rounded-lg bg-[#2DB2FD] px-2 font-geist text-base font-semibold text-white transition-colors duration-150 active:scale-95 sm:w-[131px] w-full"
          >
            Change dashboard
          </button>

          <ModalRedirect show={showModal} onClose={() => setShowModal(false)} />
        </div>
        <main className="mt-6 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
