import React, { useState } from "react";
import InputField from "../inputfield";
import { PrimaryButton } from "@components/Sharedcomponents/Buttons/Commonbutton/commonbutton";
import successIcon from "@assets/media/images/reset-success-icon.png"; 
import { IoCalendarOutline, IoCardOutline, IoEllipsisHorizontal, IoPersonOutline } from "react-icons/io5";

const BillingCheckout: React.FC = () => {
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

  const [isCheckoutSuccessful, setIsCheckoutSuccessful] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckoutSuccessful(true);
  };

  return (
    <>
      {isCheckoutSuccessful ? (
        <div className="bg-white rounded-lg shadow-lg w-full min-h-screen sm:w-full lg:w-full xl:w-full max-w-full p-8 flex justify-center items-center">
          <div className="text-center p-6 rounded-lg">
            <div className="flex items-center justify-center mb-4">
              <div className="w-[86px] h-[86px] rounded-full flex items-center justify-center">
                <img src={successIcon} alt="Success Icon" />
              </div>
            </div>

            <h2 className="text-[25px] font-[700] leading-[32px] tracking-normal text-[#181D27] text-center mb-6">
              Premium Activated Successfully!
            </h2>
            <p className="text-[16px] font-[400] leading-[25px] tracking-normal text-[#181D27] font-[Geist] mt-2">
              Thank you for upgrading to the Premium Plan.
            </p>

            <p className="text-[16px] font-[600] leading-[25px] tracking-normal text-[#181D27] font-[Geist] text-center mt-4">
              (Click on the chatbot icon.)
            </p>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-r flex">
          <div className="bg-white rounded-lg shadow-lg w-full max-h-[450px] sm:w-full lg:w-full xl:w-full max-w-full p-8">
            <div className="space-y-6">
              <div>
                <p className="text-[#1A1A1A] text-[20px] font-[700] leading-[140%] tracking-normal font-[Space Grotesk] mb-3">
                  Add Account Information
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InputField
                    label="Name on Card:"
                    icon={IoPersonOutline}
                    id="cardName"
                    name="cardName"
                    type="text"
                    value={formData.cardName}
                    onChange={handleChange}
                    errorMessage={errors.cardName}
                    placeholder="Enter name on card"
                  />
                  {errors.cardName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.cardName}
                    </p>
                  )}
                </div>

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
                    icon={IoCardOutline}
                  />
                  {errors.cardNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.cardNumber}
                    </p>
                  )}
                </div>
              </div>

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
                    placeholder="dd/mm/yyyy"
                      icon={IoCalendarOutline} 
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
                    icon={IoEllipsisHorizontal}
                  />
                  {errors.cvc && (
                    <p className="mt-1 text-sm text-red-600">{errors.cvc}</p>
                  )}
                </div>
              </div>

              <PrimaryButton
                btnText="Checkout Now"
                btnClass="mt-2 w-[252px] h-[46px] bg-[#28A2FF] text-white !rounded-[10px] gap-[10px] p-[10px] text-[14px] font-semibold leading-[24px] tracking-normal align-middle hover:bg-[#1e8bbf] transition border"
                onClick={handleCheckout}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BillingCheckout;
