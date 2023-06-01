"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AiFillStar } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { BsCaretLeftSquareFill, BsCaretRightSquareFill } from "react-icons/bs";
import { RootState } from "@/app/GlobalState/store";
import { setActiveTab } from "@/app/GlobalState/TabSlice";
import Image from "next/image";

const page = ({ params }: any) => {
  const id = params.id;
  const dispatch = useDispatch();
  const navigate = useRouter();
  const RatingInWords: string[] = [
    "",
    "Very Bad",
    "Bad",
    "Good",
    "Very Good",
    "Excellent",
  ];
  const rates: number[] = [1, 2, 3, 4, 5];
  const complaints = useSelector(
    (state: RootState) => state.Complaint.complaintsAll
  );

  const complaint = complaints.find((c) => c._id == id);
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
      <div className="grid grid-cols-2 w-full gap-6 text-sm">
        {/* Complaint details */}
        <div className=" shadow-md p-5 rounded ">
          <div className="flex items-center justify-between mb-1">
            <h1 className=" font-bold text-md">Complaint Details</h1>
            <div className="flex items-center gap-2 ">
              <span>Status</span>
              <span
                className={`text-white  px-2 py-1 rounded ${
                  complaint?.status[complaint.status.length - 1].state ===
                  "Initiated"
                    ? "bg-initiatedColor"
                    : ""
                }  ${
                  complaint?.status[complaint.status.length - 1].state ===
                  "InProgress"
                    ? "bg-inprogessColor"
                    : ""
                } ${
                  complaint?.status[complaint.status.length - 1].state ===
                  "Completed"
                    ? "bg-completedColor"
                    : ""
                } ${
                  complaint?.status[complaint.status.length - 1].state ===
                  "Closed"
                    ? "bg-closedColor"
                    : ""
                }`}
              >
                {complaint?.status[complaint.status.length - 1].state}
              </span>
            </div>
          </div>
          <div className="w-full border-[1px] border-gray-300"></div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Type</span>
              <span className="bg-feedbackColor px-2 py-1 rounded text-white">
                {complaint?.complaintType}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">intiated</span>
              <span>{complaint?.createdAt.split("T")[0]}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">ID</span>
              <span className="uppercase">{complaint?._id.slice(-8)}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">Address</span>
              <span>{complaint?.complaintAddress}</span>
            </div>
            <div className="flex items-start gap-2 col-span-2">
              <span className="font-semibold">Description</span>
              <span>{complaint?.complaintDes}</span>
            </div>
            <div className="flex items-center gap-2 col-span-2">
              <span className="font-semibold">Statement</span>
              {complaint?.wsscStatement ? (
                <span>{complaint.wsscStatement}</span>
              ) : (
                <button className="px-2 py-1 bg-primaryColor-300 rounded-md hover:bg-primaryColor-500 hover:text-white transition-all text-feedbackColor text-[10px] font-bold">
                  Add Statement
                </button>
              )}
            </div>
          </div>
        </div>

        {/* User details */}
        <div className="shadow-md p-5 rounded">
          <h1 className="mb-1 font-bold text-md">User Details</h1>
          <div className="w-full border-[1px] border-gray-300"></div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-start gap-2">
              <span className="font-semibold">UserName</span>
              <span>{complaint?.userName}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">User ID</span>
              <span className="uppercase">{complaint?.userId.slice(-8)}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">Contact</span>
              <span>{complaint?.phone}</span>
            </div>
            <div></div>
            {complaint?.feedback && (
              <div className="p-4 shadow-md flex flex-col gap-2">
                <h1 className="text-md font-bold">Feedback</h1>
                <div className="flex items-center gap-1 text-2xl">
                  {rates.map((value, index) => (
                    <div key={index}>
                      {value <= complaint.feedback.rating ? (
                        <span className="text-initiatedColor">
                          <AiFillStar />
                        </span>
                      ) : (
                        <span className="text-gray-300">
                          <AiFillStar />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-sm">"{complaint.feedback.description}"</p>
              </div>
            )}
          </div>
        </div>

        {/* complaint media */}
        <div className="shadow-md p-5 col-span-2 rounded">
          <h1 className="mb-1 font-bold text-md">Complaint Media</h1>
          <div className="w-full border-[1px] border-gray-300 mb-4"></div>
          <div className="grid grid-cols-2 gap-4 mt-4 h-80 w-full">
            {complaint?.ImageUrl && (
              <Image
                src={complaint?.ImageUrl}
                className="h-full "
                width={300}
                height={100}
                alt="Complaint Picture"
              />
            )}
            <video className="h-full" controls>
              <source src={complaint?.VideoUrl} />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
