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
import { IoLocationSharp } from "react-icons/io5";
import Global from "../../assets/media/svgs/dashboard-svgs/globalField.svg";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useMeApi } from "@src/hooks/useUsers";

import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import StartEndDate from "@components/Dates/StartEndTime";
import StartEndTime from "@components/Dates/StartEndTime";
import StartEndDay from "@components/Dates/StartEndDay";
import { useNavigate } from "react-router-dom";
import Map from "@components/Map/Map";

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

const apiData = {
  status: "success",
  message: "Data fetched successfully",
  data: {
    id: 101,
    title: "Travel Destination",
    description: "Beautiful spots to visit this summer",
    images: [
      {
        id: 1,
        url: "https://example.com/images/lahore.jpg",
        alt: "Badshahi Mosque, Lahore",
      },
      {
        id: 2,
        url: "https://example.com/images/karachi.jpg",
        alt: "Clifton Beach, Karachi",
      },
      {
        id: 3,
        url: "https://example.com/images/naran.jpg",
        alt: "Naran Valley",
      },
    ],
  },
};

const ProfileDetail1 = ({ onChangePassword }) => {
  const [activeTab, setActiveTab] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [organization, setOrganization] = useState("");
  const [state, setState] = useState("");
  // const [userName, setUserName] = useState()
  const [city, setCity] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [singleUser, setSingleUser] = useState();
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [removeImagesIds, setRemoveImagesIds] = useState([]);

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (range) => {
    setRange([range.selection]);
  };

  // -------------------------------------------
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const navigate = useNavigate();
  const { data: MeData, refetch: MeDataFetch } = useMeApi(navigate);

  useEffect(() => {
    MeDataFetch();
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDay: "",
      endDay: "",
      name: "",
      email: "",
      startTime: "",
      endTime: "",
      // other fields
    },
  });

  const { data: meData } = useMeApi(navigate);

  const userId = JSON.parse(localStorage.getItem("userInfo")).id;
  const userRole = JSON.parse(localStorage.getItem("userInfo"))?.role_type;
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();

  const queryClient = useQueryClient();

  const {
    mutateAsync: profileUpdateMutation,
    isPending: isPendingProfileUpdateMutation,
  } = useMutation({
    mutationFn: (formData) => ApiUpdateUser(userId, formData),

    onSuccess: async () => {
      toast.success("Profile Updated Successfully");
      // setSelectedImage(null)
      // setExistingImages(null)
      queryClient.invalidateQueries(["useCareProviderSingle"]); // refetch list
    },
    onError: (error) => {
      // toast.error("Something Went Wrong");
    },
  });

  const handleProfileSubmit = async (data) => {
    if (startDay == "") {
      toast.error("Start Day Must Required");
      return;
    }
    if (endDay == "") {
      toast.error("End Day Must Required");
      return;
    }
    if (startTime == "") {
      toast.error("Start Time Must Required");
      return;
    }
    if (endTime == "") {
      toast.error("End Time Must Required");
      return;
    }

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
    formData.append("image", selectedImage);
    formData.append("start_day", startDay);
    formData.append("end_day", endDay);
    formData.append("time_in", startTime);
    formData.append("time_out", endTime);
    formData.append("specialization", data?.specialization);
    // formData.append("long", longitude);
    // formData.append("lat", latitude);

    fields?.map((field) => formData.append("services[]", field));

    removeImagesIds?.forEach((removeId) =>
      formData.append("remove_image_ids[]", removeId)
    );

    // formData.append("gallery_images", selectedImages?.map(()=>));
    selectedImages?.map((image) => formData.append("gallery_images", image));

    await profileUpdateMutation(formData);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }
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
      setValue("zip", meData.postal_code || "");

      setStartDay(meData?.start_day || ""); // pre-fill start day
      setEndDay(meData?.end_day || "");
      setStartTime(meData?.time_in || "");
      setEndTime(meData?.time_out || "");
      setValue("userName", meData?.user_name || "");

      // setValue("specialization", meData.specialization || "");

      if (
        meData.specialization &&
        meData.specialization !== "Neuro Specialization"
      ) {
        setValue("specialization", meData.specialization);
      } else {
        setValue("specialization", ""); // keep empty
      }

      // setValue("startDay", meData.startDay || "");
      // setValue("endDay", meData.endDay || "");

      // Optional: If you're also maintaining local state for select dropdowns
      // setGender(meData.gender || "");
      // setState(meData.state || "");
      // setCity(meData.city || "");
    }
  }, [meData, setValue]);

  useEffect(() => {
    if (meData?.gallary_images?.length > 0) {
      setSelectedImages([]);
      setExistingImages(meData?.gallary_images);
    }
  }, [meData?.gallary_images]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    setSelectedImages((prev) => [...prev, ...filesArray]);
  };

  const removeExistingImage = (index: number, imgId) => {
    // setExistingImages((prev) => prev.filter((_, i) => i !== index));
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
    // setRemoveImagesIds((prev) => prev.filter((_, i) => i !== index));
    setRemoveImagesIds((prev) => [...prev, imgId]);

    // Optional: Call API to remove from backend here
  };

  const removeSelectedImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ___________________________-

  const [fields, setFields] = useState<string[]>([""]);

  useEffect(() => {
    if (meData?.service && meData.service.length > 0) {
      setFields(meData.service.map((ser) => ser?.name || ""));
    }
  }, [meData]);

  // Add new empty input
  const addField = () => {
    setFields([...fields, ""]);
  };

  // Remove input at index
  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  // Update input value
  const handleChange = (index: number, value: string) => {
    const newFields = [...fields];
    newFields[index] = value;
    setFields(newFields);
  };

  const handleMap = (e) => {
    setLatitude(e.latitude);
    setLongitude(e.longitude);
  };

  console.log("hhhhhhhhhhhhhhh", longitude);

  return (
    <>
      <div>
        <div className="overflow-y-auto rounded-[10px] bg-white py-8 px-3 sm:p-10 h-[601px]">
          <h4 className="text-xl space-grotesk font-bold text-[#1A1A1A] font-[Space Grotesk] mb-3">
            Add Personal Information
          </h4>

          <form onSubmit={handleSubmit(handleProfileSubmit)}>
            <div className="md:flex md:items-center md:justify-between mb-9">
              <div className="flex md:justify-between md:mb-0 mb-5 items-center gap-8">
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
                  className="sm:w-20 w-15 h-15 sm:h-20 rounded-[15px] object-cover"
                  style={{ border: "1px solid rgba(0,0,0,10%)" }}
                />
                <div>
                  <h4 className="font-bold mb-1 space-grotesk text-[#252525] text-xl leading-tight">
                    {singleUser?.organization_name
                      ? singleUser?.organization_name
                      : singleUser?.user_name}
                  </h4>
                  {singleUser?.specialization &&
                    singleUser?.specialization !== "Neuro Specialization" && (
                      <span className="text-base text-[#181D27]/50 leading-tight">
                        {singleUser?.specialization}
                      </span>
                    )}
                </div>
              </div>

              <div className="ml-auto md:w-fit">
                <div className="w-full flex flex-wrap gap-5">
                  <label
                    className="border-1 cursor-pointer border-[#25252533] md:w-[159px] w-full h-[46px] bg-[#F3F3F3] !rounded-[10px] px-4 py-[10px] text-base text-[#252525] font-medium leading-[33px] gap-2 flex items-center justify-center"
                    htmlFor="upload"
                  >
                    Change Photo
                  </label>

                  <PrimaryButton
                    disabled={isPendingProfileUpdateMutation}
                    btnText={
                      isPendingProfileUpdateMutation
                        ? "Loading..."
                        : `Save Changes`
                    }
                    showImg={false}
                    btnClass="h-[46px] md:w-[159px] w-full !rounded-[10px] border border-[#28A2FF] bg-[#28A2FF] text-white !px-4 py-[10px] text-sm font-semibold leading-[33px] gap-2 flex items-center justify-center"
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
                label="User Name:"
                id="userName"
                name="userName"
                type="text"
                fieldName="sm:w-[49%] w-full"
                iconUrl={inputUser}
                register={register}
                disabled={true}
                registerName="userName"
                placeholder="User Name"
                validation={{
                  required: "User name is required",
                }}
                errors={errors}
              />
              <InputField
                label="Organization Name:"
                id="name"
                name="name"
                type="text"
                fieldName="sm:w-[49%] w-full"
                iconUrl={inputUser}
                register={register}
                registerName="name"
                placeholder="e.g., Sunrise Rehabilitation Center"
                validation={{
                  required: "Organization name is required",
                }}
                errors={errors}
              />
              <SelectField
                label="Organization Type"
                id="organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                options={organizationOptions}
                selectName="sm:w-[49%] !mb-8.5 w-full"
                register={register}
                registerName="organization"
                validation={{
                  required: "Organization type is required",
                }}
                errors={errors}
              />
              <InputField
                label="Phone:"
                id="tel"
                name="tel"
                type="number"
                fieldName="sm:w-[49%] w-full"
                iconUrl={Call}
                placeholder="(123) 456-7890]"
                register={register}
                registerName="tel"
                validation={{
                  required: "Number is required",
                }}
                errors={errors}
              />
              <InputField
                label="Email:"
                id="email"
                name="email"
                type="email"
                fieldName="w-full sm:w-[49%]"
                iconUrl={Sms}
                placeholder="contact@organization.org"
                register={register}
                registerName="email"
                validation={{
                  required: "Email is required",
                }}
                errors={errors}
              />
            </div>

            <InputField
              label="Website:"
              id="website"
              name="web"
              type="text"
              fieldName="w-full"
              iconUrl={Global}
              placeholder="https://www.topseniorspot.org"
              className="w-full h-[50px] bg-[#FBFCFD] border border-[#2525251A] rounded-[8px] px-4 font-[Geist] text-[16px] font-normal text-[#1A1A1A] placeholder:text-gray-500 focus:outline-none"
              register={register}
              registerName="web"
              validation={{
                required: "Email URL is required",
              }}
              errors={errors}
            />

            <InputField
              label="Specialization:"
              id="specialization"
              name="specialization"
              type="text"
              fieldName="w-full"
              iconUrl={Global}
              placeholder="eg.Eye Specialist"
              className="w-full h-[50px] bg-[#FBFCFD] border border-[#2525251A] rounded-[8px] px-4 font-[Geist] text-[16px] font-normal text-[#1A1A1A] placeholder:text-gray-500 focus:outline-none"
              register={register}
              registerName="specialization"
              validation={{
                required: "Specialization is required",
              }}
              errors={errors}
            />

            <div className="mb-6 h-[190px] text-base font-medium text-black leading-[140%] tracking-[0%] font-[Geist]">
              <p className="mb-2.5 ">Additional Details:</p>
              <div className="text-sm font-normal text-[#252525] py-4 ps-0 px-[15px] rounded-lg bg-[#FBFCFD]">
                <textarea
                  id="message"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                  // {...register("additional_details")}
                  {...register("additional_details", {
                    required: "Additional Detail is required",
                  })}
                ></textarea>
              </div>
              {errors.additional_details && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.additional_details.message}
                </p>
              )}
            </div>

            <h4 className="text-xl space-grotesk font-bold text-[#1A1A1A] font-[Space Grotesk] mb-3">
              Location Information
            </h4>

            <div className="flex flex-wrap items-center gap-4">
              <div>
                <InputField
                  label="State"
                  asterisk={true}
                  icon={IoLocationSharp}
                  id="state"
                  name="state"
                  className="pr-10"
                  type="text"
                  placeholder="e.g., California"
                  register={register}
                  registerName="state"
                  errors={errors}
                  validation={{
                    required: "State is required",
                  }}
                />
              </div>
              <SelectField
                label="City"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                options={cityOptions}
                selectName="w-full !mb-8.5 sm:w-[32%]"
                register={register}
                registerName="city"
                validation={{
                  required: "Select a city",
                }}
                errors={errors}
              />
              <InputField
                label="Zip Code:"
                id="zip"
                name="zip"
                type="number"
                placeholder="78701"
                fieldName="w-full sm:w-[32%]"
                register={register}
                registerName="zip"
                isZipCode={true}
                validation={{
                  required: "Zip code is required",
                }}
                errors={errors}
              />
            </div>

            <InputField
              label="Address:"
              id="address"
              name="address"
              type="text"
              fieldName="w-full"
              placeholder="123 main Street, Springfield, IL 62704"
              register={register}
              registerName="address"
              validation={{
                required: "Address is required",
              }}
              errors={errors}
            />

            <div>
              <div className="flex">
                <label className="block mb-3 text-[16px] font-[500] text-black leading-[140%] tracking-[0%] font-[Geist]">
                  Add Your Location
                </label>
                {/* {asterisk && <span className="text-red-500 ml-1">*</span>} */}
              </div>
              <Map onLocationSelect={(e) => handleMap(e)} />
            </div>

            {/* Multi Image Uploader */}

            {/* <div className="w-full">
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <p className="text-gray-500 text-sm">
                  Click or drag to upload images
                </p>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {selectedImages?.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {selectedImages?.map((file, index) => (
                    <div
                      key={index}
                      className="relative w-full h-32 rounded-lg overflow-hidden border"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`upload-${index}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 cursor-pointer right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div> */}

            <div className="w-full mb-8">
              {/* Upload Box */}
              <p className="mb-3 mt-6 font-bold space-grotesk text-black">
                Upload Gallery
              </p>
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <p className="text-gray-500 text-sm">
                  Click or drag to upload images
                </p>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {/* Existing Images from API */}
              {existingImages?.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {existingImages?.map((img, index) => (
                    <div
                      key={`api-${index}`}
                      className="relative w-full h-32 rounded-lg overflow-hidden border"
                    >
                      <img
                        src={`${import.meta.env.VITE_APP_API_IMG_URL}${
                          img?.image
                        }`}
                        alt={`api-upload-${index}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index, img?.id)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* New Uploaded Images */}
              {selectedImages?.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {selectedImages?.map((file, index) => (
                    <div
                      key={`new-${index}`}
                      className="relative w-full h-32 rounded-lg overflow-hidden border"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`upload-${index}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeSelectedImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Multi Image Uploader */}

            {/* REpeater Field */}
            <p className="mb-3 mt-6 space-grotesk font-bold text-black">
              Careprovider Support Services
            </p>

            {fields?.map((field, index) => (
              <div
                // key={field.id}
                className="flex mb-4 items-center sm:gap-3 border border-gray-200 p-2 sm:p-4 rounded-lg"
              >
                <input
                  type="text"
                  placeholder="Enter value"
                  value={field}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 sm:w-full w-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeField(index)}
                  className="px-3 py-2 text-red-500 hover:text-red-700 font-semibold"
                >
                  ✕
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addField}
              className="w-full cursor-pointer py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold"
            >
              + Add Row
            </button>

            {/* REpeater Field */}

            <p className="mb-5 mt-18 font-bold text-black">
              Pick your timeslots
            </p>
            <div className="sm:flex sm:justify-start gap-10">
              {/* <DateTimePicker onChange={onChange} value={value} /> */}
              {/* <div className="">
                <DateRangePicker ranges={range} onChange={handleSelect} />
              </div> */}
              {/* <div>
                <TimePicker onChange={onChange} value={value} />
              </div> */}
              {/* TIMEPICKER */}

              <StartEndDay
                startDay={startDay}
                endDay={endDay}
                setStartDay={setStartDay}
                setEndDay={setEndDay}
                control={control}
              />

              <StartEndTime
                startTime={startTime}
                endTime={endTime}
                setStartTime={setStartTime}
                setEndTime={setEndTime}
                control={control}
              />

              {/* TIMPICKER */}

              {/* Display selected times
                {startTime && endTime && (
                  <div className="mt-4 text-gray-800 font-medium">
                    Selected: {startTime} - {endTime}
                  </div>
                )} */}
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

export default ProfileDetail1;
