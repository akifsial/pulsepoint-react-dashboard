import DashboardHeader from "@src/Components/Dashboard-components/Dashboard-header/dashboardheader";
import Sidebar from "@components/Dashboard-components/Side-bar/Sidebar";
import { sidebarLinks } from "@src/Components/Dashboard-components/Side-bar/sidebarlinks";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import ModalRedirect from "@src/Components/Model/modalredirect";

const CareProviderLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  const isCareProviderChatbotPage = location.pathname.includes(
    "/care-provider/chatbot"
  );

  return (
    <div className="dashboard flex min-h-screen">
      <Sidebar
        sidebarData={sidebarLinks}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex flex-col flex-1 px-4 pt-3 lg:ml-68 ml-0">
        <DashboardHeader
          sidebarOpen={isSidebarOpen}
          setSidebarOpen={setIsSidebarOpen}
          noticationLink="/care-provider/notification"
          routeProfile="/care-provider/profile"
          routeSetting="/care-provider/manage-password"
          className={isCareProviderChatbotPage ? "max-w-[91%] ml-20" : ""}
        />
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

export default CareProviderLayout;
