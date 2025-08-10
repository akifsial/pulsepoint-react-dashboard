import React, { useState } from "react";
import CommunityTopics from "./CommunityTopics";
import { useNavigate } from "react-router-dom";
import DragMedia from "./DragMedia";
import TextField from "./TextField";
import { ApiReportPost } from "@src/api/ApiCommunityForum";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import PrimaryInput from "@components/PrimaryInput";
import { PrimaryButton } from "@components/Buttons/PrimaryButton";
import { useGetReportsPost } from "@src/hooks/useCommunity";

const FlagPost = ({ onSubmit, post_id, community_id }) => {
  console.log("🛑 Received in FlagPost:", { post_id, community_id });
  const [reportReasonId, setReportReasonId] = useState(null);
  const [comment, setComment] = useState("");
  const { data } = useGetReportsPost();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [file, setFile] = useState();

  const {
    mutateAsync: ReportPostMutation,
    // isPending: savedCareProvidersPending,
    isPending: isReporting,
  } = useMutation({
    mutationFn: (formData: FormData) => ApiReportPost(formData),

    onSuccess: async () => {
      toast.success("Report Successfully");
      // queryClient.invalidateQueries(["useCareProviderSingle"]); // refetch list
      onSubmit();
      window.location.reload();
    },
    onError: (error) => {
      console.error("xxxxxxxxxxxxxxxxxxxxxxxxx:", error);

      // toast.error("Something Went Wrong");
    },
  });

  const handleReportSubmit = async (data) => {
    const formData = new FormData();
    formData.append("post_id", post_id);
    formData.append("community_id", community_id);
    formData.append("report_reason_id", reportReasonId);
    formData.append("comment", data.comments);

    if (file) {
      formData.append("image_url", file);
    }
    // formData.append("")

    await ReportPostMutation(formData);
      window.location.reload();

  };

  return (
    <>
      <div className="text-center mb-2.5 font-normal text-base">
        <h2 className="text-[25px] font-bold leading-8.5 font-[Space Grotesk] mb-1.5">
          Report A Post
        </h2>
        <p>
          Tell us why you're flagging this post. Our team will review it
          shortly.
        </p>
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        <form
          onSubmit={handleSubmit(handleReportSubmit)}
          className="overflow-y-auto"
        >
          <CommunityTopics
            // asterisk
            title={"Select a reason for flagging"}
            // options={[
            //   { id: 1, text: "Spam or advertising" },
            //   { id: 2, text: "Harassment or bullying" },
            //   { id: 3, text: "Misinformation" },
            //   { id: 4, text: "Off-topic or irrelevant" },
            //   { id: 5, text: "Hate speech or abusive content" },
            // ]}
            options={data?.records?.map((item, index) => ({
              id: item.id, // Fallback if item.id is missing
              text: item.name, // Adjust based on your API keys
            }))}
            onSelect={(id) => setReportReasonId(id)}
          />

          {/* <TextField
          label="Additional Comments (optional):"
          asterisk
          id="msg"
          placeholder="Enter description"
          row={2}
          className="h-[90px] mb-6"
          onChange={(e) => setComment(e.target.value)}
          
        /> */}

          <PrimaryInput
            label="Additional Comments (optional):"
            register={register}
            registerName="comments"
            placeholder="Enter description"
            type="textarea"
            inputClass="!bg-[#FBFCFD] !h-[90px] !pt-3 !pb-0 mb-3 border border-[#2525251A]"
          />

          <DragMedia
            label="Upload Image (optional):"
            required
            imgType
            className="p-4"
            file={file}
            onChange={(e) => setFile(e.target.files[0])}
          />

          <PrimaryButton
            btnText={isReporting ? "Reporting..." : "Report Post"}
            type="submit"
            showImg={false}
            disabled={isReporting}
            btnClass={`flex items-center justify-center h-[46px] cursor-pointer w-full text-white py-5 px-4 rounded-lg font-semibold text-sm transition-colors duration-300 ${
              isReporting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#28A2FF] hover:bg-[#007AB2]"
            }`}
          />
        </form>
      </div>
    </>
  );
};

export default FlagPost;
