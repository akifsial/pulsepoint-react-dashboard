import PatientLayout from "@src/Layouts/patientlayout";
import AdminCommunityForum from "@src/Pages/PatientPages/admincommunityforum";
import AdminDashboard from "@src/Pages/PatientPages/admindashboard";
import AdminCareProvider from "@src/Pages/PatientPages/admincareprovider";
import AdminPatientReviews from "@src/Pages/PatientPages/adminpatientreviews";
import HospitalProfile from "@src/Pages/PatientPages/hospitalprofile";
import NotificationPage from "@src/Pages/Dashboards/care-provider/notificationpage";
import ChatbotLayout from "@src/Components/profilelayout/chatbotlayout";
import NursingHomeReviews from "@src/Components/nursinghomereview";
import EditFeedbackForm from "@src/Pages/PatientPages/editfeedbackform";
import PatientAllCommunities from "@src/Pages/PatientPages/patientallcommunities";
import StripeSuccessPage from "@src/Components/auth/stripesuccesspage";
import StripeCancelPage from "@src/Components/auth/stripecancelledpage";
import CommunityAccount from "@src/Components/CareProvider/CommunityForum/communityaccount";
import CommunityAccountPosts from "@src/Components/communityaccountposts";
import CommunitySinglePost from "@src/Components/CareProvider/CommunityForum/communitysinglepost";
import Blogs from "@pages/blogs/blogs";
import HomePage from "@src/Pages/Web-pages/homepage/homepage";
import CommunityAccountWeb from "@src/Components/CareProvider/CommunityForum/communityaccountweb";
import CategoryPage from "@src/Components/Website/Home/categorypage";
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
