import AboutUs from "@src/Pages/Web-pages/About-Us/aboutus";
import HomePage from "@src/Pages/Web-pages/homepage/homepage";
import SignupForm from "@src/Components/Auth/signupform";
import AccountCreatedPage from "@src/Components/Auth/accountcreatedpage";
import LoginPage from "@src/Components/Auth/loginpage";
import ForgotPasswordPage from "@src/Components/Auth/forgotpasswordpage"; 
import ResetPasswordPage from "@src/Components/Auth/resetpasswordpage";
import PasswordResetSuccessPage from "@src/Components/Auth/passwordresetsuccesspage";
import OTPPage from "@src/Components/Auth/otppage";
import PatientSignupForm from "@src/Components/Auth/patientsignupform";
import RegisterForm from "@src/Components/Auth/registerform/registerform";
import Fallback from "@src/Components/Auth/fallbackpage";
import AdminLoginPage from "@src/Components/Auth/adminloginpage";
import AboutPage from "@src/Pages/Website/aboutpage";
import CategoryPage from "@src/Components/Website/Home/categorypage";
import CommunityAccountWeb from "@src/Components/CareProvider/CommunityForum/communityaccountweb";
import FacilitiesPage from "@src/Pages/Website/facilitiesage";
import HealthPage from "@src/Pages/Website/healthpage";
import HelpCenterPage from "@src/Pages/Website/helpcenterpage";
import PrivacyPolicy from "@src/Pages/Website/privacypolicy";
import TermsOfService from "@src/Pages/Website/termsservices";
import DisclosurePolicy from "@src/Pages/Website/disclosurepolicy";
import Blog from "@pages/web-pages/blogs-page/blog";
import ExploreReviews from "@src/Pages/Website/explorereviews";

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

