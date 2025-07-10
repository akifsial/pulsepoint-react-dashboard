import Spinner from "@components/Loaders/Spinner";
import React from "react";
import ReactDOM from "react-dom";
import Switch from "../CheckBoxes/Switches";
import { useCareProviderSingle } from "@src/hooks/useDashboard";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  loading: boolean;
}

const ActiveInactiveModal: React.FC<EditModalProps> = ({
  isOpen = true,
  onClose,
  onEdit,
  loading,
  selectedRowId,
  setStatus
}) => {
  if (!isOpen) return null;

{
  selectedRowId
}
  const {data}=useCareProviderSingle(selectedRowId)
  // console.log(data,"lllloooo")

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
          Are you sure you want to change status?
        </h2>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded hover:bg-red-700 transition"
            // onClick={()=>{onEdit(); setStatus(data?.status)}}
              onClick={() => onEdit(data?.status)} // send the correct current status

          >
            {loading ? <Spinner /> : data?.status=="ACTIVE" ? "InActive" : "Active" }
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

export default ActiveInactiveModal;
