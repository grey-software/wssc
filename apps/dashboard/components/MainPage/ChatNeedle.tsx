'use client'
import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalState/store";

interface DataItem {
  name: string;
  value:number;
  color: string;
}
const ChartNeedle = () => {
    const percent:any = useSelector(
      (state: RootState) => state.statistics.OrganizationRating
    );

  
const performance = parseFloat(percent?.OrgPercentage);

  const RADIAN = Math.PI / 180;
  const data: DataItem[] = [
    { name: "A", value: 20, color: "rgb(250 204 21)" },
    { name: "B", value: 20, color: "rgb(250 204 21)" },
    { name: "C", value: 20, color: "rgb(250 204 21)" },
    { name: "B", value: 20, color: "rgb(250 204 21)" },
    { name: "C", value: 20, color: "rgb(250 204 21)" },
  ];
  const cx = 105;
  const cy = 75;
  const iR = 50;
  const oR = 80;
  // const value = { performance };
  

  const needle = (
    value: number,
    data: DataItem[],
    cx: number,
    cy: number,
    iR: number,
    oR: number,
    color: string
  ): JSX.Element[] => {
    let total = 0;
    data.forEach((v) => {
      total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
      <circle key="circle" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
      <path
        key="path"
        d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
        stroke="#none"
        fill="orange"
      />,
    ];
  };

  return (
    <PieChart width={200} height={80}>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={data}
        cx={cx}
        cy={cy}
        innerRadius={iR}
        outerRadius={oR}
        paddingAngle={0}
        fill="#8884d8"
        stroke="none"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      {needle(performance, data, cx, cy, iR, oR, "#d0d000")}
    </PieChart>
  );
};

export default ChartNeedle;


