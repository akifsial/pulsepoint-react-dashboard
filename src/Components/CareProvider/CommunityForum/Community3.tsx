import React from "react";
import CommunityTopics from "./community-topics";
import { PrimaryButton } from "@components/shared-components/buttons/common-button/common-button";
import { useMutation } from "@tanstack/react-query";
import { ApiCreateCommunity } from "@src/api/api-community-forum";
import toast from "react-hot-toast";
import Spinner from "@components/loaders/spinner";
import { useGetAllCommunityTopics } from "@src/hooks/use-community";

const Community3 = ({
  onBack,
  onClose,
  handleCommunityCreate,
  setSelectedTopicId1,
  setSelectedTopicId2,
  setSelectedTopicId3,
  setSelectedTopicId4,
  isPending,
}) => {
  const { data } = useGetAllCommunityTopics();


  const artRecords = data?.records?.filter((dt) => {
    const isArt = dt.category === "Art";
    return isArt;
  });


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
        {/* {
          data?.records?.filter((dt)=>(
          ))
        } */}

        {/* {
          data?.records?.filter((dt)=>(dt?.categories=="Art")).map((art)=>(
        
          ))
        } */}
        <CommunityTopics
          title={"🍣Anime & Cosplay"}
          options={data?.records
            ?.filter((dt) => dt?.category == "Anime & Cosplay")
            .map((dt) => ({ text: dt?.name, id: dt.id }))}
          setSelectedTopicId={setSelectedTopicId1}
        />

        <CommunityTopics
          title={"🧑‍🎨Art"}
          // text1={"Architecture"}
          // text2={"Design"}
          // text3={"Art"}
          // options={[
          //   { text: "Architecture", id: 4 },
          //   { text: "Design", id: 5 },
          //   { text: "Art", id: 6 },
          // ]}
          options={data?.records
            ?.filter((dt) => dt?.category == "Art")
            .map((dt) => ({ text: dt?.name, id: dt.id }))}
          setSelectedTopicId={setSelectedTopicId2}
        />
        <CommunityTopics
          title={"💵Business & Finance"}
          // text1={"Spam or advertising"}
          // text2={"Harassment or bullying"}
          // text3={"Misinformation"}
          // text4={"Off-topic or irrelevent"}
          // text5={"Hate speech or abusive content"}
          // options={[
          //   { text: "Spam or advertising", id: 7 },
          //   { text: "Harassment or bullying", id: 8 },
          //   { text: "Misinformation", id: 9 },
          // ]}
          options={data?.records
            ?.filter((dt) => dt?.category == "Business & Finance")
            .map((dt) => ({ text: dt?.name, id: dt.id }))}
          setSelectedTopicId={setSelectedTopicId3}
        />
        {/* <CommunityTopics
          title={"🧑‍🎨History"}
         
          options={data?.records
            ?.filter((dt) => dt?.category == "History")
            .map((dt) => ({ text: dt?.name, id: dt.id }))}
          setSelectedTopicId={setSelectedTopicId4}
        /> */}
      </div>

      <div className="flex items-center gap-2.5 pt-[25px]">
        <PrimaryButton
          btnText="Back"
          onClick={onBack}
          showImg={false}
          btnClass="flex items-center justify-center h-[46px] w-[192px] cursor-pointer w-48 bg-[#E4E4E4] border border-[#AFAFAF] text-[#252525] py-[13px] px-4 rounded-lg font-semibold text-sm transition-colors duration-300 hover:bg-[#007AB2]"
        />
        <PrimaryButton
          btnText={
            isPending ? (
              <span className="flex items-center gap-2">
                <Spinner />
              </span>
            ) : (
              "Create Community"
            )
          }
          showImg={false}
          btnClass="flex items-center justify-center h-[46px] cursor-pointer w-[192px] bg-[#28A2FF]  text-white py-5 px-4 rounded-lg font-semibold text-sm transition-colors duration-300 hover:bg-[#007AB2]"
          onClick={handleCommunityCreate}
          disabled={isPending}
        />
      </div>
    </>
  );
};

export default Community3;
