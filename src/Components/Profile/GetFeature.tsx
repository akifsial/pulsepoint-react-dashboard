import React, { useState } from 'react'
import featureBg from "../../assets/media/images/dashboard-images/featureBg.png"
import ProfileCards from './ProfileCards'
import BillingCheckout from './BillingCheckout'
const GetFeature = () => {
 const [billingCheck, setBillingCheck] = useState(false)
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

  return (
    <>
    {billingCheck?
    (<BillingCheckout/>):( 
    <>
    <h2 className="text-[25px] font-bold text-[#181D27] font-[Space Grotesk] mb-6">
       Feature My Facility
      </h2>

      <div
        className="p-4 h-[152px] bg-cover bg-center rounded-lg mb-5 "
        style={{
          backgroundImage: `url(${featureBg})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-[585px] text-white font-medium leading-6">
          <h4 className="text-xl font-bold font-[Space Grotesk] mb-2">
            💡 Why Feature Your Facility?
          </h4>
          <p>
            Get more visibility, build trust, and attract the right patients by
            featuring your facility on our care provider network.
          </p>
        </div>
      </div>
      <h4 className="text-[25px] font-bold text-[#181D27] font-[Space Grotesk] mb-3">
        Feature My Facility
      </h4>
<ProfileCards onUpgrade={setBillingCheck}/>
<h4 className="text-[25px] font-bold text-[#181D27] font-[Space Grotesk] mb-4">
      💡 Advantages of Feature Plans?
      </h4>
     <div className="rounded-[10px] py-2.5 px-5 bg-white mb-5">
      <ul className="space-y-5">
        {points.map((point, idx) => (
          <li
            key={idx}
            className="flex items-center gap-3 relative pl-5 mb-3 before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-[7px] before:h-[7px] before:rounded-full before:bg-[#28A2FF]"
          >
            <div className=''>
              <p>
               <b> {point.title}</b>
              </p>
              <p className="text-sm text-gray-700 mt-1">{point.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
)
  }
    

    </>
  );
};

export default GetFeature;
