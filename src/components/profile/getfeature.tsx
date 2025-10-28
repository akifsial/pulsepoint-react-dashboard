import React, { use, useEffect, useState } from "react";
import featureBg from "../../assets/media/images/dashboard-images/featureBg.png";
import ProfileCards from "./profilecards";
import BillingCheckout from "./billingcheckout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiCreatePayment } from "@src/api/apicommunityforum";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ApiMe } from "@src/api/apiusers";
import { useQuery } from "@tanstack/react-query";
import SelectField from "@components/selectfield";
const GetFeature = () => {
  const [billingCheck, setBillingCheck] = useState(false);
  const navigate = useNavigate();
  const [subscriptionTime, setSubscriptionTime] = useState("");
  const { data: user,refetch, isLoading: isUserLoading } = useQuery({
    queryKey: ["me"],
    queryFn: ApiMe,
  });

  
    useEffect(()=>{
      refetch()
    },[])
  
  const points = [
    {
      title: "Appear at the Top of Search Results",
      description:
        "Get more visibility, build trust, and attract the right patients by featuring your facility on our care provider network.",
    },
    {
      title: "Highlighted Profile",
      description:
        'Your listing will be visually marked as "Featured" with a badge and custom banner.',
    },
    {
      title: "Boost Trust & Credibility",
      description:
        "Get more visibility, build trust, and attract the right patients by featuring your facility on our care provider network.",
    },
    {
      title: "Access Analytics",
      description:
        "Get more visibility, build trust, and attract the right patients by featuring your facility on our care provider network.",
    },
  ];

  const queryClient=useQueryClient()

  const { mutateAsync: paymentMutation, isPending: isPendingPaymentMutation } =
    useMutation({
      mutationFn: (data) => ApiCreatePayment(data),

      onSuccess: async (data) => {
        queryClient.invalidateQueries(["UseApiPaymentsHistory"]); 

        if (data?.free_plan_active == true) {
          return toast.success("Free Plan Subscribe Successfully");
        } else {
          window.location.href = data?.url;
        }
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message);
      },
    });
  const handlePlan = async (plan) => {
    let data;

    if (plan == "FREE") {
      data = {
        plan: plan,
      };
    } else {
      data = {
        plan: subscriptionTime == "yearly" ? "BASIC_YEARLY" : plan,
      };
    }
    await paymentMutation(data);
  };

  return (
    <>
      {billingCheck ? (
        <BillingCheckout />
      ) : (
        <>
          <h2 className="text-[25px] space-grotesk font-bold text-[#181D27] font-[Space Grotesk] mb-6">
            Feature My Facility
          </h2>

      
          <div className="flex justify-between items-center mb-10 ">
            <h4 className="text-[25px] font-bold text-[#181D27] font-[Space Grotesk] mb-3">
            </h4>


            <select
              name="subscription"
              className="md:w-[49%] w-full border border-gray-300 rounded px-3 py-2 text-sm"
              onChange={(e) => setSubscriptionTime(e.target.value)}
            >
              <option value="monthly">Monthly Subscription</option>
              <option value="yearly">Yearly Subscription</option>
            </select>
          </div>
          <ProfileCards
            subscriptionTime={subscriptionTime}
            onUpgrade={handlePlan}
            user={user}
          />
        
        </>
      )}
    </>
  );
};

export default GetFeature;
