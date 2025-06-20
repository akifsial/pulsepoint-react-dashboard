import { Routes, Route, useLocation } from "react-router-dom";
import { DashboardRoutes } from "./DashboardRoutes";
import { websitePublicRoutes } from "./WebsiteRoutes";
import { PatientRoutes } from "./PatientRoutes";
import { AdminRoutes } from "./AdminRoutes";
import NotFoundPage from "@pages/NotFoundPage";
import { ProfileRoutes } from "./ProfileRoutes";
import ChatbotLayout from "@components/ProfileLayout/ChatbotLayout";
import { useEffect } from "react";

const Router: React.FC = () => {
  return (
    <>
    <ScrollToTop />
    
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

       {/* {ProfileRoutes.map(({ path, element, children }) => (
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
      {/* 404 Not Found */}
        {/* <Route path="/patient/chatbot" element={ <ChatbotLayout /> }/> */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </>
  );
};

export default Router;
export const ScrollToTop=()=>{
  const {pathname}=useLocation()
  useEffect(()=>{
    window.scrollTo(0,0)
  },[pathname])
}