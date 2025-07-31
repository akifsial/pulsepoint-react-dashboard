import { useEffect, useState } from "react";
import Model from "@components/Model/Model";
import ChangePhoto from "./ChangePhoto";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import InputField from "@components/InputField";
import SelectField from "@components/SelectField";
import { ApiUpdateUser } from "@src/api/ApiUsers";
import Methew from "../../assets/media/svgs/dashboard-svgs/methew.svg";
import inputUser from "../../assets/media/svgs/dashboard-svgs/inputuser.svg";
import Call from "../../assets/media/svgs/dashboard-svgs/call.svg";
import Sms from "../../assets/media/svgs/dashboard-svgs/sms.svg";
import fallbackImg from "@assets/media/images/dashboard-images/userDummy.png";

import Global from "../../assets/media/svgs/dashboard-svgs/globalField.svg";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useMeApi } from "@src/hooks/useUsers";

const organizationOptions = [
  { value: "Hospital", label: "Hospital" },
  { value: "Private", label: "Private" },
  { value: "Government", label: "Government" },
  { value: "Other", label: "Other" },
];
const stateOptions = [
  { value: "California", label: "California" }, // USA – Tech & Hollywood hub
  { value: "New York", label: "New York" }, // USA – NYC is world-famous
  { value: "Texas", label: "Texas" }, // USA – Known for size, oil, culture
  { value: "Florida", label: "Florida" }, // USA – Famous for tourism & Miami
  { value: "Bavaria", label: "Bavaria" }, // Germany – Munich & BMW
  { value: "Île-de-France", label: "Île-de-France" }, // France – Includes Paris
  { value: "Dubai", label: "Dubai" }, // UAE – Luxury and architecture
  { value: "Tokyo Prefecture", label: "Tokyo Prefecture" }, // Japan – Tokyo is iconic
  { value: "Ontario", label: "Ontario" }, // Canada – Includes Toronto
  { value: "Maharashtra", label: "Maharashtra" }, // India – Includes Mumbai
];

const cityOptions = [
  { value: "New York", label: "New York" },
  { value: "London", label: "London" },
  { value: "Paris", label: "Paris" },
  { value: "Dubai", label: "Dubai" },
  { value: "Singapore", label: "Singapore" },
  { value: "Tokyo", label: "Tokyo" },
  { value: "Hong Kong", label: "Hong Kong" },
  { value: "Zurich", label: "Zurich" },
  { value: "Los Angeles", label: "Los Angeles" },
  { value: "Monaco", label: "Monaco" },
];

const ProfileDetail1 = ({ onChangePassword }) => {
  const [activeTab, setActiveTab] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [organization, setOrganization] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [singleUser, setSingleUser] = useState();

  const { register, handleSubmit, setValue } = useForm();

  const { data: meData } = useMeApi();

  const userId = JSON.parse(localStorage.getItem("userInfo")).id;

  // const queryClient = useQueryClient();

  const {
    mutateAsync: profileUpdateMutation,
    isPending: isPendingProfileUpdateMutation,
  } = useMutation({
    mutationFn: (formData) => ApiUpdateUser(userId, formData),

    onSuccess: async () => {
      toast.success("Profile Updated Successfully");
    },
    onError: (error) => {
      toast.error("Something Went Wrong");
    },
  });

  const handleProfileSubmit = async (data) => {
    const formData = new FormData();
    formData.append("organization_name", data.name);
    formData.append("email", data.email);
    formData.append("number", data.tel);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("postal_code", data.zip);
    // formData.append("organization", data.organization);
    formData.append("website_url", data.web);
    formData.append("additional_details", data.additional_details);

    await profileUpdateMutation(formData);
  };

  useEffect(() => {
    if (meData) {
      setSingleUser(meData);
      // setValue("name", meData.name || "");
      setValue("name", meData.organization_name || "");
      setValue("email", meData.email || "");
      setValue("web", meData.website_url || "");
      setValue("tel", meData.number || "");
      setValue("age", meData.age || "");
      setValue("zip", meData.postal_code || "");
      setValue("state", meData.state || "");
      setValue("city", meData.city || "");
      setValue("address", meData.address || "");
      setValue("additional_details", meData.additional_details || "");

      // Optional: If you're also maintaining local state for select dropdowns
      // setGender(meData.gender || "");
      // setState(meData.state || "");
      // setCity(meData.city || "");
    }
  }, [meData, setValue]);

  return (
    <>
      <div>
        <div className="overflow-y-auto rounded-[10px] bg-white p-10 h-[601px]">
          <h4 className="text-xl font-bold text-[#1A1A1A] font-[Space Grotesk] mb-3">
            Add Personal Information
          </h4>

          <form onSubmit={handleSubmit(handleProfileSubmit)}>
            <div className="flex items-center justify-between mb-9">
              <div className="flex justify-between items-center gap-8">
                <img
                  src={
                    selectedImage
                      ? URL.createObjectURL(selectedImage)
                      : singleUser?.image
                      ? `${import.meta.env.VITE_APP_API_IMG_URL}${
                          singleUser.image
                        }`
                      : fallbackImg
                  }
                  onError={(e) => {
                    e.currentTarget.onerror = null; // Prevent infinite loop
                    e.currentTarget.src = fallbackImg;
                  }}
                  alt="Profile"
                  className="w-20 h-20 rounded-[15px] object-cover"
                  style={{ border: "1px solid rgba(0,0,0,10%)" }}
                />
                <div>
                  <h4 className="font-bold mb-1 text-[#252525] text-xl leading-tight">
                    {singleUser?.organization_name}
                  </h4>
                  <span className="text-base text-[#181D27]/50 leading-tight">
                    {singleUser?.specialization}
                  </span>
                </div>
              </div>

              <div className="ml-auto md:w-fit">
                <div className="w-full flex gap-5">
                  <label
                    className="border-1 cursor-pointer border-[#25252533] w-[159px] h-[46px] bg-[#F3F3F3] !rounded-[10px] px-4 py-[10px] text-base text-[#252525] font-medium leading-[33px] gap-2 flex items-center justify-center"
                    htmlFor="upload"
                  >
                    Change Photo
                  </label>

                  <PrimaryButton
                    btnText="Save Changes"
                    showImg={false}
                    btnClass="h-[46px]  !rounded-[10px] border border-[#28A2FF] bg-[#28A2FF] text-white !px-4 py-[10px] text-sm font-semibold leading-[33px] gap-2 flex items-center justify-center"
                  />
                </div>
                <input
                  type="file"
                  id="upload"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setSelectedImage(file);
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-4">
              <InputField
                label="Name:"
                id="name"
                name="name"
                type="text"
                fieldName="w-[49%]"
                iconUrl={inputUser}
                register={register}
                registerName="name"
                placeholder="e.g., Sunrise Rehabilitation Center"
              />
              <SelectField
                label="Organization Type"
                id="organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                options={organizationOptions}
                selectName="w-[49%]"
                register={register}
                registerName="organization"
              />
              <InputField
                label="Phone:"
                id="tel"
                name="tel"
                type="tel"
                fieldName="w-[49%]"
                iconUrl={Call}
                placeholder="(123) 456-7890]"
                register={register}
                registerName="tel"
              />
              <InputField
                label="Email:"
                id="email"
                name="email"
                type="email"
                fieldName="w-[49%]"
                iconUrl={Sms}
                placeholder="contact@organization.org"
                register={register}
                registerName="email"
              />
            </div>

            <InputField
              label="Website:"
              id="website"
              name="web"
              type="text"
              iconUrl={Global}
              placeholder="https://www.topseniorspot.org"
              className="w-full h-[50px] bg-[#FBFCFD] border border-[#2525251A] rounded-[8px] px-4 font-[Geist] text-[16px] font-normal text-[#1A1A1A] placeholder:text-gray-500 focus:outline-none"
              register={register}
              registerName="web"
            />

            <div className="mb-6 text-base font-medium text-black leading-[140%] tracking-[0%] font-[Geist]">
              <p className="mb-2.5">Additional Details:</p>
              <div className="text-sm font-normal text-[#252525] py-4 px-[15px] rounded-lg bg-[#FBFCFD]">
                {/* <p>
                  Sunrise Hills Nursing Home is a full-service assisted living
                  facility specializing in post-acute rehabilitation and
                  long-term senior care. Our mission is to provide
                  compassionate, person-centered services in a comfortable,
                  home-like setting.Sunrise Hills Nursing Home is a full-service
                  assisted living facility specializing in post-acute
                  rehabilitation and long-term senior care.
                </p> */}

                <textarea
                  id="message"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                  {...register("additional_details")}
                ></textarea>
              </div>
            </div>

            <h4 className="text-xl font-bold text-[#1A1A1A] font-[Space Grotesk] mb-3">
              Location Information
            </h4>

            <div className="flex items-center gap-4">
              <SelectField
                label="State"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                options={stateOptions}
                selectName="w-[32%]"
                register={register}
                registerName="state"
              />
              <SelectField
                label="City"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                options={cityOptions}
                selectName="w-[32%]"
                register={register}
                registerName="city"
              />
              <InputField
                label="Zip Code:"
                id="zip"
                name="zip"
                type="text"
                placeholder="78701"
                fieldName="w-[32%]"
                register={register}
                registerName="zip"
              />
            </div>

            <InputField
              label="Address:"
              id="address"
              name="address"
              type="text"
              placeholder="123 main Street, Springfield, IL 62704"
              register={register}
              registerName="address"
            />
          </form>
        </div>
      </div>

      {isModalOpen && (
        <Model setIsOpen={setIsModalOpen} className="max-w-[488px]">
          <ChangePhoto />
        </Model>
      )}
    </>
  );
};

export default ProfileDetail1;
