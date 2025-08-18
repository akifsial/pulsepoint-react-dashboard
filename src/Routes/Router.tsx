import { Routes, Route } from "react-router-dom";
import { DashboardRoutes } from "./DashboardRoutes";
import { websitePublicRoutes } from "./WebsiteRoutes";
import { PatientRoutes } from "./PatientRoutes";
import { AdminRoutes } from "./AdminRoutes";
import NotFoundPage from "@pages/NotFoundPage";
import { ProfileRoutes } from "./ProfileRoutes";
import ChatbotLayout from "@components/ProfileLayout/ChatbotLayout";
import { ProtectedRoutes, PublicProtectRoute } from "./ProtectedRoutes";

const Router: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      {websitePublicRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<PublicProtectRoute>{element}</PublicProtectRoute>}
        />
      ))}

      {/* Dashboard Routes */}
      {DashboardRoutes.map(({ path, element, children }) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoutes
              allowedRoles={
                path.includes("care-provider")
                  ? ["CARE_PROVIDER"]
                  : path.includes("patient")
                  ? ["PATIENT"]
                  : undefined
              }
            >
              {element}
            </ProtectedRoutes>
          }
        >
          {children?.map((child) => (
            <Route
              key={child.path || "index"}
              path={child.path}
              element={
                <ProtectedRoutes
                  allowedRoles={
                    path.includes("care-provider")
                      ? ["CARE_PROVIDER"]
                      : path.includes("patient")
                      ? ["PATIENT"]
                      : undefined
                  }
                >
                  {child.element}
                </ProtectedRoutes>
              }
              index={child.path === "" ? true : undefined}
            />
          ))}
        </Route>
      ))}

      {/* Patient Routes */}
      {PatientRoutes?.map(({ path, element, children }) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoutes allowedRoles={["PATIENT"]}>
              {element}
            </ProtectedRoutes>
          }
        >
          {children?.map((child) => (
            <Route
              key={child.path || "index"}
              path={child.path}
              element={
                <ProtectedRoutes allowedRoles={["PATIENT"]}>
                  {child.element}
                </ProtectedRoutes>
              }
              index={child.path === "" ? true : undefined}
            />
          ))}
        </Route>
      ))}

      {/* Admin Routes */}
      {AdminRoutes.map(({ path, element, children }) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoutes allowedRoles={["ADMIN"]}>
              {element}
            </ProtectedRoutes>
          }
        >
          {children?.map((child) => (
            <Route
              key={child.path || "index"}
              path={child.path}
              element={
                <ProtectedRoutes allowedRoles={["ADMIN"]}>
                  {child.element}
                </ProtectedRoutes>
              }
              index={child.path === "" ? true : undefined}
            />
          ))}
        </Route>
      ))}

      {/* Profile Routes */}
      {ProfileRoutes.map(({ path, element, children }) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoutes
              allowedRoles={
                path.includes("/care-provider")
                  ? ["CARE_PROVIDER"]
                  : path.includes("/patient")
                  ? ["PATIENT"]
                  : path.includes("/admin")
                  ? ["ADMIN"]
                  : undefined
              }
            >
              {element}
            </ProtectedRoutes>
          }
        >
          {children?.map((child) => (
            <Route
              key={child.path || "index"}
              path={child.path}
              element={
                <ProtectedRoutes
                  allowedRoles={
                    path.includes("/care-provider")
                      ? ["CARE_PROVIDER"]
                      : path.includes("/patient")
                      ? ["PATIENT"]
                      : path.includes("/admin")
                      ? ["ADMIN"]
                      : undefined
                  }
                >
                  {child.element}
                </ProtectedRoutes>
              }
              index={child.path === "" ? true : undefined}
            />
          ))}
        </Route>
      ))}

      {/* 404 Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
