import React, { useState } from "react";
import AI from "@assets/media/svgs/patient-db-svgs/AI.png";
import ChatIcon from "@assets/media/svgs/patient-db-svgs/chatbot-msg-icon.png";

interface ChatbotSearchbarProps {
  onAskAI: (question: string) => void;
}

const ChatbotSearchbar: React.FC<ChatbotSearchbarProps> = ({ onAskAI }) => {
  const [question, setQuestion] = useState("");

  const handleAskAI = () => {
    if (question.trim()) {
      onAskAI(question);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="flex items-center bg-white border border-[#007AB2] rounded-full w-[831px] h-[60px] px-[20px] py-[10px]">
          <img src={AI} alt="AI Icon" className="w-[16px] h-[19px] mr-4" />
          <input
            type="text"
            placeholder="Ask AI for its suggestions..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 outline-none text-gray-700 placeholder-gray-400"
          />
          <button
            onClick={handleAskAI}
            className=" text-white rounded-full mr-0 transition-colors"
          >
            <img src={ChatIcon} alt="Send" className="w-[43px] h-[43px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotSearchbar;
