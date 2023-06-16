'use client';
import { RootState } from "@/app/GlobalState/store";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";


type Props = {
  complaints: any;
};

const TieChart2 = () => {
  const complaints: any = useSelector(
    (state: RootState) => state.statistics.complaints
  );

  const series = [complaints?.solidWaste, complaints?.waterSanitation, complaints?.Staff, complaints?.Other];
  const options: any = {
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ["Solid waste", "Water sanitation", "Staff related", "Other complaint"],
    
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        width={380}
      />
    </div>
  );
};

export default TieChart2;
