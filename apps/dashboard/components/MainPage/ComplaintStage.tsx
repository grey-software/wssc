"use client";
import React from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart: React.FC = () => {
  const series = [
    {
      name: "Solid waste",
      data: [58, 35, 41, 47],
    },
    {
      name: "Water sanitation",
      data: [13, 23, 20, 8],
    },
    {
      name: "Staff related",
      data: [11, 17, 15, 15],
    },
    {
      name: "Other complaint",
      data: [21, 7, 25, 13],
    },
  ];

  const options:any = {
    chart: {
      type: "bar",
      height: 250,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: "13px",
              fontWeight: 800,
            },
          },
        },
      },
    },
    xaxis: {
      type: "datetime",
      categories: [
        "03/15/2023 GMT",
        "04/15/2023 GMT",
        "05/15/2023 GMT",
        "06/15/2023 GMT",
      ],
    },
    legend: {
      position: "right",
      offsetY: 40,
    },
    fill: {
      opacity: 0.8,
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={240}
        width={430}
      />
    </div>
  );
};

export default ApexChart;
