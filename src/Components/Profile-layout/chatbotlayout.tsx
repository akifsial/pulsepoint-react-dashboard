import { useEffect, useRef, useState } from "react";
import DashboardHeader from "@src/Components/Dashboard-components/Dashboard-header/dashboardheader";
import Sidebar from "@components/Dashboard-components/Side-bar/Sidebar";
import { PatientSidebarLinks } from "@src/Components/Dashboard-components/Side-bar/sidebarlinks";
import ChatbotSidebar from "@src/Components/chatbotsidebar";
import ChatbotAi from "@src/Components/chatbotai";
import NursingHomeReview from "@src/Components/nursinghomereview";
import {
  AdminSidebarLinks,
  CareProfileSidebarLinks,
  ProfileSidebarLinks,
  sidebarLinks,
} from "@src/Components/Dashboard-components/Side-bar/sidebarlinks";

const chatbotSidebarLinks = [
  "Senior Care Platform Design",
  "Nursing home in 90210.",
  "How are facilities rated?",
  "Our AI Healthcare Guide",
];

const ChatbotLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatSidebarOpen, setIsChatSidebarOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("");
  const [selectedConversationId, setSelectedConversationId] = useState();
  const [chatBotData, setChatBotData] = useState([]);
  const userRole = JSON.parse(localStorage.getItem("userInfo"))?.role_type;
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        if (isChatSidebarOpen) {
          setIsChatSidebarOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isChatSidebarOpen]);

  return (
    <div className="dashboard flex min-h-screen">
      <Sidebar
        sidebarData={sidebarLinks}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div ref={sidebarRef}>
        <ChatbotSidebar
          sidebarData={chatbotSidebarLinks}
          isOpen={isChatSidebarOpen}
          onClose={() => setIsChatSidebarOpen(false)}
          onTabClick={handleTabClick}
          setSelectedConversationId={setSelectedConversationId}
          chatBotData={chatBotData}
          setIsSidebarOpen={setIsChatSidebarOpen}
          setChatBotData={setChatBotData}
        />
      </div>

      <div
        className={`relative lg:ml-16 ml-0 flex flex-col flex-1 sm:px-4 pt-3`}
      >
        {userRole == "PATIENT" ? (
          <div className="absolute  w-full sm:pr-8 top-[-50px]">
            <DashboardHeader
              showProfileSidebar={true}
              sidebarOpen={isSidebarOpen}
              setSidebarOpen={setIsSidebarOpen}
              noticationLink="/patient/notification"
              routeSetting="/patient/manage-password"
            />
          </div>
        ) : (
          ""
        )}
        <main className="mt-12">
          {activeTab === "Nursing home in 90210." ? (
            <NursingHomeReview />
          ) : activeTab === "Senior Care Platform Design" ? (
            <div>Senior Care Platform Design Content</div>
          ) : activeTab === "How are facilities rated?" ? (
            <div>Facility Rating Content</div>
          ) : activeTab === "Our AI Healthcare Guide" ? (
            <div>AI Healthcare Guide Content</div>
          ) : (
            <ChatbotAi
              isSidebarOpen={isChatSidebarOpen}
              setIsSidebarOpen={setIsChatSidebarOpen}
              chatBotData={chatBotData}
              setChatBotData={setChatBotData}
              selectedConversationId={selectedConversationId}
              setSelectedConversationId={setSelectedConversationId}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default ChatbotLayout;
