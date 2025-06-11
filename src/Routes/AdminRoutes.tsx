
import AdminLayout from "@layouts/AdminLayout";
import AdminCommunityForum from "@pages/AdminPages/AdminCommunityForum";
import AdminDashboard from "@pages/AdminPages/AdminDashboard";
import AdminPatientReviews from "@pages/AdminPages/AdminPatientReviews";

export const AdminRoutes = [
  {
    path: "/admin", 
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "patient-reviews", element: <AdminPatientReviews /> },
      { path: "community-forum", element: <AdminCommunityForum /> },
    ],
  },
];
