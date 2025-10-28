import React from "react";
import ReactDOM from "react-dom";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onSignup: () => void;
}

const LoginOrSignupModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onSignup,
  setShowModal
}) => {
  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-gray-800 mb-3">
          You need first Login
        </h2>
        <p className="text-gray-600 mb-6">to view this community</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onLogin}
            className="px-5 cursor-pointer py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Login
          </button>
          <button
            onClick={onSignup}
            className="px-5 cursor-pointer py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
          >
            Signup
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 cursor-pointer text-sm text-gray-400 hover:text-gray-600 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const modalRoot = document.getElementById("modal-root") as HTMLElement;
  return ReactDOM.createPortal(modalContent, modalRoot);
};

export default LoginOrSignupModal;
