import React from "react";
import Chart from "react-apexcharts";

const VisitorChart = () => {
  const chartOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: {
      curve: "straight",
      width: 2,
      colors: ["#000"],
    },
    markers: {
      size: 6,
      colors: ["#007BFF"], 
      strokeColors: "#fff",
      strokeWidth: 2,
    },
    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sept", "Oct", "Nov", "Dec",
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          fontSize: "12px",
          colors: "#666",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val: number) => `${val}+`,
        style: {
          fontSize: "12px",
          colors: "#666",
        },
      },
    },
    grid: {
      yaxis: {
        lines: { show: true },
      },
      xaxis: {
        lines: { show: false },
      },
    },
    tooltip: {
      enabled: true,
    },
    legend: {
      show: false,
    },
  };

  const chartSeries = [
    {
      name: "Visitors",
      data: [0, 80, 120, 250, 290, 310, 260, 190, 200, 350, 370, 420],
    },
  ];

  return (
    <div>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={233}
      />
    </div>
  );
};

export default VisitorChart;
