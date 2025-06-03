import React, { useState } from "react";
import userImg from "@assets/media/svgs/dashboard-svgs/user.svg";
import userHover from "@assets/media/svgs/dashboard-svgs/user-hover.svg";
import logout from "@assets/media/svgs/dashboard-svgs/login.svg";
import logoutHover from "@assets/media/svgs/dashboard-svgs/login-hover.svg";
import settings from "@assets/media/svgs/dashboard-svgs/setting.svg";
import settingsHover from "@assets/media/svgs/dashboard-svgs/setting-hover.svg";

const ProfileDropdown: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div>
      <div className="border-b border-[#E9EAEB] pb-2 mb-1">
        <div
          className="flex items-center gap-3 w-full mb-2 text-left py-2 px-4 rounded-lg hover:bg-[#E7F2F9] transition-colors cursor-pointer text-[#235969] "
          onMouseEnter={() => setHovered("user")}
          onMouseLeave={() => setHovered(null)}
        >
          <img
            src={hovered === "user" ? userHover : userImg}
            alt="User"
            className="w-[22px] h-[22px] object-cover"
          />
          <span className="font-medium text-[#252525]">My Profile</span>
        </div>

        <div
          className="flex items-center gap-3 w-full text-left py-2 mb-2 px-4 rounded-lg hover:bg-[#E7F2F9] transition-colors cursor-pointer text-[#235969] "
          onMouseEnter={() => setHovered("settings")}
          onMouseLeave={() => setHovered(null)}
        >
          <img
            src={hovered === "settings" ? settingsHover : settings}
            alt="Settings"
            className="w-[22px] h-[22px] object-cover"
          />
          <span className="font-medium text-[#252525]">Settings</span>
        </div>
      </div>

      <button
        onMouseEnter={() => setHovered("logout")}
        onMouseLeave={() => setHovered(null)}
        className="flex items-center gap-3 w-full text-left py-2 px-4 rounded-lg hover:bg-[#E7F2F9] transition-colors mt-3 cursor-pointer text-[#235969]"
      >
        <img
          src={hovered === "logout" ? logoutHover : logout}
          alt="Logout"
          className="w-[22px] h-[22px] object-cover"
        />
        <span className="font-medium text-[#252525]">Logout</span>
      </button>
    </div>
  );
};

export default ProfileDropdown;
