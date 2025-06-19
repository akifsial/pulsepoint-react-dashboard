
import CareProfileLayout from '@components/ProfileLayout/CareProfileLayout';
import PatientProfileLayout from '@components/ProfileLayout/PatientProfileLayout';
import ProfileLayout from '@components/ProfileLayout/ProfileLayout';
import GetFeaturePage from '@pages/ProfilePage/GetFeaturePage';
import ManagePasswordPage from '@pages/ProfilePage/ManagePasswordPage';
import PatientProfileDetailPage from '@pages/ProfilePage/PatientProfileDetailPage';
import ProfileDetailPage from '@pages/ProfilePage/ProfileDetailPage';
export const ProfileRoutes = [
  {
    path: "/admin",
    element: <ProfileLayout />,
    children: [
      { path: "profile", element: <ProfileDetailPage /> },
      { path: "manage-password", element: <ManagePasswordPage /> },
      { path: "feature", element: <GetFeaturePage /> },
    ]
  },
  {
    path: "/care-provider",
    element: <CareProfileLayout />,
    children: [
      { path: "profile", element: <ProfileDetailPage /> },
      { path: "manage-password", element: <ManagePasswordPage /> },
      { path: "feature", element: <GetFeaturePage /> },
    ]
  },
  {
    path: "/patient",
    element: <PatientProfileLayout />,
    children: [
      { path: "profile", element: <PatientProfileDetailPage /> },
      { path: "manage-password", element: <ManagePasswordPage /> },
      { path: "feature", element: <GetFeaturePage /> },
    ]
  },
];
