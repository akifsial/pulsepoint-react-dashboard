import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { apiServices } from "@src/Shared/apiServices"; 
import apiEndpoint from "@src/Shared/apiEndPoint";

// Interface for the response data structure
interface PeakVisitorData {
  month: string;
  count: number;  
}

const PeakVisitorChart: React.FC = ({timeRange,gender}) => {
  const [data, setData] = useState<PeakVisitorData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch peak visitor data
  const fetchPeakVisitorData = async (type: string,range,gender) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiServices.get(`${apiEndpoint.peakVisitors(type)}&data_range=${range}&gender=${gender}`);

      if (response.data.success) {
        setData(response.data?.payload?.data);
      } else {
        setError("Error: Failed to fetch data");
      }
    } catch (err) {
      setError("Failed to fetch data");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchPeakVisitorData("peak_visitors",timeRange,gender);  
  }, [timeRange,gender]);

  // If data is still loading or there was an error, show the respective message
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // data for the chart
  const series = [
    {
      name: "Visitor Count", 
      data: data.map((item) => item.count), 
    },
  ];

  // Chart options
  const options = {
    chart: {
      id: "peak-visitors",
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
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <Chart options={options} series={series} type="line" height={250} />
    </div>
  );
};

export default PeakVisitorChart;
