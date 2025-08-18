import React, { useState } from "react";
import AI from "@assets/media/svgs/patient-db-svgs/AI.png";
import ChatIcon from "@assets/media/svgs/patient-db-svgs/chatbot-msg-icon.png";
import { useMutation } from "@tanstack/react-query";
import { ApiChatPost } from "@src/api/ApiCommunityForum";
import toast from "react-hot-toast";

interface ChatbotSearchbarProps {
  onAskAI: (question: string) => void;
  iconSrc?: string;
}

const ChatbotSearchbar: React.FC<ChatbotSearchbarProps> = ({
  onAskAI,
  question,
  setQuestion,
  iconSrc,
  handleChatPost,
}) => {
  // const [question, setQuestion] = useState("");
  const userId = JSON.parse(localStorage.getItem("userInfo"))?.id;

  const handleAskAI = () => {
    if (question.trim()) {
      onAskAI(question);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="relative w-full ">
        <div className="flex items-center w-full bg-white border border-[#007AB2] rounded-full w-[831px] h-[60px] sm:px-[20px] px-[10px] py-[10px]">
          <img
            src={AI}
            alt="AI Icon"
            className="sm:w-[16px] w-[13px] h-[13px] sm:h-[19px] mr-4"
          />
          <input
            type="text"
            placeholder="Ask AI for its suggestions..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 sm:text-[16px] text-[13px] outline-none text-gray-700 placeholder-gray-400"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleChatPost();
              }
            }}
          />
          <button
            onClick={() => handleChatPost()}
            className="text-white cursor-pointer rounded-full mr-0 transition-colors"
          >
            <img
              src={iconSrc || ChatIcon}
              alt="Send"
              className="sm:w-[43px] w-[30px] h-[30px] sm:h-[43px]"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotSearchbar;
