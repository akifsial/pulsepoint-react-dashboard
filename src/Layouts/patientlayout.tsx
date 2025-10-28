import DashboardHeader from "@src/Components/Dashboardcomponents/dashboardheader/dashboardheader";
import Sidebar from "@components/dashboard-components/sidebar/sidebar";
import { PatientSidebarLinks } from "@components/dashboard-components/sidebar/sidebar-links";
import ModalRedirect from "@src/Components/Model/modalredirect";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const PatientLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const hideHeader = location.pathname.startsWith("/patient/chatbot");
  return (
    <div className=" dashboard flex min-h-screen">
      <Sidebar
        sidebarData={PatientSidebarLinks}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div
        className="flex flex-col flex-1 px-4 pt-3 lg:ml-68 ml-0"
        style={{
          background:
            " linear-gradient(107.76deg, #F4F7FF -2.99%, #DDEFF7 64.85%, #D6E0F9 113.61%)",
        }}
      >
        {!hideHeader && (
          <DashboardHeader
            sidebarOpen={isSidebarOpen}
            setSidebarOpen={setIsSidebarOpen}
            noticationLink="/patient/notification"
            routeProfile="/patient/profile"
            routeSetting="/patient/manage-password"
          />
        )}

        <div className="mt-4.5 flex items-end justify-end">
          <button
            onClick={() => setShowModal(true)}
            className="cursor-pointer h-10 min-w-[180px] rounded-lg bg-[#2DB2FD] px-2 font-geist text-base font-semibold text-white transition-colors duration-150 active:scale-95 sm:w-[131px] w-full"
          >
            Change dashboard
          </button>

          <ModalRedirect show={showModal} onClose={() => setShowModal(false)} />
        </div>

        <main className="mt-4.5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PatientLayout;
