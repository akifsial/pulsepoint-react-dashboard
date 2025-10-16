import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { apiServices } from "@src/shared/api-services";
import apiEndpoint from "@src/shared/api-end-point";

// Interface for the response data structure
interface TopInsuranceData {
  insurance_type_name?: string; 
  count: number;
}

// const TopInsurancesChart: React.FC = (timeRange) => {
//   const [data, setData] = useState<TopInsuranceData[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   // Function to fetch top insurance data
//   const fetchTopInsuranceData = async (type: string,range) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await apiServices.get(`${apiEndpoint.topInsuranceUsed(type)}&data_range=${range?.timeRange}`);

//       if (response.data.success) {
//         setData(response.data?.payload?.top_insurance_used);
//       } else {
//         setError("Error: Failed to fetch data");
//       }
//     } catch (err) {
//       setError("Failed to fetch data");
//       console.error("Error fetching data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch data when the component mounts
//   useEffect(() => {
//     fetchTopInsuranceData("top_insurance_used",timeRange);
//   }, [timeRange]);

//   // Handle loading or error states
//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   // Prepare data for the chart
//   const insuranceNames = data.map(item => item.insurance_type_name || "Unknown");
//   const insuranceCounts = data.map(item => item.count);

//   const series = [
//     {
//       name: "Insurance Count",
//       data: insuranceCounts,
//     },
//   ];

//   const options = {
//     chart: {
//       id: "top-insurances",
//       toolbar: { show: false },
//       zoom: { enabled: false },
//     },
//     xaxis: {
//       categories: insuranceNames,
//       labels: {
//         style: {
//           fontSize: "12px",
//           colors: ["#000"],
//         },
//       },
//     },
//     yaxis: {
//       min: 0,
//       max: Math.max(...insuranceCounts) + 50,
//       tickAmount: 4,
//       labels: {
//         formatter: (val: number) => `${val}+`,
//         style: {
//           fontSize: "12px",
//           colors: ["#000"],
//         },
//       },
//     },
//     plotOptions: {
//       bar: {
//         distributed: true,
//         borderRadius: 4,
//         columnWidth: "45%",
//         dataLabels: {
//           position: "top",
//         },
//       },
//     },
//     dataLabels: {
//       enabled: true,
//       formatter: function (val: number, { dataPointIndex }: { dataPointIndex: number }) {
//         return insuranceNames[dataPointIndex];
//       },
//       offsetY: -20,
//       style: {
//         fontSize: "13px",
//         colors: ["#000"],
//       },
//     },
//     colors: ["#1D1D1D", "#6FC276", "#007ACC", "#2F80ED"],
//     grid: {
//       yaxis: {
//         lines: {
//           show: true,
//         },
//       },
//       xaxis: {
//         lines: {
//           show: false,
//         },
//       },
//     },
//     tooltip: {
//       enabled: false,
//     },
//   };

//   return (
//     <div className="p-4 bg-white rounded-lg shadow-lg">
//       <Chart options={options} series={series} type="bar" height={300} />
//     </div>
//   );
// };

// export default TopInsurancesChart;




const TopInsurancesChart: React.FC<Props> = ({ timeRange }) => {
  const [data, setData] = useState<TopInsuranceData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch top insurance data
  const fetchTopInsuranceData = async (type: string, range: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiServices.get(
        `${apiEndpoint.topInsuranceUsed(type)}&data_range=${range}`
      );

      if (response.data.success) {
        setData(response.data?.payload?.top_insurance_used || []);
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

  useEffect(() => {
    if (timeRange) {
      fetchTopInsuranceData("top_insurance_used", timeRange);
    }
  }, [timeRange]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Prepare data for chart
  // const insuranceNames = data.map(item => item?.insurance_type_name || "");
  // const insuranceCounts = data.map(item => item?.count || "");
  // const yMax = insuranceCounts?.length ? Math.max(...insuranceCounts) + 50 : 100;

  // const series = [{ name: "Insurance Count", data: insuranceCounts }];

  // const options = {
  //   chart: { id: "top-insurances", toolbar: { show: false }, zoom: { enabled: false } },
  //   xaxis: { categories: insuranceNames },
  //   yaxis: { min: 0, max: yMax, tickAmount: 4 },
  //   plotOptions: { bar: { distributed: true, borderRadius: 4, columnWidth: "45%" } },
  //   colors: ["#1D1D1D", "#6FC276", "#007ACC", "#2F80ED"],
  //   dataLabels: { enabled: true },
  // };


  // Filter out invalid items first
const filteredData = data.filter(item => item?.insurance_type_name && item?.count);

const insuranceNames = filteredData.map(item => item.insurance_type_name);
const insuranceCounts = filteredData.map(item => item.count);
const yMax = insuranceCounts.length ? Math.max(...insuranceCounts) + 50 : 100;

const series = [{ name: "Insurance Count", data: insuranceCounts }];

const options = {
  chart: { id: "top-insurances", toolbar: { show: false }, zoom: { enabled: false } },
  xaxis: { categories: insuranceNames },
  yaxis: { min: 0, max: yMax, tickAmount: 4 },
  plotOptions: { bar: { distributed: true, borderRadius: 4, columnWidth: "45%" } },
  colors: ["#1D1D1D", "#6FC276", "#007ACC", "#2F80ED"],
  dataLabels: { enabled: true },
};

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <Chart options={options} series={series} type="bar" height={300} />
    </div>
  );
};

export default TopInsurancesChart;