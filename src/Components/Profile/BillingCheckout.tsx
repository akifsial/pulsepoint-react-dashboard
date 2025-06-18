import React, { useState } from "react";
import InputField from "../InputField";
import { IoMailOutline } from "react-icons/io5";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";

const BillingCheckout: React.FC = () => {
  // Define state for the input fields
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expirationDate: "",
    cvc: "",
  });

  const [errors, setErrors] = useState({
    cardName: "",
    cardNumber: "",
    expirationDate: "",
    cvc: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Proceeding with checkout...", formData);
  };

  return (
    <>
      <h2 className="text-[25px] font-[700] leading-[32px] tracking-normal text-[#181D27] text-left mb-6">
        Billing and Checkout
      </h2>
      <div className="min-h-screen bg-gradient-to-r flex">
        <div className="bg-white rounded-lg shadow-lg w-full max-h-[450px] sm:w-full lg:w-full xl:w-full max-w-full p-8">
          <div className="space-y-6">
            {/* Heading */}
            <div>
              <p className="text-[#1A1A1A] text-[20px] font-[700] leading-[140%] tracking-normal font-[Space Grotesk] mb-3">
                Add Account Information
              </p>
            </div>

            {/* Name on Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <InputField
                  label="Name on Card:"
                  id="cardName"
                  name="cardName"
                  type="text"
                  value={formData.cardName}
                  onChange={handleChange}
                  errorMessage={errors.cardName}
                  placeholder="Enter name on card"
                />
                {errors.cardName && (
                  <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>
                )}
              </div>

              {/* Card Number */}
              <div>
                <InputField
                  label="Card Number:"
                  id="cardNumber"
                  name="cardNumber"
                  type="text"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  errorMessage={errors.cardNumber}
                  placeholder="Enter card number"
                />
                {errors.cardNumber && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.cardNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Expiration Date and CVC */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <InputField
                  label="Expiration Date:"
                  id="expirationDate"
                  name="expirationDate"
                  type="text"
                  value={formData.expirationDate}
                  onChange={handleChange}
                  errorMessage={errors.expirationDate}
                  placeholder="mm/yy"
                />
                {errors.expirationDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.expirationDate}
                  </p>
                )}
              </div>

              <div>
                <InputField
                  label="CVC:"
                  id="cvc"
                  name="cvc"
                  type="text"
                  value={formData.cvc}
                  onChange={handleChange}
                  errorMessage={errors.cvc}
                  placeholder="Enter CVC"
                />
                {errors.cvc && (
                  <p className="mt-1 text-sm text-red-600">{errors.cvc}</p>
                )}
              </div>
            </div>

            <PrimaryButton
              btnText="Checkout Now"
              btnClass="mt-2 w-[252px] h-[46px] bg-[#28A2FF] text-white rounded-[10px] gap-[10px] p-[10px] text-[14px] font-semibold leading-[24px] tracking-normal align-middle hover:bg-[#1e8bbf] transition border border-[#252525]"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BillingCheckout;
