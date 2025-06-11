import dashboardIcon from "@assets/media/svgs/dashboard-svgs/Dashboard.svg";
import reviewIcon from "@assets/media/svgs/dashboard-svgs/Review.svg";
import communityIcon from "@assets/media/svgs/dashboard-svgs/Community.svg";
import dashboardHover from "@assets/media/svgs/dashboard-svgs/dashboard-hover.svg";
import reviewHover from "@assets/media/svgs/dashboard-svgs/review-hover.svg";
import communityHover from "@assets/media/svgs/dashboard-svgs/Community-hover.svg";
import dashboardActive from "@assets/media/svgs/dashboard-svgs/Dashboard-active.svg";
import reviewActive from "@assets/media/svgs/dashboard-svgs/review-active.svg";
import communityActive from "@assets/media/svgs/dashboard-svgs/Community-active.svg";
import type { ReactNode } from "react";

type SidebarIconSet = {
  default?: ReactNode;
  hover?: ReactNode;
  active?: ReactNode;
};

export type SidebarLink = {
  label: string;
  path: string;
  icon: SidebarIconSet;
};

export const sidebarLinks: SidebarLink[] = [
  {
    label: "Dashboard",
    path: "/care-provider",
    icon: {
      default: <img src={dashboardIcon} alt="Dashboard" className="w-5 h-5" />,
      hover: <img src={dashboardHover} alt="Dashboard" className="w-5 h-5" />,
      active: <img src={dashboardActive} alt="Dashboard" className="w-5 h-5" />,
    },
  },
  {
    label: "Patients Reviews",
    path: "/care-provider/patient-reviews",
    icon: {
      default: <img src={reviewIcon} alt="Dashboard" className="w-5 h-5" />,
      hover: <img src={reviewHover} alt="Dashboard" className="w-5 h-5" />,
      active: <img src={reviewActive} alt="Dashboard" className="w-5 h-5" />,
    },
  },
  {
    label: "Community Forum",
    path: "/care-provider/community-form",
    icon: {
      default: <img src={communityIcon} alt="Dashboard" className="w-5 h-5" />,
      hover: <img src={communityHover} alt="Dashboard" className="w-5 h-5" />,
      active: <img src={communityActive} alt="Dashboard" className="w-5 h-5" />,
    },
  },
];
export const AdminSidebarLinks: SidebarLink[] = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: {
      default: <img src={dashboardIcon} alt="Dashboard" className="w-5 h-5" />,
      hover: <img src={dashboardHover} alt="Dashboard" className="w-5 h-5" />,
      active: <img src={dashboardActive} alt="Dashboard" className="w-5 h-5" />,
    },
  },
  {
    label: "Patients Reviews",
    path: "/admin/patient-reviews",
    icon: {
      default: <img src={reviewIcon} alt="Dashboard" className="w-5 h-5" />,
      hover: <img src={reviewHover} alt="Dashboard" className="w-5 h-5" />,
      active: <img src={reviewActive} alt="Dashboard" className="w-5 h-5" />,
    },
  },
  {
    label: "Community Forum",
    path: "/admin/community-forum",
    icon: {
      default: <img src={communityIcon} alt="Dashboard" className="w-5 h-5" />,
      hover: <img src={communityHover} alt="Dashboard" className="w-5 h-5" />,
      active: <img src={communityActive} alt="Dashboard" className="w-5 h-5" />,
    },
  },
];

