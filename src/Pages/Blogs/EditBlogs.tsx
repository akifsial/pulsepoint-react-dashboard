import Spinner from "@src/components/Loaders/Spinner";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import uploadImage from "@assets/media/images/dashboard-images/uploadImage.png";
import InputField from "@src/components/InputField";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiAddBlog, ApiEditBlog } from "@src/api/ApiWebsite";
import { useForm, Controller } from "react-hook-form";
import { useBlog, useCategory, useSingleBlog } from "@src/hooks/useWebsite";
import SelectField from "@src/components/SelectField";
import { IoClose } from "react-icons/io5";

interface AddBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
}

interface BlogFormInputs {
  image: File | null;
  title: string;
  description: string;
}

const EditBlogs: React.FC<AddBlogModalProps> = ({
  isOpen,
  onClose,
  loading,
  setShowEditModal,
  blogId,
}) => {
  const queryClient = useQueryClient();

  const { data } = useCategory();
  const { data: blogData } = useSingleBlog(blogId);
  const [selectedImage,setSelectedImage]=useState("")

  const categoryOption = [
    { label: "Selected Category", value: "" },
    ...(data?.records?.map((category) => ({
      label: category.name,
      value: category.id,
    })) || []), // <-- default to empty array
  ];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<BlogFormInputs>({
    defaultValues: {
      image: null,
      title: "",
      description: "",
    },
  });



  const { mutateAsync: editBlogMutation, isPending: editBlogPending } =
    useMutation({
      mutationFn: (data) => ApiEditBlog(blogId, data),

      onSuccess: async () => {
        toast.success("Blog updated!");
        setShowEditModal(false)

        queryClient.invalidateQueries(["useBlog"]); // refetch list
        // reset();
      },
      onError: () => {},
    });

  const onSubmit = async (data: BlogFormInputs) => {
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("content", data?.description);
    if(selectedImage){

      formData.append("image", selectedImage);
    }
    formData.append("category_id", data?.category);


    await editBlogMutation(formData);
  };

  useEffect(() => {
    setValue("title", blogData?.title);
    setValue("description", blogData?.content);
    setValue("category", blogData?.category_id);
  });


  // if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0000003d] bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <h2 className="text-xl  font-semibold mb-4 text-start">
            Edit New Blog
          </h2>
          <IoClose onClick={() => setShowEditModal(false)} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ✅ Image Upload using Controller */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Blog Image</label>

            <Controller
              name="image"
              control={control}
              // rules={{ required: "Blog image is required" }}
              render={({ field: { onChange, value } }) => (
                <div className="relative w-full h-30 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-[#007AB2] transition">
                  {value ? (
                    <img
                      src={URL.createObjectURL(value)}
                      alt="Preview"
                      className="w-[100px] h-[100px] object-cover rounded-lg"
                    />
                  ) : blogData?.image ? (
                    <span className="text-gray-500 flex flex-col items-center gap-2 justify-center text-sm">
                      <img
                        src={`${import.meta.env.VITE_APP_API_IMG_URL}${blogData?.image}`}
                        alt="Preview"
                        className="w-[100px] h-[100px] object-cover rounded-lg"
                      />
                    </span>
                  ) : (
                    <span className="text-gray-500 flex flex-col items-center gap-2 justify-center text-sm">
                      <img
                        src={uploadImage}
                        alt="Preview"
                        className="w-[40px] h-[40px] object-cover rounded-lg"
                      />
                      Click to upload image
                    </span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {onChange(e.target.files?.[0] || ""); setSelectedImage(e.target.files?.[0])}}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              )}
            />
            {errors.image && (
              <p className="text-sm text-red-500">{errors.image.message}</p>
            )}
          </div>

          <div>
            <SelectField
              label="Category"
              id="category"
              // value={city}
              // onChange={(e) => setCity(e.target.value)}
              options={categoryOption}
              selectName="sm:sm:w-[100%] !mb-8.5 w-full"
              register={register}
              registerName={"category"}
              validation={{
                required: "Select a category",
              }}
              errors={errors}
            />
          </div>

          {/* ✅ Title field */}
          <InputField
            label="Title:"
            id="title"
            placeholder="Medical Care is..."
            register={register}
            registerName="title"
            validation={{ required: "Title is required" }}
            errors={errors}
          />

          {/* ✅ Description field */}
          <InputField
            label="Description:"
            id="description"
            type="textarea"
            placeholder="Enter blog description"
            register={register}
            registerName="description"
            validation={{ required: "Description is required" }}
            errors={errors}
          />

          {/* ✅ Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="px-4 py-2 cursor-pointer bg-[#1E7BC2] text-white rounded hover:bg-[#007ab2da] transition"
              disabled={loading || editBlogPending}
            >
              {loading || editBlogPending ? <Spinner /> : "Update Blog"}
            </button>
            <button
              type="button"
              className="px-4 py-2 cursor-pointer border border-gray-300 rounded hover:bg-gray-100 transition"
              onClick={()=>(setShowEditModal(false))}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const modalRoot = document.getElementById("modal-root") as HTMLElement;
  return ReactDOM.createPortal(modalContent, modalRoot);
};

export default EditBlogs;
