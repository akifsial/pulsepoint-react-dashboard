import React, { useState } from "react";
import InputField from "../inputfield";
import SelectField from "../selectfield";
import OnBoardingLayout from "./onboradinglayout";
import { Link, useNavigate } from "react-router-dom";
import SocialLoginSection from "../socialloginsection";
import {
  IoPersonOutline,
  IoCallOutline,
  IoMailOutline,
  IoLocationSharp,
} from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ApiRegister } from "@src/api/authapi/authapi";
import Spinner from "@components/loaders/spinner";
import { useAllApiInsuranceTypes } from "@src/hooks/useusers";
import { ArrowLeft } from "lucide-react";

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

const PatientSignupForm = () => {
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
    { value: "1", label: "Health Insurance" },
    { value: "2", label: "Dental Insurance" },
    { value: "3", label: "Vision Insurance" },
    { value: "4", label: "Life Insurance" },
    { value: "5", label: "Disability Insurance" },
  ];
  const cityOptions = [
    { value: "new_york", label: "New York" },
    { value: "los_angeles", label: "Los Angeles" },
    { value: "chicago", label: "Chicago" },
    { value: "houston", label: "Houston" },
    { value: "miami", label: "Miami" },
  ];

  const { data: InsuranceData } = useAllApiInsuranceTypes();
  const insuranceOptions =
    InsuranceData?.records?.map((insurance) => ({
      label: insurance.name,
      value: insurance.id,
    })) || [];

  const [preferredMethod, setPreferredMethod] = useState("");
  const handleMethodChange = (e) => {
    setPreferredMethod(e.target.value);
  };

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
        navigate("/patient/login");
      },
      onError: (error) => {
      },
    });

  const RegisterSubmit = async (data) => {
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
      specialization: "Neuro Specialization",
      city: data.city,
      provider_type_id: 1,
      state: data.state,
      address: data.streetAddress,
      website_url: "yeah.com",
      working_hours: "Uk Bargingham Street ",
      marital_status: data.maritalStatus,
      communication_method_id: preferredMethod,
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
              <p className="text-[#252525] text-[16px] font-normal leading-[150%] tracking-[0%] font-[Geist] mb-6">
                Join to explore and share care insights
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InputField
                    label="User Name"
                    asterisk={true}
                    icon={IoPersonOutline}
                    id="userName"
                    name="userName"
                    type="text"
                    placeholder="Enter your user name"
                    register={register}
                    registerName="userName"
                    errors={errors}
                    validation={{
                      required: "First Name is required",
                    }}
                  />
                </div>

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
                      required: "Phone is required",
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InputField
                    label="Age"
                    asterisk={true}
                    icon={IoPersonOutline}
                    id="age"
                    name="age"
                    type="number"
                    placeholder="Enter your age"
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
                    errors={errors}
                    validation={{
                      required: "Insurance Type is required",
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 ">
                <InputField
                  label="Care Needs (Optional)"
                  id="careNeeds"
                  name="careNeeds"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InputField
                    label="Zip Code"
                    asterisk={true}
                    id="postal_code"
                    name="postal_code"
                    type="text"
                    placeholder="Enter your zip code"
                    icon={IoLocationSharp}
                    register={register}
                    registerName="postal_code"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InputField
                    label="State"
                    asterisk={true}
                    id="state"
                    name="state"
                    type="text"
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
                    type="text"
                    placeholder="e.g., 123 Main Street"
                    icon={IoLocationSharp}
                    register={register}
                    registerName="streetAddress"
                    errors={errors}
                    validation={{
                      required: "Address is required",
                    }}
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
            

              <div className="space-y-4">
                <p className="text-md font-semibold">
                  Preferred Communication Method
                </p>
                <div className="flex text-[16px] font-[500] text-[#333333] leading-[140%] tracking-[0%] font-[Geist] space-x-6">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="1"
                      name="preferredCommunication"
                      value="1"
                      checked={preferredMethod === "1"}
                      onChange={handleMethodChange}
                      className="mr-2 scale-150 border-[#FFFFFF] align-middle"
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

              <button
                type="submit"
                className="w-full flex justify-center bg-[#28A2FF] text-white py-3 px-4 rounded-lg font-medium text-lg transition-colors mt-6 cursor-pointer"
              >
                {isRegisterPending ? <Spinner /> : "Sign Up"}
              </button>
              <SocialLoginSection
                action="login"
              />
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
      </OnBoardingLayout>
    </>
  );
};

export default PatientSignupForm;
