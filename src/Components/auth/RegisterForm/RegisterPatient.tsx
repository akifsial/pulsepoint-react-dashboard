import React, { useState } from "react";
import InputField from "@src/components/InputField";
import SelectField from "@src/components/SelectField";

import { Link, useNavigate } from "react-router-dom";
import SocialLoginSection from "@src/components/SocialLoginSection";
import {
  IoPersonOutline,
  IoMailOutline,
  IoLocationSharp,
} from "react-icons/io5";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ApiRegister } from "@src/api/AuthApi/AuthApi";
import Spinner from "@src/components/Loaders/Spinner";
import { useAllApiInsuranceTypes } from "@src/hooks/useUsers";
import dummyImage from "@assets/media/images/signup-img.png";
import signupLogo from "@assets/media/images/signup-logo.png";
import { ArrowLeft } from "lucide-react";
import PhoneInput from "react-phone-input-2";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  maritalStatus: string;
  insuranceType: string;
  careNeeds: string;
  password: string;
  confirmPassword: string;
  zipCode: string;
  city: string;
  state: string;
  streetAddress: string;
  preferredCommunication: string[];
}

const RegisterPatient = ({ setSelectUser }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    maritalStatus: "",
    insuranceType: "",
    careNeeds: "",
    password: "",
    confirmPassword: "",
    zipCode: "",
    city: "",
    state: "",
    streetAddress: "",
    preferredCommunication: [],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm({
    defaultValues: {
      number: "+44", // initialize with Pakistan code
    },
  });
  const [phoneValidation, setPhoneValidation] = useState(false);

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const navigate = useNavigate(); // Hook to navigate
  // select data population
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const maritalStatusOptions = [
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
    { value: "divorced", label: "Divorced" },
    { value: "widowed", label: "Widowed" },
    { value: "separated", label: "Separated" },
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

  const { data: InsuranceData } = useAllApiInsuranceTypes();

  const insuranceOptions = [
    { label: "Select Insurance", value: "" },
    ...(InsuranceData?.records?.map((insurance) => ({
      label: insurance.name,
      value: insurance.id,
    })) || []),
  ];

  const [preferredMethod, setPreferredMethod] = useState("");
  // Handler to update state on radio change
  const handleMethodChange = (e) => {
    setPreferredMethod(e.target.value);
  };

  // handle checkbox changes
  const handleCommunicationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      let updatedPreferredCommunication = [...prev.preferredCommunication];
      if (checked) {
        updatedPreferredCommunication.push(value);
      } else {
        updatedPreferredCommunication = updatedPreferredCommunication.filter(
          (item) => item !== value
        );
      }
      return { ...prev, preferredCommunication: updatedPreferredCommunication };
    });
  };

  const { mutateAsync: registerMutation, isPending: isRegisterPending } =
    useMutation({
      mutationFn: ({ data }) => ApiRegister(data),

      onSuccess: async () => {
        toast.success("Patient Create Successfully");
        navigate("/login");
      },
      onError: (error) => {},
    });

  const RegisterSubmit = async (data) => {
    if (data?.number == "") {
      setPhoneValidation(true);
      return;
    } else {
      setPhoneValidation(false);
    }

    if (preferredMethod == "") {
      return toast.error("Select atleast one communition method");
    }

    const registerData = {
      user_name: data.userName,
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      number: data.number,
      password: data.password,
      gender: data.gender,
      insurance_type_id: data.insurance_type_id,
      care_needs: data.careNeeds,
      age: data.age,
      role_type: "PATIENT",
      postal_code: data.postal_code,
      specialization: data?.specialization,
      city: data.city,
      provider_type_id: 1,
      state: data.state,
      address: data.streetAddress,
      website_url: "yeah.com",
      working_hours: "Uk Bargingham Street ",
      marital_status: data.maritalStatus,
      communication_method_id: Number(preferredMethod),
      birth_date: data.birth_date,
    };
    await registerMutation({ data: registerData });
  };

  return (
    <>
      <div className="grid lg:grid-cols-2 items-center gap-5 sm:p-7 bg-[linear-gradient(107.76deg,_#F4F7FF_-2.99%,_#DDEFF7_64.85%,_#D6E0F9_113.61%)]">
        <div className="lg:flex hidden">
          <img
            src={dummyImage}
            alt="User Image"
            className="w-full h-full min-h-[759px] rounded-[10px]"
          />
        </div>
        <div className="bg-white rounded-[10px] lg:py-0 py-8 flex flex-col justify-center h-full">
          <div className="flex items-center mb-8  justify-center">
            <img
              src={signupLogo}
              alt="Signup Logo"
              className="w-[243px] h-[55px]"
            />
          </div>
          <div className="overflow-y-auto h-[640px] px-3 sm:px-[30px] flex flex-col">
            <form
              onSubmit={handleSubmit(RegisterSubmit)}
              className="sm:space-y-6"
              noValidate
            >
              <div className="sm:px-4 py-6">
                <p className="text-[#1A1A1A] flex items-center gap-5 text-[35px] font-bold leading-[140%] tracking-normal font-[Space Grotesk] mb-3">
                  <span
                    onClick={() => {
                      setSelectUser(""); // Remove hash from URL
                      window.history.replaceState(
                        null,
                        "",
                        window.location.pathname + window.location.search
                      );
                    }}
                    className="cursor-pointer"
                  >
                    <ArrowLeft />{" "}
                  </span>{" "}
                  Sign Up
                </p>
                <p className="text-[#252525] text-[16px] font-normal leading-[150%] tracking-[0%] font-[Geist] mb-6">
                  Join to explore and share care insights
                </p>
                {/* Name Fields */}
                <div>
                  <InputField
                    label="User Name"
                    asterisk={true}
                    icon={IoPersonOutline}
                    id="userName"
                    name="userName"
                    type="text"
                    placeholder="Enter your user name"
                    className="pr-10"
                    register={register}
                    registerName="userName"
                    errors={errors}
                    validation={{
                      required: "First Name is required",
                    }}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <InputField
                      label="First Name"
                      asterisk={true}
                      icon={IoPersonOutline}
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Enter your user name"
                      register={register}
                      className="pr-10"
                      registerName="firstName"
                      errors={errors}
                      validation={{
                        required: "First Name is required",
                      }}
                    />
                  </div>

                  <div>
                    <InputField
                      label="Last Name"
                      asterisk={true}
                      icon={IoPersonOutline}
                      className=" pr-10"
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      register={register}
                      registerName="lastName"
                      errors={errors}
                      validation={{
                        required: "Last Name is required",
                      }}
                    />
                  </div>
                </div>

                {/* Other Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <InputField
                      label="Email Address"
                      asterisk={true}
                      icon={IoMailOutline}
                      id="email"
                      name="email"
                      type="email"
                      placeholder="e.g. username@mail.com"
                      className="pr-10"
                      register={register}
                      registerName="email"
                      errors={errors}
                      validation={{
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Enter a valid email",
                        },
                      }}
                    />

                    {/* {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )} */}
                  </div>

                  <div
                    className={`relative grid grid-cols-1 md:grid-cols-1 gap-2 ${
                      phoneValidation ? "mb-6" : ""
                    }`}
                  >
                    <label className="block text-[16px] font-[500] text-black leading-[140%] tracking-[0%] font-[Geist]">
                      Phone Number
                      <span className="text-red-500 ml-1">*</span>
                    </label>

                    {/* <Controller
                      name="number"
                      control={control}
                      render={({ field, fieldState }) => (
                        <>
                          <PhoneInput
                            placeholder="Enter phone number"
                            value={field.value}
                            onChange={field.onChange}
                            defaultCountry="US"
                            className="w-full h-[50px] border border-[#2525251A] rounded-[8px] font-[Geist] text-[16px] font-normal text-[#1A1A1A] placeholder:text-gray-500 focus:outline-none"
                          />
                          <div className="h-[20px]">
                            {fieldState.error && (
                              <p className="text-red-500 text-sm">
                                {fieldState.error.message}
                              </p>
                            )}
                          </div>
                        </>
                      )}
                    /> */}

                    <Controller
                      name="number"
                      control={control}
                      rules={{
                        required: "Phone number is required",
                        minLength: {
                          value: 5,
                          message: "Invalid phone number",
                        },
                      }}
                      render={({ field, fieldState }) => {
                        const handleChange = (value: string) => {
                          // Remove all non-digit characters
                          const cleanValue = value.replace(/\D/g, "");
                          if (!cleanValue) {
                            field.onChange(""); // Clear value if empty
                          } else {
                            field.onChange(value); // Otherwise update normally
                          }
                        };

                        return (
                          <>
                            <PhoneInput
                              placeholder="Enter phone number"
                              value={field.value || ""}
                              onChange={handleChange}
                              defaultCountry="US"
                              className="w-full h-[50px] border border-[#2525251A] rounded-[8px] font-[Geist] text-[16px] font-normal text-[#1A1A1A] placeholder:text-gray-500 focus:outline-none"
                              inputProps={{
                                required: true,
                              }}
                            />
                            <div className="h-[20px]">
                              {fieldState.error && (
                                <p className="text-red-500 text-sm">
                                  {fieldState.error.message}
                                </p>
                              )}
                            </div>
                          </>
                        );
                      }}
                    />

                    <div className="h-[20px]">
                      {phoneValidation && (
                        <p className="text-red-500 text-sm">
                          Phone number is required
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <InputField
                      label="Age"
                      asterisk={true}
                      // icon={IoPersonOutline}
                      id="age"
                      name="age"
                      type="number"
                      placeholder="Enter your age"
                      // className="pr-10"
                      register={register}
                      registerName="age"
                      errors={errors}
                      validation={{
                        required: "Age is required",
                      }}
                    />
                  </div>
                  <div>
                    <SelectField
                      label="Gender"
                      id="gender"
                      name="gender"
                      asterisk={true}
                      options={genderOptions}
                      register={register}
                      registerName="gender"
                      errors={errors}
                      validation={{
                        required: "Gender is required",
                      }}
                    />
                  </div>
                </div>

                {/* Marital Status, and Insurance Type */}
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
                      errors={errors}
                      validation={{
                        required: "Martial Status is required",
                      }}
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
                      errorMessage={errors?.insurance_type_id?.message} // ✅ this was missing
                      validation={{
                        required: "Insurance Type is required",
                      }}
                    />
                  </div>
                </div>

                {/* care needs */}
                <div className="grid grid-cols-1 md:grid-cols-1 ">
                  <InputField
                    label="Care Needs"
                    id="careNeeds"
                    name="careNeeds"
                    asterisk={true}
                    type="text"
                    placeholder="Enter your care need"
                    register={register}
                    registerName="careNeeds"
                    errors={errors}
                    validation={{
                      required: "Care Needs is required",
                    }}
                  />
                </div>

                {/* zip code and city */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <InputField
                      label="Zip Code"
                      asterisk={true}
                      id="postal_code"
                      name="postal_code"
                      className="pr-10"
                      type="number"
                      placeholder="Enter your zip code"
                      icon={IoLocationSharp}
                      register={register}
                      registerName="postal_code"
                      isZipCode={true}
                      errors={errors}
                      validation={{
                        required: "Zip Code is required",
                      }}
                    />
                  </div>
                  <div>
                    <SelectField
                      label="City"
                      id="city"
                      name="city"
                      asterisk={true}
                      options={cityOptions}
                      register={register}
                      registerName="city"
                      errors={errors}
                      validation={{
                        required: "City is required",
                      }}
                    />
                  </div>
                </div>

                {/* state and street adress */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <div>
                    <InputField
                      label="Street Address"
                      id="streetAddress"
                      name="streetAddress"
                      asterisk={true}
                      type="text"
                      placeholder="e.g., 123 Main Street"
                      icon={IoLocationSharp}
                      register={register}
                      registerName="streetAddress"
                      className="pr-10"
                      errors={errors}
                      validation={{
                        required: "Address is required",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <InputField
                    label="Birth Date"
                    id="birth_date"
                    name="birth_date"
                    asterisk={true}
                    type="date"
                    placeholder="e.g., 21 Sep 2020"
                    // icon={IoLocationSharp}
                    register={register}
                    registerName="birth_date"
                    className="pr-10"
                    errors={errors}
                    // validation={{
                    //   required: "Birth Date is required",
                    // }}
                  />
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <InputField
                      label="Create a Password"
                      asterisk={true}
                      id="password"
                      className="pr-10"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      register={register}
                      registerName="password"
                      errors={errors}
                      validation={{
                        required: "Password is required",
                      }}
                    />
                  </div>
                  <div>
                    <InputField
                      label="Confirm Password"
                      asterisk={true}
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      register={register}
                      registerName="confirmPassword"
                      errors={errors}
                      className="pr-10"
                      validation={{
                        required: "Confirm Password is required",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      }}
                    />
                    {confirmPassword &&
                      confirmPassword === password &&
                      !errors.confirmPassword &&
                      " "}
                  </div>
                </div>
                {/* <div className="space-y-4">
                <p className="text-md font-semibold">
                  Preferred Communication Method
                </p>
                <div className="flex text-[16px] font-[500] text-[#333333] leading-[140%] tracking-[0%] font-[Geist] space-x-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="email"
                      name="preferredCommunication"
                      value="email"
                      checked={formData.preferredCommunication.includes(
                        "email"
                      )}
                      onChange={handleCommunicationChange}
                      className="mr-2 scale-150 border-[#FFFFFF] align-middle"
                    />
                    <label htmlFor="email" className="ml-1">
                      Via Email Address
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="phone"
                      name="preferredCommunication"
                      value="phone"
                      checked={formData.preferredCommunication.includes(
                        "phone"
                      )}
                      onChange={handleCommunicationChange}
                      className="mr-2 scale-150 border-[#FFFFFF] align-middle"
                    />
                    <label htmlFor="phone" className="ml-1">
                      Via Phone Number
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="sms"
                      name="preferredCommunication"
                      value="sms"
                      checked={formData.preferredCommunication.includes("sms")}
                      onChange={handleCommunicationChange}
                      className="mr-2 scale-150 border-[#FFFFFF] align-middle"
                    />
                    <label htmlFor="sms" className="ml-1">
                      Via SMS Text
                    </label>
                  </div>
                </div>
              </div> */}

                <div className="space-y-4">
                  <p className="text-md font-semibold">
                    Preferred Communication Method
                    <span className="text-red-500 ml-1">*</span>
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
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full flex justify-center bg-[#28A2FF] text-white items-center h-[50px] px-4 rounded-lg font-medium text-lg transition-colors mt-6 cursor-pointer"
                >
                  {isRegisterPending ? <Spinner /> : "Sign Up"}
                </button>
                {/* calling component for Social icons */}
                <SocialLoginSection
                  action="login"
                  // handleSocialLogin={handleSocialLogin}
                />
                {/* "Don't have an account yet?" Section */}
                <div className="flex justify-center mt-6">
                  <p className="text-[16px] leading-[25px] tracking-[0.005em] text-center align-middle font-normal text-[#49475A] font-[Geist]">
                    Already have an account?{" "}
                    <Link
                      to="/patient/login"
                      className="text-[16px] leading-[25px] tracking-[0.005em] text-center align-middle font-normal underline text-[#28A2FF] font-[Geist]"
                    >
                      Login now
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPatient;
