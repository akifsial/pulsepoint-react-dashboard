import { useState } from "react";
import UserActivityChart from "./UserActivityChart";
import PeakVisitorChart from "./PeakVisitorChart";
import TopInsurancesChart from "./TopInsurancesChart";
import AgeGroupPieChart from "./AgeGroupPieChart";
import { RiArrowDropDownLine } from "react-icons/ri";
// import SelectField from "@components/SelectField";
import SelectField from "@components/AdminSelectField/AdminSelectField";

const ReportChart = () => {
  const timeOptions = [
    { value: "last_7_days", label: "Last 7 Days" },
    { value: "last_30_days", label: "Last 30 Days" },
    { value: "today", label: "Today" },
    { value: "this_year", label: "This Year" },
  ];

  const VisitedAgeTimeOptions = [
    { value: "last_7_days", label: "Last 7 Days" },
    { value: "last_30_days", label: "Last 30 Days" },
    { value: "today", label: "Today" },
  ];

  const peakVisitTimeOptions=[
      { value: "last_7_days", label: "Last 7 Days" },
    { value: "last_30_days", label: "Last 30 Days" },
    { value: "this_year", label: "This Year" },

    // { value: "today", label: "Today" },
  ]

  const genderOptions = [
    { value: "all", label: "All" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  // 🔹 states for dropdowns
  const [timeRange1, setTimeRange1] = useState("last_7_days");
  const [timeRange2, setTimeRange2] = useState("last_7_days");
  const [timeRange3, setTimeRange3] = useState("last_7_days");
  const [timeRange4, setTimeRange4] = useState("last_7_days");
  const [gender, setGender] = useState("all");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* User Activity */}
      <div className="p-4 rounded bg-white">
        <div className="flex justify-between items-center">
          <h3 className="space-grotesk text-[18px] font-bold ">User Activity Over Time</h3>
          <SelectField
            options={timeOptions}
            value={timeRange1}
            onChange={(e) => setTimeRange1(e.target.value)}
            className="pr-9"
          />
        </div>
        <UserActivityChart timeRange={timeRange1} />
      </div>

      {/* Peak Visitor */}
      <div className="p-4 rounded bg-white">
        <div className="flex justify-between items-center">
          <h3 className="space-grotesk text-[18px] font-bold">Peak Visitor Profile</h3>
          <div className="flex items-center gap-2">
            <SelectField
              options={peakVisitTimeOptions}
              value={timeRange2}
              onChange={(e) => setTimeRange2(e.target.value)}
              className="pr-9"
            />
            <SelectField
              options={genderOptions}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="pr-8"
            />
          </div>
        </div>
        <PeakVisitorChart timeRange={timeRange2} gender={gender} />
      </div>

      {/* Top Insurances */}
      <div className="p-4 rounded bg-white">
        <div className="flex justify-between items-center">
          <h3 className="space-grotesk text-[18px] font-bold">Top Insurances Used</h3>
          <SelectField
            options={VisitedAgeTimeOptions}
            value={timeRange3}
            className="pr-9"
            onChange={(e) => setTimeRange3(e.target.value)}
          />
        </div>
        <TopInsurancesChart timeRange={timeRange3} />
      </div>

      {/* Age Groups */}
      <div className="p-4 rounded bg-white">
        <div className="flex justify-between items-center mb-8">
          <h3 className="space-grotesk text-[18px] font-bold">Most Visited Age Groups</h3>
          <SelectField
            options={timeOptions}
            value={timeRange4}
            onChange={(e) => setTimeRange4(e.target.value)}
            className="pr-9"
          />
        </div>
        <AgeGroupPieChart timeRange={timeRange4} />
      </div>
    </div>
  );
};

export default ReportChart;
