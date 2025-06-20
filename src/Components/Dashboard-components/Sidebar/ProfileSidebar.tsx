import { NavLink, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SiteLogo from "@assets/media/svgs/top-senior-spot-logo.svg";
import { SidebarLink } from "../Dashboard-components/Sidebar/SidebarLinks";

interface SidebarProps {
  sidebarData: SidebarLink[];
  isOpen: boolean;
  onClose: () => void;
}

const ProfileSidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  sidebarData,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    onClose();
  }, [location.pathname]);
  return (
    <aside
      className={`
    fixed top-0 z-50 md:w-[268px] min-h-screen bg-[#F5FBFF] shadow-lg p-4
    transition-all duration-300 ease-in-out

    // Small screens
    ${isOpen ? "left-[89px]" : "-left-full"} 

    // Large screens
    lg:left-[89px] lg:block
  `}
    >
      <div className="space-y-2 mt-3 h-screen">
        {sidebarData.map((link, index) => {
          const isActive = location.pathname === link.path;
          const [isHovered, setIsHovered] = useState(false);
          let Icon = link.icon.default;
          if (isActive && link.icon.active) Icon = link.icon.active;
          else if (isHovered && link.icon.hover) Icon = link.icon.hover;

          return (
            <NavLink
              to={link.path}
              key={index}
              className={`flex items-center gap-3 px-4 py-[10px] rounded-[10px] transition-all ${
                isActive
                  ? "bg-[#28A2FF] text-white"
                  : "text-gray-700 hover:bg-[#daeffd]"
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span>{Icon}</span>
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
};

export default ProfileSidebar;
