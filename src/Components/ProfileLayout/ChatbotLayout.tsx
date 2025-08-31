import { useState } from "react";
import DashboardHeader from "@components/Dashboard-components/Dashboard-header/DashboardHeader";
import Sidebar from "@components/Dashboard-components/Sidebar/Sidebar";
import { PatientSidebarLinks } from "@components/Dashboard-components/Sidebar/SidebarLinks";
import ChatbotSidebar from "@components/ChatbotSidebar";
import ChatbotAi from "@components/ChatbotAi";
import NursingHomeReview from "@components/NursingHomeReview";

// Chatbot-specific links
const chatbotSidebarLinks = [
  "Senior Care Platform Design",
  "Nursing home in 90210.",
  "How are facilities rated?",
  "Our AI Healthcare Guide",
];

const ChatbotLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [selectedConversationId, setSelectedConversationId] = useState();
  const [chatBotData, setChatBotData] = useState([]);
  const userRole=JSON.parse(localStorage.getItem("userInfo"))?.role_type
  // Function to handle tab clicks
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="dashboard flex min-h-screen">
      {/* Main Sidebar */}
      
      {/* Chatbot Sidebar */}
      <ChatbotSidebar
        sidebarData={chatbotSidebarLinks}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onTabClick={handleTabClick}
        setSelectedConversationId={setSelectedConversationId}
        chatBotData={chatBotData}
        setChatBotData={setChatBotData}
      />

      {/* Main Content Area */}
      <div className={`relative lg:ml-16 ml-0 flex flex-col flex-1 sm:px-4 pt-3`}>
        {
          userRole=="PATIENT" ?
        <div className="absolute w-full sm:pr-8 top-[-50px]">
          <DashboardHeader
            showProfileSidebar={true}
            sidebarOpen={isSidebarOpen}
            setSidebarOpen={setIsSidebarOpen}
            noticationLink="/patient/notification"
            routeSetting="/patient/manage-password"
          />
        </div> 
         : ""
        } 
        {/* <h5>hhh</h5> */}
        <main className="mt-12">
          {/* Render the active component based on the selected tab */}
          {activeTab === "Nursing home in 90210." ? (
            <NursingHomeReview />
          ) : activeTab === "Senior Care Platform Design" ? (
            <div>Senior Care Platform Design Content</div>
          ) : activeTab === "How are facilities rated?" ? (
            <div>Facility Rating Content</div>
          ) : activeTab === "Our AI Healthcare Guide" ? (
            <div>AI Healthcare Guide Content</div>
          ) : (
            <ChatbotAi chatBotData={chatBotData} setChatBotData={setChatBotData} selectedConversationId={selectedConversationId} setSelectedConversationId={setSelectedConversationId} />
          )}
        </main>
      </div>
    </div>
  );
};

export default ChatbotLayout;
