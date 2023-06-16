import { RootState } from "@/app/GlobalState/store";
import React from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";


const colors = ["#F15025","#2EAB43", "#2E86AB", "#F2AD35" ];



// const getIntroOfPage = (label: any, payload: any): React.JSX.Element => {
//   if (label === "Closed") {
//     return (
//       <div className="style bg-red-600 p-2 border-1 border-white bg-transparent rounded-sm shadow-sm">
//         <p className="type text-[12px]">Stage: closed</p>
//         <hr />
//         <p className="text-[11px]">
//           <span className="text-bold">{payload[0].value}</span>
//           {` complaints are closed`}
//         </p>
//       </div>
//     );
//   }
//   if (label === "Completed") {
//     return (
//       <div className="style bg-blue-500 p-2 border-1 border-white bg-transparent rounded-sm shadow-sm">
//         <p className="type text-[12px]">Stage: In Progress</p>
//         <hr />
//         <p className="text-[11px]">
//           <span className="text-bold">{payload[0].value}</span>
//           {` complaints are in progress`}
//         </p>
//       </div>
//     );
//   }
//   if (label === "InProgress") {
//       return (
//         <div className=" bg-orange-500 p-2 border-1 border-white bg-transparent rounded-sm shadow-sm">
//           <p className="type text-[12px]">Stage: Pending</p>
//           <hr />
//           <p className="text-[11px]">
//             <span className="text-bold">{payload[0].value}</span>
//             {` complaints are in pending`}
//           </p>
//         </div>
//       );
//   }
//   if (label === "Pending") {
//      return (
//        <div className=" bg-yellow-500 p-2 border-1 border-white bg-transparent rounded-sm shadow-sm">
//          <p className="type text-[12px]">Stage: Delay</p>
//          <hr />
//          <p className="text-[11px]">
//            <span className="text-bold">{payload[0].value}</span>
//            {` complaints are Delayed`}
//          </p>
//        </div>
//      );
      
//   }
  

//   return <></>;
// };

// const CustomTooltip = ({ active, payload, label }: any) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="custom-tooltip text-white w-36 h-auto bg-transparent">
//         <p className="intro text-sm">{getIntroOfPage(label, payload)}</p>
//       </div>
//     );
//   }

//   return null;
// };

const CustomChart = () => {

  const complaintStatus: any = useSelector((state: RootState) => state.statistics.complaintsStatus);
  const data = [
    {
      name: "Closed",
      uv: complaintStatus?.Closed,
      
    },
    {
      name: "Resolved",
      uv: complaintStatus?.Completed,
     
    },
    {
      name: "In progress",
      uv: complaintStatus?.InProgress,
     
    },

    {
      name: "Pending",
      uv: complaintStatus?.Initiated,
      
    },
  ];

  // JSX Section
  return (
    <>
      <BarChart
        className="text-sm"
        width={320}
        height={250}
        data={data}
        margin={{
          top: 10,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
        <YAxis />
        {/* <Tooltip content={<CustomTooltip />} /> */}
        <Bar dataKey="uv" fill="#8884d8" label={{ position: "top" }}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 20]} width={40} />
          ))}
        </Bar>
      </BarChart>
    </>
  );
};

export default CustomChart;
