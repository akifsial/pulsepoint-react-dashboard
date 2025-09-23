import AddFeatureDetail from "@src/components/Profile/AddFeatureDetail";
import AdminProfileDetail from "@src/components/Profile/AdminProfileDetail";
import PatientProfile from "@src/components/Profile/PatientProfile";
import CareProfileLayout from "@src/components/ProfileLayout/CareProfileLayout";
import PatientProfileLayout from "@src/components/ProfileLayout/PatientProfileLayout";
import ProfileLayout from "@src/components/ProfileLayout/ProfileLayout";
import GetFeaturePage from "@pages/ProfilePage/GetFeaturePage";
import CareProviderGetFeaturePage from "@pages/ProfilePage/CareProviderGetFeaturePage";
import ManagePasswordPage from "@pages/ProfilePage/ManagePasswordPage";
import PatientProfileDetailPage from "@pages/ProfilePage/PatientProfileDetailPage";
import ProfileDetailPage from "@pages/ProfilePage/ProfileDetailPage";
import ProtectedRoutes from "./ProtectedRoutes";
import PaymentHistoryPage from "@pages/ProfilePage/PaymentHistory";
export const ProfileRoutes = [
  {
    path: "/admin",
    element: <ProfileLayout />,
    children: [
      { path: "profile", element: <AdminProfileDetail /> },
      { path: "manage-password", element: <ManagePasswordPage /> },
      { path: "feature", element: <AddFeatureDetail /> },
    ],
  },
  {
    path: "/care-provider",
    element: <CareProfileLayout />,
    children: [
      {
        path: "profile",
        element: <ProfileDetailPage />,
      },
      {
        path: "manage-password",
        element: <ManagePasswordPage />,
      },
      {
        path: "feature",
        element: <CareProviderGetFeaturePage />,
      },
      { path: "payment-history", element: <PaymentHistoryPage /> },

      // {
      //   path: "feature",
      //   element: <CareProviderGetFeaturePage />,

      // },
    ],
  },
  {
    path: "/patient",
    element: <PatientProfileLayout />,
    children: [
      { path: "profile", element: <PatientProfile /> },
      { path: "manage-password", element: <ManagePasswordPage /> },
      { path: "feature", element: <GetFeaturePage /> },
      { path: "payment-history", element: <PaymentHistoryPage /> },
    ],
  },
];
