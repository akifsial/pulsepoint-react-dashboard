import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { apiServices } from "@src/shared/apiservices";
import apiEndpoint from "@src/shared/apiendpoint";

interface TopInsuranceData {
  insurance_type_name?: string; 
  count: number;
}


interface Props {
  timeRange: string;
}

const TopInsurancesChart: React.FC<Props> = ({ timeRange }) => {
  const [data, setData] = useState<TopInsuranceData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dummyData: TopInsuranceData[] = [
    { insurance_type_name: "Bupa", count: 320 },
    { insurance_type_name: "AXA Health", count: 280 },
    { insurance_type_name: "Vitality", count: 210 },
    { insurance_type_name: "Aviva Health", count: 190 },
    { insurance_type_name: "Cigna Global", count: 170 },
    { insurance_type_name: "Simplyhealth", count: 150 },
  ];

  const fetchTopInsuranceData = async (type: string, range: string) => {
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
    if (timeRange) {
      fetchTopInsuranceData("top_insurance_used", timeRange);
    }
  }, [timeRange]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const filteredData = data.filter(
    (item) => item?.insurance_type_name && item?.count
  );

  const insuranceNames = filteredData.map(
    (item) => item.insurance_type_name
  );
  const insuranceCounts = filteredData.map((item) => item.count);
  const yMax = insuranceCounts.length
    ? Math.max(...insuranceCounts) + 50
    : 100;

  const series = [{ name: "Insurance Count", data: insuranceCounts }];

  const options = {
    chart: {
      id: "top-insurances",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    xaxis: { categories: insuranceNames },
    yaxis: { min: 0, max: yMax, tickAmount: 4 },
    plotOptions: {
      bar: { distributed: true, borderRadius: 4, columnWidth: "45%" },
    },
    colors: ["#1D1D1D", "#6FC276", "#007ACC", "#2F80ED", "#E67E22", "#8E44AD"],
    dataLabels: { enabled: true },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <Chart options={options} series={series} type="bar" height={300} />
    </div>
  );
};

export default TopInsurancesChart;
