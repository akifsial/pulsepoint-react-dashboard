import { useEffect, useState } from "react";
import Model from "@components/Model/Model";
import ChangePhoto from "./ChangePhoto";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import userProfile from "../../assets/media/svgs/dashboard-svgs/profile1.svg";
import fallbackImg from "@assets/media/images/dashboard-images/userDummy.png";
import InputField from "@components/InputField";
import SelectField from "@components/SelectField";
import { useMeApi } from "@src/hooks/useUsers";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ApiUpdateUser } from "@src/api/ApiUsers";
import Spinner from "@components/Loaders/Spinner";

const organizationOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
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

const PatientProfile = ({ onChangePassword }) => {
  const [activeTab, setActiveTab] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Gender, setGender] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const { register, handleSubmit, setValue } = useForm();
  const [selectedImage, setSelectedImage] = useState("");
  const [singleUser, setSingleUser] = useState();
  console.log("(((((9", selectedImage);

  const { data: meData } = useMeApi();

  const queryClient = useQueryClient();

  const {
    mutateAsync: updatePatientProfile,
    isPending: updatePatientProfileLoader,
  } = useMutation({
    mutationFn: ({ id, data }) => ApiUpdateUser(id, data),

    onSuccess: async () => {
      toast.success("Profile Updated Successfully");
      queryClient.invalidateQueries(["useCareProviderSingle"]); // refetch list
    },
    onError: (error) => {
      toast.error("Something Went Wrong");
    },
  });

  const profileSubmit = async (data) => {
    console.log("**********************", typeof data.name);
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);

    formData.append("address", data.address);
    formData.append("age", data.age);
    formData.append("city", data.city);
    // formData.append("email", data.email);
    formData.append("gender", data.gender);
    formData.append("number", data.number);
    formData.append("postal_code", data.postal_code);
    formData.append("state", data.state);
    await updatePatientProfile({ id: meData?.id, data: formData });
  };

  useEffect(() => {
    if (meData) {
      setSingleUser(meData);
      // setValue("name", meData.name || "");
      setValue("first_name", meData.first_name || "");
      setValue("last_name", meData.last_name || "");
      setValue("email", meData.email || "");
      setValue("number", meData.number || "");
      setValue("age", meData.age || "");
      setValue("gender", meData.gender || "");
      setValue("state", meData.state || "");
      setValue("zip", meData.postal_code || "");
      setValue("city", meData.city || "");
      setValue("address", meData.address || "");

      // Optional: If you're also maintaining local state for select dropdowns
      setGender(meData.gender || "");
      setState(meData.state || "");
      setCity(meData.city || "");
    }
  }, [meData, setValue]);

  console.log("ssssss", singleUser?.image);

  return (
    <>
      <div>
        <div className="overflow-y-auto rounded-[10px] bg-white p-10 h-[601px]">
          <form onSubmit={handleSubmit(profileSubmit)}>
            <div className="flex items-center justify-between mb-9">
              <div className="flex items-center gap-3">
                {/* <img src={userProfile} alt="Methew" /> */}
                <div className="flex items-center flex-wrap gap-4 px-3 py-3 rounded-[15px]">
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

                  <div className="ml-auto md:w-fit w-full ">
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
                <div>
                  <h4 className="font-bold mb-1 text-[#252525] text-xl leading-tight">
                    {meData?.first_name} {meData?.last_name}
                  </h4>
                  {meData?.specialization && (
                    <span className="text-base font-medium text-[#181D27]/50 leading-tight">
                      ({meData.specialization})
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-5">
                <label
                  className="border-1 cursor-pointer border-[#25252533] w-[159px] h-[46px] bg-[#F3F3F3] !rounded-[10px] px-4 py-[10px] text-base text-[#252525] font-medium leading-[33px] gap-2 flex items-center justify-center"
                  htmlFor="upload"
                >
                  Change Photo
                </label>
                <PrimaryButton
                  btnText={`${
                    updatePatientProfileLoader ? "Loading..." : "Save Changes"
                  }`}
                  showImg={false}
                  btnClass=" w-[159px] h-[46px] !rounded-[10px] border border-[#28A2FF] bg-[#28A2FF] text-white px-4 py-[10px] text-sm font-semibold leading-[33px] gap-2 flex items-center justify-center"
                  type="submit"
                />
              </div>
            </div>

            <h4 className="text-xl font-bold text-[#1A1A1A] font-[Space Grotesk] mb-3">
              Add Personal Information
            </h4>
            <div className="flex flex-wrap items-center gap-x-4">
              {/* <InputField
                label="Full Name:"
                id="name"
                name="name"
                type="text"
                fieldName="w-[32%]"
                iconUrl={""}
                placeholder="Methew Thompson"
                register={register}
                registerName={"name"}
              /> */}

              <InputField
                label="First Name:"
                id="first_name"
                name="first_name"
                type="text"
                fieldName="w-[32%]"
                iconUrl={""}
                placeholder="John"
                register={register}
                registerName={"first_name"}
              />
              <InputField
                label="Last Name:"
                id="last_name"
                name="last_name"
                type="text"
                fieldName="w-[32%]"
                iconUrl={""}
                placeholder="Doe"
                register={register}
                registerName={"last_name"}
              />

              <InputField
                label="Email Address:"
                id="email"
                name="email"
                type="email"
                fieldName="w-[32%]"
                iconUrl={""}
                placeholder="methew@gmail.com"
                register={register}
                registerName={"email"}
                disabled={true}
              />
              <InputField
                label="Phone Number"
                id="number"
                name="number"
                type="tel"
                fieldName="w-[32%]"
                iconUrl={""}
                placeholder="+1***********"
                register={register}
                registerName={"number"}
              />
              <InputField
                label="Age"
                id="age"
                name="age"
                type="age"
                fieldName="w-[32%]"
                iconUrl={""}
                placeholder="89"
                register={register}
                registerName={"age"}
              />
              <SelectField
                label="Gender"
                id="Gender"
                value={Gender}
                onChange={(e) => setGender(e.target.value)}
                options={organizationOptions}
                selectName="w-[32%]"
                register={register}
                registerName={"gender"}
              />
            </div>

            <h4 className="text-xl font-bold text-[#1A1A1A] font-[Space Grotesk] mb-3 mt-1">
              Add Location
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
                registerName={"state"}
              />

              <InputField
                label="Zip Code:"
                id="postal_code"
                name="postal_code"
                type="text"
                placeholder="78701"
                fieldName="w-[32%]"
                register={register}
                registerName={"postal_code"}
              />
              <SelectField
                label="City"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                options={cityOptions}
                selectName="w-[32%]"
                register={register}
                registerName={"city"}
              />
            </div>

            <InputField
              label="Street Address:"
              id="address"
              name="address"
              type="text"
              placeholder="2301 Guadalupe Street"
              register={register}
              registerName={"address"}
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

export default PatientProfile;
