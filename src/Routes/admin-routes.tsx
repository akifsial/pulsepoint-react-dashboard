import AdminLayout from "@layouts/admin-layout";
import AdminCareProvidersControl from "@pages/admindashboardpages/admin-care-providers-control";
import AdminForumModeration from "@pages/admindashboardpages/admin-forum-moderation";
import AdminPatientsManagement from "@pages/admindashboardpages/admin-patients-management";
import AdminReportsandAnalytics from "@pages/admindashboardpages/admin-reportsand-analytics";
import AdminDashboard from "@pages/admindashboardpages/admin-dashboard";
import AdminReviews from "@pages/admindashboardpages/admin-reviews";
import NotificationPage from "@pages/dashboards/care-provider/notification-page";
import UserInfoWrapper from "@components/admindashboard/adminpatient/user-info-wrapper";
import UserInfoWrapperCareProvider from "@components/admindashboard/admincare/user-info-wrapper-care-provider";
import ViewCommunity from "@components/admindashboard/forum/view-community";
import ReviewDetail from "@components/admindashboard/reviews/review-detail";
import Blogs from "@pages/blogs/blogs";
import HomePage from "@src/Pages/Web-pages/home-page/homepage";
import CategoryPage from "@components/website/home/category-page";
import CommunitiesSpinner from "@components/loaders/communities-spinner";

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
