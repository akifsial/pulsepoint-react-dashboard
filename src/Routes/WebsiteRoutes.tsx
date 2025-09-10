import AboutUs from "@pages/Web-pages/about-us/AboutUs";
import HomePage from "@pages/Web-pages/home-page/HomePage";
import SignupForm from "@components/auth/SignupForm";
import AccountCreatedPage from "@components/auth/AccountCreatedPage";
import LoginPage from "@components/auth/LoginPage";
import ForgotPasswordPage from "@components/auth/ForgotPasswordPage"; // Import ForgotPasswordPage
import ResetPasswordPage from "@components/auth/ResetPasswordPage";
import PasswordResetSuccessPage from "@components/auth/PasswordResetSuccessPage";
import OTPPage from "@components/auth/OTPPage";
import PatientSignupForm from "@components/auth/PatientSignupForm";
import RegisterForm from "@components/auth/RegisterForm/RegisterForm";
import Fallback from "@components/auth/Fallback";
import AdminLoginPage from "@components/auth/AdminLoginPage";
import AboutPage from "@pages/Website/AboutPage";
import CategoryPage from "@components/Website/Home/CategoryPage";
import { PublicProtectRoute } from "./ProtectedRoutes";
import CommunityAccountWeb from "@components/CareProvider/CommunityForum/CommunityAccountWeb";
import FacilitiesPage from "@pages/Website/FacilitiesPage";
import HealthPage from "@pages/Website/HealthPage";
import HelpCenterPage from "@pages/Website/HelpCenterPage";
import PrivacyPolicy from "@pages/Website/PrivacyPolicy";
import TermsOfService from "@pages/Website/TermsServices";
import DisclosurePolicy from "@pages/Website/DisclosurePolicy";

export const websitePublicRoutes = [
  // { path: "/", element: <HomePage /> },
    {
    path: "/",
    element: (
      <PublicProtectRoute forceRedirectToDashboard={false}>
        <HomePage />
      </PublicProtectRoute>
    ),
  },
  { path: "/about-us", element: <AboutPage /> },
  { path: "/care-provider/signup", element: <SignupForm /> },
  { path: "/patient/signup", element: <PatientSignupForm /> },

  { path: "/account-created", element: <AccountCreatedPage /> },
  { path: "/care-provider/login", element: <LoginPage /> },
  { path: "/patient/login", element: <LoginPage /> },

  { path: "/login", element: <LoginPage /> },
  // { path: "/admin/login", element: <AdminLoginPage /> },

  { path: "/fallback", element: <Fallback /> },

  { path: "/signup", element: <RegisterForm /> },

  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/otp-verify", element: <OTPPage /> },
  { path: "/reset-password", element: <ResetPasswordPage /> },
  { path: "/password-reset-success", element: <PasswordResetSuccessPage /> },
  { path: "/category/:url_key", element: <CategoryPage /> },
  { path: "category/blog", element: <CategoryPage /> },
  { path: "/patient/web/community/:id", element: <CommunityAccountWeb /> },
  { path: "facilities", element: <FacilitiesPage /> },
  { path: "health", element: <HealthPage /> },
  { path: "help-center", element: <HelpCenterPage /> },
  { path: "privacy-policy", element: <PrivacyPolicy /> },
  { path: "/terms-of-service", element: <TermsOfService /> },
  { path: "/disclosure-policy", element: <DisclosurePolicy /> },



// privacy-policy



];

// export const websitePrivateRoutes = [

// ];
