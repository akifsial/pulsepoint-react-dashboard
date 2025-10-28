import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
interface PeakVisitorData {
  month: string;
  count: number;  
}

const PeakVisitorChart: React.FC<{ timeRange: string; gender: string }> = ({ timeRange, gender }) => {
  const [data, setData] = useState<PeakVisitorData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const dummyData: PeakVisitorData[] = [
    { month: "Jan", count: 120 },
    { month: "Feb", count: 150 },
    { month: "Mar", count: 180 },
    { month: "Apr", count: 140 },
    { month: "May", count: 200 },
    { month: "Jun", count: 230 },
    { month: "Jul", count: 210 },
    { month: "Aug", count: 250 },
    { month: "Sep", count: 260 },
    { month: "Oct", count: 300 },
    { month: "Nov", count: 270 },
    { month: "Dec", count: 320 },
  ];

  const fetchPeakVisitorData = async (type: string, range: string, gender: string) => {
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
    fetchPeakVisitorData("peak_visitors", timeRange, gender);
  }, [timeRange, gender]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const series = [
    {
      name: "Visitor Count",
      data: data.map((item) => item.count),
    },
  ];

  const options = {
    chart: {
      id: "peak-visitors",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    xaxis: {
      categories: data.map((item) => item.month),
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <Chart options={options} series={series} type="line" height={250} />
    </div>
  );
};

export default PeakVisitorChart;
