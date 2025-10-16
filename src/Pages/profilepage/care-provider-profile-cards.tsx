import React from "react";
import tickGreen from "../../assets/media/svgs/dashboard-svgs/tick-circle.svg";
import crown from "../../assets/media/svgs/dashboard-svgs/crown.svg";
import crownWhite from "../../assets/media/svgs/dashboard-svgs/crownWhite.svg";
import { PrimaryButton } from "@components/shared-components/buttons/common-button/common-button";

const plans = [
  {
    title: "Basic",
    price: "$49/month",
    features: [
      // "Highlighted listing in search results",
      // "Featured badge on profile",
      // "Up to 5 photos",
      // "Insights dashboard (views, clicks, contacts)",
      // "Increased profile detail (more photos, description)",
      // "AI chatbot use",
       "Increased profile detail (more photos, description)",
       "AI chatbot use"
    ],
    highlighted: false,
    slug: "BASIC",
  },
  {
    title: "Premium",
    price: "$79.99/month",
    features: [
      // "All Basic Plan features",
      "All Basic Plan features",
      "Featured placement on homepage or category pages",
      "Increased visibility and ranking across the platform",
    //   "AI chatbot use",
      // "Everything in Starter",
      // "Appear in featured sections (homepage, category pages)",
      // "Insights dashboard (views, clicks, contacts)",
      // "Link to booking form or EHR system",
    ],
    highlighted: true,
    slug: "PREMIUM",
  },
  // {
  //   title: "Enterprise Plan",
  //   price: "$120/month",
  //   features: [
  //     "Everything in Professional",
  //     "Priority support",
  //     "Quarterly performance report & SEO audit",
  //     "Multi-location support",
  //   ],
  //   highlighted: false,
  //   slug: "ENTERPRISE",
  // },
];

const CareProviderProfileCards = ({ onUpgrade }) => {
  return (
    <div className="md:flex gap-2 flex-wrap justify-center mb-6">
      {plans.map((plan, index) => {
        const isHighlighted = plan.highlighted;

        return (
          <div
            key={index}
            className={`md:w-[33%] w-full md:mb-0 mb-5 md:max-w-sm flex flex-col justify-between rounded-[10px] p-5 ${
              isHighlighted
                ? "bg-[#023552] text-white"
                : "bg-white text-[#252525] border border-gray-200"
            }`}
          >
            <div>
              <h3 className="text-lg space-grotesk font-semibold mb-3">{plan.title}</h3>

              <div
                className={`text-3xl font-bold mb-4 inline-block px-4 py-[9px] rounded-[5px] ${
                  isHighlighted
                    ? "bg-[#022D46] text-white"
                    : "bg-[#EAF6FF] text-[#007AB2]"
                }`}
              >
                <h2 className="space-grotesk"> {plan.price}</h2>
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

export default CareProviderProfileCards;
