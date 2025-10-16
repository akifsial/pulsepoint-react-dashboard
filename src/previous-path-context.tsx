import React, { createContext, useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const PreviousPathContext = createContext<string | null>(null);

export const PreviousPathProvider = ({ children }) => {
  const location = useLocation();
  const prevPathRef = useRef<string | null>(null);

  useEffect(() => {
    prevPathRef.current = location.pathname;
  }, [location.pathname]);

  return (
    <PreviousPathContext.Provider value={prevPathRef.current}>
      {children}
    </PreviousPathContext.Provider>
  );
};

export const usePreviousPath = () => useContext(PreviousPathContext);
