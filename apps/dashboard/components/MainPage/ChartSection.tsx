'use client'
import React from 'react'
import CustomChart from './CharBar';
import dynamic from "next/dynamic";

const TieChart = dynamic(() => import("./TieChart2"), {
  ssr: false,
});
const Area_Graph = dynamic(() => import("./AreaGraph"), {
  ssr: false,
});
const ComplaintsChart = dynamic(() => import('./ComplaintStage'), {
ssr: false,
});

const ChartSection = () => {
  return (
    <>
      <div className="cards W-full flex gap-x-2 justify-between mt-10">
        {/* bar chat */}
        <div className="barchat w-auto p-2  h-auto border border-gray-200 bg-gray-50 rounded-md shadow-sm">
          <h3 className="text-md text-center text-gray-700 font-semibold mb-2 mt-2">
            Complaints By Status 
          </h3>
          <CustomChart />
          {/* abbreviation */}
          <div className="abbr mt-2 flex flex-wrap justify-center items-center gap-3">
            <div className="sw flex justify-center items-center gap-1">
              <div className="title  w-5 h-2 bg-red-500"></div>
              <p className="text-[10px]">Closed</p>
            </div>

            {/* Waste water */}
            <div className="sw flex justify-center items-center gap-1">
              <div className="color  w-5 h-2 bg-green-600"></div>
              <p className="text-[10px]">Resolved</p>
            </div>
            {/* WATER SUPPLY */}
            <div className="sw flex justify-center items-center gap-1">
              <div className="color  w-5 h-2 bg-blue-600"></div>
              <p className="text-[10px]">In Progress</p>
            </div>

            {/* Waste water */}
            <div className="sw flex justify-center items-center gap-1">
              <div className="color  w-5 h-2 bg-yellow-500"></div>
              <p className="text-[10px]">Pending</p>
            </div>
          </div>
        </div>

        {/*Tie Chart  */}
        <div className="tieChart border border-gray-200 bg-slate-50 rounded-md shadow-sm">
          {/* title */}
          <h3 className="text-md mt-4 text-center text-gray-700 font-semibold mb-5">
            Complaints By Type
          </h3>
          <TieChart />
        </div>
        {/* complaint stage */}
        <div className="tieChart border border-gray-200 bg-slate-50 rounded-md shadow-sm">
          {/* title */}
          <h3 className="text-md mt-4 text-center text-gray-700 font-semibold mb-5">
            Complaints By Month
          </h3>
          {/* <ComplaintStage /> */}
          <ComplaintsChart/>
        </div>
      </div>

      {/* area graph */}
      <div className="tieChart flex flex-col justify-center items-center mt-4 p-3 border border-gray-200 bg-gray-50 rounded-md shadow-md">
        {/* title */}
        <h3 className="text-md text-center text-gray-700 font-semibold mb-5">
          Area Graph Of Complaints By Month
        </h3>
        <Area_Graph />
      </div>
    </>
  );
};

export default ChartSection