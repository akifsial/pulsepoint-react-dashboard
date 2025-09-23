import Spinner from "@src/components/Loaders/Spinner";
import React from "react";
import ReactDOM from "react-dom";

interface SavedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  loading: boolean;
}

const SavedModal: React.FC<SavedModalProps> = ({
  isOpen,
  onClose,
  onSaved,
  loading,
}) => {
  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0000003d] bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4 text-start">
          Are you sure you want to unsaved this Care Provider?
        </h2>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 cursor-pointer bg-[#007AB2] text-white rounded hover:bg-[#007ab2da] transition"
            onClick={onSaved}
          >
            {loading ? <Spinner /> : "Yes, Unsaved"}
          </button>
          <button
            className="px-4 cursor-pointer py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const modalRoot = document.getElementById("modal-root") as HTMLElement;
  return ReactDOM.createPortal(modalContent, modalRoot);
};

export default SavedModal;
