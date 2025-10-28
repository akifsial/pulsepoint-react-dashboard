import React, { useState } from "react";
import CommunityTopics from "./communitytopics";
import { useNavigate } from "react-router-dom";
import DragMedia from "./dragmedia";
import TextField from "./textfield";
import { ApiReportPost } from "@src/api/apicommunityforum";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import PrimaryInput from "@components/primaryinput";
import { PrimaryButton } from "@components/Buttons/primarybutton";
import { useGetReportsPost } from "@src/hooks/usecommunity";

const FlagPost = ({ onSubmit, post_id, community_id,setIsFlagModalOpen }) => {
  const [reportReasonId, setReportReasonId] = useState(null);
  const [comment, setComment] = useState("");
  const { data } = useGetReportsPost();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [file, setFile] = useState();

  const queryClient=useQueryClient()

  const {
    mutateAsync: ReportPostMutation,
    isPending: isReporting,
  } = useMutation({
    mutationFn: (formData: FormData) => ApiReportPost(formData),

    onSuccess: async () => {
      toast.success("Report Successfully");
      setIsFlagModalOpen(false)
      queryClient.invalidateQueries(["useGetCommunityPost"]); 
    },
    onError: (error) => {

    },
  });

  const handleReportSubmit = async (data) => {
    if (reportReasonId == null) {
      toast.error("Select atleast one reason for flagging");
      return;
    }
    const formData = new FormData();
    formData.append("post_id", post_id);
    formData.append("community_id", community_id);
    formData.append("report_reason_id", reportReasonId);
    formData.append("comment", data.comments);

    if (file) {
      formData.append("image_url", file);
    }

    await ReportPostMutation(formData);
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
            title={"Select a reason for flagging"}
            options={data?.records?.map((item, index) => ({
              id: item.id, 
              text: item.name, 
            }))}
            onSelect={(id) => setReportReasonId(id)}
          />

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
