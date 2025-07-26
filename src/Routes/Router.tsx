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
        <Route key={path} path={path} element={element}>
          {children?.map((child) => (
            <Route
              key={child.path || "index"}
              path={child.path}
              // element={
              // <ProtectedRoutes>{child.element}</ProtectedRoutes>}
              element={<ProtectedRoutes>{child.element}</ProtectedRoutes>}
              index={child.path === "" ? true : undefined}
            />
          ))}
        </Route>
      ))}

      {/* Patient Routes */}
      {PatientRoutes.map(({ path, element, children }) => (
        <Route key={path} path={path} element={element}>
          {children?.map((child) => (
            <Route
              key={child.path || "index"}
              path={child.path}
              // element={<ProtectedRoutes>{child.element}</ProtectedRoutes>}
              element={child.element}
              index={child.path === "" ? true : undefined}
            />
          ))}
        </Route>
      ))}
      {/* Admin Routes */}
      {/* {AdminRoutes.map(({ path, element, children }) => (
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
      ))} */}

      {/* Admin Routes */}
      {AdminRoutes.map(({ path, element, children }) => (
        <Route key={path} path={path} element={element}>
          {children?.map((child) => (
            <Route
              key={child.path || "index"}
              path={child.path}
              element={<ProtectedRoutes>{child.element}</ProtectedRoutes>}
              // element={
              //   child.isProtected ? (
              //     <ProtectedRoutes>{child.element}</ProtectedRoutes>
              //   ) : (
              //     child.element
              //   )
              // }
              index={child.path === "" ? true : undefined}
            />
          ))}
        </Route>
      ))}

      {ProfileRoutes.map(({ path, element, children }) => (
        <Route
          key={path}
          path={path}
          // element={<ProtectedRoutes>{element}</ProtectedRoutes>}
          element={element}
        >
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
      {/* 404 Not Found */}
      {/* <Route path="/patient/chatbot" element={ <ChatbotLayout /> }/> */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
