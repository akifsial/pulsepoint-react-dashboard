import React, { useState, useEffect, useRef } from "react";
import { MdMenu } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import notification from "@assets/media/svgs/dashboard-svgs/notification.svg";
import userFallbackImg from "@assets/media/images/dashboard-images/userDummy.png";
import dropDownArrow from "@assets/media/svgs/dashboard-svgs/arrow-down.svg";
import ProfileDropdown from "../dropdowns/profile-dropdown";
import NotficationBar from "./notification-bar";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, Clock } from "lucide-react";
import { useMeApi } from "@src/hooks/use-users";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
  showProfileSidebar?: boolean;
  noticationLink?: string;
  routeProfile?: string;
  routeSetting?: string;
}

interface RecentSearch {
  id: string;
  text: string;
}

const DashboardHeader: React.FC<Props> = ({
  showProfileSidebar,
  sidebarOpen,
  setSidebarOpen,
  noticationLink,
  routeProfile,
  routeSetting,
  className,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);

  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const userRole = JSON.stringify(localStorage.getItem("userInfo"))?.role_type;
  const navigate = useNavigate();
  const { data } = useMeApi(navigate);

  const recentSearches: RecentSearch[] = [
    { id: "1", text: "John Davis - Patient ID #10293" },
    { id: "2", text: "Review flagged for ABC Nursing Home" },
    { id: "3", text: "Jane Smith - Discharged April 2024" },
    { id: "4", text: "Fall prevention rehab feedback" },
  ];

  useEffect(() => {
    setShowMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (profileMenuRef.current && !profileMenuRef.current.contains(target)) {
        setShowMenu(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(target)
      ) {
        setShowNotifications(false);
      }
      if (!target.closest(".provider-search-dropdown")) {
        setIsSearchDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClearRecentSearches = () => {
    setIsSearchDropdownOpen(false);
  };

  const handleSearchItemClick = (text: string) => {
    setSearchText(text);
    setIsSearchDropdownOpen(false);
  };

  const queryClient = useQueryClient();

  const handleNotifications = () => {
    setShowNotifications((prev) => !prev);
    queryClient.invalidateQueries({ queryKey: ["useGetNotifications"] });
  };

  return (
    <header
      className={`${
        showProfileSidebar ? "" : ""
      } bg-white bg-black ${className} w-full rounded-lg px-2 sm:px-4 py-[14px] sm:px-6  z-40 transition-all duration-300 lg:left-72 lg:right-4 left-4 right-4`}
    >
      <div className="flex items-center flex-wrap justify-center  sm:items-center md:justify-between md:gap-2 gap-4 w-full flex-row">
        <div className="min-w-fit">
          <h2 className="sm:!text-[25px] !text-[16px] space-grotesk font-bold">👋 Welcome Back!</h2>
        </div>

        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="cursor-pointer rounded-full hover:bg-gray-100 block lg:hidden"
          >
            <MdMenu size={20} />
          </button>
          <div className="hidden lg:block relative provider-search-dropdown w-[300px] transition-all duration-300">
            {isSearchDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg border border-gray-200 shadow-lg z-50 max-h-[400px] overflow-hidden">
                <div className="py-2 px-[15px]">
                  <div className="flex items-center justify-between mb-0">
                    <h3 className="text-gray-500 font-medium text-sm">
                      Recents
                    </h3>
                    <button
                      onClick={handleClearRecentSearches}
                      className="text-gray-500 cursor-pointer hover:text-red-500 font-medium text-sm transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="space-y-0.5 max-h-[250px] overflow-y-auto">
                    {recentSearches.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleSearchItemClick(item.text)}
                        className="flex items-center py-[9px] hover:bg-gray-50 cursor-pointer rounded-md transition-colors"
                      >
                        <Clock className="w-4 h-4 text-gray-400 mr-3" />
                        <span className="text-gray-700 text-sm">
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            onClick={() => handleNotifications()}
            className=" cursor-pointer relative"
            ref={notificationRef}
          >
            <img
              src={notification}
              alt="Notification"
              className="w-[20px] h-[20px] lg:w-[34px] lg:h-[34px]"
            />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </div>
          

          <div className="relative">
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute sm:right-68 right-26 md:right-12 top-[25px] md:w-[370px] w-[10px] z-50"
                  ref={notificationRef} 
                >
                  <NotficationBar noticationLink={noticationLink} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src={
                data?.image
                  ? `${import.meta.env.VITE_APP_API_IMG_URL}${data?.image}`
                  : dummyImage
              }
              alt="User"
              className="w-[30px] h-[30px] lg:w-[46px] lg:h-[46px] rounded-full object-cover"
            />
            <div className="lg:flex flex-col">
              <p className="font-semibold text-[14px] bricolage-grotesque">{data?.full_name ? data?.full_name : data?.user_name }</p>
              <p className="text-[12px] inter text-[#252525]">Profile</p>
            </div>
            <img src={dropDownArrow} alt="Arrow" className="w-4 h-4" />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            ref={profileMenuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute  sm:top-[68px] right-8 md:top-[70px] lg:top-[75px] w-55 bg-white border border-gray-200 shadow-xl px-2 rounded-xl py-4 z-50"
          >
            <ProfileDropdown
              routeSetting={routeSetting}
              routeProfile={routeProfile}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </header>

    
  );
};

export default DashboardHeader;
