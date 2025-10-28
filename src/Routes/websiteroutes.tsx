import AboutUs from "@src/Pages/Web-pages/aboutus/aboutus";
import HomePage from "@src/Pages/Web-pages/homepage/homepage";
import SignupForm from "@src/Components/auth/signupform";
import AccountCreatedPage from "@src/Components/auth/accountcreatedpage";
import LoginPage from "@src/Components/auth/loginpage";
import ForgotPasswordPage from "@src/Components/auth/forgotpasswordpage"; 
import ResetPasswordPage from "@src/Components/auth/resetpasswordpage";
import PasswordResetSuccessPage from "@src/Components/auth/passwordresetsuccesspage";
import OTPPage from "@src/Components/auth/otppage";
import PatientSignupForm from "@src/Components/auth/patientsignupform";
import RegisterForm from "@src/Components/auth/registerform/registerform";
import Fallback from "@components/auth/fallback";
import AdminLoginPage from "@src/Components/auth/adminloginpage";
import AboutPage from "@src/Pages/website/aboutpage";
import CategoryPage from "@src/Components/Website/Home/categorypage";
import CommunityAccountWeb from "@src/Components/CareProvider/CommunityForum/communityaccountweb";
import FacilitiesPage from "@src/Pages/website/facilitiesage";
import HealthPage from "@src/Pages/website/healthpage";
import HelpCenterPage from "@src/Pages/website/helpcenterpage";
import PrivacyPolicy from "@src/Pages/website/privacypolicy";
import TermsOfService from "@src/Pages/website/termsservices";
import DisclosurePolicy from "@src/Pages/website/disclosurepolicy";
import Blog from "@pages/web-pages/blogs-page/blog";
import ExploreReviews from "@src/Pages/website/explorereviews";

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

