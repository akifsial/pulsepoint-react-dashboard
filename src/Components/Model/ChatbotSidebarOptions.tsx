import { useState, useRef, useEffect } from "react";
import ChatDeleteModal from "./ChatDeleteModal";

interface Props {
  conversationId: number;
}

const ChatbotSidebarOptions: React.FC<Props> = ({
  conversationId,
  onClose,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <>
      <div
        ref={menuRef}
        className="absolute right-2 top-10 bg-white shadow-md rounded-md p-2 w-33 z-50"
      >
        <button className="block cursor-pointer w-full text-left px-2 py-1 hover:bg-gray-100 text-sm">
          Edit
        </button>
        <button
          className="block w-full cursor-pointer text-left px-2 py-1 hover:bg-gray-100 text-sm text-red-600"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </div>
      <ChatDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
};

export default ChatbotSidebarOptions;
