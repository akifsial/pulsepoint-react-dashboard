import { useEffect, useState } from "react";
import Model from "@components/Model/Model";
import ChangePhoto from "./ChangePhoto";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import userProfile from "../../assets/media/svgs/dashboard-svgs/profile1.svg";
// import fallbackImg from "@assets/media/images/dashboard-images/userDummy.png";
import userFallbackImg from "@assets/media/images/dashboard-images/userDummy.png";
import InputField from "@components/InputField";
import SelectField from "@components/SelectField";
import { IoLocationSharp } from "react-icons/io5";
import {
  useAllApiInsuranceTypes,
  useAllApiProviderTypes,
  useMeApi,
} from "@src/hooks/useUsers";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ApiMe, ApiUpdateUser } from "@src/api/ApiUsers";
import Spinner from "@components/Loaders/Spinner";
import { useNavigate } from "react-router-dom";

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
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      communication_method_id: "",
    },
  });
  const {
    data: user,
    refetch,
    isLoading: isUserLoading,
  } = useQuery({
    queryKey: ["me"],
    queryFn: ApiMe,
  });

  useEffect(() => {
    refetch();
  }, []);

  const [selectedImage, setSelectedImage] = useState("");
  const [singleUser, setSingleUser] = useState();
const navigate=useNavigate()
  const { data: meData } = useMeApi(navigate);
  const { data: ProviderData } = useAllApiProviderTypes();

  const providersOptions =
    ProviderData?.records?.map((insurance) => ({
      label: insurance.name,
      value: insurance.id,
    })) || [];
  const queryClient = useQueryClient();

  const [preferredMethod, setPreferredMethod] = useState("");
  // Handler to update state on radio change
  const handleMethodChange = (e) => {
    setPreferredMethod(e.target.value);
  };

  const {
    mutateAsync: updatePatientProfile,
    isPending: updatePatientProfileLoader,
  } = useMutation({
    mutationFn: ({ id, data }) => ApiUpdateUser(id, data),

    onSuccess: async () => {
      toast.success("Profile Updated Successfully");
      queryClient.invalidateQueries(["useCareProviderSingle"]); // refetch list
    },
    onError: (error) => {},
  });

  const profileSubmit = async (data) => {
    if (updatePatientProfileLoader) return;

    const formData = new FormData();
    // formData.append("image", selectedImage);
    // formData.append("user_name", data.user_name);
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
    formData.append("website_url", data.website);
    formData.append("communication_method_id", data?.communication_method_id);
    formData.append("insurance_type_id", data?.insurance_type_id);
    formData.append("marital_status", data?.maritalStatus);

    // formData.append("marital_status", data?.maritalStatus);

    // insurance_type_id: data.insurance_type_id,
    // marital_status: data.maritalStatus,

    if (selectedImage) {
      formData.append("image", selectedImage);
    }
    await updatePatientProfile({ id: meData?.id, data: formData });
  };

  useEffect(() => {
    if (meData) {
      setSingleUser(meData);
      // setValue("name", meData.name || "");
      setValue("user_name", meData.user_name || "");
      setValue("first_name", meData.first_name || "");
      setValue("last_name", meData.last_name || "");
      setValue("email", meData.email || "");
      setValue("number", meData.number || "");
      setValue("age", meData.age || "");
      setValue("gender", meData.gender || "");
      setValue("state", meData.state || "");
      setValue("postal_code", meData.postal_code || "");
      setValue("city", meData.city || "");
      setValue("communication_method_id", meData.communication_method_id || "");

      setValue("address", meData.address || "");
      setValue("website", meData.website_url || "");
      setValue("communication_method_id", meData.communication_method_id || "");
      setValue("insurance_type_id", meData.insurance_type_id || "");
      setValue("maritalStatus", meData.marital_status || "");

      // formData.append("website_url", data.website);
      // formData.append("communication_method_id", preferredMethod);
      // formData.append("insurance_type_id", data?.insurance_type_id);
      // Optional: If you're also maintaining local state for select dropdowns
      setGender(meData.gender || "");
      setState(meData.state || "");
      setCity(meData.city || "");
    }
  }, [meData, setValue]);

  const { data: InsuranceData } = useAllApiInsuranceTypes();

  const insuranceOptions =
    InsuranceData?.records?.map((insurance) => ({
      label: insurance.name,
      value: insurance.id,
    })) || [];

  const maritalStatusOptions = [
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
    { value: "divorced", label: "Divorced" },
    { value: "widowed", label: "Widowed" },
    { value: "separated", label: "Separated" },
  ];

  return (
    <>
      <div>
        <div className="overflow-y-auto rounded-[10px] bg-white p-2 sm:p-10 h-[601px]">
          <form onSubmit={handleSubmit(profileSubmit)}>
            <div className="lg:flex lg:items-center lg:justify-between mb-9">
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
                        : userFallbackImg
                    }
                    onError={(e) => {
                      e.currentTarget.onerror = null; // Prevent infinite loop
                      e.currentTarget.src = userFallbackImg;
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
                    {meData?.first_name
                      ? meData?.first_name
                      : meData?.user_name}
                    {/* {meData?.user_name} */}
                  </h4>
                  {/* {meData?.specialization && (
                    <span className="text-base font-medium text-[#181D27]/50 leading-tight">
                      ({meData.specialization})
                    </span>
                  )} */}
                </div>
              </div>
              <div className="flex flex-wrap gap-5">
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
                  disabled={updatePatientProfileLoader}
                />
              </div>
            </div>

            <h4 className="text-xl font-bold text-[#1A1A1A] font-[Space Grotesk] mb-3">
              Add Personal Information
            </h4>
            <div className="sm:flex sm:flex-wrap items-center gap-x-4">
              {/* <InputField
                label="Full Name:"
                id="name"
                name="name"
                type="text"
                fieldName="sm:w-[32%]"
                iconUrl={""}
                placeholder="Methew Thompson"
                register={register}
                registerName={"name"}
              /> */}

              <InputField
                disabled
                label="User Name:"
                id="user_name"
                name="user_name"
                type="text"
                fieldName="sm:w-[32%] w-full"
                iconUrl={""}
                placeholder="@johndoe"
                register={register}
                registerName={"user_name"}
                errors={errors}
              />

              <InputField
                label="First Name:"
                id="first_name"
                placeholder="John"
                register={register}
                registerName="first_name"
                validation={{
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "Must be at least 2 characters",
                  },
                }}
                errors={errors}
              />

              <InputField
                label="Last Name:"
                id="last_name"
                name="last_name"
                type="text"
                fieldName="sm:w-[32%] w-full"
                iconUrl={""}
                placeholder="Doe"
                register={register}
                registerName={"last_name"}
                validation={{
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Must be at least 2 characters",
                  },
                }}
                errors={errors}
              />

              <InputField
                label="Email Address:"
                id="email"
                name="email"
                type="email"
                fieldName="sm:w-[32%] w-full"
                iconUrl={""}
                placeholder="methew@gmail.com"
                register={register}
                registerName={"email"}
                disabled={true}
                validation={{
                  required: "Email is required",
                }}
                errors={errors}
              />
              <InputField
                label="Phone Number"
                id="number"
                name="number"
                type="tel"
                fieldName="sm:w-[32%] w-full"
                iconUrl={""}
                placeholder="+1***********"
                register={register}
                registerName={"number"}
                validation={{
                  required: "Number is required",
                }}
                errors={errors}
              />
              <InputField
                label="Age"
                id="age"
                name="age"
                type="number"
                fieldName="sm:w-[32%] w-full"
                iconUrl={""}
                placeholder="89"
                register={register}
                registerName={"age"}
                validation={{
                  required: "Age is required",
                }}
                errors={errors}
              />
              <SelectField
                label="Gender"
                id="Gender"
                value={Gender}
                onChange={(e) => setGender(e.target.value)}
                options={organizationOptions}
                selectName="sm:sm:w-[32%] w-full"
                register={register}
                registerName={"gender"}
                validation={{
                  required: "Gender is required",
                }}
                errors={errors}
              />
            </div>

            <h4 className="text-xl font-bold text-[#1A1A1A] font-[Space Grotesk] mb-3 mt-1">
              Add Location
            </h4>

            <div className="sm:flex  items-center gap-4">
              {/* <SelectField
                label="State"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                options={stateOptions}
                selectName="sm:w-[32%] !mb-8.5 w-full"
                register={register}
                registerName={"state"}
                validation={{
                  required: "Select a state",
                }}
                errors={errors}
              /> */}

              <div>
                <InputField
                  label="State"
                  asterisk={true}
                  id="state"
                  name="state"
                  type="text"
                  className="pr-10"
                  placeholder="e.g., California"
                  icon={IoLocationSharp}
                  register={register}
                  registerName="state"
                  errors={errors}
                  validation={{
                    required: "State is required",
                  }}
                />
              </div>

              <InputField
                label="Zip Code:"
                id="postal_code"
                name="postal_code"
                type="number"
                placeholder="78701"
                fieldName="sm:w-[32%]"
                register={register}
                registerName={"postal_code"}
                validation={{
                  required: "Zip code is required",
                }}
                errors={errors}
              />
              <SelectField
                label="City"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                options={cityOptions}
                selectName="sm:sm:w-[32%] !mb-8.5 w-full"
                register={register}
                registerName={"city"}
                validation={{
                  required: "Select a city",
                }}
                errors={errors}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <SelectField
                  label="Marital Status"
                  id="maritalStatus"
                  name="maritalStatus"
                  asterisk={true}
                  options={maritalStatusOptions}
                  register={register}
                  registerName="maritalStatus"
                  // errors={errors}
                  validation={{
                    required: "Marital status is required",
                  }}
                  errors={errors}
                />
              </div>

              <div>
                <SelectField
                  label="Insurance Type"
                  id="insurance_type_id"
                  name="insurance_type_id"
                  asterisk={true}
                  options={insuranceOptions}
                  register={register}
                  registerName="insurance_type_id"
                  // errors={errors}
                  validation={{
                    required: "Insurance type is required",
                  }}
                  errors={errors}
                />
              </div>
            </div>

            <InputField
              label="Street Address:"
              id="address"
              name="address"
              type="text"
              placeholder="2301 Guadalupe Street"
              register={register}
              registerName={"address"}
              validation={{
                required: "Address is required",
              }}
              errors={errors}
            />

            {/* <div className="space-y-4">
              <p className="text-md font-semibold">
                Preferred Communication Method
              </p>
              <div className="flex flex-wrap gap-3 text-[16px] font-[500] text-[#333333] leading-[140%] tracking-[0%] font-[Geist] space-x-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="1"
                    name="preferredCommunication"
                    value="1"
                    checked={preferredMethod === "1"}
                    onChange={handleMethodChange}
                    className="mr-2 text-[14px] scale-150 border-[#FFFFFF] align-middle"
                  />
                  <label htmlFor="1" className="ml-1">
                    Via Email Address
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="2"
                    name="preferredCommunication"
                    value="2"
                    checked={preferredMethod === "2"}
                    onChange={handleMethodChange}
                    className="mr-2 scale-150 border-[#FFFFFF] align-middle"
                  />
                  <label htmlFor="2" className="ml-1">
                    Via Phone Number
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="3"
                    name="preferredCommunication"
                    value="3"
                    checked={preferredMethod === "3"}
                    onChange={handleMethodChange}
                    className="mr-2 scale-150 border-[#FFFFFF] align-middle"
                  />
                  <label htmlFor="3" className="ml-1">
                    Via SMS Text
                  </label>
                </div>
              </div>
            </div> */}

            <div className="space-y-4">
              <p className="text-md font-semibold">
                Preferred Communication Method
              </p>
              <Controller
                control={control}
                name="communication_method_id"
                rules={{ required: "Please select a contact method" }}
                render={({ field, fieldState }) => {
                  return (
                    <div className="flex flex-wrap gap-3 text-[16px] font-[500] text-[#333333] leading-[140%] tracking-[0%] font-[Geist] space-x-6">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="1"
                          value="1"
                          checked={field.value === 1}
                          // onChange={(e) => field.onChange(e.target.value)}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className="mr-2 text-[14px] scale-150 border-[#FFFFFF] align-middle"
                        />
                        <label htmlFor="1" className="ml-1">
                          Via Email Address
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="2"
                          value="2"
                          checked={field.value === 2}
                          // onChange={(e) => field.onChange(e.target.value)}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className="mr-2 scale-150 border-[#FFFFFF] align-middle"
                        />
                        <label htmlFor="2" className="ml-1">
                          Via Phone Number
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="3"
                          value="3"
                          checked={field.value === 3}
                          // onChange={(e) => field.onChange(e.target.value)}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className="mr-2 scale-150 border-[#FFFFFF] align-middle"
                        />
                        <label htmlFor="3" className="ml-1">
                          Via SMS Text
                        </label>
                      </div>
                      {fieldState.error && (
                        <p className="text-sm text-red-500 mt-1">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  );
                }}
              />
            </div>
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
