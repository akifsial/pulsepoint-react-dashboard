import { useEffect, useState } from "react";
import StatsCommonCards from "@src/components/Dashboard-components/Cards/StatsCommonCards";
import flag from "@assets/media/svgs/flag.svg";
import hospital from "@assets/media/svgs/hospital.svg";
import people from "@assets/media/svgs/people.svg";
import stars from "@assets/media/svgs/dashboard-svgs/stars.svg";
import { apiServices } from "@src/Shared/apiServices";
import apiEndpoint from "@src/Shared/apiEndPoint";

const DashboardCards = () => {
  // State to store the fetched stats, initially undefined to handle missing data
  const [stats, setStats] = useState({
    verified_providers: undefined,
   total_patients: undefined,
    new_reviews_today: undefined,
    flagged_reviews: undefined,
  });

  // Fetch stats when component mounts
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiServices.get(apiEndpoint.stats);
        if (response.data.success) {
          const payload = response.data.payload;

          // Adjust mapping based on the field names in the API response
          setStats({
            verified_providers: payload.verified_providers, 
            total_patients: payload.total_patients,
            new_reviews_today: payload.new_reviews_today,
            flagged_reviews: payload.flagged_reviews,
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-[13px] mb-2.5">
      <StatsCommonCards
        count={stats.verified_providers || 0}
        title="Verified Providers"
        cardImg={hospital}
        imgBg="#EEE0FF"
        borderBg="#9747FF"
      />
      <StatsCommonCards
        count={stats.total_patients || 0}
        title="Total Patients"
        cardImg={people}
        imgBg="#FFE8CF"
        borderBg="#F98A17"
      />
      <StatsCommonCards
        count={stats.new_reviews_today || 0}
        title="Total Reviews"
        cardImg={stars}
        imgBg="#D8F6D4"
        borderBg="#52C343"
      />
      <StatsCommonCards
        count={stats.flagged_reviews || 0}
        title="Flagged Reviews"
        cardImg={flag}
        imgBg="#E2F0F6"
        borderBg="#007AB2"
      />
    </div>
  );
};

export default DashboardCards;
