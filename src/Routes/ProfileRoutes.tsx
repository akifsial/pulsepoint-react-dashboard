import Profile from '@components/Profile/Profile';
import Profile2 from '@components/Profile/Profile2';
import ProfileLayout from '@components/ProfileLayout/ProfileLayout';
export const ProfileRoutes = [
  {
    path: "",
    element: <ProfileLayout />,
    children: [
      { path: "/profile", element: <Profile /> },
      { path: "/profile2", element: <Profile2 /> },
    ]
  },
];
