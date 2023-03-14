import React from "react";
import Image from "next/image";
// import garbage from "./garbage.png";
import garbage from '../../public/garbage.png';
import { HiArrowLeft } from "react-icons/hi";
import Link from "next/link";
// import { useRouter } from "next/router";

const Complaints = () => {
  return (
    <div className="mt-20 mx-3">
      <div className="flex items-center gap-24">
        <Link href='/'>
        <HiArrowLeft className="text-[28px] text-primaryColor-500" />
        </Link>
        <span className="text-[25px] font-bold text-headingColor-400">
          Complaints
        </span>
      </div>
      <div className="flex flex-col gap-3 mt-6">
        <div className="flex items-center justify-between rounded-lg border-2 border-gray-100 p-4 shadow-lg relative overflow-hidden">
          <div className="flex flex-col justify-center ml-1">
            <h3 className="text-lg font-bold text-gray-600">Solid waste</h3>
            <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
              <p>Status:</p>
              <span className="text-initiatedColor">Initiated</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <p>Compliant ID:</p>
              <span>uwe1238</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <p>Submited On:</p>
              <span>24-jan-2023</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <p>Address:</p>
              <span>Mardan</span>
            </div>
          </div>
          <Image src={garbage} className="h-70% w-[30%]" alt="" />
          <div className="h-[100%] w-2 bg-initiatedColor top-0 left-0 absolute"></div>
        </div>
        <div className="flex items-center justify-between rounded-lg border-2 border-gray-100 p-4 shadow-lg relative overflow-hidden">
          <div className="flex flex-col justify-center ml-1">
            <h3 className="text-lg font-bold text-gray-600">Water Supply</h3>
            <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
              <p>Status:</p>
              <span className="text-inprogessColor">InProgress</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <p>Compliant ID:</p>
              <span>uwe1238</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <p>Submited On:</p>
              <span>24-jan-2023</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <p>Address:</p>
              <span>Mardan</span>
            </div>
          </div>
          <Image src={garbage} className="h-70% w-[30%]" alt="" />
          <div className="h-[100%] w-2 bg-inprogessColor top-0 left-0 absolute"></div>
        </div>
        <div className="flex items-center justify-between rounded-lg border-2 border-gray-100 p-4 shadow-lg relative overflow-hidden">
          <div className="flex flex-col justify-center ml-1">
            <h3 className="text-lg font-bold text-gray-600">Waste water</h3>
            <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
              <p>Status:</p>
              <span className="text-completedColor">Completed</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <p>Compliant ID:</p>
              <span>uwe1238</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <p>Submited On:</p>
              <span>24-jan-2023</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <p>Address:</p>
              <span>Mardan</span>
            </div>
          </div>
          <Image src={garbage} className="h-70% w-[30%]" alt="" />
          <div className="h-[100%] w-2 bg-completedColor top-0 left-0 absolute"></div>
        </div>
      </div>
    </div>
  );
};

export default Complaints;
