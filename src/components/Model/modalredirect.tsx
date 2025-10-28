import React, { useEffect } from "react";

interface ModalRedirectProps {
  show: boolean;
  onClose: () => void;
}

const ModalRedirect: React.FC<ModalRedirectProps> = ({ show, onClose }) => {
  const go = (path: string) => {
    onClose();
    window.location.href = path;
  };

  // ✅ Disable body scroll when modal is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  // ✅ Close modal on outside click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={handleOverlayClick}
    >
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-3">Choose dashboard</h2>

          <div className="mb-3 rounded-lg bg-blue-50 border border-blue-200 p-3">
            <p className="text-sm text-gray-700 text-center">
              <span className="font-semibold">This is a real-world project</span>, 
              but this version is just for <span className="italic">review</span>.  
              You can view the complete source code on{" "}
              <a
                href="https://github.com/yodo-dev/top-senior-medical-dashboards"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                GitHub
              </a>.
            </p>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Please select where you'd like to go:
          </p>

          <div className="flex flex-col gap-3 mb-4">
            <button
              onClick={() => go("/admin")}
              className="w-full py-2 rounded border cursor-pointer border-gray-200 hover:bg-[#007AB2] hover:text-white hover:shadow-md transition-all duration-300"
            >
              Admin Dashboard
            </button>

            <button
              onClick={() => go("/care-provider")}
              className="w-full py-2 rounded border cursor-pointer border-gray-200 hover:bg-[#007AB2] hover:text-white hover:shadow-md transition-all duration-300"
            >
              Care Provider Dashboard
            </button>

            <button
              onClick={() => go("/patient/dashboard")}
              className="w-full py-2 rounded border cursor-pointer border-gray-200 hover:bg-[#007AB2] hover:text-white hover:shadow-md transition-all duration-300"
            >
              Patient Dashboard
            </button>
          </div>

          <div className="text-right">
            <button
              onClick={onClose}
              className="text-sm cursor-pointer text-gray-500 hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalRedirect;
