"use client";
import React from 'react'
import CustomChart from './CharBar';
import TieChart2 from './TieChart2';
import AreaGraph from './AreaGraph';
import ComplaintStage from './ComplaintStage';


const ChartSection = () => {
  return (
    <>
      <div className="cards W-full flex gap-x-2 justify-between mt-10">
        {/* bar chat */}
        <div className="barchat w-auto p-2  h-auto border border-gray-200 bg-gray-50 rounded-md shadow-sm">
          <h3 className="text-md text-center text-gray-700 font-semibold mb-2">
            complaints stages
          </h3>
          <CustomChart />
          {/* abbreviation */}
          <div className="abbr mt-2 flex flex-wrap justify-center items-center gap-3">
            <div className="sw flex justify-center items-center gap-1">
              <div className="title  w-5 h-2 bg-red-500"></div>
              <p className="text-[10px]">closed</p>
            </div>

            {/* Waste water */}
            <div className="sw flex justify-center items-center gap-1">
              <div className="color  w-5 h-2 bg-green-600"></div>
              <p className="text-[10px]">Resolved</p>
            </div>
            {/* WATER SUPPLY */}
            <div className="sw flex justify-center items-center gap-1">
              <div className="color  w-5 h-2 bg-blue-600"></div>
              <p className="text-[10px]">In progress</p>
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
          <h3 className="text-sm mt-4 text-center text-gray-700 font-semibold mb-5">
            Percentage of registered complaints
          </h3>
          <TieChart2 />
        </div>
        {/* complaint stage */}
        <div className="tieChart border border-gray-200 bg-slate-50 rounded-md shadow-sm">
          {/* title */}
          <h3 className="text-sm mt-4 text-center text-gray-700 font-semibold mb-5">
            Monthly basis complaints record
          </h3>
          <ComplaintStage />
        </div>
      </div>

      {/* area graph */}
      <div className="tieChart flex flex-col justify-center items-center mt-4 p-3 border border-gray-200 bg-gray-50 rounded-md shadow-md">
        {/* title */}
        <h3 className="text-sm text-center text-gray-700 font-semibold mb-5">
          Area Graph of complaints on monthly basis
        </h3>
        <AreaGraph />
      </div>
    </>
  );
};

export default ChartSection