import React, { useState } from "react";
import AI from "@assets/media/svgs/patient-db-svgs/AI.png";

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
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatbotSearchbar;
