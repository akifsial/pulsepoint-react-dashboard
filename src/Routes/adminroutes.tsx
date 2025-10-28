import AdminLayout from "@src/Layouts/adminlayout";
import AdminCareProvidersControl from "@src/Pages/Admin-dashboard-pages/admincareproviderscontrol";
import AdminForumModeration from "@src/Pages/Admin-dashboard-pages/adminforummoderation";
import AdminPatientsManagement from "@src/Pages/Admin-dashboard-pages/adminpatientsmanagement";
import AdminReportsandAnalytics from "@src/Pages/Admin-dashboard-pages/adminreportsandanalytics";
import AdminDashboard from "@src/Pages/Admin-dashboard-pages/admindashboard";
import AdminReviews from "@src/Pages/Admin-dashboard-pages/adminreviews";
import NotificationPage from "@src/Pages/Dashboards/Careprovider/notificationpage";
import UserInfoWrapper from "@components/Admin-dashboard/AdminPatient/userinfowrapper";
import UserInfoWrapperCareProvider from "@components/Admin-dashboard/AdminCare/userinfowrappercareprovider";
import ViewCommunity from "@components/Admin-dashboard/Forum/viewcommunity";
import ReviewDetail from "@components/Admin-dashboard/Reviews/reviewdetail";
import Blogs from "@src/Pages/Blogs/blogs";
import HomePage from "@src/Pages/Web-pages/homepage/homepage";
import CategoryPage from "@src/Components/Website/Home/categorypage";
import CommunitiesSpinner from "@src/Components/Loaders/communitiesspinner";

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
