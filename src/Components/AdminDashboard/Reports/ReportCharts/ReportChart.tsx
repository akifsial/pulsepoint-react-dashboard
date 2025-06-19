import TopReview from "@components/AdminDashboard/DashboardContent/ActionCenter.tsx/TopReview";
import React from "react";
import GraphChart from "./GroupCharts/GraphChart";
import GroupChart from "./GroupCharts/GroupChart";
// import { Group } from "lucide-react";

const ReportChart = () => {
  return (
    <>
      <div className="flex gap-2.5 mb-2.5">
        <TopReview />
        <GraphChart />
      </div>
      <GroupChart/>
    </>
  );
};

export default ReportChart;
