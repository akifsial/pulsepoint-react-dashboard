import { useLocation } from "react-router-dom";
import { useEffect } from "react";

interface SidebarProps {
  sidebarData: string[];
  isOpen: boolean;
  onClose: () => void;
  onTabClick: (tab: string) => void; // Add this prop to handle tab clicks
}

const ChatbotSidebar: React.FC<SidebarProps> = ({ isOpen, onClose, sidebarData, onTabClick }) => {
  const location = useLocation();

  // Close the sidebar when the location changes
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  // Handle the click event to trigger the onTabClick function
  const handleLinkClick = (link: string) => {
    onTabClick(link); // Trigger the tab click function passed from the parent
    onClose(); // Close the sidebar after clicking
  };

  return (
    <aside
      className={`fixed top-0 z-50 w-[268px] min-h-screen bg-[#F5FBFF] shadow-lg p-4
        transition-all duration-300 ease-in-out
        ${isOpen ? "left-[89px]" : "-left-full"} lg:left-[89px] lg:block`}
    >
      <div className="space-y-2 mt-3 h-screen overflow-y-auto">
        {sidebarData.map((link, index) => (
          <div
            key={index}
            className="p-3 rounded-md hover:bg-[#daeffd] cursor-pointer text-gray-800"
            onClick={() => handleLinkClick(link)} 
          >
            {link}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default ChatbotSidebar;
