import { Routes, Route } from "react-router-dom";
import { DashboardRoutes } from "./DashboardRoutes";
import { websitePublicRoutes } from "./WebsiteRoutes";
import { PatientRoutes } from "./PatientRoutes";
import NotFoundPage from "@pages/NotFoundPage";
import CreateCommunity from "@components/CareProvider/CommunityForum/CreatCommunity";
import Model from "@components/Model/Model";

const Router: React.FC = () => {
  return (
    <Routes>
      
      {/* Public Routes */}
      {websitePublicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      {/* Dashboard Routes */}
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

<<<<<<< HEAD
      {/* Patient Routes */}
      {PatientRoutes.map(({ path, element, children }) => (
=======
      {/* Admin Routes */}
      {AdminRoutes.map(({ path, element, children }) => (
>>>>>>> 3115d50804294e1fce64e3c7044061630c554c0f
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

      {/* 404 Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
