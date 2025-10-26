import React, { useState } from "react";
import InputField from "@components/input-field";
import SelectField from "@components/select-field";
import OnBoardingLayout from "@components/auth/on-borading-layout";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Globe } from "lucide-react";
import SocialLoginSection from "@components/social-login-section";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";

import {
  IoPersonOutline,
  IoCallOutline,
  IoMailOutline,
  IoLocationSharp,
} from "react-icons/io5";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ApiRegister } from "@src/api/authapi/auth-api";
import dummyImage from "@assets/media/images/signup-img.png";
import signupLogo from "@assets/media/images/signup-logo.png";
import Spinner from "@components/loaders/spinner";
import {
  useAllApiInsuranceTypes,
  useAllApiProviderTypes,
} from "@src/hooks/use-users";

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

const RegisterCareprovider = ({ setSelectUser }) => {
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
      number: "+44", 
    },
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const navigate = useNavigate(); 
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

  const insuranceTypeOptions = [
    { value: "health", label: "Health Insurance" },
    { value: "dental", label: "Dental Insurance" },
    { value: "vision", label: "Vision Insurance" },
    { value: "life", label: "Life Insurance" },
    { value: "disability", label: "Disability Insurance" },
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

  const providerOptions = [
    { value: "new_york", label: "New York" },
    { value: "los_angeles", label: "Los Angeles" },
    { value: "chicago", label: "Chicago" },
    { value: "houston", label: "Houston" },
    { value: "miami", label: "Miami" },
  ];

  const [preferredMethod, setPreferredMethod] = useState("");
  const { data: ProviderData } = useAllApiProviderTypes();

  const providersOptions =
    ProviderData?.records?.map((insurance) => ({
      label: insurance.name,
      value: insurance.id,
    })) || [];

  const { mutateAsync: registerMutation, isPending: isRegisterPending } =
    useMutation({
      mutationFn: ({ data }) => ApiRegister(data),

      onSuccess: async () => {
        toast.success("Care Provider Created Successfully");
        navigate("/login");
      },
      onError: (err) => {},
    });

  const [phoneValidation, setPhoneValidation] = useState(false);

  const RegisterSubmit = async (data) => {
    if (data?.number == "") {
      setPhoneValidation(true);
      return;
    } else {
      setPhoneValidation(false);
    }
    const registerData = {
      organization_name: data.organizationName,

      email: data.email,
      user_name: data?.userName,
      first_name: data.firstName,
      last_name: data.lastName,
      number: data.number,
      password: data.password,
      gender: data.gender,
      insuranceType: data.insuranceType,
      care_needs: data.careNeeds,
      age: data.age,
      role_type: "CARE_PROVIDER",
      postal_code: data.zipCode,
      specialization: data?.specialization,
      city: data.city,
      provider_type_id: 1,
      state: data.state,
      address: data.streetAddress,
      website_url: data.website || "",
      working_hours: "Uk Bargingham Street ",
      marital_status: data.maritalStatus,
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
          <div className="flex items-center mb-10 justify-center">
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
                <p className="text-[#1A1A1A] flex items-center gap-5 text-[25px] sm:text-[35px] font-bold leading-[140%] tracking-normal font-[Space Grotesk] mb-3">
                  <span
                    onClick={() => {
                      setSelectUser(""); 
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
                <p className="text-[#252525] text-[14px] sm:text-[16px] font-normal leading-[150%] tracking-[0%] font-[Geist] mb-6">
                  Join to explore and share care insights
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 mb-3 gap-6">
                  <div>
                    <InputField
                      label="Organization Name"
                      asterisk={true}
                      icon={IoPersonOutline}
                      id="organizationName"
                      name="organizationName"
                      className="pr-10"
                      type="text"
                      placeholder="St. Mary’s Rehabilitation Center"
                      register={register}
                      registerName="organizationName"
                      errors={errors}
                      validation={{
                        required: "Organization Name is required",
                      }}
                    />
                  </div>
                  <div>
                    <div>
                      <InputField
                        label="User Name"
                        asterisk={true}
                        icon={IoPersonOutline}
                        id="userName"
                        name="userName"
                        type="text"
                        placeholder="@johndoe"
                        register={register}
                        className="pr-10"
                        registerName="userName"
                        errors={errors}
                        validation={{
                          required: "User Name is required",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="">
                    <SelectField
                      label="Provider Type"
                      id="providerType"
                      name="providerType"
                      asterisk={true}
                      options={providersOptions}
                      register={register}
                      registerName="providerType"
                      errors={errors}
                      validation={{
                        required: "Provider Type is required",
                      }}
                    />
                  </div>

                  <div className="">
                    <InputField
                      label="Specialization:"
                      id="specialization"
                      name="specialization"
                      type="text"
                      fieldName="w-full"
                      placeholder="eg.Eye Specialist"
                      className="w-full h-[50px] bg-[#FBFCFD] border border-[#2525251A] rounded-[8px] px-4 font-[Geist] text-[16px] font-normal text-[#1A1A1A] placeholder:text-gray-500 focus:outline-none"
                      register={register}
                      registerName="specialization"
                      validation={{
                        required: "Specialization is required",
                      }}
                      errors={errors}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="w-full">
                    <InputField
                      label="Email Address"
                      asterisk={true}
                      icon={IoMailOutline}
                      id="email"
                      className="pr-10 !mb-0"
                      name="email"
                      type="email"
                      placeholder="contact@organization.org"
                      register={register}
                      registerName="email"
                      errors={errors}
                      validation={{
                        required: "Email Address is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Enter a valid email",
                        },
                      }}
                    />
                  </div>


                  <div
                    className={`relative grid grid-cols-1 md:grid-cols-1 gap-2 ${
                      phoneValidation ? "mb-6" : ""
                    }`}
                  >
                    <label className="block text-[16px] font-[500] text-black leading-[140%] tracking-[0%] font-[Geist]">
                      Phone Number<span className="text-red-500 ml-1">*</span>
                    </label>

            

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
                          const cleanValue = value.replace(/\D/g, "");
                          if (!cleanValue) {
                            field.onChange(""); 
                          } else {
                            field.onChange(value);
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
                            <div className="h-[10px]">
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

                    <div className="h-[10px]">
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
                      label="Zip code"
                      asterisk={true}
                      icon={IoLocationSharp}
                      id="zipCode"
                      name="zipCode"
                      type="number"
                      className="pr-10"
                      placeholder="e.g., 78701"
                      register={register}
                      registerName="zipCode"
                      isZipCode={true}
                      errors={errors}
                      validation={{
                        required: "Zip code is required",
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <div>
                    <InputField
                      label="Street Address"
                      asterisk={true}
                      icon={IoLocationSharp}
                      id="streetAddress"
                      className="pr-10"
                      name="streetAddress"
                      type="text"
                      placeholder="e.g., 123 Main Street"
                      register={register}
                      registerName="streetAddress"
                      errors={errors}
                      validation={{
                        required: "Street Address is required",
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 mb-4">
                  <div>
                    <InputField
                      label="Website Url (optional)"
                      icon={Globe}
                      className="pr-10"
                      id="website"
                      name="website"
                      type="text"
                      placeholder="e.g., www.topseniorspot.com"
                      register={register}
                      registerName="website"
                      errors={errors}
                    />
                  </div>
                
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <InputField
                      label="Create a Password"
                      asterisk={true}
                      id="password"
                      name="password"
                      type="password"
                      className="pr-10"
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
                      className="pr-10"
                      type="password"
                      placeholder="Confirm your password"
                      register={register}
                      registerName="confirmPassword"
                      errors={errors}
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
                <button
                  type="submit"
                  className="w-full flex justify-center bg-[#28A2FF] items-center text-white h-[50px] px-4 rounded-lg font-medium text-lg transition-colors mt-6 cursor-pointer"
                >
                  {isRegisterPending ? <Spinner /> : "Sign Up"}
                </button>
                <div className="flex justify-center mt-6">
                  <p className="text-[16px] leading-[25px] tracking-[0.005em] text-center align-middle font-normal text-[#49475A] font-[Geist]">
                    Already have an account?{" "}
                    <Link
                      to="/care-provider/login"
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

export default RegisterCareprovider;
