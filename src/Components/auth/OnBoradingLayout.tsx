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

const OnBoardingLayout = ({ children }) => {
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
    };

    return (
        <div className="min-h-screen w-full bg-[linear-gradient(107.76deg,_#F4F7FF_-2.99%,_#DDEFF7_64.85%,_#D6E0F9_113.61%)] flex items-center justify-center gap-[20px] py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex-shrink-0 w-1/2 bg-[#FAFAFA]">
                {/* Image */}
                <img
                    src={dummyImage}
                    alt="User Image"
                    className="w-full h-auto object-cover rounded-[10px]"
                />
            </div>

            {/* Form */}
            <div className="w-full bg-white p-8 rounded-[10px]">
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

                {children}
            </div>
        </div>
    );
};

export default OnBoardingLayout;
