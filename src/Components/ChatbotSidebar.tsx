import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface SidebarProps {
  sidebarData: string[]; // Using string[] instead of SidebarLink[]
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotSidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  sidebarData,
}) => {
  const location = useLocation();
  console.log("Current path:", location.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    onClose();
  }, [location.pathname]);

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
          >
            {link}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default ChatbotSidebar;
