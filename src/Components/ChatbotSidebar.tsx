import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface SidebarProps {
  sidebarData: string[];
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotSidebar: React.FC<SidebarProps> = ({ isOpen, onClose, sidebarData }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Close the sidebar when the location changes
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  // Handle the click event to navigate
  const handleLinkClick = (link: string) => {
    if (link === "Nursing home in 90210.") {
      navigate("/patient/nursing-home"); // Navigate to NursingHomeReviews
    } else if (link === "ChatBot") {
      navigate("/patient/chatbot"); // Navigate to ChatbotLayout
    }
  };

  return (
    <aside
      className={`
        fixed top-0 z-50 w-[268px] min-h-screen bg-[#F5FBFF] shadow-lg p-4
        transition-all duration-300 ease-in-out

        ${isOpen ? "left-[89px]" : "-left-full"}
        lg:left-[89px] lg:block
      `}
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
