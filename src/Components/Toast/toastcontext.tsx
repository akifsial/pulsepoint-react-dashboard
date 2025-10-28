import React, { createContext, useContext, useState, ReactNode } from 'react';
import Toast, { ToastProps } from './toast';

interface ToastContextType {
  showToast: (toast: Omit<ToastProps, 'isVisible' | 'onClose'>) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<(Omit<ToastProps, 'isVisible' | 'onClose'>) | null>(null);

  const showToast = (toastProps: Omit<ToastProps, 'isVisible' | 'onClose'>) => {
    setToast(toastProps);
  };

  const hideToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast && (
        <Toast
          {...toast}
          isVisible={!!toast}
          onClose={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
};