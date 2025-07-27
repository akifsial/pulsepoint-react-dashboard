import React, { useState, useEffect, useRef } from "react";
import { MdMenu } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import notification from "@assets/media/svgs/dashboard-svgs/notification.svg";
import userFallbackImg from "@assets/media/images/dashboard-images/userDummy.png";
import dropDownArrow from "@assets/media/svgs/dashboard-svgs/arrow-down.svg";
import ProfileDropdown from "../Dropdowns/ProfileDropdown";
import NotficationBar from "./NotificationBar";
import { useLocation } from "react-router-dom";
import { Search, Clock } from "lucide-react";
import { useMeApi } from "@src/hooks/useUsers";

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
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);

  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const { data } = useMeApi();

  const recentSearches: RecentSearch[] = [
    { id: "1", text: "John Davis - Patient ID #10293" },
    { id: "2", text: "Review flagged for ABC Nursing Home" },
    { id: "3", text: "Jane Smith - Discharged April 2024" },
    { id: "4", text: "Fall prevention rehab feedback" },
  ];

  useEffect(() => {
    setShowMenu(false);
    setShowNotifications(false);
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
    console.log("Clear recent searches");
    setIsSearchDropdownOpen(false);
  };

  const handleSearchItemClick = (text: string) => {
    setSearchText(text);
    setIsSearchDropdownOpen(false);
    console.log("Selected:", text);
  };

  return (
    <header
      className={`${
        showProfileSidebar ? "lg:ml-[80px]" : ""
      } bg-white rounded-lg px-4 py-[14px] sm:px-6  z-40 transition-all duration-300 lg:left-72 lg:right-4 left-4 right-4`}
    >
      <div className="flex items-start sm:items-center justify-between gap-2 w-full flex-col sm:flex-row">
        <div className="min-w-fit">
          <h2 className="">👋 Welcome Back!</h2>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 min-w-fit relative">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className=" rounded-full hover:bg-gray-100 block lg:hidden"
          >
            <MdMenu size={20} />
          </button>
          {/* Search Bar */}
          <div className="hidden lg:block relative provider-search-dropdown w-[300px] transition-all duration-300">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by reviewer name, condition, or keywords"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onFocus={() => setIsSearchDropdownOpen(true)}
                className={`transition-all duration-300 pl-10 pr-4 py-3 text-sm text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white ${
                  isSearchDropdownOpen ? "w-[300px]" : "w-[300px]"
                }`}
              />
            </div>

            {isSearchDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg border border-gray-200 shadow-lg z-50 max-h-[400px] overflow-hidden">
                {/* {searchText && (
                  <div className="p-4 border-b border-gray-100">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 text-sm text-gray-700 border border-blue-500 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                        autoFocus
                      />
                    </div>
                  </div>
                )} */}
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
          {/* Notification Icon */}
          <div
            onClick={() => setShowNotifications((prev) => !prev)}
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

          {/* Profile */}
          <div
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src={userFallbackImg}
              alt="User"
              className="w-[30px] h-[30px] lg:w-[46px] lg:h-[46px] rounded-full object-cover"
            />
            <div className="hidden lg:flex flex-col">
              <p className="font-semibold text-sm">{data?.first_name}</p>
              <p className="text-xs text-gray-500">Profile</p>
            </div>
            <img src={dropDownArrow} alt="Arrow" className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Dropdowns */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            ref={profileMenuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 top-[75px] w-55 bg-white border border-gray-200 shadow-xl px-2 rounded-xl py-4 z-50"
          >
            <ProfileDropdown
              routeSetting={routeSetting}
              routeProfile={routeProfile}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute right-39 top-[75px] w-[370px] z-50"
          >
            <NotficationBar noticationLink={noticationLink} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default DashboardHeader;
