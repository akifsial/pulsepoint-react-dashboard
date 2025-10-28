import AdminLayout from "@src/Layouts/adminlayout";
import AdminCareProvidersControl from "@src/Pages/admindashboardpages/admincareproviderscontrol";
import AdminForumModeration from "@src/Pages/admindashboardpages/adminforummoderation";
import AdminPatientsManagement from "@src/Pages/admindashboardpages/adminpatientsmanagement";
import AdminReportsandAnalytics from "@src/Pages/admindashboardpages/adminreportsandanalytics";
import AdminDashboard from "@src/Pages/admindashboardpages/admindashboard";
import AdminReviews from "@src/Pages/admindashboardpages/adminreviews";
import NotificationPage from "@src/Pages/dashboards/careprovider/notificationpage";
import UserInfoWrapper from "@src/Components/AdminDashboard/AdminPatient/userinfowrapper";
import UserInfoWrapperCareProvider from "@src/Components/AdminDashboard/AdminCare/userinfowrappercareprovider";
import ViewCommunity from "@src/Components/AdminDashboard/Forum/viewcommunity";
import ReviewDetail from "@components/admindashboard/reviews/review-detail";
import Blogs from "@src/Pages/blogs/blogs";
import HomePage from "@src/Pages/webpages/homepage/homepage";
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
