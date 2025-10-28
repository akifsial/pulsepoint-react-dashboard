// import { Routes, Route } from "react-router-dom";
// import { DashboardRoutes } from "./dashboard-routes";
// import { websitePublicRoutes } from "./website-routes";
// import { PatientRoutes } from "./patient-routes";
// import { AdminRoutes } from "./admin-routes";
// import NotFoundPage from "@pages/not-found-page";
// import { ProfileRoutes } from "./profile-routes";
// import ChatbotLayout from "@components/profilelayout/chatbot-layout";
// import { ProtectedRoutes, PublicProtectRoute } from "./protected-routes";
// import { TokenHandler } from "./token-handler";
// import PatientLayout from "@layouts/patient-layout";
// import HomePage from "@pages/web-pages/home-page/home-page";

// const Router: React.FC = () => {
//   return (
//     <>
//       {/* <TokenHandler /> */}
//       <Routes>
//         {/* Public Routes */}
//         {websitePublicRoutes.map(({ path, element }) => (
//           <Route key={path} path={path} element={<PublicProtectRoute>{element}</PublicProtectRoute>} />
//         ))}

//         {/* Dashboard Routes */}
//         {DashboardRoutes.map(({ path, element, children }) => (
//           <Route key={path} path={path} element={<ProtectedRoutes allowedRoles={path.includes("care-provider") ? ["CARE_PROVIDER"] : path.includes("patient") ? ["PATIENT"] : undefined}>{element}</ProtectedRoutes>}>
//             {children?.map((child) => (
//               <Route key={child.path || "index"} path={child.path} element={<ProtectedRoutes allowedRoles={path.includes("care-provider") ? ["CARE_PROVIDER"] : path.includes("patient") ? ["PATIENT"] : undefined}>{child.element}</ProtectedRoutes>} index={child.path === "" ? true : undefined} />
//             ))}
//           </Route>
//         ))}

//         {/* Patient Routes */}
//         {PatientRoutes?.map(({ path, element, children }) => (
//           <Route key={path} path={path} element={<ProtectedRoutes allowedRoles={["PATIENT"]}>{element}</ProtectedRoutes>}>
//             {children?.map((child) => (
//               <Route key={child.path || "index"} path={child.path} element={<ProtectedRoutes allowedRoles={["PATIENT"]}>{child.element}</ProtectedRoutes>} index={child.path === "" ? true : undefined} />
//             ))}
//           </Route>
//         ))}

//         {/* Admin Routes */}
//         {AdminRoutes.map(({ path, element, children }) => (
//           <Route key={path} path={path} element={<ProtectedRoutes allowedRoles={["ADMIN"]}>{element}</ProtectedRoutes>}>
//             {children?.map((child) => (
//               <Route key={child.path || "index"} path={child.path} element={<ProtectedRoutes allowedRoles={["ADMIN"]}>{child.element}</ProtectedRoutes>} index={child.path === "" ? true : undefined} />
//             ))}
//           </Route>
//         ))}

//         {/* Profile Routes */}
//         {ProfileRoutes.map(({ path, element, children }) => (
//           <Route key={path} path={path} element={<ProtectedRoutes allowedRoles={path.includes("/care-provider") ? ["CARE_PROVIDER"] : path.includes("/patient") ? ["PATIENT"] : path.includes("/admin") ? ["ADMIN"] : undefined}>{element}</ProtectedRoutes>}>
//             {children?.map((child) => (
//               <Route
//                 key={child.path || "index"}
//                 path={child.path}
//                 element={<ProtectedRoutes allowedRoles={path.includes("/care-provider") ? ["CARE_PROVIDER"] : path.includes("/patient") ? ["PATIENT"] : path.includes("/admin") ? ["ADMIN"] : undefined}>{child.element}</ProtectedRoutes>}
//                 index={child.path === "" ? true : undefined}
//               />
//             ))}
//           </Route>
//         ))}

//         {/* 404 Not Found */}
//         {/* <Route path="/" element={<HomePage />} /> */}

//         {/* <Route element={<PatientLayout />}> */}
//         <Route path="*" element={<NotFoundPage />} />
//         {/* </Route> */}
//         {/* <Route path="*" element={<NotFoundPage />} /> */}
//       </Routes>
//     </>
//   );
// };

// export default Router;

import { Routes, Route, Navigate } from "react-router-dom";
import { websitePublicRoutes } from "./websiteroutes";
import { PatientRoutes } from "./patientroutes";
import { AdminRoutes } from "./adminroutes";
import { DashboardRoutes } from "./dashboardroutes";
import { ProfileRoutes } from "./profileroutes";
import NotFoundPage from "@src/Pages/notfoundpage";
import PatientLayout from "@src/Layouts/patientlayout";
import AdminDashboard from "@src/Pages/patientpages/admindashboard";
import ModalRedirect from "@components/Model/modalredirect";
import HomePage from "@src/Pages/webpages/homepage/homepage";

const Router: React.FC = () => {
  return (
    <>
      <Routes>
        {/* ✅ Redirect from "/" to patient dashboard */}
        {/* <Route path="/" element={<Navigate to="/patient/dashboard" replace />} /> */}
        <Route
          path="/"
          element={
            <>
              <ModalRedirect />
              <HomePage /> 
            </>
          }
        />

        {/* ✅ Public routes (no protection) */}
        {websitePublicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        {/* ✅ Patient routes directly accessible */}
        {PatientRoutes.map(({ path, element, children }) => (
          <Route key={path} path={path} element={element}>
            {children?.map((child) => (
              <Route
                key={child.path || "index"}
                path={child.path}
                element={child.element}
                index={child.path === "" ? true : undefined}
              />
            ))}
          </Route>
        ))}

        {/* ✅ Care-provider (Dashboard) routes freely accessible */}
        {DashboardRoutes.map(({ path, element, children }) => (
          <Route key={path} path={path} element={element}>
            {children?.map((child) => (
              <Route
                key={child.path || "index"}
                path={child.path}
                element={child.element}
                index={child.path === "" ? true : undefined}
              />
            ))}
          </Route>
        ))}

        {/* ✅ Admin routes (no restriction) */}
        {AdminRoutes.map(({ path, element, children }) => (
          <Route key={path} path={path} element={element}>
            {children?.map((child) => (
              <Route
                key={child.path || "index"}
                path={child.path}
                element={child.element}
                index={child.path === "" ? true : undefined}
              />
            ))}
          </Route>
        ))}

        {/* ✅ Profile routes (no restriction) */}
        {ProfileRoutes.map(({ path, element, children }) => (
          <Route key={path} path={path} element={element}>
            {children?.map((child) => (
              <Route
                key={child.path || "index"}
                path={child.path}
                element={child.element}
                index={child.path === "" ? true : undefined}
              />
            ))}
          </Route>
        ))}

        {/* ✅ 404 Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default Router;
