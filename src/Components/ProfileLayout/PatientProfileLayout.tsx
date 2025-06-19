import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import DashboardHeader from "@components/Dashboard-components/Dashboard-header/DashboardHeader";
import Sidebar from "@components/Dashboard-components/Sidebar/Sidebar";
import ProfileSidebar from "@components/Dashboard-components/Sidebar/ProfileSidebar";
import {
  AdminSidebarLinks,
  PatientProfileSidebarLinks,
  PatientSidebarLinks,
  ProfileSidebarLinks,
  sidebarLinks,
} from "@components/Dashboard-components/Sidebar/SidebarLinks";
import ChatbotAi from "@components/ChatbotAi";

const PatientProfileLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const [showgpt, setShowgpt] = useState(false);

  const showProfileSidebar = ["/patient/profile", "/patient/manage-password", "/patient/feature"].some(
    (path) => location.pathname.startsWith(path)
  );
  const showChatbot = ["/patient/chatbot"].some(
    (path) => location.pathname.startsWith(path)
  );
  const mainMargin = showProfileSidebar ? "lg:ml-[357px]" : "lg:ml-[89px]";

  return (
    <>
      {!showgpt ? (
        <div className="bg-black dashboard flex min-h-screen"><ChatbotAi/></div>
      ) : (
        <div className="dashboard flex min-h-screen">
          {/* Main Sidebar */}
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
        {showChatbot && (
          <ChatbotAi />
        )}

        {/* Main Content Area */}
        <div className={`flex flex-col flex-1 px-4 pt-3 ml-0 ${mainMargin}`}>
          <DashboardHeader
            showProfileSidebar={showProfileSidebar}
            sidebarOpen={isSidebarOpen}
            setSidebarOpen={setIsSidebarOpen}
          />
          <main className="mt-24">
            <Outlet />
          </main>
        </div>
      </div>
  )}</>
  );
};

export default PatientProfileLayout;
