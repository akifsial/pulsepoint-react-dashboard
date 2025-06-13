import { Routes, Route } from "react-router-dom";
import { DashboardRoutes } from "./DashboardRoutes";
import { websitePublicRoutes } from "./WebsiteRoutes";
import { PatientRoutes } from "./PatientRoutes";
import NotFoundPage from "@pages/NotFoundPage";

const Router: React.FC = () => {
  return (
    <Routes>
      {websitePublicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

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

      {/* Patient Routes */}
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
      {/* </Route> */}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
