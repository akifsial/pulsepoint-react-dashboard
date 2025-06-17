import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import successIcon from "@assets/media/images/reset-success-icon.png";

// Success check mark SVG component (using imported image)
const SuccessIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <img 
    src={successIcon} 
    alt="Success" 
    className={className} 
  />
);

// Close button SVG component
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-opacity-10 z-50 flex items-center justify-center p-4"
            onClick={onClose} // Close when clicking outside of the toast
          >
            {/* Toast Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-[10px] p-6 max-w-sm w-full mx-4 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()} // Prevent the toast container from closing when clicked
            >
              {/* Close Button */}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  aria-label="Close toast"
                >
                  <CloseIcon />
                </button>
              )}

              {/* Content */}
              <div className="text-center">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  {type === 'success' && <SuccessIcon className="w-12 h-12" />}
                  {type === 'error' && (
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-xl">!</div>
                  )}
                  {type === 'warning' && (
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xl">⚠</div>
                  )}
                  {type === 'info' && (
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">i</div>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {title}
                </h3>

                {/* Message */}
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
