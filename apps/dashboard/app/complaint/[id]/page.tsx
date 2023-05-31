"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { BsCaretLeftSquareFill, BsCaretRightSquareFill } from "react-icons/bs";
import { RootState } from "@/app/GlobalState/store";
import { setActiveTab } from "@/app/GlobalState/TabSlice";
import Image from "next/image";

const page = ({ params }: any) => {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const id = params.id;
  return (
    <div className="container flex flex-col gap-6 mb-3">
      <div className="flex items-center gap-4 text-md">
        <span
          className="cursor-pointer flex items-center justify-center p-[10px] rounded-full hover:bg-gray-100 active:bg-gray-300 transition-all"
          title="Dashboard"
          onClick={() => {
            navigate.push("/");
            dispatch(setActiveTab(0));
          }}
        >
          <AiFillHome />
        </span>
        <span className="text-[10px] font-bold text-gray-500">
          <MdOutlineArrowForwardIos />
        </span>
        <span
          onClick={() => {
            navigate.push("/complaint");
          }}
          title="Complaints"
          className="flex items-center justify-center cursor-pointer text-sm text-primary-default px-3 py-1 rounded-full transition-all hover:bg-primaryColor-300 bg-gray-100"
        >
          <span>Complaints</span>
        </span>
        <span className="text-[10px] font-bold text-gray-500">
          <MdOutlineArrowForwardIos />
        </span>
        <span
          title="Complaint"
          className="flex items-center justify-center cursor-pointer text-sm text-primary-default px-3 py-1 rounded-full bg-primaryColor-300"
        >
          <span>Complaint</span>
        </span>
      </div>
      {/* showing single  Complaint */}
      <div className="grid grid-cols-2 w-full gap-10 text-sm">
        {/* Complaint details */}
        <div className=" shadow-md p-5 rounded ">
          <div className="flex items-center justify-between mb-1">
            <h1 className=" font-bold text-md">Complaint Details</h1>
            <div className="flex items-center gap-2 ">
              <span>Status</span>
              <span className="text-white bg-inprogessColor px-2 py-1 rounded">
                InProgress
              </span>
            </div>
          </div>
          <div className="w-full border-[1px] border-gray-300"></div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Type</span>
              <span className="bg-feedbackColor px-2 py-1 rounded text-white">
                Waste water
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">intiated</span>
              <span>12 March, 2023</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">ID</span>
              <span>56576879890</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">Address</span>
              <span>Near Uet Mardan</span>
            </div>
            <div className="flex items-start gap-2 col-span-2">
              <span className="font-semibold">Description</span>
              <span>There is water blockage in the sevarage system</span>
            </div>
            <div className="flex items-start gap-2 col-span-2">
              <span className="font-semibold">Statement</span>
              <span>The problem is in the hostel sevarage system</span>
            </div>
          </div>
        </div>

        {/* User details */}
        <div className="shadow-md p-5 rounded">
          <h1 className="mb-1 font-bold text-md">User Details</h1>
          <div className="w-full border-[1px] border-gray-300"></div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-start gap-2">
              <span className="font-semibold">User ID</span>
              <span>56576879890</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">UserName</span>
              <span>Ihtisham Ul Haq</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">Contact</span>
              <span>03118133026</span>
            </div>
            <div className="col-span-2">feedback</div>
          </div>
        </div>

        {/* complaint media */}
        <div className="shadow-md p-5 col-span-2 rounded">
          <h1 className="mb-1 font-bold text-md">Complaint Media</h1>
          <div className="w-full border-[1px] border-gray-300 mb-1"></div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Image src="" width={300} height={300} alt="Complaint Picture" />
            <Image src="" width={300} height={300} alt="Complaint Picture" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
