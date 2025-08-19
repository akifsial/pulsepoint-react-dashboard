import PatientLayout from "@layouts/PatientLayout";
import AdminCommunityForum from "@pages/PatientPages/AdminCommunityForum";
import AdminDashboard from "@pages/PatientPages/AdminDashboard";
import AdminCareProvider from "@pages/PatientPages/AdminCareProvider";
import AdminPatientReviews from "@pages/PatientPages/AdminPatientReviews";
import HospitalProfile from "@pages/PatientPages/HospitalProfile";
import NotificationPage from "@pages/Dashboards/Care-provider/NotificationPage";
import ChatbotLayout from "@components/ProfileLayout/ChatbotLayout";
import NursingHomeReviews from "@components/NursingHomeReview";
import EditFeedbackForm from "@pages/PatientPages/EditFeedbackForm";
import PatientAllCommunities from "@pages/PatientPages/PatientAllCommunities";
import StripeSuccessPage from "@components/auth/StripeSuccessPage";
import StripeCancelPage from "@components/auth/StripeCancelledPage";
import CommunityAccount from "@components/CareProvider/CommunityForum/CommunityAccount";
import CommunityAccountPosts from "@components/CommunityAccountPosts";
import CommunitySinglePost from "@components/CareProvider/CommunityForum/CommunitySinglePost";
export const PatientRoutes = [
  {
    path: "/patient",
    element: <PatientLayout />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "care-provider", element: <AdminCareProvider /> },
      { path: "patient-reviews", element: <AdminPatientReviews /> },
      // { path: "patient-reviews/edit", element: <EditReviewPage /> }, // Add this line
      { path: "patient-feedback/edit/:id", element: <EditFeedbackForm /> }, // Add this line

      { path: "community-forum", element: <AdminCommunityForum /> },
      { path: "communities", element: <PatientAllCommunities /> },

      { path: "hospital-profile/:id", element: <HospitalProfile /> },
      { path: "notification", element: <NotificationPage /> },
      { path: "chatbot", element: <ChatbotLayout /> },
      { path: "nursing-home", element: <NursingHomeReviews /> },
      { path: "community-account/:id", element: <CommunityAccount /> },
      { path: "community/post/:id", element: <CommunitySinglePost /> },


      // { path: "payment-history", element: <NursingHomeReviews /> },
    ],
  },
  {
    path: "/success",
    element: <StripeSuccessPage />,
  },
  {
    path: "/cancel",
    element: <StripeCancelPage />,
  },
];
