import React, { useState } from "react";
import InputField from "../inputfield";
import SelectField from "../selectfield";
import OnBoardingLayout from "./onboradinglayout";
import { Link, useNavigate } from "react-router-dom";
import { Globe } from "lucide-react";
import SocialLoginSection from "../socialloginsection";

import { IoPersonOutline, IoCallOutline, IoMailOutline, IoLocationSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ApiRegister } from "@src/api/authapi/authapi";
import Spinner from "@components/loaders/spinner";
import { useAllApiInsuranceTypes, useAllApiProviderTypes } from "@src/hooks/useusers";

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


  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

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

  const handleCommunicationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      let updatedPreferredCommunication = [...prev.preferredCommunication];
      if (checked) {
        updatedPreferredCommunication.push(value);
      } else {
        updatedPreferredCommunication = updatedPreferredCommunication.filter((item) => item !== value);
      }
      return { ...prev, preferredCommunication: updatedPreferredCommunication };
    });
  };

  const { mutateAsync: registerMutation, isPending: isRegisterPending } = useMutation({
    mutationFn: ({ data }) => ApiRegister(data),

    onSuccess: async () => {
      toast.success("Care Provider Created Successfully");
      navigate("/care-provider/login");
    },
    onError: (err) => {},
  });

  const RegisterSubmit = async (data) => {
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
      specialization: "Neuro Specialization",
      city: data.city,
      provider_type_id: 1,
      state: data.state,
      address: data.streetAddress,
      website_url: "yeah.com",
      working_hours: "Uk Bargingham Street ",
      marital_status: data.maritalStatus,
    };
    await registerMutation({ data: registerData });
  };

  return (
    <>
      <OnBoardingLayout>
        <div className="min-h-screen max-h-screen flex flex-col">
          <form onSubmit={handleSubmit(RegisterSubmit)} className="space-y-6 overflow-y-auto ">
            <div className="px-4 py-6">
              <p className="text-[#1A1A1A] text-[35px] font-bold leading-[140%] tracking-normal font-[Space Grotesk] mb-3">Sign Up</p>
              <p className="text-[#252525CC] text-[16px] font-normal leading-[150%] tracking-[0%] font-[Geist] mb-6">Create Your Provider Account</p>
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

              <div className="grid grid-cols-1">
                <div>
                  <InputField label="Website Url (optional)" icon={IoPersonOutline} id="website" name="website" type="text" placeholder="e.g., www.topseniorspot.com" register={register} registerName="website" errors={errors} />
                </div>
                <div>
                  <InputField label="Working Hours" id="workingHours" name="workingHours" icon={IoPersonOutline} type="text" placeholder="Type your working hours" register={register} registerName="workingHours" errors={errors} />
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
                    validation={{
                      required: "Confirm Password is required",
                      validate: (value) => value === password || "Passwords do not match",
                    }}
                  />
                  {confirmPassword && confirmPassword === password && !errors.confirmPassword && " "}
                </div>
              </div>

             

              <button type="submit" className="w-full flex justify-center bg-[#28A2FF] text-white py-3 px-4 rounded-lg font-medium text-lg transition-colors mt-6 cursor-pointer">
                {isRegisterPending ? <Spinner /> : "Sign Up"}
              </button>
              <SocialLoginSection
                action="login"
              />
              <div className="flex justify-center mt-6">
                <p className="text-[16px] leading-[25px] tracking-[0.005em] text-center align-middle font-normal text-[#49475A] font-[Geist]">
                  Already have an account?{" "}
                  <Link to="/care-provider/login" className="text-[16px] leading-[25px] tracking-[0.005em] text-center align-middle font-normal underline text-[#28A2FF] font-[Geist]">
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
