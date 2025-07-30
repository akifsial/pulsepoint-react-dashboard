import React, { useState, useRef, useEffect } from "react";
import { PrimaryButton } from "./Shared-components/Buttons/Common-button/CommonButton";
import ChatbotSearchbar from "./ChatbotSearchBar";
import ReplyLoader from "./Loaders/ReplyLoader";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ApiChatPost } from "@src/api/ApiCommunityForum";
import toast from "react-hot-toast";
import { useGetConversationChatSpecific } from "@src/hooks/useCommunity";

const ChatbotAi: React.FC = ({
  selectedConversationId,
  setSelectedConversationId,
  chatBotData,
  setChatBotData
}) => {
  const [question, setQuestion] = useState("");
  const [botAnswers, setBotAnswers] = useState([]);
  const [userAnswer, setUserAnswer] = useState([]);
  // const [chatBotData, setChatBotData] = useState([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuestion(""); // Clear input when chat changes
  }, [selectedConversationId]);

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

  const { mutateAsync: ChatPostMutation, isPending: isPendingChatPost } =
    useMutation({
      mutationFn: (data) => ApiChatPost(data),

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
        toast.error("Something Went Wrong");
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
    <div className="w-full max-w-screen mx-auto bg-white rounded-lg p-8 shadow-sm">
      <div className="flex flex-col gap-8 h-screen justify-center items-center">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="font-grotesk font-bold text-[25px] leading-custom text-customGray text-center mb-2">
            Top Senior Spot - Ask a Question
          </h2>

          <h6 className="font-geist font-medium text-base leading-capHeight text-customGray text-center">
            Have a question about care providers? Get answers and advice from
            patients, caregivers, and experts.
          </h6>
        </div>

        {/* Search Input Section */}

        <div
          ref={chatContainerRef}
          className="h-[200px] text-black rounded-[18px] p-4 chat-scroll text-[16px] overflow-y-auto scroll"
        >
          {selectedConversationId
            ? conversationsData?.records?.map((conversation) => (
                <>
                  <div className="flex justify-end">
                    <p className="bg-[#E4E6E7] text-black p-2 mb-3 rounded-[10px] w-fit">
                      {conversation?.content}
                    </p>
                  </div>
                  <p>{conversation?.bot_reply?.content}</p>
                </>
              ))
            : chatBotData?.map((bot) => (
                <>
                  <div className="flex justify-end">
                    <p className="bg-[#E4E6E7] text-black p-2 mb-3 rounded-[10px] w-fit">
                      {bot.user}
                    </p>
                  </div>
                  <p>{bot.bot}</p>
                </>
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
        <div className="font-geist font-medium text-base leading-relaxed text-customGray text-center">
          It will need to know if the business is on cash vs accrual, from
          website and user provided description
        </div>

        {/* Category Buttons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <PrimaryButton
            btnText="🏥 Care Provider reviews"
            btnTextClass="text-[12px] font-semibold"
            btnClass="border border-[#252525] !px-4 py-3 w-auto w-full rounded-[10px]"
            // onClick={(e) => {
            //   setQuestion("");
            //   setQuestion(e.target.value);
            // }}
            onClick={() => handleChatPost("🏥 Care Provider reviews")}
          />
          <PrimaryButton
            btnText="📋 Medical Ratings"
            btnTextClass="text-sm font-semibold"
            btnClass="border border-[#252525] px-4 py-3 w-auto w-full rounded-[10px]"
            // onClick={(e) => {
            //   setQuestion("");
            //   setQuestion(e.target.value);
            // }}
            onClick={() => handleChatPost("📋 Medical Ratings")}
          />
          <PrimaryButton
            btnText="🧓 Patient feedback"
            btnTextClass="text-sm font-semibold"
            btnClass="border border-[#252525] px-4 py-3 w-auto w-full rounded-[10px]"
            onClick={() => handleChatPost("🧓 Patient feedback")}
          />
          <PrimaryButton
            btnText="🤖 AI Support"
            btnTextClass="text-sm font-semibold"
            btnClass="border border-[#252525] px-4 py-3 w-auto w-full rounded-[10px]"
            // onClick={(e) => setQuestion(e.target.value)}
            onClick={() => handleChatPost("🤖 AI Support")}
          />
          <PrimaryButton
            btnText="🛏️ Rehab Care"
            btnTextClass="text-sm font-semibold"
            btnClass="border border-[#252525] px-4 py-3 w-auto w-full rounded-[10px]"
            // onClick={(e) => setQuestion(e.target.value)}
            onClick={() => handleChatPost("🛏️ Rehab Care")}
          />
          <PrimaryButton
            btnText="💰 Insurance Acceptance"
            btnTextClass="text-sm font-semibold"
            btnClass="border border-[#252525] px-4 py-3 w-auto w-full rounded-[10px]"
            // onClick={(e) => setQuestion(e.target.value)}
            onClick={() => handleChatPost("💰 Insurance Acceptance")}
          />
          <PrimaryButton
            btnText="🧾 Nursing Home Advice"
            btnTextClass="text-sm font-semibold"
            btnClass="border border-[#252525] px-4 py-3 w-auto w-full rounded-[10px]"
            // onClick={(e) => setQuestion(e.target.value)}
            onClick={() => handleChatPost("🧾 Nursing Home Advice")}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatbotAi;
