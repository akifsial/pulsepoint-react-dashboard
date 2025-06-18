import PatientLayout from '@layouts/PatientLayout';
import ProfileLayout from '@layouts/ProfileLayout';
import GetFeaturePage from '@pages/ProfilePage/GetFeaturePage';
import ManagePasswordPage from '@pages/ProfilePage/ManagePasswordPage';
import ProfileDetailPage from '@pages/ProfilePage/ProfileDetailPage';
import React from 'react'

export const ProfileRoutes = [
  {
    path: "/profile", 
    element: <ProfileLayout />,
    children: [
      { path: "detail", element: <ProfileDetailPage /> },
      { path: "manage", element: <ManagePasswordPage/> },
      { path: "feature", element: <GetFeaturePage /> },
    ],
  },
];