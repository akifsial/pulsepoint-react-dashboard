import React, { useState, useRef, useEffect } from "react";
import { PrimaryButton } from "./shared-components/buttons/common-button/common-button";
import ChatbotSearchbar from "./chatbot-search-bar";
import ReplyLoader from "./loaders/reply-loader";
import ReactMarkdown from "https://esm.sh/react-markdown@7";

import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ApiChatPost } from "@src/api/api-community-forum";
import toast from "react-hot-toast";
import { useGetConversationChatSpecific } from "@src/hooks/use-community";
import { useNavigate } from "react-router-dom";
import { ApiMe } from "@src/api/api-users";
import { MdMenu } from "react-icons/md";

const ChatbotAi: React.FC = ({
  selectedConversationId,
  setSelectedConversationId,
  chatBotData,
  setChatBotData,
  setIsSidebarOpen,
  isSidebarOpen,
}) => {
  const [question, setQuestion] = useState("");
  const [botAnswers, setBotAnswers] = useState([]);
  const [userAnswer, setUserAnswer] = useState([]);
  // const [chatBotData, setChatBotData] = useState([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const {
    data: user,
    refetch,
    isLoading: isUserLoading,
  } = useQuery({
    queryKey: ["me"],
    queryFn: ApiMe,
  });

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setQuestion(""); // Clear input when chat changes
  }, [selectedConversationId]);

  // const chatId=selectedConversationId
  // const [conversationId, setConversationId] = useState();
  const { data: conversationsData } = useGetConversationChatSpecific(
    selectedConversationId
  );

  const queryClient = useQueryClient();

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatBotData, conversationsData, selectedConversationId]);

  const handleAskAI = () => {
    // Handle AI suggestion functionality
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const navigate = useNavigate();
  const { mutateAsync: ChatPostMutation, isPending: isPendingChatPost } =
    useMutation({
      mutationFn: (data) => ApiChatPost(data, navigate),

      onSuccess: async (data) => {
        // setConversationId()
        // selectedConversationId(data?.record?.conversation_id);
        setSelectedConversationId(data?.record?.conversation_id);
        setQuestion("");
        queryClient.invalidateQueries(["useCareProviderSingle"]); // refetch list

        const userMsg = data?.record?.content;
        const botMsg = data?.record?.bot_reply?.content;
        setChatBotData((prev) => [...prev, { user: userMsg, bot: botMsg }]);

        // queryClient.invalidateQueries(["useCareProviderSingle"]); // refetch list
      },
      onError: (error) => {
        // toast.error(error?.response?.data?.message);
      },
    });

  const handleChatPost = async (customText) => {
    const messageToSend = customText || question;
    setQuestion("");
    const data = {
      content: messageToSend,
      userIds: [],
      type: "chatbot",
      // conversationId: selectedConversationId,
    };

    if (selectedConversationId) {
      data.conversationId = selectedConversationId;
    }

    await ChatPostMutation(data);
    setQuestion("");
  };

  return (
    <div className="w-full max-w-screen mx-auto bg-white rounded-lg px-2 sm:p-8  shadow-sm">
      <div className="flex flex-col gap-8 h-full justify-center items-center">
        {/* Header Section */}
        <div className="w-full flex justify-end">
          <button
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
            }}
            className="cursor-pointer rounded-full sm:m-0 mt-8 me-6   hover:bg-gray-100 block lg:hidden"
          >
            <MdMenu size={30} />
          </button>
        </div>
        <div className="text-center sm:mt-0 mt-10">
          <h2 className="font-grotesk font-bold text-[25px] leading-custom text-customGray text-center mb-2">
            Top Senior Spot - Ask a Question
          </h2>

          <h6 className="font-geist sm:!text-[16px] !text-[14px] font-medium text-base leading-capHeight text-customGray text-center">
            Have a question about care providers? Get answers and advice from
            patients, caregivers, and experts.
          </h6>
        </div>


        <div
          ref={chatContainerRef}
          className="h-[200px] sm:h-[500px] text-black w-full rounded-[18px] p-4 chat-scroll text-[16px] overflow-y-auto scroll"
        >
          {selectedConversationId
            ? conversationsData?.records?.map((conversation, index) => (
              <React.Fragment key={index}>
                {/* User Message */}
                {conversation?.content && (
                  <div className="flex justify-end">
                    <p className="bg-[#E4E6E7] mt-5 text-black p-2 mb-5 rounded-[10px] w-fit">
                      {conversation.content}
                    </p>
                  </div>
                )}

                {/* Bot Reply */}
                {conversation?.bot_reply?.content && (
                  <p className="prose prose-sm prose-slate dark:prose-invert max-w-none">
                    <ReactMarkdown>
                      {conversation.bot_reply.content}
                    </ReactMarkdown>
                  </p>
                )}
              </React.Fragment>
            ))
            : chatBotData?.map((bot, index) => (
              <React.Fragment key={index}>
                {/* User Message */}
                {bot.user && (
                  <div className="flex justify-end">
                    <p className="bg-[#E4E6E7] text-black p-2 mb-3 rounded-[10px] w-fit">
                      {bot.user}
                    </p>
                  </div>
                )}

                {/* Bot Reply */}
                {bot.bot && <p>{bot.bot}</p>}
              </React.Fragment>
            ))}
        </div>

        {isPendingChatPost && <ReplyLoader />}

        <ChatbotSearchbar
          onAskAI={handleAskAI}
          question={question}
          setQuestion={setQuestion}
          setChatBotData={setChatBotData}
          handleChatPost={handleChatPost}
        />

        {/* Notice Text */}
        <div className="font-geist sm:!text-[16px] !text-[14px] font-medium text-base leading-relaxed text-customGray text-center">
          It will need to know if the business is on cash vs accrual, from
          website and user provided description
        </div>


        <div className="grid grid-cols-1 w-full sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <PrimaryButton
            btnText="🏥 Care Provider reviews"
            btnTextClass="text-sm font-semibold"
            btnClass="border border-[#252525] py-3 w-full rounded-[10px] flex items-center justify-center"
            onClick={() => handleChatPost("🏥 Care Provider reviews")}
          />
          <PrimaryButton
            btnText="📋 Medical Ratings"
            btnTextClass="text-sm font-semibold"
            btnClass="border border-[#252525] px-6 py-3 w-full rounded-[10px] flex items-center justify-center"
            onClick={() => handleChatPost("📋 Medical Ratings")}
          />
          <PrimaryButton
            btnText="🧓 Patient feedback"
            btnTextClass="text-sm font-semibold"
            btnClass="border border-[#252525] px-6 py-3 w-full rounded-[10px] flex items-center justify-center"
            onClick={() => handleChatPost("🧓 Patient feedback")}
          />
          <PrimaryButton
            btnText="🤖 AI Support"
            btnTextClass="text-sm font-semibold"
            btnClass="border border-[#252525] px-6 py-3 w-full rounded-[10px] flex items-center justify-center"
            onClick={() => handleChatPost("🤖 AI Support")}
          />
          <PrimaryButton
            btnText="🛏️ Rehab Care"
            btnTextClass="text-sm font-semibold"
            btnClass="border border-[#252525] px-6 py-3 w-full rounded-[10px] flex items-center justify-center"
            onClick={() => handleChatPost("🛏️ Rehab Care")}
          />
          <PrimaryButton
            btnText="💰 Insurance Acceptance"
            btnTextClass="text-sm font-semibold"
            btnClass="border border-[#252525] px-6 py-3 w-full rounded-[10px] flex items-center justify-center"
            onClick={() => handleChatPost("💰 Insurance Acceptance")}
          />
          <PrimaryButton
            btnText="🧾 Nursing Home Advice"
            btnTextClass="text-sm font-semibold"
            btnClass="border border-[#252525] px-6 py-3 w-full rounded-[10px] flex items-center justify-center"
            onClick={() => handleChatPost("🧾 Nursing Home Advice")}
          />
        </div>

      </div>
    </div>
  );
};

export default ChatbotAi;
