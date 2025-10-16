import React, { useState } from "react";
import tickGreen from "../../assets/media/svgs/dashboard-svgs/tick-circle.svg";
import crown from "../../assets/media/svgs/dashboard-svgs/crown.svg";
import crownWhite from "../../assets/media/svgs/dashboard-svgs/crownWhite.svg";
import { PrimaryButton } from "@components/shared-components/buttons/common-button/common-button";

const plans = [
  {
    title: "Free Plan",
    price: "$0/month",
    features: [
      // "Highlighted listing in search results",
      // "Featured badge on profile",
      // "Up to 5 photos",
      // "Insights dashboard (views, clicks, contacts)",
      // "Increased profile detail (more photos, description)",
      // "AI chatbot use",
      "All Premium Plan features",
      "Users can interact with the chatbot up to *5 times per month free",
    ],
    highlighted: false,
    slug: "FREE",
  },
  {
    title: "Basic",
    price: "$5.99/month",
    features: [
      // "All Basic Plan features",
      // "Featured placement on homepage or category pages",
      // "Increased visibility and ranking across the platform",
      // "Increased profile detail (more photos, description)",
      "Unlimited AI Chatbot Use",
      // "Everything in Starter",
      // "Appear in featured sections (homepage, category pages)",
      // "Insights dashboard (views, clicks, contacts)",
      // "Link to booking form or EHR system",
    ],
    highlighted: true,
    slug: "BASIC",
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

const ProfileCards = ({ onUpgrade, subscriptionTime, user }) => {
  const [loadingSlug, setLoadingSlug] = useState("");

  const handleUpgrade = async (slug: string) => {
    setLoadingSlug(slug); // Show loader on selected button
    try {
      await onUpgrade(slug); // Call API or parent function
    } catch (error) {
      console.error("Upgrade failed:", error);
    } finally {
      setLoadingSlug(""); // Hide loader
    }
  };

  return (
    <div className="md:flex gap-2 flex-wrap justify-center mb-6">
      {plans?.map((plan, index) => {
        const isHighlighted = plan.highlighted;
        const isCurrentPlan = plan.slug === "FREE" && user?.has_used_free;

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
              <h3 className="text-lg font-semibold mb-3 space-grotesk">{plan.title}</h3>

              <div
                className={`text-3xl  font-bold mb-4 inline-block px-4 py-[9px] rounded-[5px] ${
                  isHighlighted
                    ? "bg-[#022D46] text-white"
                    : "bg-[#EAF6FF] text-[#007AB2]"
                }`}
              >
                <h2 className="space-grotesk">
                  {" "}
                  {plan.title == "Free Plan"
                    ? plan.price
                    : subscriptionTime == "yearly"
                    ? "$50/yearly"
                    : plan.price}
                </h2>
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

            {/* <PrimaryButton
              btnText={loadingSlug ? "Processing..." : "Subscribe Now"}
              showImg={!loadingSlug}
              img={isHighlighted ? crown : crownWhite}
              disabled={loadingSlug}
              onClick={() => handleUpgrade(plan.slug)}
              btnClass={`w-full h-[46px] !rounded-[10px] px-4 py-[10px] text-sm font-semibold leading-[33px] gap-2.5 flex items-center justify-center ${
                isHighlighted
                  ? "bg-[#F8C01A] border border-[#F8C01A] text-[#252525]"
                  : "bg-[#28A2FF] border border-[#28A2FF] text-white"
              }`}
            /> */}

            {/* {isCurrentPlan ? ( */}
            {/* <button
                disabled
                className={`w-full h-[46px] cursor-not-allowed rounded-[10px] px-4 py-[10px] text-sm font-semibold leading-[33px] gap-2.5 flex items-center justify-center ${
                  isHighlighted
                    ? "bg-gray-300 border border-gray-300 text-gray-600"
                    : "bg-gray-200 border border-gray-200 text-gray-500"
                }`}
              >
                Current Plan
              </button> */}
            {/* ) : loadingSlug === plan.slug ? ( */}
            {/* <button
                disabled
                className={`w-full h-[46px] cursor-not-allowed rounded-[10px] px-4 py-[10px] text-sm font-semibold leading-[33px] gap-2.5 flex items-center justify-center ${
                  isHighlighted
                    ? "bg-yellow-400 border border-yellow-400 text-gray-800"
                    : "bg-blue-400 border border-blue-400 text-white"
                }`}
              >
                Processing...
              </button> */}
            {/* ) : ( */}
            <button
              onClick={() => handleUpgrade(plan.slug)}
              disabled={loadingSlug === plan.slug}
              className={`w-full h-[46px] cursor-pointer rounded-[10px] px-4 py-[10px] text-sm font-semibold leading-[33px] gap-2.5 flex items-center justify-center ${
                isHighlighted
                  ? "bg-[#F8C01A] border border-[#F8C01A] text-[#252525]"
                  : "bg-[#28A2FF] border border-[#28A2FF] text-white"
              }`}
            >
              {loadingSlug === plan.slug ? (
                "Processing..."
              ) : (
                <>
                  <img
                    src={isHighlighted ? crown : crownWhite}
                    alt="crown"
                    className="mr-2"
                  />
                  Subscribe Now
                </>
              )}
            </button>
            {/* )} */}
          </div>
        );
      })}
    </div>
  );
};

export default ProfileCards;
