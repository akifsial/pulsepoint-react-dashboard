import AboutUs from "@pages/Web-pages/about-us/AboutUs";
import HomePage from "@pages/Web-pages/home-page/HomePage";
import SignupForm from "@components/auth/SignupForm";
import AccountCreatedPage from "@components/auth/AccountCreatedPage";
import LoginPage from "@components/auth/LoginPage";
import ForgotPasswordPage from "@components/auth/ForgotPasswordPage"; 

export const websitePublicRoutes = [
  { path: '/', element: <HomePage /> },
  { path: '/about-us', element: <AboutUs/> },
    { path: '/signup', element: <SignupForm /> },
      { path: "/account-created", element: <AccountCreatedPage /> },
        { path: "/login", element: <LoginPage /> },
          { path: "/forgot-password", element: <ForgotPasswordPage /> }, 

];

// export const websitePrivateRoutes = [

// ];
