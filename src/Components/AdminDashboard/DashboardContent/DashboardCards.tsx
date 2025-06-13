import React from 'react'
import StatsCommonCards from "@components/Dashboard-components/Cards/StatsCommonCards";
import flag from "@assets/media/svgs/flag.svg";
import hospital from "@assets/media/svgs/hospital.svg";
import people from "@assets/media/svgs/people.svg"
import stars from "@assets/media/svgs/dashboard-svgs/stars.svg";

 const DashboardCards = () => {
   return (
     <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-[13px] mb-2.5">
        <StatsCommonCards
          count={48}
          title="Verified Providers"
          cardImg={hospital}
          imgBg="#EEE0FF"
          borderBg="#9747FF"
        />
        <StatsCommonCards
          count={10}
          title="Total Patients"
          cardImg={people}
          imgBg="#FFE8CF"
          borderBg="#F98A17"
        />
        <StatsCommonCards
          count={87}
          title="New Reviews Today"
          cardImg={stars}
          imgBg="#D8F6D4"
          borderBg="#52C343"
        />
        <StatsCommonCards
          count={5}
          title="Flagged Reviews"
          cardImg={flag}
          imgBg="#E2F0F6"
          borderBg="#007AB2"
        />
    </div>
   )
 }
 
 export default DashboardCards
 