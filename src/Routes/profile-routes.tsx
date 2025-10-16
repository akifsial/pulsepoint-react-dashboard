import AddFeatureDetail from "@components/profile/add-feature-detail";
import AdminProfileDetail from "@components/profile/admin-profile-detail";
import PatientProfile from "@components/profile/patient-profile";
import CareProfileLayout from "@components/profilelayout/care-profile-layout";
import PatientProfileLayout from "@components/profilelayout/patient-profile-layout";
import ProfileLayout from "@components/profilelayout/profile-layout";
import GetFeaturePage from "@pages/profilepage/get-feature-page";
import CareProviderGetFeaturePage from "@pages/profilepage/care-provider-get-feature-page";
import ManagePasswordPage from "@pages/profilepage/manage-password-page";
import PatientProfileDetailPage from "@pages/profilepage/patient-profile-detail-page";
import ProfileDetailPage from "@pages/profilepage/profile-detail-page";
import ProtectedRoutes from "./protected-routes";
import PaymentHistoryPage from "@pages/profilepage/payment-history";
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
