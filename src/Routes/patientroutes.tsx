import PatientLayout from "@src/Layouts/patientlayout";
import AdminCommunityForum from "@src/Pages/Patient-pages/admincommunityforum";
import AdminDashboard from "@src/Pages/Patient-pages/admindashboard";
import AdminCareProvider from "@src/Pages/Patient-pages/admincareprovider";
import AdminPatientReviews from "@src/Pages/Patient-pages/adminpatientreviews";
import HospitalProfile from "@src/Pages/Patient-pages/hospitalprofile";
import NotificationPage from "@src/Pages/Dashboards/Careprovider/notificationpage";
import ChatbotLayout from "@src/Components/Profile-layout/chatbotlayout";
import NursingHomeReviews from "@src/Components/nursinghomereview";
import EditFeedbackForm from "@src/Pages/Patient-pages/editfeedbackform";
import PatientAllCommunities from "@src/Pages/Patient-pages/patientallcommunities";
import StripeSuccessPage from "@src/Components/Auth/stripesuccesspage";
import StripeCancelPage from "@src/Components/Auth/stripecancelledpage";
import CommunityAccount from "@src/Components/CareProvider/CommunityForum/communityaccount";
import CommunityAccountPosts from "@src/Components/communityaccountposts";
import CommunitySinglePost from "@src/Components/CareProvider/CommunityForum/communitysinglepost";
import Blogs from "@src/Pages/Blogs/blogs";
import HomePage from "@src/Pages/Web-pages/homepage/homepage";
import CommunityAccountWeb from "@src/Components/CareProvider/CommunityForum/communityaccountweb";
import CategoryPage from "@src/Components/Website/Home/categorypage";
import { Navigate } from "react-router-dom";
import CareProviderProfile from "@src/Pages/Careprovider-profile/careproviderprofile";
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
