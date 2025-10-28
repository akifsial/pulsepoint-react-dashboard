import PatientLayout from "@src/Layouts/patientlayout";
import AdminCommunityForum from "@src/Pages/patientpages/admincommunityforum";
import AdminDashboard from "@src/Pages/patientpages/admindashboard";
import AdminCareProvider from "@src/Pages/patientpages/admincareprovider";
import AdminPatientReviews from "@src/Pages/patientpages/adminpatientreviews";
import HospitalProfile from "@src/Pages/patientpages/hospitalprofile";
import NotificationPage from "@src/Pages/dashboards/careprovider/notificationpage";
import ChatbotLayout from "@components/profilelayout/chatbotlayout";
import NursingHomeReviews from "@components/nursinghomereview";
import EditFeedbackForm from "@src/Pages/patientpages/editfeedbackform";
import PatientAllCommunities from "@src/Pages/patientpages/patientallcommunities";
import StripeSuccessPage from "@components/Auth/stripesuccesspage";
import StripeCancelPage from "@components/Auth/stripecancelledpage";
import CommunityAccount from "@components/CareProvider/CommunityForum/communityaccount";
import CommunityAccountPosts from "@components/communityaccountposts";
import CommunitySinglePost from "@components/CareProvider/CommunityForum/communitysinglepost";
import Blogs from "@src/Pages/blogs/blogs";
import HomePage from "@src/Pages/webpages/homepage/homepage";
import CommunityAccountWeb from "@components/CareProvider/CommunityForum/communityaccountweb";
import CategoryPage from "@components/Website/Home/categorypage";
import { Navigate } from "react-router-dom";
import CareProviderProfile from "@src/Pages/careproviderprofile/careproviderprofile";
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
