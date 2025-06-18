import React from "react";
import tickGreen from "../../assets/media/svgs/dashboard-svgs/tick-circle.svg";
import crown from "../../assets/media/svgs/dashboard-svgs/crown.svg";
import crownWhite from "../../assets/media/svgs/dashboard-svgs/crownWhite.svg";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";

const plans = [
  {
    title: "Starter Plan",
    price: "$49/month",
    features: [
      "Highlighted listing in search results",
      "Featured badge on profile",
      "Up to 5 photos",
      "Insights dashboard (views, clicks, contacts)",
    ],
    highlighted: false,
  },
  {
    title: "Professional Plan",
    price: "$99/month",
    features: [
      "Everything in Starter",
      "Appear in featured sections (homepage, category pages)",
      "Insights dashboard (views, clicks, contacts)",
      "Link to booking form or EHR system",
    ],
    highlighted: true,
  },
  {
    title: "Enterprise Plan",
    price: "$120/month",
    features: [
      "Everything in Professional",
      "Priority support",
      "Quarterly performance report & SEO audit",
      "Multi-location support",
    ],
    highlighted: false,
  },
];

const ProfileCards = () => {
  return (
    <div className="flex gap-2 justify-between mb-6">
      {plans.map((plan, index) => {
        const isHighlighted = plan.highlighted;

        return (
          <div
            key={index}
            className={`w-[33%] max-w-sm flex flex-col justify-between rounded-[10px] p-5 ${
              isHighlighted
                ? "bg-[#023552] text-white"
                : "bg-white text-black border border-gray-200"
            }`}
          >
            <div>
              <h3 className="text-xl font-semibold mb-4">{plan.title}</h3>

              <div
                className={`text-3xl font-bold mb-4 inline-block px-4 py-[9px] rounded-[5px] ${
                  isHighlighted
                    ? "bg-[#022D46] text-white"
                    : "bg-[#EAF6FF] text-[#007AB2]"
                }`}
              >
                {plan.price}
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <img src={tickGreen} alt="tick" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <PrimaryButton
              btnText="Upgrade Now"
              showImg={true}
              img={isHighlighted ? crown : crownWhite}
              btnClass={`w-full h-[46px] !rounded-[10px] px-4 py-[10px] text-sm font-semibold leading-[33px] gap-2.5 flex items-center justify-center ${
                isHighlighted
                  ? "bg-[#F8C01A] border border-[#F8C01A] text-[#252525]"
                  : "bg-[#28A2FF] border border-[#28A2FF] text-white"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProfileCards;
