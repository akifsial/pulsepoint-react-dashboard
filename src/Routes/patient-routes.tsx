import PatientLayout from "@layouts/patient-layout";
import AdminCommunityForum from "@pages/patientpages/admin-community-forum";
import AdminDashboard from "@pages/patientpages/admin-dashboard";
import AdminCareProvider from "@pages/patientpages/admin-care-provider";
import AdminPatientReviews from "@pages/patientpages/admin-patient-reviews";
import HospitalProfile from "@pages/patientpages/hospital-profile";
import NotificationPage from "@pages/dashboards/care-provider/notification-page";
import ChatbotLayout from "@components/profilelayout/chatbot-layout";
import NursingHomeReviews from "@components/nursing-home-review";
import EditFeedbackForm from "@pages/patientpages/edit-feedback-form";
import PatientAllCommunities from "@pages/patientpages/patient-all-communities";
import StripeSuccessPage from "@components/auth/stripe-success-page";
import StripeCancelPage from "@components/auth/stripe-cancelled-page";
import CommunityAccount from "@components/careprovider/communityforum/community-account";
import CommunityAccountPosts from "@components/community-account-posts";
import CommunitySinglePost from "@components/careprovider/communityforum/community-single-post";
import Blogs from "@pages/blogs/blogs";
import HomePage from "@src/Pages/Web-pages/home-page/homepage";
import CommunityAccountWeb from "@components/careprovider/communityforum/community-account-web";
import CategoryPage from "@components/website/home/category-page";
import { Navigate } from "react-router-dom";
import CareProviderProfile from "@pages/care-provider-profile/care-provider-profile";
export const PatientRoutes = [
  {
    path: "/patient",
    element: <PatientLayout />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "care-provider", element: <AdminCareProvider /> },
      { path: "patient-reviews", element: <AdminPatientReviews /> },
      { path: "patient-feedback/edit/:id", element: <EditFeedbackForm /> }, 

      { path: "community-forum", element: <AdminCommunityForum /> },
      { path: "communities", element: <PatientAllCommunities /> },

      { path: "care-provider/:id", element: <HospitalProfile /> },
      { path: "notification", element: <NotificationPage /> },
      { path: "chatbot", element: <ChatbotLayout /> },
      { path: "nursing-home", element: <NursingHomeReviews /> },
      { path: "community-account/:id", element: <CommunityAccount /> },
      { path: "community/post/:id", element: <CommunitySinglePost /> },
      { path: "blogs", element: <Blogs /> },
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
  { path: "/", element: <HomePage /> },
  {
    path: "/patient/web",
    element: <Navigate to="/" replace />,
  },

  { path: "/patient/web/community/:id", element: <CommunityAccountWeb /> },
  { path: "/patient/web/category", element: <CategoryPage /> },
  { path: "/patient/care-provider/profile/:id", element: <CareProviderProfile /> },
];
