"use client";
import React from "react";
import { HiArrowLeft } from "react-icons/hi";
import Link from "next/link";
const page = () => {
  return (
    <div className="relative w-[365px] sm:w-[450px] md:w-full lg-full xl-w-full">
      <div className="flex items-center justify-between mb-2">
        <Link
          href="/"
          className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-all cursor-pointer"
        >
          <HiArrowLeft className="text-[28px] text-primaryColor-500" />
        </Link>
        <h3 className="text-lg -ml-3 font-bold text-primaryColor-500">
          <span className=" text-headingColor-400 opacity-50 font-black">
            Terms and Conditions
          </span>
        </h3>
        <div className="w-11"></div>
      </div>
    </div>
  );
};

export default page;
