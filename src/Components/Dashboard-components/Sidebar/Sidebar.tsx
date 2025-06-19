import { NavLink, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SiteLogo from "@assets/media/svgs/top-senior-spot-logo.svg";
import miniLogo from "@assets/media/svgs/mini-logo.svg";
import CommonInput from "@components/Shared-components/Inputs/Common-Input/CommonInput";
import searchIcon from "@assets/media/svgs/dashboard-svgs/search.svg";
import { SidebarLink } from "./SidebarLinks";
import Chatbot from "../../../assets/media/svgs/chatbot.svg";
import AiIcon from "../../../assets/media/svgs/ai-icon.svg";
import ChatbotIcon from "@assets/media/svgs/chatbot-icon.svg";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";

interface SidebarProps {
  sidebarData: SidebarLink[];
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, sidebarData }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const AIShow = location.pathname.startsWith("/patient");

  const iconOnlyRoutes = [
    "/admin/profile",
    "/admin/feature",
    "/admin/manage-password",
    "/patient/profile",
    "/patient/manage-password",
    "/patient/feature",
    "/care-provider/profile",
    "/care-provider/manage-password",
    "/care-provider/feature",
    "/patient/chatbot"
  ];

  const showOnlyIcons = iconOnlyRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  useEffect(() => {
    onClose();
  }, [location.pathname]);

  return (
    <>
      {showOnlyIcons ? (
        <aside
          className={`
            p-4 min-h-screen w-[89px]
            lg:translate-x-0 flex flex-col justify-between
            fixed top-0 left-0 z-50 transform transition-transform duration-500
            ${isOpen ? "translate-x-0  bg-white" : "-translate-x-full"}
          `}
        >
          <div className="space-y-2 mt-3">
            <div
              className="mb-7 max-w-[250px] mx-auto cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img
                src={miniLogo}
                alt="Vskill Hub"
                className="w-[64px] h-[58px] object-cover"
              />
            </div>
            {/* <div>
              <div className="flex-1 flex md:hidden block">
                <CommonInput
                  placeholder="Search here..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  showImg={true}
                  imgSrc={searchIcon}
                  imgLeft={true}
                  inputClassName="text-sm"
                  containerClassName="w-full max-w-sm overflow-hidden"
                />
              </div>
            </div> */}
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
                </NavLink>
              );
            })}
            {/* Add the ChatbotIcon image*/}
           
          </div>
          <div> <img
              src={ChatbotIcon}
              alt="chatbot"
              className="w-[70px] h-[50px] object-cover"
            /></div>
        </aside>
      ) : (
        <aside
          className={`
            p-4 min-h-screen w-68
            lg:translate-x-0 
            flex flex-col justify-between
            fixed top-0 left-0 z-50 transform transition-transform duration-500
            ${isOpen ? "translate-x-0  bg-white" : "-translate-x-full"}
          `}
        >
          <div className="space-y-2 mt-3 ">
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
          {AIShow && (
            <div
              className="rounded-[10px] p-4 text-center"
              style={{
                background:
                  " radial-gradient(96.35% 86.93% at 72.06% 38.43%, #023552 0%, #28A2FF 100%)",
              }}
            >
              <img src={Chatbot} alt="chatbot" className="mx-auto mb-3" />
              <div className="text-white text-sm font-normal mb-2">
                <strong className="text-[17px] font-bold">
                  Unlock Premium Insights
                </strong>
                <p>Upgrade for Advanced Filters & Provider Comparisons.</p>
              </div>
              <PrimaryButton
                btnText="AI Chatbot"
                showImg={true}
                imgClass="w-[20px] h-[20px] object-cover"
                img={AiIcon}
                imgPosition="left"
                btnClass="bg-[#252525] px-4  w-full pb-[10px] rounded-[10px] text-white text-sm font-medium"
                onClick={() => navigate("/patient/feature")}
              />
            </div>
          )}
        </aside>
      )}
    </>
  );
};

export default Sidebar;
