import React, { useState } from "react";
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

const ChatbotAi: React.FC = ({ selectedConversationId }) => {
  const [question, setQuestion] = useState("");
  const [botAnswers, setBotAnswers] = useState([]);
  const [userAnswer, setUserAnswer] = useState([]);
  const [chatBotData, setChatBotData] = useState([]);
  const [conversationId, setConversationId] = useState();
  console.log("conco", conversationId);
  const { data: conversationsData } = useGetConversationChatSpecific(
    selectedConversationId
  );
  // }

  const queryClient = useQueryClient();

  console.log("data2222", conversationsData);

  const handleAskAI = () => {
    // Handle AI suggestion functionality
    console.log("Ask AI for suggestions");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Question submitted:", question);
  };

  const { mutateAsync: ChatPostMutation, isPending: isPendingChatPost } =
    useMutation({
      mutationFn: (data) => ApiChatPost(data),

      onSuccess: async (data) => {
        // setConversationId()
        setConversationId(data?.record?.conversation_id);
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

  const handleChatPost = async () => {
    setQuestion("");
    const data = {
      content: question,
      userIds: [],
      type: "chatbot",
      // conversationId:6
    };

    if (conversationId) {
      data.conversationId = conversationId; // or = 6 if you were testing
    }
    await ChatPostMutation(data);
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

        <div className="h-[200px] text-black rounded-[18px] p-4 text-[16px] overflow-y-auto scroll">
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
            : chatBotData.map((bot) => (
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
            btnTextClass="text-sm font-semibold"
            btnClass="border border-[#252525] !px-4 py-3 w-auto w-full rounded-[10px]"
            onClick={(e) => {
              setQuestion("");
              setQuestion(e.target.value);
            }}
          />
          <PrimaryButton
            btnText="📋 Medical Ratings"
            btnTextClass="text-sm font-semibold"
            btnClass="border border-[#252525] px-4 py-3 w-auto w-full rounded-[10px]"
            onClick={(e) => {
              setQuestion("");
              setQuestion(e.target.value);
            }}
          />
          <PrimaryButton
            btnText="🧓 Patient feedback"
            btnTextClass="text-sm font-semibold"
            btnClass="border border-[#252525] px-4 py-3 w-auto w-full rounded-[10px]"
          />
          <PrimaryButton
            btnText="🤖 AI Support"
            btnTextClass="text-sm font-semibold"
            btnClass="border border-[#252525] px-4 py-3 w-auto w-full rounded-[10px]"
            onClick={(e) => setQuestion(e.target.value)}
          />
          <PrimaryButton
            btnText="🛏️ Rehab Care"
            btnTextClass="text-sm font-semibold"
            btnClass="border border-[#252525] px-4 py-3 w-auto w-full rounded-[10px]"
            onClick={(e) => setQuestion(e.target.value)}
          />
          <PrimaryButton
            btnText="💰 Insurance Acceptance"
            btnTextClass="text-sm font-semibold"
            btnClass="border border-[#252525] px-4 py-3 w-auto w-full rounded-[10px]"
            onClick={(e) => setQuestion(e.target.value)}
          />
          <PrimaryButton
            btnText="🧾 Nursing Home Advice"
            btnTextClass="text-sm font-semibold"
            btnClass="border border-[#252525] px-4 py-3 w-auto w-full rounded-[10px]"
            onClick={(e) => setQuestion(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatbotAi;
