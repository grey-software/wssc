"use client";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { FcManager } from "react-icons/fc";
import { AiFillFileAdd } from "react-icons/ai";
import ChartNeedle from "./ChatNeedle";
import CountUp from "react-countup";
import { MdStar, MdStarBorder } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalState/store";
import Link from "next/link";

const CardsPage = () => {
  const {data, OrganizationRating}: any = useSelector((state: RootState) => state.statistics);

  
  return (
    <div className="cards W-full flex justify-between">
      {/* user cards */}
      <div className="card w-[20%] relative bg-gray-50 border-gray-400 rounded-md shadow-md overflow-hidden">
        <div className="wrapper p-3 flex justify-between items-center">
          <div className="name flex flex-col gap-3">
            {/* <p className="text-sm">All Users</p> */}
            <h2 className="text-orange-400 font-bold text-3xl">
              0<CountUp start={0} end={data?.users} duration={3} />
            </h2>
          </div>
          <div className="ICONS text-5xl text-orange-400 ">
            <FaUsers />
          </div>
        </div>
        {/* footer */}
        <Link href="/users">
          <div className="botm absolute hover:bg-orange-600 hover:text-md bottom-0 w-full p-2 text-md text-white text-center bg-orange-500 opacity-90">
            <h5>Registered Users</h5>
          </div>
        </Link>
      </div>

      {/* supervisor  card */}
      <div className="card w-[20%] relative bg-gray-50 border-gray-400 rounded-md shadow-md overflow-hidden">
        <div className="wrapper p-3 flex justify-between items-center">
          <div className="name flex flex-col gap-3">
            {/* <p className="text-sm">Supervisors</p> */}
            <h2 className="text-blue-600 font-bold text-3xl">
              <CountUp start={0} end={data?.supervisors} duration={3} />
            </h2>
          </div>
          <div className="ICONS text-5xl text-blue-600">
            <FcManager />
          </div>
        </div>
        {/* footer */}
        <Link href="/supervisors">
          <div className="botm absolute md:text-md hover:bg-blue-700 w-full bottom-0 p-2 text-md text-white text-center bg-blue-600 opacity-90">
            <h4>Active Supervisors</h4>
          </div>
        </Link>
      </div>

      {/* complaints card */}
      <div className="card w-[20%] relative bg-gray-50 border-gray-400 rounded-md shadow-md overflow-hidden">
        <div className="wrapper p-3 flex justify-between items-center">
          <div className="name flex flex-col gap-3">
            {/* <p className="text-sm">Complaints</p> */}
            <h2 className="text-green-500 font-bold text-3xl">
              <CountUp start={0} end={data?.complaints} duration={3} />
            </h2>
          </div>
          <div className="ICONS text-5xl text-primaryColor-500">
            <AiFillFileAdd />
          </div>
        </div>
        {/* footer */}
        <Link href="/complaint">
          <div className="botm  hover:bg-green-600 absolute w-full bottom-0 p-2 text-md text-white text-center bg-primaryColor-500 opacity-90">
            <h5>Registered Complaints</h5>
          </div>
        </Link>
      </div>

      {/* chartNeedle */}
      <div className="card w-[20%] relative bg-gray-50 border-gray-400 rounded-md shadow-md overflow-hidden">
        <div className="wrapper p-3 flex justify-between items-center">
          <ChartNeedle />
        </div>
        {/* footer */}
        <Link href="/feedback">
          <div className=" cursor-pointer hover:bg-yellow-500  p-2 text-md text-white tracking-wide text-center bg-yellow-400 bg-opacity-6">
            <h5>WSSC Performance</h5>
          </div>
        </Link>
        {/* rating %age */}
        <div className="percent w-full justify-between  flex absolute top-2  text-[14px] font-extrabold text-yellow-400">
          <div className=" w-auto ml-2 flex justify-center items-center">
            {OrganizationRating?.totalRating?.toFixed(1)}
            <span className="text-[17px]">
              <MdStar />
            </span>
          </div>
          <div className=" w-auto mr-2">
            {OrganizationRating?.OrgPercentage?.toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsPage;
