import React from "react";
import CommunityTopics from "./CommunityTopics";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";

const Community3 = ({ onBack, onClose }) => {
  return (
    <>
      <div className="text-center max-w-[496px] mx-auto mb-2.5 font-normal text-base">
        <h2 className="text-[25px] font-bold leading-8.5 font-[Space Grotesk]">
          Add topics
        </h2>
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

      <div className="flex items-center gap-2.5 pt-[25px]">
        <PrimaryButton
          btnText="Back"
          onClick={onBack}
          showImg={false}
          btnClass="flex items-center justify-center h-[46px] w-[192px] cursor-pointer w-48 bg-[#E4E4E4] border border-[#AFAFAF] text-[#252525] py-[13px] px-4 rounded-lg font-semibold text-sm transition-colors duration-300 hover:bg-[#007AB2]"
        />
        <PrimaryButton
          btnText=" Create Community"
          showImg={false}
          btnClass="flex items-center justify-center h-[46px] cursor-pointer w-[192px] bg-[#28A2FF]  text-white py-5 px-4 rounded-lg font-semibold text-sm transition-colors duration-300 hover:bg-[#007AB2]"
        />
      </div>
    </>
  );
};

export default Community3;
