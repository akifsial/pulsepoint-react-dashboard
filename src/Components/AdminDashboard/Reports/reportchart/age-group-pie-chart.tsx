import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { apiServices } from "@src/shared/api-services";  
import apiEndpoint from "@src/shared/api-end-point";  

// Interface for the response data structure
interface AgeGroupData {
  age_group: string;
  count: number;
  percentage: number;
}

const AgeGroupPieChart: React.FC = ({ timeRange }) => {
  const [data, setData] = useState<AgeGroupData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch age group data
  const fetchAgeGroupData = async (type: string,range) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiServices.get(`${apiEndpoint.ageGroups(type)}&data_range=${range}`);

      if (response.data.success) {
        setData(response.data?.payload?.age_groups); 
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

  // Fetch data when the component mounts
  useEffect(() => {
    fetchAgeGroupData("age_groups",timeRange);
  }, [timeRange]);

  // Handle loading or error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Prepare data for the chart
  const series = data.map(item => item.count);  
  const labels = data.map(item => item.age_group);


  const tableData = data.map(item => ({
    color: "#2D9CDB",  
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
    colors: ["#27AE60", "#2D9CDB", "#1B75BC", "#F2C94C", "#F2C94C", "#000000"],
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
