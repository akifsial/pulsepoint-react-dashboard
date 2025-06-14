import React from "react";
import CommunityTopics from "./CommunityTopics";

const CommunityStep3 = ({ onBack, onClose }) => {
  return (
    <>
      <div className="text-center max-w-[496px] mx-auto mb-2.5 font-normal text-base">
        <h3 className="text-[25px] font-bold leading-8.5 font-[Space Grotesk]">
          Add topics
        </h3>
        <p>
          Add up to 3 topics to help interested redditors find your community
        </p>
      </div>
      <div className="h-[262px] overflow-y-auto pr-2">
        <CommunityTopics
          title={"🍣Anime & Cosplay"}
          text1={"Anime & Manga"}
          text2={"Cosplay"}
          text3={"Misinformation"}
        />
        <CommunityTopics
          title={"🧑‍🎨Art"}
          text1={"Architecture"}
          text2={"Design"}
          text3={"Art"}
        />
        <CommunityTopics
          title={"💵Business & Finance"}
          text1={"Spam or advertising"}
          text2={"Harassment or bullying"}
          text3={"Misinformation"}
          text4={"Off-topic or irrelevent"}
          text5={"Hate speech or abusive content"}
        />
        <CommunityTopics
          title={"🧑‍🎨History"}
          text1={"Architecture"}
          text2={"Design"}
          text3={"Art"}
        />
      </div>

      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onBack}
          className="cursor-pointer w-48 bg-[#E4E4E4] border border-[#AFAFAF] text-[#252525] py-[13px] px-4 rounded-lg font-semibold text-sm transition-colors duration-300 hover:bg-[#007AB2]"
        >
          Back
        </button>
        <button
          type="submit"
          className="cursor-pointer w-48 bg-black text-white py-[13.5px] px-4 rounded-lg font-semibold text-sm transition-colors duration-300 hover:bg-[#007AB2]"
        >
          Create Community
        </button>
      </div>
    </>
  );
};

export default CommunityStep3;
