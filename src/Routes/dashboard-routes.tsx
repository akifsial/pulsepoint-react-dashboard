import StripeSuccessPage from "@components/auth/stripe-success-page";
import CommunityAccount from "@components/careprovider/communityforum/community-account";
import CommunityAccountWeb from "@components/careprovider/communityforum/community-account-web";
import ChatbotLayout from "@components/profilelayout/chatbot-layout";
import CategoryPage from "@components/website/home/category-page";
import CareProviderLayout from "@layouts/care-provider-layout";
import Blogs from "@pages/blogs/blogs";
import CareProviderProfile from "@pages/care-provider-profile/care-provider-profile";
import CareProviderDashboard from "@pages/dashboards/care-provider/care-provider-dashboard";
import CommunityForm from "@pages/dashboards/care-provider/community-form";
import NotificationPage from "@pages/dashboards/care-provider/notification-page";
import PatinetReviews from "@pages/dashboards/care-provider/patinet-reviews";
import PatientAllCommunites from "@pages/patientpages/patient-all-communities";
import HomePage from "@pages/web-pages/home-page/home-page";
import AboutPage from "@pages/website/about-page";
import { Navigate } from "react-router-dom";
// /care-provider/communities
export const DashboardRoutes = [
  {
    path: "/care-provider",
    element: <CareProviderLayout />,
    children: [
      { path: "", element: <CareProviderDashboard /> },
      { path: "patient-reviews", element: <PatinetReviews /> },
      { path: "community-form", element: <CommunityForm /> },
      { path: "notification", element: <NotificationPage /> },
      // { path: "notification", element: <NotificationPage /> },
      { path: "community-account/:id", element: <CommunityAccount /> },
      { path: "chatbot", element: <ChatbotLayout /> },
      { path: "communities", element: <PatientAllCommunites /> },
      { path: "blogs", element: <Blogs /> },
    ],
  },
  // { path: "/care-provider/web", element: <HomePage /> },
  { path: "/", element: <HomePage /> },
  {
    path: "/care-provider/web",
    element: <Navigate to="/" replace />,
  },
    
  {
    path: "/success",
    element: <StripeSuccessPage />,
  },
  {
    path: "/care-provider/web/community/:id",
    element: <CommunityAccountWeb />,
  },

  // { path: "/care-provider/web/category", element: <CategoryPage /> },
  // { path: "category/blog", element: <CategoryPage /> },
  { path: "/web/category", element: <CategoryPage /> },
  { path: "/care-provider/profile/:id", element: <CareProviderProfile /> },
  // { path: "/patient/care-provider/profile/:id", element: <CareProviderProfile /> },

  // { path: "/about-us", element: <AboutPage /> },
];
