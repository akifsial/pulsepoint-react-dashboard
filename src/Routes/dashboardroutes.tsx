import StripeSuccessPage from "@src/Components/auth/stripesuccesspage";
import CommunityAccount from "@src/Components/CareProvider/CommunityForum/communityaccount";
import CommunityAccountWeb from "@src/Components/CareProvider/CommunityForum/communityaccountweb";
import ChatbotLayout from "@src/Components/profilelayout/chatbotlayout";
import CategoryPage from "@src/Components/Website/Home/categorypage";
import CareProviderLayout from "@src/Layouts/care-providerlayout";
import Blogs from "@pages/blogs/blogs";
import CareProviderProfile from "@pages/care-provider-profile/care-provider-profile";
import CareProviderDashboard from "@src/Pages/Dashboards/care-provider/careproviderdashboard";
import CommunityForm from "@src/Pages/Dashboards/care-provider/communityform";
import NotificationPage from "@src/Pages/Dashboards/care-provider/notificationpage";
import PatinetReviews from "@pages/dashboards/care-provider/patinet-reviews";
import PatientAllCommunites from "@src/Pages/PatientPages/patientallcommunities";
import HomePage from "@src/Pages/Web-pages/homepage/homepage";
import AboutPage from "@src/Pages/website/aboutpage";
import { Navigate } from "react-router-dom";
export const DashboardRoutes = [
  {
    path: "/care-provider",
    element: <CareProviderLayout />,
    children: [
      { path: "", element: <CareProviderDashboard /> },
      { path: "patient-reviews", element: <PatinetReviews /> },
      { path: "community-form", element: <CommunityForm /> },
      { path: "notification", element: <NotificationPage /> },
      { path: "community-account/:id", element: <CommunityAccount /> },
      { path: "chatbot", element: <ChatbotLayout /> },
      { path: "communities", element: <PatientAllCommunites /> },
      { path: "blogs", element: <Blogs /> },
    ],
  },
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

  { path: "/web/category", element: <CategoryPage /> },
  { path: "/care-provider/profile/:id", element: <CareProviderProfile /> },
];
