
import AdminLayout from "@layouts/AdminLayout";
import AdminCommunityForum from "@pages/AdminPages/AdminCommunityForum";
import AdminDashboard from "@pages/AdminPages/AdminDashboard";
import AdminCareProvider from "@pages/AdminPages/AdminCareProvider";
import AdminPatientReviews from "@pages/AdminPages/AdminPatientReviews";

export const AdminRoutes = [
  {
    path: "/admin", 
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "care-provider", element: <AdminCareProvider/> },
      { path: "patient-reviews", element: <AdminPatientReviews /> },
      { path: "community-forum", element: <AdminCommunityForum /> },
    ],
  },
];
