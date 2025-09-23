import { useState, useRef, useEffect } from "react";
import ChatDeleteModal from "./ChatDeleteModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiDeleteChat, ApiEditChatName } from "@src/api/ApiCommunityForum";
import toast from "react-hot-toast";
import Spinner from "@components/Loaders/Spinner";
import EditChatModal from "./EditChatModal";

interface Props {
  conversationId: number;
}

const ChatbotSidebarOptions: React.FC<Props> = ({
  conversationId,
  onClose,
  linkId,
  // handleEditChatName,
  // handleDeleteChat,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName,setEditName]=useState("")
  const queryClient = useQueryClient();

  const { mutateAsync: DeleteChatMutation, isPending: IsPendingDeleteChat } =
    useMutation({
      mutationFn: () => ApiDeleteChat(linkId),

      onSuccess: async () => {
        toast.success("Chat Successfully Deleted");
        setIsDeleteModalOpen(false);
        // queryClient.invalidateQueries(["useGetAllConversations"]); // refetch listuseGetConversationChatSpecific
        queryClient.invalidateQueries(["useGetConversationChatSpecific"]); // refetch listuseGetConversationChatSpecific

      },
      onError: (error) => {
        toast.error("Something Went Wrong");
      },
    });

  const handleDeleteChat = async () => {
    await DeleteChatMutation();
  };

  const { mutateAsync: EditChatMutation, isPending: IsPendingEditChat } =
    useMutation({
      mutationFn: (name) => ApiEditChatName(linkId,name),

      onSuccess: async () => {
        toast.success("Chat Successfully Updated");
        setIsDeleteModalOpen(false);
        queryClient.invalidateQueries(["useGetAllConversations"]); // refetch list
      },
      onError: (error) => {
        toast.error("Something Went Wrong");
      },
    });

  const handleEditChatName = async () => {
    const name={
      name:editName
    }
    await EditChatMutation(name);
  };

  return (
    <>
      <div
        // ref={menuRef}
        className="absolute right-2 top-10 bg-white shadow-md rounded-md p-2 w-33 z-50"
      >
        <button
          className="block cursor-pointer w-full text-left px-2 py-1 hover:bg-gray-100 text-sm"
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit
        </button>
        <button
          className="block w-full cursor-pointer text-left px-2 py-1 hover:bg-gray-100 text-sm text-red-600"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Delete
        </button>
      </div>
      <ChatDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteChat}
        loading={IsPendingDeleteChat}
      />
      <EditChatModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEdit={handleEditChatName}
        setEditName={setEditName}
        loading={IsPendingEditChat}
        // onDelete={}
      />
      {/* <Chat */}
    </>
  );
};

export default ChatbotSidebarOptions;
