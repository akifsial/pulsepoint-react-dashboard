import React from "react";
import Chart from "react-apexcharts";

const ApexChartComponent = () => {
  const series = [
    {
      name: "Harmony Rehab",
      data: [220, 240, 200, 150, 170, 250, 340, 320, 280, 210, 150, 100],
    },
    {
      name: "St. Luke's Hospital",
      data: [280, 300, 250, 200, 180, 230, 300, 290, 270, 200, 120, 100],
    },
    {
      name: "BrightCare Nursing",
      data: [250, 310, 290, 250, 200, 210, 270, 280, 260, 230, 190, 160],
    },
  ];

  const options = {
    chart: {
      height: 225,
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ["#52C343", "#9648FF", "#FBA751"],
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
      ],
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: {
        style: {
          fontFamily: "Geist",
          fontWeight: 400,
          fontSize: "12px",
          colors: "#000",
        },
      },
    },
    yaxis: {
      min: 0,
      max: 400,
      tickAmount: 4,
      labels: {
        formatter: (val) => `${val}+`,
        style: {
          fontFamily: "Geist",
          fontWeight: 400,
          fontSize: "12px",
          colors: "#000",
        },
      },
    },
    grid: {
      borderColor: "#E0E0E0",
      strokeDashArray: 3,
      xaxis: { lines: { show: false } },
    },
    legend: {
      show: true,
      fontSize: "12px",
      fontFamily: "Geist",
      fontWeight: 500,
      markers: {
        radius: 6,
      },
      horizontalAlign: "center",
    },
    annotations: {
      xaxis: [
        {
          x: "Jul",
          borderColor: "#34D399",
          label: { show: false },
        },
      ],
      points: [
        {
          x: "Jul",
          y: 340,
          marker: {
            size: 6,
            fillColor: "#34D399",
            strokeColor: "#ffffff",
            strokeWidth: 2,
            shape: "circle",
          },
        },
      ],
    },
    tooltip: {
      theme: "light",
    },
  };

  return (
    <div className="pt-0 mt-0">
      <Chart options={options} series={series} type="line" height={210} />
    </div>
  );
};

export default ApexChartComponent;
