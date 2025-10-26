import InputField from "@components/input-field";
import Spinner from "@components/loaders/spinner";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoPersonOutline } from "react-icons/io5";
import { IoLockClosedOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
    rememberMe: false,
  });

  const navigate=useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const { mutateAsync: loginMutation, isPending: isLoginLoading } = useMutation(
    {
      mutationFn: ({ data }) => ApiLogin(data),

      onSuccess: async (response) => {
        const token = localStorage.getItem("token");

        if (response?.user?.role_type == "PATIENT") {
          navigate("/patient/dashboard");
        } else if (response?.user?.role_type == "CARE_PROVIDER") {
          navigate("/care-provider");
        } else {
          return toast.error("You account is not valid");
        }
        toast.success("Login Successful");
      },
      onError: (response) => {},
    }
  );

  const LoginSubmit = async (data) => {
    await loginMutation({ data });
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-gray-800 mb-3">
          You need to Login
        </h2>
        <p className="text-gray-600 mb-6">to view this view</p>

          <form
          onSubmit={handleSubmit(LoginSubmit)}
          className="space-y-6 w-full items-center"
        >

        </form>
        <div className="space-y-4">
          <InputField
            label="Email"
            asterisk={true}
            icon={IoPersonOutline}
            type="text"
            onChange={handleChange}
            placeholder="e.g. john"
            register={register}
            className="pr-10"
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

          <InputField
            label="Password"
            asterisk={true}
            icon={IoLockClosedOutline}
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="***************"
            register={register}
            registerName="password"
            errors={errors}
            className="pr-10"
            validation={{
              required: "Password is required",
            }}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#28A2FF] flex justify-center items-center text-white h-[50px] px-4 rounded-lg font-medium text-lg transition-colors cursor-pointer mb-1"
        >
          <span>{isLoginLoading ? <Spinner /> : "Login"}</span>
        </button>

        <button
          onClick={onClose}
          className="mt-4 cursor-pointer text-sm text-gray-400 hover:text-gray-600 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const modalRoot = document.getElementById("modal-root") as HTMLElement;
  return ReactDOM.createPortal(modalContent, modalRoot);
};

export default LoginModal;
