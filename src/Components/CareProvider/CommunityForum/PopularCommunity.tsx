import { useEffect, useState } from "react";
import CommonInput from "@components/Shared-components/Inputs/Common-Input/CommonInput";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";

import searchCommunity from "@assets/media/svgs/dashboard-svgs/searchCommunity.svg";
import community1 from "@assets/media/svgs/dashboard-svgs/community1.svg";
import community2 from "@assets/media/svgs/dashboard-svgs/community2.svg";
import community3 from "@assets/media/svgs/dashboard-svgs/community3.svg";
import community4 from "@assets/media/svgs/dashboard-svgs/community4.svg";
import community5 from "@assets/media/svgs/dashboard-svgs/community5.svg";
import addCommunity from "@assets/media/svgs/dashboard-svgs/addCommunity.svg";

import Model from "@components/Model/Model";
import Community1 from "./Community1";
import Community2 from "./Community2";
import Community3 from "./Community3";
import { usePopularCommunities } from "@src/hooks/useCommunity";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiCreateCommunity } from "@src/api/ApiCommunityForum";
import toast from "react-hot-toast";
import PopularCommunitySkeleton from "@components/Loaders/PopularCommunityLoader";

const PopularCommunity = () => {
  const [step, setStep] = useState<number | "">("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [selectedTopicId1, setSelectedTopicId1] = useState();
  const [selectedTopicId2, setSelectedTopicId2] = useState();
  const [selectedTopicId3, setSelectedTopicId3] = useState();
  const [selectedTopicId4, setSelectedTopicId4] = useState();
  const [searchCommunity, setSearchCommunity] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchCommunity);

  const { data, isPending } = usePopularCommunities(debouncedSearchText);

  console.log("$$$$$$$$$", data);

  const popularCommunity = [
    { icon: community1, title: "Hospital Stay Reviews" },
    { icon: community2, title: "Facility Finder Help" },
    { icon: community3, title: "Assisted Living Insights" },
    { icon: community4, title: "End-of-Life Planning" },
    { icon: community5, title: "Patient Rights & Safety" },
  ];

  const closeModal = () => setStep("");

  const queryClient = useQueryClient();

  const {
    mutateAsync: CommunityCreateMutation,
    isPending: savedCareProvidersPending,
  } = useMutation({
    mutationFn: (data) => ApiCreateCommunity(data),

    onSuccess: async () => {
      toast.success("Community Create Successfully");
      closeModal();
      queryClient.invalidateQueries(["useGetCommunityPost"]); // refetch list
    },
    onError: (error) => {
      toast.error("Something Went Wrong");
    },
  });

  const handleCommunityCreate = async (data) => {
    const formData = new FormData();
    formData.append("title", name);
    formData.append("description", description);
    formData.append("banner_image", img1);
    formData.append("profile_icon_image", img2);
    if (selectedTopicId1) {
      formData.append("topic_ids[]", selectedTopicId1);
    }
    if (selectedTopicId2) {
      formData.append("topic_ids[]", selectedTopicId2);
    }
    if (selectedTopicId3) {
      formData.append("topic_ids[]", selectedTopicId3);
    }

    if (selectedTopicId4) {
      formData.append("topic_ids[]", selectedTopicId4);
    }

    await CommunityCreateMutation(formData);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchCommunity);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchCommunity]);

  return (
    <>
      {/* Sidebar */}
      <div>
        <CommonInput
          placeholder="Search Communities "
          showImg={true}
          // imgSrc={searchCommunity}
          // imgLeft={true}
          inputClassName="text-base"
          containerClassName="w-full max-w-md border-0 px-5 py-3.5 rounded-[10px] mb-4"
          imgClassName="w-5 h-5"
          onChange={(e) => setSearchCommunity(e.target.value)}
        />

        <div className="bg-white rounded-[10px] px-5 pt-4.5 pb-[4px] mb-4">
          <h4 className="mb-1.5">Popular Communities</h4>

          {isPending ? <PopularCommunitySkeleton /> : ""}
          {data?.records?.map((community, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3.5 py-[13px] border-b border-b-[#E6E6E6] last:border-b-0"
            >
              <img
                src={`${import.meta.env.VITE_APP_API_IMG_URL}${
                  community?.profile_icon_image
                }`}
                alt={community.title}
                className="rounded-full object-cover h-[37px] w-[37px]"
              />
              <p className="font-semibold">{community?.title}</p>
            </div>
          ))}
        </div>

        <PrimaryButton
          btnText="Create Community"
          showImg={true}
          img={addCommunity}
          imgClass="w-[19px] h-[19px] object-cover"
          imgPosition="left"
          btnClass="border-1 mb-5 border-[#000] w-[292px] h-[46px] !rounded-[10px] px-4 py-[10px] text-[#252525] font-semibold leading-[33px] gap-[10px] flex items-center justify-center"
          onClick={() => setStep(1)}
        />
      </div>

      {/* Step-based Modal Views */}
      {step === 1 && (
        <Model className="max-w-[596px]" setIsOpen={closeModal}>
          <Community1
            onNext={() => {
              if (!name) return toast.error("Name is Required");
              if (!description) return toast.error("Description is Required");
              setStep(2);
            }}
            onClose={closeModal}
            setName={setName}
            setDescription={setDescription}
          />
        </Model>
      )}

      {step === 2 && (
        <Model className="max-w-[596px]" setIsOpen={closeModal}>
          <Community2
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
            img1={img1}
            setImg1={setImg1}
            img2={img2}
            setImg2={setImg2}
          />
        </Model>
      )}

      {step === 3 && (
        <Model className="max-w-[596px]" setIsOpen={closeModal}>
          <Community3
            handleCommunityCreate={handleCommunityCreate}
            onBack={() => {
              setStep(2);
              setSelectedTopicId1(null);
              setSelectedTopicId2(null);
              setSelectedTopicId3(null);
              setSelectedTopicId4(null);
            }}
            onClose={closeModal}
            name={name}
            description={description}
            img1={img1}
            img2={img2}
            setSelectedTopicId1={setSelectedTopicId1}
            setSelectedTopicId2={setSelectedTopicId2}
            setSelectedTopicId3={setSelectedTopicId3}
            setSelectedTopicId4={setSelectedTopicId4}
          />
        </Model>
      )}
    </>
  );
};

export default PopularCommunity;
