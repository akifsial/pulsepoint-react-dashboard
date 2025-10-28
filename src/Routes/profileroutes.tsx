import AddFeatureDetail from "@components/profile/addfeaturedetail";
import AdminProfileDetail from "@components/profile/adminprofiledetail";
import PatientProfile from "@components/profile/patientprofile";
import CareProfileLayout from "@components/profilelayout/careprofilelayout";
import PatientProfileLayout from "@components/profilelayout/patientprofilelayout";
import ProfileLayout from "@components/profilelayout/profilelayout";
import GetFeaturePage from "@src/Pages/profilepage/getfeaturepage";
import CareProviderGetFeaturePage from "@src/Pages/profilepage/careprovidergetfeaturepage";
import ManagePasswordPage from "@src/Pages/profilepage/managepasswordpage";
import PatientProfileDetailPage from "@src/Pages/profilepage/patientprofiledetailpage";
import ProfileDetailPage from "@src/Pages/profilepage/profiledetailpage";
import ProtectedRoutes from "./protectedroutes";
import PaymentHistoryPage from "@src/Pages/profilepage/paymenthistory";
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
