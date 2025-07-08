import PatientLayout from "@layouts/PatientLayout";
import AdminCommunityForum from "@pages/PatientPages/AdminCommunityForum";
import AdminDashboard from "@pages/PatientPages/AdminDashboard";
import AdminCareProvider from "@pages/PatientPages/AdminCareProvider";
import AdminPatientReviews from "@pages/PatientPages/AdminPatientReviews";
import EditReviewPage from "@pages/PatientPages/EditReviewPage"; // Add this import
import HospitalProfile from "@pages/PatientPages/HospitalProfile";
import ChatBot from "@pages/PatientPages/ChatBotPage";
import NotificationPage from "@pages/Dashboards/Care-provider/NotificationPage";
import ChatbotLayout from "@components/ProfileLayout/ChatbotLayout";
import NursingHomeReviews from "@components/NursingHomeReview";
export const PatientRoutes = [
  {
    path: "/patient", 
    element: <PatientLayout />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "care-provider", element: <AdminCareProvider/> },
      { path: "patient-reviews", element: <AdminPatientReviews /> },
      { path: "patient-reviews/edit", element: <EditReviewPage /> }, // Add this line
      { path: "community-forum", element: <AdminCommunityForum /> },
      { path: "hospital-profile/:id", element: <HospitalProfile /> },
      { path: "notification", element: <NotificationPage /> },
       { path: "chatbot", element: <ChatbotLayout /> },
       { path: "nursing-home", element: <NursingHomeReviews /> },
    ],
  },
];
