import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "june 23",
    complaints: 8000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "July 23",
    complaints: 2000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "August 23",
    complaints: 7000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "September 23",
    complaints: 1780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "October 23",
    complaints: 6890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "November 23",
    complaints: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "December 23",
    complaints: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const AreaGraph = () => {

 
    return (
      <div className="w-[60vw]">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            width={420}
            height={200}
            data={data}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="complaints"
              stroke="#8884d8"
              fill="green"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
}

export default AreaGraph;
