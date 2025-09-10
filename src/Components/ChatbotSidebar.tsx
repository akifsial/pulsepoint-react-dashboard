import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetAllConversations } from "@src/hooks/useCommunity";
import icon from "@assets/media/svgs/verticlDots.svg";
import ChatbotSidebarOptions from "./Model/ChatbotSidebarOptions";
import { ApiDeleteChat } from "@src/api/ApiCommunityForum";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { PrimaryButton } from "./Buttons/PrimaryButton";

interface SidebarProps {
  sidebarData: string[];
  isOpen: boolean;
  onClose: () => void;
  onTabClick: (tab: string) => void; // Add this prop to handle tab clicks
}

const ChatbotSidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  sidebarData,
  onTabClick,
  setSelectedConversationId,
  chatBotData,
  setChatBotData,
}) => {
  const location = useLocation();
  const [activeOptionsId, setActiveOptionsId] = useState();

  const { data, isLoading } = useGetAllConversations();

  // Close the sidebar when the location changes
  // useEffect(() => {
  //   onClose();
  // }, [location.pathname, onClose]);

  // Handle the click event to trigger the onTabClick function
  const handleLinkClick = (link: string) => {
    onTabClick(link); // Trigger the tab click function passed from the parent
    onClose(); // Close the sidebar after clicking
  };

  return (
    <aside
      className={`fixed top-0 z-50 w-[268px] h-full bg-[#F5FBFF] shadow-lg p-4
        transition-all duration-300 ease-in-out
        ${isOpen ? "left-[0px]" : "-left-full"} lg:left-[89px] lg:block`}
    >
      <div className="space-y-2 flex flex-col mt-3 h-full overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 animate-pulse">
              Loading conversations...
            </p>
          </div>
        ) : data?.records?.length > 0 ? (
          data?.records?.map((link, index) => {
            const isActive = activeOptionsId === link?.id;

            return (
              <div
                key={index}
                className={`relative p-3 flex items-center justify-between rounded-md cursor-pointer text-gray-800
        ${isActive ? "bg-[#daeffd]" : "hover:bg-[#daeffd] group"}`}
                onClick={() => setSelectedConversationId(link?.id)}
              >
                <span>{link?.name}</span>

                <span
                  className={`${
                    isActive ? "inline" : "hidden group-hover:inline"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation(); // prevent parent click
                    setActiveOptionsId(isActive ? null : link?.id); // toggle open/close
                  }}
                >
                  <img src={icon} alt="options" />
                </span>

                {isActive && (
                  <ChatbotSidebarOptions
                    conversationId={link?.id}
                    onClose={() => setActiveOptionsId(undefined)}
                    linkId={link?.id}
                    handleDeleteChat={() => handleDeleteChat(link?.id)}
                  />
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500 mt-6">No chats found</div>
        )}
        <div className=" flex items-end justify-center h-full">
          <PrimaryButton
            onClick={() => {
              setSelectedConversationId("");
              setChatBotData([]);
            }}
            btnText="New Chat"
            btnClass="text-white bg-black !rounded-[6px]"
          />
        </div>
      </div>
    </aside>
  );
};

export default ChatbotSidebar;
