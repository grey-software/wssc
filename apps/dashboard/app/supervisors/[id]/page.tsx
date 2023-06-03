"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { BsCaretLeftSquareFill, BsCaretRightSquareFill } from "react-icons/bs";
import { RootState } from "@/app/GlobalState/store";
import { setActiveTab } from "@/app/GlobalState/TabSlice";

const page = ({ params }: any) => {
  const id = params.id;
  const dispatch = useDispatch();
  const navigate = useRouter();

  const complaints = [
    {
      _id: "kjherh2i34983askd3d23",
      userName: "Hikmat Khan",

      status: [
        {
          state: "Initiated",
        },
        {
          state: "InProgress",
        },
      ],
      complaintType: "waster-water",
      complaintDes: "there is water problem",
      complaintAddress: "Near UET mardan",
      createdAt: "2023-06-01T17:09:01.076Z",
      wsscStatement: "testin tesitnas dkf sdf",
    },
    {
      _id: "28734hh2i34983askd3d23",
      userName: "Umair khan",

      status: [
        {
          state: "Initiated",
        },
      ],
      complaintType: "waster-water",
      complaintDes: "there is water problem",
      complaintAddress: "Near UET mardan",
      createdAt: "2023-06-01T17:09:01.076Z",
      wsscStatement: "testin tesitnas dkf sdf",
    },
    {
      _id: "28734hh2i34983askd3d23",
      userName: "Umair khan",

      status: [
        {
          state: "Initiated",
        },
        {
          state: "InProgress",
        },
      ],
      complaintType: "waster-water",
      complaintDes: "there is water problem",
      complaintAddress: "Near UET mardan",
      createdAt: "2023-06-01T17:09:01.076Z",
      wsscStatement: "testin tesitnas dkf sdf",
    },
    {
      _id: "28734hh2i34983askd3d23",
      userName: "Umair khan",

      status: [
        {
          state: "Initiated",
        },
      ],
      complaintType: "waster-water",
      complaintDes: "there is water problem",
      complaintAddress: "Near UET mardan",
      createdAt: "2023-06-01T17:09:01.076Z",
      wsscStatement: "testin tesitnas dkf sdf",
    },
  ];
  const supervisor = {
    _id: "23487641234124",
    name: "umair",
    phone: "03113456218",
    WSSC_CODE: "wsscm247810",
    assignComplaints: [
      {
        _id: "kjh2sdf43534453",
      },
      {
        _id: "jwdsg435344sdf3",
      },
      {
        _id: "8sdf2sdf4353dfgs",
      },
      {
        _id: "kjh2sdf43534453",
      },
    ],
  };

  return (
    <div className="container flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4  text-md">
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
              navigate.push("/supervisors");
            }}
            title="Complaints"
            className="flex items-center justify-center cursor-pointer text-sm text-primary-default px-3 py-1 rounded-full transition-all hover:bg-primaryColor-300 bg-gray-200"
          >
            <span>Supervisors</span>
          </span>
          <span className="text-[10px] font-bold text-gray-500">
            <MdOutlineArrowForwardIos />
          </span>
          <span
            title="Complaint"
            className="flex items-center justify-center cursor-pointer text-sm text-primary-default px-3 py-1 rounded-full bg-primaryColor-300"
          >
            <span>Supervisor</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 w-full gap-6">
        <h1 className="col-span-2 text-md font-bold">
          Complaints{" "}
          <span className="ml-2 px-2 py-1 bg-primaryColor-500 text-white rounded-md">
            {complaints.length}
          </span>
        </h1>
        <h1 className=" text-md font-bold">Supervisor Profile</h1>
      </div>
      {/* showing supervisor and complaints data */}
      <div className="grid grid-cols-3 w-full gap-6 text-sm">
        <div className="col-span-2 flex flex-col gap-4 overflow-y-scroll h-[73vh] px-2 pb-4">
          {complaints.map((complaint, index) => (
            <div className=" shadow-md p-5 rounded">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-4 text-md">
                  <span className="px-2 py-[2px] bg-gray-300 font-bold rounded-full">
                    {index + 1}
                  </span>{" "}
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Type</span>
                    <span className="bg-feedbackColor px-2 py-1 rounded text-white">
                      {complaint?.complaintType}
                    </span>
                  </div>
                </div>
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
                <div className="flex items-start gap-2">
                  <span className="font-semibold">ID</span>
                  <span className="uppercase">{complaint?._id.slice(-8)}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold">Intiated At</span>
                  <span>{complaint?.createdAt.split("T")[0]}</span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="font-semibold">Address</span>
                  <span>{complaint?.complaintAddress}</span>
                </div>
                {complaint?.complaintDes && (
                  <div className="flex items-start gap-2 ">
                    <span className="font-semibold">Description</span>
                    <span>{complaint.complaintDes}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 col-span-2">
                  <span className="font-semibold">Statement</span>
                  {complaint?.wsscStatement && (
                    <span>{complaint.wsscStatement}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CITIZEN PROFILE CARD */}
        <div className="flex items-start justify-start">
          <div className="flex flex-col items-center p-10 rounded shadow-md border-2 border-gray-500">
            <img
              src="/user.jpg"
              className="h-32 w-32 rounded-full"
              alt={supervisor.name}
            />
            <div className="flex flex-col gap-2 items-center mt-6">
              <h1 className="text-xl font-bold">{supervisor.name}</h1>
              <div className="flex items-center gap-4">
                <span>Contact</span>
                <h1>{supervisor.phone}</h1>
              </div>
              <div className="flex items-center gap-4">
                <span>WSSC_CODE</span>
                <h1 className="uppercase">{supervisor.WSSC_CODE}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
