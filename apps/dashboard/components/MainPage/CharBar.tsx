import React from "react";
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

const colors = ["red", "blue", "#FFBB28", "#FF8042", "red", "pink"];

const data = [
  {
    name: "closed",
    uv: 5000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "InProgress",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },

  {
    name: "Delay",
    uv: 2890,
    // pv: 400,
    // amt: 2181,
  },
  {
    name: "Pending",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
];

const getIntroOfPage = (label: any, payload: any): React.JSX.Element => {
  if (label === "closed") {
    return (
      <div className="style bg-red-700 p-2 border-1 border-white bg-transparent rounded-sm shadow-sm">
        <p className="type text-[12px]">Stage: closed</p>
        <hr />
        <p className="text-[11px]">
          <span className="text-bold">{payload[0].value}</span>
          {` complaints are closed`}
        </p>
      </div>
    );
  }
  if (label === "InProgress") {
    return (
      <div className="style bg-blue-700 p-2 border-1 border-white bg-transparent rounded-sm shadow-sm">
        <p className="type text-[12px]">Stage: In Progress</p>
        <hr />
        <p className="text-[11px]">
          <span className="text-bold">{payload[0].value}</span>
          {` complaints are in progress`}
        </p>
      </div>
    );
  }
  if (label === "Pending") {
      return (
        <div className="style bg-orange-700 p-2 border-1 border-white bg-transparent rounded-sm shadow-sm">
          <p className="type text-[12px]">Stage: Pending</p>
          <hr />
          <p className="text-[11px]">
            <span className="text-bold">{payload[0].value}</span>
            {` complaints are in pending`}
          </p>
        </div>
      );
  }
  if (label === "Delay") {
     return (
       <div className="style bg-yellow-500 p-2 border-1 border-white bg-transparent rounded-sm shadow-sm">
         <p className="type text-[12px]">Stage: Delay</p>
         <hr />
         <p className="text-[11px]">
           <span className="text-bold">{payload[0].value}</span>
           {` complaints are Delayed`}
         </p>
       </div>
     );
      
  }
  

  return <p></p>;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip text-white w-36 h-auto bg-transparent">
        <p className="intro text-sm">{getIntroOfPage(label, payload)}</p>
      </div>
    );
  }

  return null;
};

const CustomChart = () => {
  return (
    <BarChart
      width={350}
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
      <XAxis dataKey="name" className="text-sm" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      {/* <Legend /> */}
      <Bar dataKey="uv" fill="#8884d8" label={{ position: "top" }}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default CustomChart;
