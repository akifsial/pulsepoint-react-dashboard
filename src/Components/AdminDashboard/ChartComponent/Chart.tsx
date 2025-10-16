import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { apiServices } from "@src/shared/api-services";
import apiEndpoint from "@src/shared/api-end-point";

// Define the type for the User Activity data
interface UserActivityData {
  month: string;
  patients_activity: number;
  care_providers_activity: number;
  admin_interventions: number;
}

const ApexChartComponent = () => {
  // State to store data, loading state, and error state
  const [data, setData] = useState<UserActivityData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch the data from the API
  const fetchUserActivityData = async (type: string) => {
    setLoading(true); 
    setError(null); 
    try {
      const response = await apiServices.get(apiEndpoint.userActivity(type));
            if (response.data.success) {
        setData(response.data?.payload?.data);
      }
    } catch (err) {
      setError("Failed to fetch data");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserActivityData("user_activity_over_time");
  }, []);

  // Prepare the chart data series based on the fetched data
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

  // Chart options
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
        breakpoint: 300, // screen <= 300px
        options: {
          chart: {
            width: 200, // force width to 200px
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
