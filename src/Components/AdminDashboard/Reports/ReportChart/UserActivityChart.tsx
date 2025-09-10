import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { apiServices } from "@src/Shared/apiServices"; 
import apiEndpoint from "@src/Shared/apiEndPoint";

interface UserActivityData {
  month: string;
  patients_activity: number;
  care_providers_activity: number;
  admin_interventions: number;
}

const UserActivityChart = ({ timeRange }) => {
  const [data, setData] = useState<UserActivityData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserActivityData = async (type: string,range) => {
    setLoading(true);
    setError(null);
    try {
      // const response = await apiServices.get(apiEndpoint.userActivity(type));
       const response = await apiServices.get(
        `${apiEndpoint.userActivity(type)}&data_range=${range}`
      );
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
    fetchUserActivityData("user_activity_over_time",timeRange);
  }, [timeRange]);

  const series = [
    {
      name: 'Patients Activity',
      data: data?.map(item => item.patients_activity),
    },
    {
      name: 'Care Providers Activity',
      data: data?.map(item => item.care_providers_activity),
    },
    {
      name: 'Admin Interventions',
      data: data?.map(item => item.admin_interventions),
    }
  ];

  // Chart options
  const options = {
    chart: {
      id: 'user-activity',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    xaxis: {
      categories: data?.map(item => item.month), 
    },
  };

  if (loading) return <div>Loading...</div>; 
  if (error) return <div>{error}</div>; 

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <Chart options={options} series={series} type="line" height={250} />
    </div>
  );
};

export default UserActivityChart;
