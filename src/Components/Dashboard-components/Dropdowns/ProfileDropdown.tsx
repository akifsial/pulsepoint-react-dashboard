import React, { useState } from "react";

// Default icons
import defaultUser from "@assets/media/svgs/dashboard-svgs/user.svg";
import defaultUserHover from "@assets/media/svgs/dashboard-svgs/user-hover.svg";
import defaultLogout from "@assets/media/svgs/dashboard-svgs/login.svg";
import defaultLogoutHover from "@assets/media/svgs/dashboard-svgs/login-hover.svg";
import defaultSettings from "@assets/media/svgs/dashboard-svgs/setting.svg";
import defaultSettingsHover from "@assets/media/svgs/dashboard-svgs/setting-hover.svg";
import { useNavigate } from "react-router-dom";
import { useMeApi } from "@src/hooks/useUsers";
import { disconnectSocket } from "@src/socket/socket";

interface ProfileDropdownProps {
  userIcon?: string;
  userIconHover?: string;
  settingsIcon?: string;
  settingsIconHover?: string;
  logoutIcon?: string;
  logoutIconHover?: string;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  userIcon = defaultUser,
  userIconHover = defaultUserHover,
  settingsIcon = defaultSettings,
  settingsIconHover = defaultSettingsHover,
  logoutIcon = defaultLogout,
  logoutIconHover = defaultLogoutHover,
  routeProfile,
  routeSetting,
}) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const navigate = useNavigate();
  const userRole = JSON.parse(localStorage.getItem("userInfo"))?.role_type;

  const handleLogout = () => {
    disconnectSocket();

    localStorage.clear();
    if (userRole == "PATIENT") {
      navigate("/patient/login");
    } else {
      navigate("/care-provider/login");
    }
  };

  return (
    <div>
      <div className="border-b border-[#E9EAEB] pb-2 mb-1">
        <div
          className="flex items-center gap-3 w-full mb-2 text-left py-2 px-4 rounded-lg hover:bg-[#E7F2F9] transition-colors cursor-pointer text-[#235969]"
          onMouseEnter={() => setHovered("user")}
          onMouseLeave={() => setHovered(null)}
          onClick={() =>
            userRole == "CARE_PROVIDER"
              ? navigate("/care-provider/profile")
              : navigate("/patient/profile")
          }
        >
          <img
            src={hovered === "user" ? userIconHover : userIcon}
            alt="User"
            className="w-[22px] h-[22px] object-cover"
          />
          <span className="font-medium text-[#252525]">My Profile</span>
        </div>

        <div
          className="flex items-center gap-3 w-full text-left py-2 mb-2 px-4 rounded-lg hover:bg-[#E7F2F9] transition-colors cursor-pointer text-[#235969]"
          onMouseEnter={() => setHovered("settings")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => navigate("/patient/manage-password")}
        >
          <img
            src={hovered === "settings" ? settingsIconHover : settingsIcon}
            alt="Settings"
            className="w-[22px] h-[22px] object-cover"
          />
          <span className="font-medium text-[#252525]">Settings</span>
        </div>
      </div>

      <button
        onMouseEnter={() => setHovered("logout")}
        onMouseLeave={() => setHovered(null)}
        onClick={handleLogout}
        className="flex items-center  gap-3 w-full text-left py-2 px-4 rounded-lg hover:bg-[#E7F2F9] transition-colors mt-1.5 cursor-pointer text-[#235969]"
      >
        <img
          src={hovered === "logout" ? logoutIconHover : logoutIcon}
          alt="Logout"
          className="w-[22px] h-[22px] object-cover"
        />
        <span className="font-medium text-[#252525]">Logout</span>
      </button>
    </div>
  );
};

export default ProfileDropdown;
