import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { sidebarLinks } from "./SidebarLinks";
import React, { useEffect, useState } from "react";
import SiteLogo from "@assets/media/svgs/top-senior-spot-logo.svg";
import CommonInput from "@components/Shared-components/Inputs/Common-Input/CommonInput";
import searchIcon from "@assets/media/svgs/dashboard-svgs/search.svg";
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, sidebarData }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    onClose();
  }, [location.pathname]);

  return (
    <aside
      className={`
         p-4 min-h-screen w-68
         lg:translate-x-0 
        fixed top-0 left-0 z-50 transform transition-transform duration-500
        ${isOpen ? "translate-x-0  bg-white" : "-translate-x-full"}
      `}
    >
      <div className="space-y-2 mt-3 h-screen">
        <div
          className="mb-7 max-w-[250px] mx-auto cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={SiteLogo}
            alt="Vskill Hub"
            className="w-[250px] h-[70px] object-cover"
          />
        </div>
        <div>
          <div className="flex-1 flex md:hidden block">
            <CommonInput
              placeholder="Search here..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              showImg={true}
              imgSrc={searchIcon}
              imgLeft={true}
              inputClassName="text-sm"
              containerClassName="w-full max-w-md"
            />
          </div>
        </div>
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

export default Sidebar;
