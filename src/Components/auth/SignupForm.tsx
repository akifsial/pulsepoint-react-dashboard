import React, { useState } from "react";
// import arrowIcon from "@assets/media/images/arrow-down.svg";
import InputField from "../InputField";
import SelectField from "../SelectField";
import OnBoardingLayout from "./OnBoradingLayout";
import { Link, useNavigate } from "react-router-dom";
import { Globe } from "lucide-react";
import SocialLoginSection from "../SocialLoginSection";

import {
  IoPersonOutline,
  IoCallOutline,
  IoMailOutline,
  IoLocationSharp,
} from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ApiRegister } from "@src/api/AuthApi/AuthApi";
import Spinner from "@components/Loaders/Spinner";
import {
  useAllApiInsuranceTypes,
  useAllApiProviderTypes,
} from "@src/hooks/useUsers";

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

const SignupForm = () => {
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

  // const [errors, setErrors] = useState<FormData>({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   phone: "",
  //   age: "",
  //   gender: "",
  //   maritalStatus: "",
  //   insuranceType: "",
  //   password: "",
  //   confirmPassword: "",
  //   zipCode: "",
  //   city: "",
  //   state: "",
  //   streetAddress: "",
  //   preferredCommunication: [],
  //   careNeeds: "",
  // });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const navigate = useNavigate(); // Hook to navigate
  // select data population
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    // { value: "other", label: "Other" },
    // { value: "prefer-not-to-say", label: "Prefer not to say" },
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
    { value: "new_york", label: "New York" },
    { value: "los_angeles", label: "Los Angeles" },
    { value: "chicago", label: "Chicago" },
    { value: "houston", label: "Houston" },
    { value: "miami", label: "Miami" },
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
        toast.success("Care Provider Created Successfully");
        // navigate("/login");
        navigate("/care-provider/login");
      },
      onError: (err) => {
       
      },
    });

  const RegisterSubmit = async (data) => {
    const registerData = {
      // for care_provider
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
      specialization: "Neuro Specialization",
      city: data.city,
      provider_type_id: 1,
      state: data.state,
      address: data.streetAddress,
      website_url: "yeah.com",
      working_hours: "Uk Bargingham Street ",
      marital_status: data.maritalStatus,
      // communication_method_id: preferredMethod,
    };
    await registerMutation({ data: registerData });
  };

  return (
    <>
      <OnBoardingLayout>
        <div className="min-h-screen max-h-screen flex flex-col">
          <form
            onSubmit={handleSubmit(RegisterSubmit)}
            className="space-y-6 overflow-y-auto "
          >
            <div className="px-4 py-6">
              <p className="text-[#1A1A1A] text-[35px] font-bold leading-[140%] tracking-normal font-[Space Grotesk] mb-3">
                Sign Up
              </p>
              <p className="text-[#252525CC] text-[16px] font-normal leading-[150%] tracking-[0%] font-[Geist] mb-6">
                Create Your Provider Account
              </p>
              {/* Name Fields */}
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InputField
                    label="Organization Name"
                    asterisk={true}
                    icon={IoPersonOutline}
                    id="organizationName"
                    name="organizationName"
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
                      registerName="userName"
                      errors={errors}
                      validation={{
                        required: "User Name is required",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
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

              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InputField
                    label="Email Address"
                    asterisk={true}
                    icon={IoMailOutline}
                    id="email"
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
                <div>
                  <InputField
                    label="Phone Number"
                    asterisk={true}
                    icon={IoCallOutline}
                    id="number"
                    name="number"
                    type="text"
                    placeholder="e.g., +1 800 555 1234"
                    register={register}
                    registerName="number"
                    errors={errors}
                    validation={{
                      required: "Phone Number is required",
                    }}
                  />
                </div>
              </div>

              {/* Zip & City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InputField
                    label="Zip code"
                    asterisk={true}
                    icon={IoLocationSharp}
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    placeholder="e.g., 78701"
                    register={register}
                    registerName="zipCode"
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

              {/* State & Street */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InputField
                    label="State"
                    asterisk={true}
                    icon={IoLocationSharp}
                    id="state"
                    name="state"
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

              {/* Website & Working Hours */}
              <div className="grid grid-cols-1">
                <div>
                  <InputField
                    label="Website Url (optional)"
                    icon={IoPersonOutline}
                    id="website"
                    name="website"
                    type="text"
                    placeholder="e.g., www.topseniorspot.com"
                    register={register}
                    registerName="website"
                    errors={errors}
                  />
                </div>
                <div>
                  <InputField
                    label="Working Hours"
                    id="workingHours"
                    name="workingHours"
                    icon={IoPersonOutline}
                    type="text"
                    placeholder="Type your working hours"
                    register={register}
                    registerName="workingHours"
                    errors={errors}
                  />
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InputField
                    label="Create a Password"
                    asterisk={true}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    // icon={lockIcon} // ✅ lock icon here
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
                    // icon={lockIcon} // ✅ lock icon here
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

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex justify-center bg-[#28A2FF] text-white py-3 px-4 rounded-lg font-medium text-lg transition-colors mt-6 cursor-pointer"
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
      </OnBoardingLayout>
    </>
  );
};

export default SignupForm;
