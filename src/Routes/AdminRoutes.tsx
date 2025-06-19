import AdminLayout from "@layouts/AdminLayout";
import AdminCareProvidersControl from "@pages/AdminDashboardPages/AdminCareProvidersControl";
import AdminForumModeration from "@pages/AdminDashboardPages/AdminForumModeration";
import AdminPatientsManagement from "@pages/AdminDashboardPages/AdminPatientsManagement";
import AdminReportsandAnalytics from "@pages/AdminDashboardPages/AdminReportsandAnalytics";
// import AdminReviews from "@pages/AdminDashboardPages/AdminReviews";
import AdminDashboard from "@pages/AdminDashboardPages/AdminDashboard";
import AdminReviews from "@pages/AdminDashboardPages/AdminReviews";
import NotificationPage from "@pages/Dashboards/Care-provider/NotificationPage";


export const AdminRoutes = [
  {
    path: "/admin", 
    element: <AdminLayout />,
    children: [
      { path: "", element: <AdminDashboard /> },
      { path: "patients-management", element: <AdminPatientsManagement/> },
      { path: "care-providers", element: <AdminCareProvidersControl /> },
      { path: "reviews", element: <AdminReviews/> },
      { path: "forum-moderation", element: <AdminForumModeration/> },
      { path: "reports", element: <AdminReportsandAnalytics/> },
      { path: "notification", element: <NotificationPage /> },
    ],
  },
];
