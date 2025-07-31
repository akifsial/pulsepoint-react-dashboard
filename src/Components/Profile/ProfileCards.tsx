import React from "react";
import tickGreen from "../../assets/media/svgs/dashboard-svgs/tick-circle.svg";
import crown from "../../assets/media/svgs/dashboard-svgs/crown.svg";
import crownWhite from "../../assets/media/svgs/dashboard-svgs/crownWhite.svg";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";

const plans = [
  {
    title: "Basic Plan",
    price: "$49/month",
    features: [
      // "Highlighted listing in search results",
      // "Featured badge on profile",
      // "Up to 5 photos",
      // "Insights dashboard (views, clicks, contacts)",
      "Increased profile detail (more photos, description)",
      "AI chatbot use",
    ],
    highlighted: false,
    slug: "STARTER",
  },
  {
    title: "Premium Plan",
    price: "$79/month",
    features: [
      "All Basic Plan features",
      "Featured placement on homepage or category pages",
      "Increased visibility and ranking across the platform",
      "Increased profile detail (more photos, description)",
      "AI chatbot use",
      // "Everything in Starter",
      // "Appear in featured sections (homepage, category pages)",
      // "Insights dashboard (views, clicks, contacts)",
      // "Link to booking form or EHR system",
    ],
    highlighted: true,
    slug: "PROFESSIONAL",
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
    slug: "ENTERPRISE",
  },
];

const ProfileCards = ({ onUpgrade }) => {
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
                : "bg-white text-[#252525] border border-gray-200"
            }`}
          >
            <div>
              <h3 className="text-lg font-semibold mb-3">{plan.title}</h3>

              <div
                className={`text-3xl font-bold mb-4 inline-block px-4 py-[9px] rounded-[5px] ${
                  isHighlighted
                    ? "bg-[#022D46] text-white"
                    : "bg-[#EAF6FF] text-[#007AB2]"
                }`}
              >
                <h2> {plan.price}</h2>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex font-normal items-center gap-1.5"
                  >
                    <img src={tickGreen} alt="tick" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <PrimaryButton
              btnText="Subscribe Now"
              showImg={true}
              img={isHighlighted ? crown : crownWhite}
              onClick={() => onUpgrade(plan?.slug)}
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
