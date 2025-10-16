import { PrimaryButton } from "@components/shared-components/buttons/common-button/common-button";

interface DeleteConfirmationModalProps {
  userId: string | number;
  type: string; // Type (post or comment)
  onClose: () => void;
  onDelete: (userId: string | number, type: string) => void; // Pass the type here as well
}

const DeleteConfirmationModal = ({
  userId,
  type,
  onClose,
  onDelete,
  loading
}: DeleteConfirmationModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full text-center">
        <h3 className="text-xl font-semibold mb-4 text-[#2F3542]">
          Are you sure you want to delete this {type === "POST" ? "post" : "comment"}?
        </h3>
        <div className="flex gap-4 mt-4">
          <PrimaryButton
            btnText="Cancel"
            onClick={onClose}
            btnClass="w-full h-[46px] bg-[#f5f5f5] text-[#252525] px-4 py-2 text-sm font-semibold"
          />
          <PrimaryButton
            btnText={loading ? "Loading..." : "Delete"}
            onClick={() => onDelete(userId, type)} // Pass both id and type
            btnClass="w-full h-[46px] bg-[#FF4D4D] text-white px-4 py-2 text-sm font-semibold"
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
