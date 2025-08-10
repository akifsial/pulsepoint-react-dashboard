import React, { useState } from "react";
// import arrowIcon from "@assets/media/images/arrow-down.svg";

import OnBoardingLayout from "../OnBoradingLayout";
import { Link, useNavigate } from "react-router-dom";
import { Globe } from "lucide-react";

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
import RegisterCareprovider from "./RegisterCareprovider";
import RegisterPatient from "./RegisterPatient";

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

const RegisterForm = () => {
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

  const [selectUser, setSelectUser] = useState("");
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

  // console.log("InsuranceDataInsuranceDataInsuranceData", InsuranceData);
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
        toast.success("Care Provider Created Successfully");
        // navigate("/login");
        navigate("/care-provider/login");
      },
      onError: (err) => {
        // console.log("errrorr",error.message)
        // toast.error("Failed to Create Care Provider");
        // toast.error(error);
        // toast.error(err?.message)
        console.log("eeeee", err.message);
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

  const registerOptions = [
    { label: "Select Users", value: "" },
    { label: "Care Provider", value: "care_provider" },
    { label: "Patient", value: "patient" },
  ];

  console.log("seeeeeeeeiiiiiiii", selectUser);

  return (
    <>
      {selectUser == "care_provider" ? (
        <RegisterCareprovider />
      ) : selectUser == "patient" ? (
        <RegisterPatient />
      ) : (
        ""
      )}

      {selectUser == "" ? (
        <OnBoardingLayout>
          <div className="min-h-screen max-h-screen flex  flex-col">
            <div className="mt-10">
              <label for="register">Choose where to register</label>
              <select
                id="register"
                name="register"
                className="w-full h-[50px] bg-[#FBFCFD] border border-[#2525251A] rounded-[8px] p-[15px] font-[Geist] text-[16px] font-normal text-[#1A1A1A] leading-[140%] tracking-[0%] placeholder:text-gray-500 focus:outline-none "
                onChange={(e) => setSelectUser(e.target.value)}
              >
                {registerOptions?.map((opt) => (
                  <option value={opt?.value}>{opt?.label}</option>
                ))}
              </select>
            </div>
          </div>
        </OnBoardingLayout>
      ) : (
        ""
      )}
    </>
  );
};

export default RegisterForm;
