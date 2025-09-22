import React from "react";
import TopBar from "@components/Website/Layout/TopBar";
import UtilityRow from "@components/Website/Layout/UtilityRow";
import HealthPic from "@assets/media/images/dashboard-images/health-doc-banner.jpg";
import Footer from "@components/Website/Layout/Footer";
import BannerWeb from "@pages/Web-pages/Components/BannerWeb";
import InputField from "@components/InputField";
import CategorySidebar from "@pages/Web-pages/Components/CategorySidebar";
import { PrimaryButton } from "@components/Buttons/PrimaryButton";

const HelpCenterPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Topbar + Header */}
      <TopBar />
      <UtilityRow />

      {/* Hero Section */}
      <div className="relative  bg-blue-50">
        <BannerWeb pageName={"Contact Us"} />

        <div className=" grid grid-cols-3 p-10 gap-4">
          <div className="col-span-2 ">
            <h1 className="text-[30px] font-bold mb-[30px]">Contact Us</h1>
            <div className="grid gap-[20px] grid-cols-2">
              <div className="col-span-1">
                <InputField
                  label="First Name"
                  id="title"
                  type="text"
                  placeholder="Enter First Name"
                  asterisk
                  // register={register}
                  registerName="title"
                  validation={{ required: "Title is required" }}
                  // errors={errors}
                />
              </div>

              <div className="col-span-1">
                <InputField
                  label="Last Name"
                  id="title"
                  type="text"
                  placeholder="Enter Last Name"
                  asterisk
                  // register={register}
                  registerName="title"
                  validation={{ required: "Title is required" }}
                  // errors={errors}
                />
              </div>
            </div>
            <div className="col-span-2">
              <InputField
                label="Email"
                id="title"
                type="text"
                placeholder="Enter Your Email"
                asterisk
                // register={register}
                registerName="title"
                validation={{ required: "Title is required" }}
                // errors={errors}
              />
            </div>
            <div className="col-span-2">
              <InputField
                label="Comment"
                id="title"
                type="textarea"
                asterisk
                // register={register}
                registerName="title"
                validation={{ required: "Title is required" }}
                // errors={errors}
              />
            </div>
            <PrimaryButton  btnText="Submit" />
          </div>
          {/* <div className="col-span-1">2222222222</div> */}
          <div className="col-span-1"><CategorySidebar/></div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HelpCenterPage;
