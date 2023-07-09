'use client'
import { RootState } from "@/GlobalState/store";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

const ApexChart = () => {
  const complaints: any = useSelector(
    (state: RootState) => state.statistics.complaints
  );
  const series = [
    {
      name: "Solid waste",
      data: [9, 6, 0, 0],
    },
    {
      name: "Water sanitation",
      data: [50, 10, 0, 0],
    },
    {
      name: "Staff related",
      data: [12, 4, 0, 0],
    },
    {
      name: "Other complaint",
      data: [6, complaints?.Other || 0, 0, 0],
    },
  ];

  const options: any = {
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
        "06/1/2023 GMT",
        "07/1/2023 GMT",
        "08/1/2023 GMT",
        "09/1/2023 GMT",
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
