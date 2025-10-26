import AboutUs from "@pages/web-pages/about-us/about-us";
import HomePage from "@pages/web-pages/home-page/home-page";
import SignupForm from "@components/auth/signup-form";
import AccountCreatedPage from "@components/auth/account-created-page";
import LoginPage from "@components/auth/login-page";
import ForgotPasswordPage from "@components/auth/forgot-password-page"; 
import ResetPasswordPage from "@components/auth/reset-password-page";
import PasswordResetSuccessPage from "@components/auth/password-reset-success-page";
import OTPPage from "@components/auth/otp-page";
import PatientSignupForm from "@components/auth/patient-signup-form";
import RegisterForm from "@components/auth/registerform/register-form";
import Fallback from "@components/auth/fallback";
import AdminLoginPage from "@components/auth/admin-login-page";
import AboutPage from "@pages/website/about-page";
import CategoryPage from "@components/website/home/category-page";
import CommunityAccountWeb from "@components/careprovider/communityforum/community-account-web";
import FacilitiesPage from "@pages/website/facilities-age";
import HealthPage from "@pages/website/health-page";
import HelpCenterPage from "@pages/website/help-center-page";
import PrivacyPolicy from "@pages/website/privacy-policy";
import TermsOfService from "@pages/website/terms-services";
import DisclosurePolicy from "@pages/website/disclosure-policy";
import Blog from "@pages/web-pages/blogs-page/blog";
import ExploreReviews from "@pages/website/explore-reviews";

export const websitePublicRoutes = [
  // { path: "/", element: <HomePage /> },
  // {
  //   path: "/",
  //   element: (
  //     <PublicProtectRoute forceRedirectToDashboard={false}>
  //       <HomePage />
  //     </PublicProtectRoute>
  //   ),
  // },
  {
  path: "/",
  element: <HomePage />,
},

  { path: "/blog/:id", element: <Blog /> },
  { path: "/explore/reviews", element: <ExploreReviews /> },

  { path: "/about-us", element: <AboutPage /> },
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
  { path: "/category/:url_key", element: <CategoryPage /> },
  { path: "category/blog", element: <CategoryPage /> },
  { path: "/patient/web/community/:id", element: <CommunityAccountWeb /> },
  { path: "facilities", element: <FacilitiesPage /> },
  { path: "health", element: <HealthPage /> },
  { path: "help-center", element: <HelpCenterPage /> },
  { path: "privacy-policy", element: <PrivacyPolicy /> },
  { path: "/terms-of-service", element: <TermsOfService /> },
  { path: "/disclosure-policy", element: <DisclosurePolicy /> },

];

