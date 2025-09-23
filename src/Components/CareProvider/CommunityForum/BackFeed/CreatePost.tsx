import React, { useState } from "react";
import InputField from "../../../InputField";
import DragMedia from "../DragMedia";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  ApiCreateCommunity,
  ApiCreatePostCommunity,
} from "@src/api/ApiCommunityForum";
import { useForm } from "react-hook-form";
import Spinner from "@src/components/Loaders/Spinner";
// import {
//   QueryClient,
//   useMutation,
//   useQueryClient,
// } from "@tanstack/react-query";
const CreatePost = ({ setIsOpen, communityId }) => {
  const [imageFile, setImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const { mutateAsync: CreatePostMutation, isPending: creatPostIsPending } =
    useMutation({
      mutationFn: (data) => ApiCreatePostCommunity(data),
      onSuccess: async () => {
        toast.success("Post Under Review");
        queryClient.invalidateQueries(["useGetSpecificCommunity"]); // refetch list
      },
      onError: () => {
        // toast.error("Something Went Wrong");
      },
    });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.description);
    formData.append("community_id", communityId);

    if (imageFile) formData.append("image", imageFile);

    await CreatePostMutation(formData);
    setIsOpen(false);
  };

  return (
    <>
      <div className="text-center max-w-[435px] mx-auto mb-2.5 font-normal text-base">
        <h2 className="text-[25px] font-bold leading-8.5 font-[Space Grotesk]">
          Create post
        </h2>
        <p>Add details to publish post in community</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Add A Title"
          id="title"
          type="text"
          placeholder="Enter title"
          asterisk
          register={register}
          registerName="title"
          validation={{ required: "Title is required" }}
          errors={errors}
        />

        <InputField
          label="Add a description"
          id="description"
          type="text"
          placeholder="Enter description"
          asterisk
          register={register}
          registerName="description"
          validation={{ required: "Description is required" }}
          errors={errors}
        />

        <DragMedia
          label="Upload Image (optional):"
          asterisk
          imgType
          className="p-4"
          id="postImage"
          file={imageFile}
          onChange={(e) => setImageFile(e.target.files[0] || null)}
        />

        <button
          type="submit"
          disabled={creatPostIsPending}
          className={`w-full cursor-pointer flex items-center justify-center bg-[#28A2FF] text-white py-[13.3px] px-4 rounded-lg font-semibold text-sm transition-colors duration-300 ${
            creatPostIsPending
              ? "opacity-60 cursor-not-allowed"
              : "hover:bg-[#007AB2]"
          }`}
        >
          {creatPostIsPending ? (
            <span className="flex items-center gap-2">
              <Spinner />
            </span>
          ) : (
            "Add Post in Community"
          )}
        </button>
      </form>
    </>
  );
};

export default CreatePost;
