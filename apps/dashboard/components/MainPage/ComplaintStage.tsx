// import React from "react";
// import ReactApexChart from "react-apexcharts";

// const ComplaintStage = () => {
//   const series = [
//     {
//       data: [21, 22, 10, 28],
//     },
//   ];
//   const colors = [
//     "#008FFB",
//     "#00E396",
//     "#FEB019",
//     "#FF4560",
//     // "#775DD0",
//     // "#546E7A",
//     // "#26A69A",
//     // "#D10CE8",
//   ];

//   const options = {
//     chart: {
//       height: 250,
//       type: "bar",
//       events: {
//         click: function ({ chart, w, e }: any) {
//           // console.log(chart, w, e)
//         },
//       },
//     },
//     colors: colors,
//     plotOptions: {
//       bar: {
//         columnWidth: "45%",
//         distributed: true,
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     legend: {
//       show: false,
//     },
//     xaxis: {
//       categories: [
//             "completed",
//             "closed",
//             "Delay",
//             "In progress",
          
//       ],
//       labels: {
//         style: {
//           colors: colors,
//           fontSize: "12px",
//         },
//       },
//     },
//   };

//   return (
//     <div id="chart">
//       <ReactApexChart
//         options={options}
//         series={series}
//         type="bar"
//               height={250}
//               width={380}
//       />
//     </div>
//   );
// };

// export default ComplaintStage;

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
      opacity: 1,
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={250}
        width={450}
      />
    </div>
  );
};

export default ApexChart;
