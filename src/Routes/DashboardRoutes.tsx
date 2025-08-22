import CommunityAccount from "@components/CareProvider/CommunityForum/CommunityAccount";
import ChatbotLayout from "@components/ProfileLayout/ChatbotLayout";
import CareProviderLayout from "@layouts/CareProviderLayout";
import CareProviderDashboard from "@pages/Dashboards/Care-provider/CareProviderDashboard";
import CommunityForm from "@pages/Dashboards/Care-provider/CommunityForm";
import NotificationPage from "@pages/Dashboards/Care-provider/NotificationPage";
import PatinetReviews from "@pages/Dashboards/Care-provider/PatinetReviews";
import PatientAllCommunites from "@pages/PatientPages/PatientAllCommunities";
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

    ],
  },
];
