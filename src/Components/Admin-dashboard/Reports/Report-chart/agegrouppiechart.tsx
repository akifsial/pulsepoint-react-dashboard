import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

interface AgeGroupData {
  age_group: string;
  count: number;
  percentage: number;
}

const AgeGroupPieChart: React.FC<{ timeRange: string }> = ({ timeRange }) => {
  const [data, setData] = useState<AgeGroupData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const dummyData: AgeGroupData[] = [
    { age_group: "0-17", count: 120, percentage: 15 },
    { age_group: "18-24", count: 180, percentage: 22 },
    { age_group: "25-34", count: 240, percentage: 30 },
    { age_group: "35-44", count: 160, percentage: 20 },
    { age_group: "45-60", count: 90, percentage: 10 },
    { age_group: "60+", count: 50, percentage: 6 },
  ];

  const fetchAgeGroupData = async (type: string, range: string) => {
    setLoading(true);
    setError(null);

    try {
      setTimeout(() => {
        setData(dummyData);
        setLoading(false);
      }, 600);
    } catch (err) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgeGroupData("age_groups", timeRange);
  }, [timeRange]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const series = data.map((item) => item.count);
  const labels = data.map((item) => item.age_group);

  const tableData = data.map((item, index) => ({
    color: ["#27AE60", "#2D9CDB", "#1B75BC", "#F2C94C", "#E67E22", "#8E44AD"][index % 6],
    label: item.age_group,
    count: item.count,
    percentage: item.percentage,
  }));

  const options = {
    chart: {
      type: "donut",
      toolbar: { show: false },
    },
    labels: labels,
    colors: ["#27AE60", "#2D9CDB", "#1B75BC", "#F2C94C", "#E67E22", "#8E44AD"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    stroke: {
      width: 0,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
          labels: {
            show: true,
            name: {
              show: false,
            },
            value: {
              show: true,
              fontSize: "20px",
              fontWeight: 700,
              color: "#000",
              offsetY: -10,
            },
            total: {
              show: true,
              showAlways: true,
              label: "Total Patients",
              fontSize: "13px",
              fontWeight: 500,
              color: "#888",
            },
          },
        },
      },
    },
  };

  return (
    <div>
      <div className="flex items-start gap-6">
        <div className="w-[180px] h-[180px]">
          <Chart
            options={options}
            series={series}
            type="donut"
            width="180"
            height="180"
          />
        </div>

        <table className="text-sm w-full table-auto">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="text-left py-1 font-medium">Age Groups</th>
              <th className="text-left py-1 font-medium">Count</th>
              <th className="text-left py-1 font-medium">%</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, i) => (
              <tr key={i} className="h-6">
                <td className="flex items-center gap-2 py-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: row.color }}
                  ></span>
                  {row.label}
                </td>
                <td className="py-1">{row.count}</td>
                <td className="py-1">{row.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgeGroupPieChart;
