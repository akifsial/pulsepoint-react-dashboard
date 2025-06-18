import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import CommonInput from "@components/Shared-components/Inputs/Common-Input/CommonInput";
import searchIcon from "@assets/media/svgs/dashboard-svgs/search.svg";
import notification from "@assets/media/svgs/dashboard-svgs/notification.svg";
import userFallbackImg from "@assets/media/images/dashboard-images/userDummy.png";
import dropDownArrow from "@assets/media/svgs/dashboard-svgs/arrow-down.svg";
import ProfileDropdown from "../Dropdowns/ProfileDropdown";
import { useNavigate } from "react-router-dom";
import NotficationBar from "./NotificationBar";

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
  showProfileSidebar?: boolean;
}

const DashboardHeader: React.FC<Props> = ({
  showProfileSidebar,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  return (
    <header
<<<<<<< HEAD
      className={`${showProfileSidebar&& "lg:ml-[80px]"} bg-white rounded-lg px-4 py-[14px] sm:px-6 fixed  z-40 transition-all duration-300 lg:left-72 lg:right-4 left-4 right-4
  `}
=======
      className={`${showProfileSidebar && "lg:ml-[80px]"} bg-white rounded-lg px-4 py-[14px] sm:px-6 fixed top-5 z-40 transition-all duration-300 lg:left-72 lg:right-4 left-4 right-4`}
>>>>>>> 43384e7c1a36bd4d89fe65748da3a78e29ec0211
    >
      <div className="flex items-center justify-between w-full">
        <div className="min-w-fit">
          <h2 className="">👋 Welcome Back!</h2>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end px-5">
          <CommonInput
            placeholder="Search by reviewer name, condition, or keywords"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            showImg={true}
            imgSrc={searchIcon}
            imgLeft={true}
            inputClassName="text-sm"
            containerClassName="w-full max-w-md"
          />
        </div>

        <div className="flex items-center gap-5 min-w-fit relative">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-100 block lg:hidden"
          >
            <MdMenu size={24} />
          </button>

          {/* 🔔 Notification Bell */}
          <div
            onClick={() => setShowNotifications((prev) => !prev)}
            className="hidden lg:block cursor-pointer relative"
          >
            <img
              src={notification}
              alt="Notification"
              className="w-[34px] h-[34px]"
            />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </div>

          {/* 👤 User Menu */}
          <div
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src={userFallbackImg}
              alt="User"
              className="w-[46px] h-[46px] rounded-full object-cover"
            />
            <div className="hidden lg:flex flex-col">
              <p className="font-semibold text-sm">Mathew</p>
              <p className="text-xs text-gray-500">Profile</p>
            </div>
            <img src={dropDownArrow} alt="Arrow" className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 👇 Profile Dropdown */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 top-[75px] w-55 bg-white border border-gray-200 shadow-xl px-2 rounded-xl py-4 z-50"
          >
            <ProfileDropdown />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 👇 Notification Dropdown */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute right-39 top-[75px] w-[370px] z-50"
          >
            <NotficationBar />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default DashboardHeader;
