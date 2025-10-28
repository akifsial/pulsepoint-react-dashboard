import React from "react";
import TopBar from "@src/Components/Website/Layout/topbar";
import UtilityRow from "@src/Components/Website/Layout/utilityrow";
import HealthPic from "@assets/media/images/dashboard-images/health-doc-banner.jpg";
import Footer from "@src/Components/Website/Layout/footer";
import BannerWeb from "@src/Pages/Web-pages/Components/bannerweb";
import InputField from "@src/Components/inputfield";
import CategorySidebar from "@src/Pages/Web-pages/Components/categorysidebar";
import { PrimaryButton } from "@src/Components/Buttons/primarybutton";
import { ApiContactUs } from "@src/api/apiwebsite";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Spinner from "@src/Components/loaders/spinner";

const HelpCenterPage = () => {
  const { register,handleSubmit,formState:{errors},setValue } = useForm();

  const { mutateAsync: ContactUsMutation, isPending: isPendingContactUs } =
    useMutation({
      mutationFn: (data) => ApiContactUs(data),

      onSuccess: async (data) => {
        toast.success("Form Submitted Successfully");
        setValue("first_name","")
        setValue("last_name","")
        setValue("email","")
        setValue("comment","")



      },
      onError: (error) => {
      },
    });

  const handleContactUs = async (customText) => {
    const data = {
      first_name: customText?.first_name,
      last_name: customText?.last_name,
      comment: customText?.comment,
      email: customText?.email,

    };

    await ContactUsMutation(data);
  };

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <UtilityRow />

      <div className="relative  bg-blue-50">
        <BannerWeb pageName={"Contact Us"} />

        <div className=" grid md:grid-cols-3 grid-cols-1 md:p-10 p-5 gap-4">
          <div className="md:col-span-2 col-span-1 ">
            <h1 className="text-[30px] font-bold mb-[30px]">Contact Us</h1>
            <form onSubmit={handleSubmit(handleContactUs)}>
              <div className="grid md:gap-[20px] md:grid-cols-2 grid-col-1">
                <div className="col-span-1">
                  <InputField
                    label="First Name"
                    id="title"
                    type="text"
                    placeholder="Enter First Name"
                    asterisk
                    register={register}
                    registerName="first_name"
                    validation={{ required: "First Name is required" }}
                    errors={errors}
                  />
                </div>

                <div className="col-span-1">
                  <InputField
                    label="Last Name"
                    id="title"
                    type="text"
                    placeholder="Enter Last Name"
                    asterisk
                    register={register}
                    registerName="last_name"
                    validation={{ required: "Last Name is required" }}
                    errors={errors}
                  />
                </div>
              </div>
              <div className="col-span-2">
                <InputField
                  label="Email"
                  id="title"
                  type="email"
                  placeholder="Enter Your Email"
                  asterisk
                  register={register}
                  registerName="email"
                  validation={{ required: "Email is required" }}
                  errors={errors}
                />
              </div>
              <div className="col-span-2">
                <InputField
                  label="Comment"
                  id="title"
                  type="textarea"
                  asterisk
                  register={register}
                  registerName="comment"
                  validation={{ required: "Comment is required" }}
                  errors={errors}
                />
              </div>
              <PrimaryButton btnClass="min-h-[55px] min-w-[130px] !w-fit ps-8 pe-8" type="submit" btnText={isPendingContactUs ? <Spinner/> : `Submit`} />
            </form>
          </div>
          <div className="col-span-1">
            <CategorySidebar />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HelpCenterPage;
