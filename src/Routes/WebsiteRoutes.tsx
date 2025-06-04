import AboutUs from "@pages/Web-pages/about-us/AboutUs";
import HomePage from "@pages/Web-pages/home-page/HomePage";
import SignupForm from "@components/auth/SignupForm"; // ✅ Import SignupForm

export const websitePublicRoutes = [
  { path: '/', element: <HomePage /> },
  { path: '/about-us', element: <AboutUs/> },
    { path: '/signup', element: <SignupForm /> }, // ✅ Add Signup route
];

// export const websitePrivateRoutes = [

// ];
