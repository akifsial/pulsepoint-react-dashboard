import PatientLayout from "@layouts/PatientLayout";
import AdminCommunityForum from "@pages/PatientPages/AdminCommunityForum";
import AdminDashboard from "@pages/PatientPages/AdminDashboard";
import AdminCareProvider from "@pages/PatientPages/AdminCareProvider";
import AdminPatientReviews from "@pages/PatientPages/AdminPatientReviews";
import HospitalProfile from "@pages/PatientPages/hospital-profile";

export const PatientRoutes = [
  {
    path: "/patient", 
    element: <PatientLayout />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "care-provider", element: <AdminCareProvider/> },
      { path: "patient-reviews", element: <AdminPatientReviews /> },
      { path: "community-forum", element: <AdminCommunityForum /> },
      { path: "hospital-profile", element: <HospitalProfile /> },
    ],
  },
];
