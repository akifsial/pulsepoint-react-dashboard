import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

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

  const dummyData: UserActivityData[] = [
    { month: "Jan", patients_activity: 40, care_providers_activity: 30, admin_interventions: 10 },
    { month: "Feb", patients_activity: 60, care_providers_activity: 45, admin_interventions: 15 },
    { month: "Mar", patients_activity: 55, care_providers_activity: 50, admin_interventions: 12 },
    { month: "Apr", patients_activity: 70, care_providers_activity: 60, admin_interventions: 20 },
    { month: "May", patients_activity: 65, care_providers_activity: 55, admin_interventions: 18 },
    { month: "Jun", patients_activity: 80, care_providers_activity: 65, admin_interventions: 25 },
  ];

  const fetchUserActivityData = async (type: string, range: string) => {
    setLoading(true);
    setError(null);
    try {
      setTimeout(() => {
        setData(dummyData);
        setLoading(false);
      }, 800);

    } catch (err) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserActivityData("user_activity_over_time", timeRange);
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

  const options = {
    chart: {
      id: 'user-activity',
      toolbar: { show: false },
      zoom: { enabled: false },
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
