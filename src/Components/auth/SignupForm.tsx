import React, { useState } from "react";
import dummyImage from "@assets/media/images/signup-img.png";
import InputField from "../InputField";
import { IoPersonOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import SelectField from "../SelectField";
import signupLogo from "@assets/media/images/signup-logo.png";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  maritalStatus: string;
  insuranceType: string;
  password: string;
  confirmPassword: string;
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
  });

  const [errors, setErrors] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    maritalStatus: "",
    insuranceType: "",
    password: "",
    confirmPassword: "",
  });
  // select data population
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
    { value: "prefer-not-to-say", label: "Prefer not to say" },
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


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const validateForm = () => {
    const newErrors: FormData = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      age: "",
      gender: "",
      maritalStatus: "",
      insuranceType: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required.";
    if (!formData.phone || formData.phone.length < 10) newErrors.phone = "Valid phone number is required.";
    if (!formData.age) newErrors.age = "Age is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.maritalStatus) newErrors.maritalStatus = "Marital status is required.";
    if (!formData.insuranceType) newErrors.insuranceType = "Insurance type is required.";
    if (!formData.password || formData.password.length < 8) newErrors.password = "Password must be at least 8 characters.";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords must match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate form submission
      console.log("Form Submitted", formData);
      // Reset form after successful submission (Optional)
      setFormData({
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
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center w-full bg-white rounded-lg shadow-lg p-8 space-x-8">
        {/* Image */}
        <div className="flex-shrink-0 w-1/2">
          <img
            src={dummyImage}
            alt="User Image"
            className="w-full h-auto object-cover rounded-[10px]"
          />
        </div>

        {/* Form */}
        <div className="w-1/2">
         {/* Logo Image */}
          <div className="flex justify-center mb-6">
            <img
              src={signupLogo} 
              alt="Signup Logo"
              className="w-[243px] h-[55px]"
            />
          </div>
          <p className="text-[#1A1A1A] text-[35px] font-bold leading-[140%] tracking-normal font-[Space Grotesk] mb-3">
            Sign Up
          </p>
          <p className="text-[#252525CC] text-[16px] font-normal leading-[150%] tracking-[0%] font-[Geist] mb-6">
            Join to explore and share care insights
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <InputField
                  label="First Name"
                  asterisk={true}
                  icon={IoPersonOutline}
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  errorMessage={errors.firstName}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
              </div>
              <div>
                <InputField
                  label="Last Name"
                  asterisk={true}
                  icon={IoPersonOutline}
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  errorMessage={errors.firstName}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
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
                  value={formData.email}
                  onChange={handleChange}
                  errorMessage={errors.firstName}
                  placeholder="e.g. username@mail.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
              <div>
                <InputField
                  label="Phone Number"
                  asterisk={true}
                  icon={IoCallOutline}
                  id="phone"
                  name="phone"
                  type="number"
                  value={formData.phone}
                  onChange={handleChange}
                  errorMessage={errors.firstName}
                  placeholder="e.g., +1 800 555 1234"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <InputField
                  label="Age"
                  asterisk={true} // Display asterisk for required field
                  icon={IoPersonOutline} // Use appropriate icon (you can change the icon as needed)
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  errorMessage={errors.age} // Display error message for age
                  placeholder="Enter your age" // Placeholder text
                />
                {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>} {/* Display error message if any */}
              </div>
              <div>
                <SelectField
                  label="Gender"
                  id="gender"
                  name="gender"
                  asterisk={true}
                  value={formData.gender}
                  onChange={handleChange}
                  options={genderOptions}
                  errorMessage={errors.gender}
                />
                {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
              </div>
            </div>

            {/* Marital Status, and Insurance Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <SelectField
                  label="Marital Status"
                  id="maritalStatus" 
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  options={maritalStatusOptions}
                  errorMessage={errors.maritalStatus}
                />
                {errors.maritalStatus && <p className="mt-1 text-sm text-red-600">{errors.maritalStatus}</p>}
              </div>
              <div>
                <SelectField
                label="Insurance Type"
                id="insuranceType"
                name="insuranceType"
                value={formData.insuranceType}
                onChange={handleChange}
                options={insuranceTypeOptions}
                errorMessage={errors.insuranceType}
              />
                {errors.insuranceType && <p className="mt-1 text-sm text-red-600">{errors.insuranceType}</p>}
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
                  value={formData.password}
                  onChange={handleChange}
                  errorMessage={errors.password}
                  placeholder="Enter your password"
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>
              <div>
                <InputField
                  label="Confirm Password"
                  asterisk={true}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  errorMessage={errors.confirmPassword}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-lg transition-colors"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
