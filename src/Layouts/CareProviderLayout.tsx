import DashboardHeader from "@components/Dashboard-components/Dashboard-header/DashboardHeader";
import Sidebar from "@components/Dashboard-components/Sidebar/Sidebar";
import { sidebarLinks } from "@components/Dashboard-components/Sidebar/SidebarLinks";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const CareProviderLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const isCareProviderChatbotPage = location.pathname.includes("/care-provider/chatbot");

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

        <main className="mt-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CareProviderLayout;
