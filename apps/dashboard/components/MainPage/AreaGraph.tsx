"use client";
import { RootState } from "@/GlobalState/store";
import React, { PureComponent } from "react";
import { useSelector } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AreaGraph = () => {
  // getting all complaints
  const { complaints }: any = useSelector(
    (state: RootState) => state.statistics.data
  );
  //  data
  const data = [
    {
      name: "June 2023",
      complaints: complaints || 0,
    },
    {
      name: "July 2023",
      complaints: 0,
    },
    {
      name: "August 2023",
      complaints: 0,
    },
    {
      name: "September 2023",
      complaints: 0,
    },
    {
      name: "October 2023",
      complaints: 0,
    },
    {
      name: "November 2023",
      complaints: 0,
    },
    {
      name: "December 2023",
      complaints: 0,
    },
  ];

  // JSX Section
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
          <XAxis dataKey="name" tick={{ fontSize: 15 }} />
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
};

export default AreaGraph;
