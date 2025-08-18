import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import DashboardHeader from "@components/Dashboard-components/Dashboard-header/DashboardHeader";
import Sidebar from "@components/Dashboard-components/Sidebar/Sidebar";
import ProfileSidebar from "@components/Dashboard-components/Sidebar/ProfileSidebar";
import {
  PatientProfileSidebarLinks,
  PatientSidebarLinks,
} from "@components/Dashboard-components/Sidebar/SidebarLinks";

const PatientProfileLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const showProfileSidebar = [
    "/patient/profile",
    "/patient/manage-password",
    "/patient/feature",
    "/patient/payment-history",
  ].some((path) => location.pathname.startsWith(path));

  const isPatientChatbotPage = location.pathname.includes("/patient/chatbot");

  const mainMargin = showProfileSidebar ? "lg:ml-[357px]" : "lg:ml-[89px]";

  return (
    <div className="dashboard flex min-h-screen">
      <Sidebar
        sidebarData={PatientSidebarLinks}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {showProfileSidebar && (
        <ProfileSidebar
          sidebarData={PatientProfileSidebarLinks}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}

      <div className={`flex flex-col flex-1 px-4 pt-3 ml-0 ${mainMargin}`}>
        <DashboardHeader
          showProfileSidebar={showProfileSidebar}
          sidebarOpen={isSidebarOpen}
          setSidebarOpen={setIsSidebarOpen}
          className={isPatientChatbotPage ? "max-w-[91%]" : ""}
        />
        <main className="mt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PatientProfileLayout;
