import AboutUs from "@pages/Web-pages/about-us/AboutUs";
import HomePage from "@pages/Web-pages/home-page/HomePage";
import SignupForm from "@components/auth/SignupForm";
import AccountCreatedPage from "@components/auth/AccountCreatedPage";
import LoginPage from "@components/auth/LoginPage";
import ForgotPasswordPage from "@components/auth/ForgotPasswordPage"; // Import ForgotPasswordPage
import ResetPasswordPage from "@components/auth/ResetPasswordPage";
import PasswordResetSuccessPage from "@components/auth/PasswordResetSuccessPage";
import OTPPage from "@components/auth/OTPPage";
import StripeSuccessPage from "@components/auth/StripeSuccessPage";
import PatientSignupForm from "@components/auth/PatientSignupForm";
import Signup from "@components/auth/RegisterForm/RegisterForm";
import RegisterForm from "@components/auth/RegisterForm/RegisterForm";
import Fallback from "@components/auth/Fallback";

export const websitePublicRoutes = [
  // { path: "/", element: <HomePage /> },
  { path: "/about-us", element: <AboutUs /> },
  { path: "/care-provider/signup", element: <SignupForm /> },
  { path: "/patient/signup", element: <PatientSignupForm /> },

  { path: "/account-created", element: <AccountCreatedPage /> },
  { path: "/care-provider/login", element: <LoginPage /> },
  { path: "/patient/login", element: <LoginPage /> },

  { path: "/login", element: <LoginPage /> },
  { path: "/fallback", element: <Fallback /> },

  { path: "/signup", element: <RegisterForm /> },


  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/otp-verify", element: <OTPPage /> },
  { path: "/reset-password", element: <ResetPasswordPage /> },
  { path: "/password-reset-success", element: <PasswordResetSuccessPage /> },
];

// export const websitePrivateRoutes = [

// ];
