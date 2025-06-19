import React from "react";
import Chart from "react-apexcharts";

const AgeGroupGraph = () => {
  const seriesData = [
    { x: "Jan", y: 0 },
    { x: "Feb", y: 220, label: "Medicaid", color: "#1E1E1E" },
    { x: "Mar", y: 0 },
    { x: "Apr", y: 0 },
    { x: "May", y: 350, label: "Medicare", color: "#62BD7C" },
    { x: "Jun", y: 0 },
    { x: "Jul", y: 0 },
    { x: "Aug", y: 220, label: "Health Net", color: "#0078A4" },
    { x: "Sept", y: 0 },
    { x: "Oct", y: 250, label: "WellCare", color: "#2EA7FF" },
    { x: "Nov", y: 0 },
    { x: "Dec", y: 0 },
  ];

  const chartData = {
    series: [
      {
        name: "Plans",
        data: seriesData,
      },
    ],
    options: {
      chart: {
        type: "bar",
        toolbar: { show: false },
      },
      xaxis: {
        type: "category",
        labels: { style: { fontSize: "12px" } },
      },
      yaxis: {
        labels: {
          formatter: (val: number) => `${val}+`,
          style: { fontSize: "12px" },
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "100%",
          distributed: true,
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number, opts: any) {
          const label = seriesData[opts.dataPointIndex].label;
          return label || "";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#000"],
        },
      },
      colors: seriesData.map((d) => d.color || "#E0E0E0"),
      grid: {
        yaxis: {
          lines: { show: true },
        },
        xaxis: {
          lines: { show: false },
        },
      },
      tooltip: { enabled: false },
      legend: { show: false },
    },
  };

  return (
    <div className="w-full">
      <Chart options={chartData.options} series={chartData.series} type="bar" height={225} />
    </div>
  );
};

export default AgeGroupGraph;
