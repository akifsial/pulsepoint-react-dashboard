import StripeSuccessPage from "@components/auth/StripeSuccessPage";
import CommunityAccount from "@components/CareProvider/CommunityForum/CommunityAccount";
import CommunityAccountWeb from "@components/CareProvider/CommunityForum/CommunityAccountWeb";
import ChatbotLayout from "@components/ProfileLayout/ChatbotLayout";
import CategoryPage from "@components/Website/Home/CategoryPage";
import CareProviderLayout from "@layouts/CareProviderLayout";
import Blogs from "@pages/Blogs/Blogs";
import CareProviderProfile from "@pages/CareProviderProfile/CareProviderProfile";
import CareProviderDashboard from "@pages/Dashboards/Care-provider/CareProviderDashboard";
import CommunityForm from "@pages/Dashboards/Care-provider/CommunityForm";
import NotificationPage from "@pages/Dashboards/Care-provider/NotificationPage";
import PatinetReviews from "@pages/Dashboards/Care-provider/PatinetReviews";
import PatientAllCommunites from "@pages/PatientPages/PatientAllCommunities";
import HomePage from "@pages/Web-pages/home-page/HomePage";
import AboutPage from "@pages/Website/AboutPage";
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
