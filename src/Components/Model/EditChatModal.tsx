import Spinner from "@components/Loaders/Spinner";
import PrimaryInput from "@components/PrimaryInput";
import CommonInput from "@components/Shared-components/Inputs/Common-Input/CommonInput";
import React from "react";
import ReactDOM from "react-dom";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const EditChatModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onEdit,
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
        {/* <h2 className="text-xl font-semibold mb-4 text-start">
          Are you sure you want to EDIT this?
        </h2> */}
        <CommonInput
          label="Enter Name"
          // register={register}
          registerName="comments"
          placeholder="Enter Title"
          type="input"
          inputClass="!bg-[#FBFCFD] !h-[90px] !pt-3 !pb-0 mb-3 border border-[#2525251A]"
        />
        <div className="flex mt-5 justify-end gap-4">
          <button
            className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded hover:bg-red-700 transition"
            onClick={onEdit}
          >
            {loading ? <Spinner /> : "Yes, Update"}
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

export default EditChatModal;
