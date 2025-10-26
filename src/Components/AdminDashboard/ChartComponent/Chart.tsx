import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

interface UserActivityData {
  month: string;
  patients_activity: number;
  care_providers_activity: number;
  admin_interventions: number;
}

const ApexChartComponent = () => {
  const [data, setData] = useState<UserActivityData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const dummyData: UserActivityData[] = [
    { month: "January", patients_activity: 120, care_providers_activity: 80, admin_interventions: 30 },
    { month: "February", patients_activity: 150, care_providers_activity: 95, admin_interventions: 40 },
    { month: "March", patients_activity: 180, care_providers_activity: 100, admin_interventions: 35 },
    { month: "April", patients_activity: 140, care_providers_activity: 110, admin_interventions: 45 },
    { month: "May", patients_activity: 200, care_providers_activity: 130, admin_interventions: 50 },
    { month: "June", patients_activity: 170, care_providers_activity: 120, admin_interventions: 55 },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(dummyData);
      setLoading(false);
    }, 800);
  }, []);

  const series = [
    {
      name: "Patients Activity",
      data: data.map((item) => item.patients_activity),
    },
    {
      name: "Care Providers Activity",
      data: data.map((item) => item.care_providers_activity),
    },
    {
      name: "Admin Interventions",
      data: data.map((item) => item.admin_interventions),
    },
  ];

  const options = {
    chart: {
      id: "user-activity",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: data.map((item) => item.month),
    },
    yaxis: {
      min: 0,
      tickAmount: 5,
    },
    grid: {
      borderColor: "#E0E0E0",
      strokeDashArray: 3,
    },
    legend: {
      position: "top",
    },
    tooltip: {
      theme: "light",
    },
    responsive: [
      {
        breakpoint: 300,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className="w-full md:p-4 p-0 bg-white rounded-lg shadow-lg">
      <Chart options={options} series={series} type="line" width={"100%"} height={250} />
    </div>
  );
};

export default ApexChartComponent;
