import AdminLayout from "@layouts/AdminLayout";
import AdminCareProvidersControl from "@pages/AdminDashboardPages/AdminCareProvidersControl";
import AdminForumModeration from "@pages/AdminDashboardPages/AdminForumModeration";
import AdminPatientsManagement from "@pages/AdminDashboardPages/AdminPatientsManagement";
import AdminReportsandAnalytics from "@pages/AdminDashboardPages/AdminReportsandAnalytics";
// import AdminReviews from "@pages/AdminDashboardPages/AdminReviews";
import AdminDashboard from "@pages/AdminDashboardPages/AdminDashboard";
import AdminReviews from "@pages/AdminDashboardPages/AdminReviews";
import NotificationPage from "@pages/Dashboards/Care-provider/NotificationPage";
import UserInfoWrapper from "@components/AdminDashboard/AdminPatient/UserInfoWrapper";
import UserInfoWrapperCareProvider from "@components/AdminDashboard/AdminCare/UserInfoWrapperCareProvider";
import ViewCommunity from "@components/AdminDashboard/Forum/ViewCommunity";
import ReviewDetail from "@components/AdminDashboard/Reviews/ReviewDetail";
import Blogs from "@pages/Blogs/Blogs";
import HomePage from "@pages/Web-pages/home-page/HomePage";
import CategoryPage from "@components/Website/Home/CategoryPage";
import CommunitiesSpinner from "@components/Loaders/CommunitiesSpinner";

export const AdminRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "", element: <AdminDashboard /> },
      { path: "patients-management", element: <AdminPatientsManagement /> },
      { path: "care-providers", element: <AdminCareProvidersControl /> },
      { path: "reviews", element: <AdminReviews /> },
      { path: "forum-moderation", element: <AdminForumModeration /> },
      { path: "reports", element: <AdminReportsandAnalytics /> },
      { path: "notification", element: <NotificationPage /> },
      { path: "patient-info/:id", element: <UserInfoWrapper /> },
      { path: "blogs", element: <Blogs /> },

      {
        path: "careprovider-info/:id",
        element: <UserInfoWrapperCareProvider />,
      },
      { path: "forum-moderation/view/:type/:id", element: <ViewCommunity /> },
      
      { path: "reviewdetail/:id", element: <ReviewDetail /> },
    ],
  },
  { path: "/web", element: <HomePage /> },
  { path: "/admin/web/community/:id", element: <CommunitiesSpinner /> },
{ path: "/admin/web/category", element: <CategoryPage /> },

];
