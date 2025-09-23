import Spinner from "@src/components/Loaders/Spinner";
import React from "react";
import ReactDOM from "react-dom";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const FlagModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onDelete,loading,data }) => {
  if (!isOpen) return null;
  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0000003d] bg-opacity-50" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4 text-start">
           {data?.length ==0 ? "Do you want to report this? " : "Do you want to remove the flag?"} 
        </h2>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded hover:bg-red-700 transition"
            onClick={onDelete}
          >
            {loading ? <Spinner/> : "Yes"} 
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

export default FlagModal;
