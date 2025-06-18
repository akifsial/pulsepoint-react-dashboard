
import ProfileLayout from '@components/ProfileLayout/ProfileLayout';
import GetFeaturePage from '@pages/ProfilePage/GetFeaturePage';
import ManagePasswordPage from '@pages/ProfilePage/ManagePasswordPage';
import ProfileDetailPage from '@pages/ProfilePage/ProfileDetailPage';
export const ProfileRoutes = [
  {
    path: "",
    element: <ProfileLayout />,
    children: [
      { path: "/profile", element: <ProfileDetailPage /> },
      { path: "/manage-password", element: <ManagePasswordPage /> },
      { path: "/feature", element: <GetFeaturePage /> },
    ]
  },
];
