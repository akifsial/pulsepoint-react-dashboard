import React from "react";
import Chart from "react-apexcharts";

const InsuranceGraph = () => {
  const data = {
    series: [4000, 3509, 3076, 100, 100, 100],
    options: {
      chart: {
        type: "donut",
      },
      labels: ["70-80", "60-70", "50-60", "40-50", "40-50", "40-50"],
      colors: ["#6FC276", "#007AB2", "#28A2FF", "#252525"],
      legend: { show: false },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "75%",
            labels: {
              show: true,
              name: {
                show: true,
                offsetY: -10,
                formatter: () => "Total Patients",
                fontSize: "14px",
              },
              value: {
                show: true,
                fontSize: "20px",
                fontWeight: 700,
                offsetY: 10,
                formatter: () => "4000",
              },
              total: {
                show: false,
              },
            },
          },
        },
      },
    },
  };

  return (
    <div className="w-2/5">
      <Chart options={data.options} series={data.series} type="donut" height={225} />
    </div>
  );
};

export default InsuranceGraph;
