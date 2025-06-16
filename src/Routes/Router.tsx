import { Routes, Route } from "react-router-dom";
import { DashboardRoutes } from "./DashboardRoutes";
import { websitePublicRoutes } from "./WebsiteRoutes";
import { PatientRoutes } from "./PatientRoutes";
import { AdminRoutes } from "./AdminRoutes";
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
=======
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

>>>>>>> f98fcb2264ec488c105451068fdf9813fc21fb39
      {/* Admin Routes */}
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
<<<<<<< HEAD
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
=======
>>>>>>> f98fcb2264ec488c105451068fdf9813fc21fb39

      {/* 404 Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
