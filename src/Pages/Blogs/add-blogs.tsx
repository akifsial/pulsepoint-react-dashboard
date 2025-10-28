import Spinner from "@components/loaders/spinner";
import React from "react";
import ReactDOM from "react-dom";
import uploadImage from "@assets/media/images/dashboard-images/uploadImage.png";
import InputField from "@components/inputfield";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiAddBlog } from "@src/api/apiwebsite";
import { useForm, Controller } from "react-hook-form";
import { useBlog, useCategory } from "@src/hooks/usewebsite";
import SelectField from "@components/selectfield";
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

const AddBlogs: React.FC<AddBlogModalProps> = ({
  isOpen,
  onClose,
  loading,
  setShowAddModal
}) => {
  const queryClient = useQueryClient();

  const { data } = useCategory();

  const categoryOption = [
    { label: "Selected Category", value: "" },
    ...(data?.records?.map((category) => ({
      label: category.name,
      value: category.id,
    })) || []), 
  ];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<BlogFormInputs>({
    defaultValues: {
      image: null,
      title: "",
      description: "",
    },
  });

  const { mutateAsync: addBlogMutation, isPending: addBlogPending } =
    useMutation({
      mutationFn: (data) => ApiAddBlog(data),

      onSuccess: async () => {
        toast.success("Blog has been created");
        setShowAddModal(false)
        queryClient.invalidateQueries(["useBlog"]); 
        reset();
      },
      onError: () => {
      },
    });

  const onSubmit = async (data: BlogFormInputs) => {
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("content", data?.description);
    formData.append("image", data?.image);
    formData.append("category_id", data?.category);


    await addBlogMutation(formData);
  };


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
        <h2 className="text-xl  font-semibold mb-4 text-start">Add New Blog</h2>
        <IoClose onClick={()=>(setShowAddModal(false))} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Blog Image</label>

            <Controller
              name="image"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="relative w-full h-30 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-[#007AB2] transition">
                  {value ? (
                    <img
                      src={URL.createObjectURL(value)}
                      alt="Preview"
                      className="w-[100px] h-[100px] object-cover rounded-lg"
                    />
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
                    onChange={(e) => onChange(e.target.files?.[0] || null)}
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

          <InputField
            label="Title:"
            id="title"
            placeholder="Medical Care is..."
            register={register}
            registerName="title"
            validation={{ required: "Title is required" }}
            errors={errors}
          />

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

          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="px-4 py-2 cursor-pointer bg-[#1E7BC2] text-white rounded hover:bg-[#007ab2da] transition"
              disabled={loading || addBlogPending}
            >
              {loading || addBlogPending ? <Spinner /> : "Create Blog"}
            </button>
            <button
              type="button"
              className="px-4 py-2 cursor-pointer border border-gray-300 rounded hover:bg-gray-100 transition"
              onClick={()=>(setShowAddModal(false))}
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

export default AddBlogs;
