import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import successIcon from "@assets/media/images/reset-success-icon.png";

const SuccessIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <img 
    src={successIcon} 
    alt="Success" 
    className={className} 
  />
);

const CloseIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M18 6L6 18M6 6L18 18" 
      stroke="#9CA3AF" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export interface ToastProps {
  isVisible: boolean;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  showCloseButton?: boolean;
}

const Toast: React.FC<ToastProps> = ({
  isVisible,
  title,
  message,
  type = 'success',
  onClose,
  showCloseButton = true,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40  flex justify-center items-center z-50"
            onClick={onClose} 
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white p-7.5 rounded-[10px] relative w-full  mx-4 max-w-[516px]"
              onClick={(e) => e.stopPropagation()} 
            >
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close toast"
                >
                  <CloseIcon />
                </button>
              )}

              <div className="text-center">
                <div className="flex justify-center mb-4">
                <SuccessIcon className="w-12 h-12" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {message}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Toast;
