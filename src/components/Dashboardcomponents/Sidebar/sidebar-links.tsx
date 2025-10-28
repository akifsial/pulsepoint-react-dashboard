import dashboardIcon from "@assets/media/svgs/dashboard-svgs/Dashboard.svg";
import UserIcon from "@assets/media/svgs/dashboard-svgs/user.svg";
import userActive from "@assets/media/svgs/dashboard-svgs/user-active2.svg";
import BlueUser from "@assets/media/svgs/dashboard-svgs/blue.svg";
import reviewIcon from "@assets/media/svgs/dashboard-svgs/Review.svg";
import communityIcon from "@assets/media/svgs/dashboard-svgs/Community.svg";
import dashboardHover from "@assets/media/svgs/dashboard-svgs/dashboard-hover.svg";
import reviewHover from "@assets/media/svgs/dashboard-svgs/review-hover.svg";
import communityHover from "@assets/media/svgs/dashboard-svgs/Community-hover.svg";
import dashboardActive from "@assets/media/svgs/dashboard-svgs/Dashboard-active.svg";
import reviewActive from "@assets/media/svgs/dashboard-svgs/review-active.svg";
import communityActive from "@assets/media/svgs/dashboard-svgs/Community-active.svg";
import patients from "@assets/media/svgs/patient.svg";
import pactive from "@assets/media/svgs/patient-active.svg";
import reports from "@assets/media/svgs/reports.svg";
import ractive from "@assets/media/svgs/reports-active.svg";
import provideIcon from "@assets/media/svgs/provide.svg";
import provideactive from "@assets/media/svgs/provide-active.svg";
import profile from "@assets/media/svgs/dashboard-svgs/profile.svg";
import profileActive from "@assets/media/svgs/dashboard-svgs/profileActive.svg";
import {
  CommunityIconWhite,
  CommunityIconBlack,
  CommunityIconBlue,
} from "@components/communitiessvg";
import moneyIcon from "@assets/media/svgs/dashboard-svgs/money.svg";
import manage from "@assets/media/svgs/dashboard-svgs/manage.svg";
import manageActive from "@assets/media/svgs/dashboard-svgs/manageActive.svg";
import feature from "@assets/media/svgs/dashboard-svgs/feature.svg";
import featureActive from "@assets/media/svgs/dashboard-svgs/featureActive.svg";
import blogIcons from "@assets/media/svgs/dashboard-svgs/blogs.svg";
import blogIconsWhite from "@assets/media/svgs/dashboard-svgs/blogsWhite.svg";

import type { ReactNode } from "react";
import { MdFeaturedPlayList, MdOutlineFeaturedPlayList } from "react-icons/md";

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

  {
    label: "Communities",
    path: "/care-provider/communities",
    icon: {
      default: <CommunityIconBlack className="w-6 h-6" />,
      hover: <CommunityIconBlue className="w-6 h-6" />,
      active: <CommunityIconWhite className="w-6 h-6" />,
    },
  },



  {
    label: "Subscription",
    path: "/care-provider/feature",
    icon: {
      default: <img src={feature} alt="Dashboard" className="w-5 h-5" />,
      hover: <img src={feature} alt="Dashboard" className="w-5 h-5" />,
      active: <img src={featureActive} alt="Dashboard" className="w-5 h-5" />,
    },
  },
];

export const PatientSidebarLinks: SidebarLink[] = [
  {
    label: "Dashboard",
    path: "/patient/dashboard",
    icon: {
      default: <img src={dashboardIcon} alt="Dashboard" className="w-5 h-5" />,
      hover: <img src={dashboardHover} alt="Dashboard" className="w-5 h-5" />,
      active: <img src={dashboardActive} alt="Dashboard" className="w-5 h-5" />,
    },
  },
  {
    label: "Care Providers",
    path: "/patient/care-provider",
    icon: {
      default: <img src={UserIcon} alt="Dashboard" className="w-5 h-5" />,
      hover: <img src={BlueUser} alt="Dashboard" className="w-5 h-5" />,
      active: <img src={userActive} alt="Dashboard" className="w-5 h-5" />,
    },
  },
  {
    label: "My Reviews",
    path: "/patient/patient-reviews",
    icon: {
      default: <img src={reviewIcon} alt="Dashboard" className="w-5 h-5" />,
      hover: <img src={reviewHover} alt="Dashboard" className="w-5 h-5" />,
      active: <img src={reviewActive} alt="Dashboard" className="w-5 h-5" />,
    },
  },
  {
    label: "Community Forum",
    path: "/patient/community-forum",
    icon: {
      default: <img src={communityIcon} alt="Dashboard" className="w-5 h-5" />,
      hover: <img src={communityHover} alt="Dashboard" className="w-5 h-5" />,
      active: <img src={communityActive} alt="Dashboard" className="w-5 h-5" />,
    },
  },

  {
    label: "Communities",
    path: "/patient/communities",
    icon: {
      default: <CommunityIconBlack className="w-6 h-6" />,
      hover: <CommunityIconBlue className="w-6 h-6" />,
      active: <CommunityIconWhite className="w-6 h-6" />,
    },
  },

  {
    label: "Subscription",
    path: "/patient/feature",
    icon: {
      default: <img src={feature} alt="Dashboard" className="w-5 h-5" />,
      hover: <img src={feature} alt="Dashboard" className="w-5 h-5" />,
      active: <img src={featureActive} alt="Dashboard" className="w-5 h-5" />,
    },
  },
];

export const AdminSidebarLinks: SidebarLink[] = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: {
      default: <img src={dashboardIcon} alt="Dashboard" className="w-5 h-5" />,
      hover: <img src={dashboardHover} alt="Dashboard" className="w-5 h-5" />,
      active: <img src={dashboardActive} alt="Dashboard" className="w-5 h-5" />,
    },
  },
  {
    label: "Patients Management",
    path: "/admin/patients-management",
    icon: {
      default: <img src={patients} alt="Dashboard" className="w-5 h-5" />,
      active: <img src={pactive} alt="Dashboard" className="w-5 h-5" />,
    },
  },
  {
    label: "Care Providers Control",
    path: "/admin/care-providers",
    icon: {
      default: <img src={provideIcon} alt="Dashboard" className="w-5 h-5" />,
      active: <img src={provideactive} alt="Dashboard" className="w-5 h-5" />,
    },
  },
  {
    label: "Reviews",
    path: "/admin/reviews",
    icon: {
      default: <img src={reviewIcon} alt="Dashboard" className="w-5 h-5" />,
      hover: <img src={reviewHover} alt="Dashboard" className="w-5 h-5" />,
      active: <img src={reviewActive} alt="Dashboard" className="w-5 h-5" />,
    },
  },
  {
    label: "Forum Moderation",
    path: "/admin/forum-moderation",
    icon: {
      default: <img src={communityIcon} alt="Dashboard" className="w-5 h-5" />,
      hover: <img src={communityHover} alt="Dashboard" className="w-5 h-5" />,
      active: <img src={communityActive} alt="Dashboard" className="w-5 h-5" />,
    },
  },


  {
    label: "Reports and Analytics",
    path: "/admin/reports",
    icon: {
      default: <img src={reports} alt="Dashboard" className="w-5 h-5" />,
      active: <img src={ractive} alt="Dashboard" className="w-5 h-5" />,
    },
  },
];

export const ProfileSidebarLinks: SidebarLink[] = [
  {
    label: "Profile Details",
    path: "/admin/profile",
    icon: {
      default: <img src={profile} alt="Dashboard" className="w-5 h-5" />,
      hover: <img src={profile} alt="Dashboard" className="w-5 h-5" />,
      active: <img src={profileActive} alt="Dashboard" className="w-5 h-5" />,
    },
  },
  {
    label: "Manage Password",
    path: "/admin/manage-password",
    icon: {
      default: <img src={manage} alt="Dashboard" className="w-5 h-5" />,
      hover: <img src={manage} alt="Dashboard" className="w-5 h-5" />,
      active: <img src={manageActive} alt="Dashboard" className="w-5 h-5" />,
    },
  },
  
];
export const CareProfileSidebarLinks: SidebarLink[] = [
  {
    label: "Profile",
    path: "/care-provider/profile",
    icon: {
      default: <img src={profile} alt="Dashboard" className="w-5 h-5" />,
      hover: <img src={profile} alt="Dashboard" className="w-5 h-5" />,
      active: <img src={profileActive} alt="Dashboard" className="w-5 h-5" />,
    },
  },
  {
    label: "Manage Password",
    path: "/care-provider/manage-password",
    icon: {
      default: <img src={manage} alt="Dashboard" className="w-5 h-5" />,
      hover: <img src={manage} alt="Dashboard" className="w-5 h-5" />,
      active: <img src={manageActive} alt="Dashboard" className="w-5 h-5" />,
    },
  },
  {
    label: "Get Featured",
    path: "/care-provider/feature",
    icon: {
      default: <img src={feature} alt="Dashboard" className="w-5 h-5" />,
      hover: <img src={feature} alt="Dashboard" className="w-5 h-5" />,
      active: <img src={featureActive} alt="Dashboard" className="w-5 h-5" />,
    },
  },

  {
    label: "Payment History",
    path: "/care-provider/payment-history",
    icon: {
      default: <img src={moneyIcon} alt="Dashboard" className="w-5 h-5" />,
      hover: <img src={moneyIcon} alt="Dashboard" className="w-5 h-5" />,
      active: <img src={moneyIcon} alt="Dashboard" className="w-5 h-5" />,
    },
  },
 
];
export const PatientProfileSidebarLinks: SidebarLink[] = [
  {
    label: "Profile",
    path: "/patient/profile",
    icon: {
      default: <img src={profile} alt="Dashboard" className="w-5 h-5" />,
      hover: <img src={profile} alt="Dashboard" className="w-5 h-5" />,
      active: <img src={profileActive} alt="Dashboard" className="w-5 h-5" />,
    },
  },
  {
    label: "Manage Password",
    path: "/patient/manage-password",
    icon: {
      default: <img src={manage} alt="Dashboard" className="w-5 h-5" />,
      hover: <img src={manage} alt="Dashboard" className="w-5 h-5" />,
      active: <img src={manageActive} alt="Dashboard" className="w-5 h-5" />,
    },
  },
  {
    label: "Get Featured",
    path: "/patient/feature",
    icon: {
      default: <img src={feature} alt="Dashboard" className="w-5 h-5" />,
      hover: <img src={feature} alt="Dashboard" className="w-5 h-5" />,
      active: <img src={featureActive} alt="Dashboard" className="w-5 h-5" />,
    },
  },
  {
    label: "Payment History",
    path: "/patient/payment-history",
    icon: {
      default: <img src={feature} alt="Dashboard" className="w-5 h-5" />,
      hover: <img src={feature} alt="Dashboard" className="w-5 h-5" />,
      active: <img src={featureActive} alt="Dashboard" className="w-5 h-5" />,
    },
  },
];
