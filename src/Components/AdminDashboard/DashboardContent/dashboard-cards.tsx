import { useEffect, useState } from "react";
import StatsCommonCards from "@components/dashboard-components/cards/stats-common-cards";
import flag from "@assets/media/svgs/flag.svg";
import hospital from "@assets/media/svgs/hospital.svg";
import people from "@assets/media/svgs/people.svg";
import stars from "@assets/media/svgs/dashboard-svgs/stars.svg";
import { apiServices } from "@src/shared/api-services";
import apiEndpoint from "@src/shared/api-end-point";

const DashboardCards = () => {
  const [stats, setStats] = useState({
    verified_providers: undefined,
   total_patients: undefined,
    new_reviews_today: undefined,
    flagged_reviews: undefined,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiServices.get(apiEndpoint.stats);
        if (response.data.success) {
          const payload = response.data.payload;

          setStats({
            verified_providers: payload.verified_providers, 
            total_patients: payload.total_patients,
            new_reviews_today: payload.new_reviews_today,
            flagged_reviews: payload.flagged_reviews,
          });
        }
      } catch (error) {
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-[13px] mb-2.5">
      <StatsCommonCards
        count={stats.verified_providers || 10}
        title="Verified Providers"
        cardImg={hospital}
        imgBg="#EEE0FF"
        borderBg="#9747FF"
      />
      <StatsCommonCards
        count={stats.total_patients || 30}
        title="Total Patients"
        cardImg={people}
        imgBg="#FFE8CF"
        borderBg="#F98A17"
      />
      <StatsCommonCards
        count={stats.new_reviews_today || 25}
        title="Total Reviews"
        cardImg={stars}
        imgBg="#D8F6D4"
        borderBg="#52C343"
      />
      <StatsCommonCards
        count={stats.flagged_reviews || 8}
        title="Flagged Reviews"
        cardImg={flag}
        imgBg="#E2F0F6"
        borderBg="#007AB2"
      />
    </div>
  );
};

export default DashboardCards;
