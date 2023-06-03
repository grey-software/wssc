import React from "react";
import ReactApexChart from "react-apexcharts";

const TieChart2 = () => {
  const series = [44, 55, 36, 43, 38];
  const options = {
    chart: {
      width: 320,
      type: "pie",
    },
    labels: ["Solid waste", "Water supply", "Waste water", "Staff related", "others"],
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
