"use client";
import { RootState } from "@/GlobalState/store";
import React from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  
} from "recharts";

const colors = ["#F15025", "#2EAB43", "#2E86AB", "#F2AD35"];


const CustomChart = () => {
  const complaintStatus: any = useSelector(
    (state: RootState) => state.statistics.complaintsStatus
  );
  const data = [
    {
      name: "Closed",
      uv: complaintStatus?.Closed || 0,
    },
    {
      name: "Resolved",
      uv: complaintStatus?.Completed || 0,
    },
    {
      name: "In Progress",
      uv: complaintStatus?.InProgress || 0,
    },

    {
      name: "Pending",
      uv: complaintStatus?.Initiated || 0,
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
