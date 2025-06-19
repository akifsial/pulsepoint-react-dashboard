import { useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardHeader from "@components/Dashboard-components/Dashboard-header/DashboardHeader";
import Sidebar from "@components/Dashboard-components/Sidebar/Sidebar";
import {
  PatientSidebarLinks,
} from "@components/Dashboard-components/Sidebar/SidebarLinks";
import ChatbotSidebar from "@components/ChatbotSidebar";
import ChatbotAi from "@components/ChatbotAi";

// Chatbot-specific links
const chatbotSidebarLinks = [
  "Senior Care Platform Design",
  "Nursing home in 90210.",
  "How are facilities rated?",
  "Our AI Healthcare Guide",
];

const ChatbotLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();


  // const mainMargin = showProfileSidebar ? "lg:ml-[357px]" : "lg:ml-[89px]";

  return (
    <div className="dashboard flex min-h-screen">
      {/* Main Sidebar */}
      <Sidebar
        sidebarData={PatientSidebarLinks}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* {showProfileSidebar && ( */}
        <ChatbotSidebar
          sidebarData={chatbotSidebarLinks}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      {/* )} */}

      {/* Main Content Area */}
      <div className={`relative lg:ml-16 ml-0 flex flex-col flex-1 px-4 pt-3 `}>
        <div className="absolute -top-[116px]">
          <DashboardHeader
          showProfileSidebar={true}
          sidebarOpen={isSidebarOpen}
          setSidebarOpen={setIsSidebarOpen}
        />
        </div>
        <main>
          <ChatbotAi />
        </main>
      </div>
    </div>
  );
};

export default ChatbotLayout;
