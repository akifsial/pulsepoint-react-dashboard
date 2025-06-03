import CareProviderLayout from "@layouts/CareProviderLayout";
import CareProviderDashboard from "@pages/Dashboards/Care-provider/CareProviderDashboard";
import CommunityForm from "@pages/Dashboards/Care-provider/CommunityForm";
import PatinetReviews from "@pages/Dashboards/Care-provider/PatinetReviews";

export const DashboardRoutes = [
  {
    path: "/care-provider",
    element: <CareProviderLayout />,
    children: [
      { path: "", element: <CareProviderDashboard /> },
      { path: "patient-reviews", element: <PatinetReviews /> },
      { path: "community-form", element: <CommunityForm /> },
    ],
  },
];
