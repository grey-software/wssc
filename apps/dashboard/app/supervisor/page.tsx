"use client";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import dummyPic from "../../public/wsscmlogo.png"
import { useState } from "react";
import Link from "next/link";

export const FiltersBtns = [
  {
    name: "Pending",
    index: 1,
  },
  {
    name: "Resolved",
    index: 2,
  },
  {
    name: "Closed",
    index: 3,
  },
];

const HomeScreen = () => {
    const [selected, setselected] = useState<Number>(0);
 
    const handleClick = (index: any) => {
        
    }
  
  return (
    <div className="container">
      <div className="complaints-record bg-gray-50 flex justify-center items-center  overflow-hidden border border-gray-300 shadow-sm shadow-gray-200 rounded-sm mx-2 mt-20">
        {FiltersBtns.map((e) => (
          <>
            <span
              key={e.index}
              onClick={() => setselected(e.index)}
              className={`pending cursor-pointer py-3  hover:bg-green-500 flex flex-col justify-center items-center border-r border-gray-300  flex-1  ${
                e.index == selected && "bg-green-500 text-white"
              } `}
            >
              <p className="text-sm">{e.name}</p>
            </span>
          </>
        ))}
      </div>

      <div className="complaints-types m-3 mt-2">
        <h2 className="text-md text-center font-semibold text-gray-600">
          Recent complaints
        </h2>
      </div>

      {/* complaint-types */}
      <Link href={`/supervisor/complaint/345454534`}>
        <div className="flex items-center justify-between rounded-lg border-2 border-gray-100 mb-1 mx-2 p-2 px-4 shadow-sm relative overflow-hidden">
          <div className="flex flex-col justify-center ml-1">
            <h3 className="text-md font-bold text-gray-600">Water Supply</h3>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <p>Status:</p>
              <span className={`font-bold text-primaryColor-500`}>
                Resolved
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <p>Submited On:</p>
              <span>08 jun, 23</span>
            </div>
            <div className="flex  gap-3 text-sm text-gray-600">
              <p>Address:</p>
              <span>uetm hostel</span>
            </div>
          </div>
          <Image
            src={dummyPic}
            className="h-70% w-[30%]"
            width={60}
            height={40}
            alt=""
          />
          <div
            className="h-[100%] w-2 top-0 left-0 absolute bg-primaryColor-500"
            // className={`h-[100%] w-2 top-0 left-0 absolute ${
            //   status[status.length - 1]?.state === "Initiated"
            //     ? "bg-initiatedColor"
            //     : ""
            // }  ${
            //   status[status.length - 1]?.state === "InProgress"
            //     ? "bg-inprogessColor"
            //     : ""
            // } ${
            //   status[status.length - 1]?.state === "Completed"
            //     ? "bg-completedColor"
            //     : ""
            // } ${
            //   status[status.length - 1]?.state === "Closed"
            //     ? "bg-closedColor"
            //     : ""
            // }`}
          ></div>
        </div>
      </Link>

      <div className="flex items-center justify-between rounded-lg border-2 border-gray-100 mb-1 mx-2 p-2 px-4 shadow-sm relative overflow-hidden">
        <div className="flex flex-col justify-center ml-1">
          <h3 className="text-md font-bold text-gray-600">Water Supply</h3>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <p>Status:</p>
            <span className={`font-bold text-red-600`}>Closed</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <p>Submited On:</p>
            <span>08 jun, 23</span>
          </div>
          <div className="flex  gap-3 text-sm text-gray-600">
            <p>Address:</p>
            <span>uetm hostel</span>
          </div>
        </div>
        <Image
          src={dummyPic}
          className="h-70% w-[30%]"
          width={60}
          height={40}
          alt=""
        />
        <div
          className="h-[100%] w-2 top-0 left-0 absolute bg-red-600"
          // className={`h-[100%] w-2 top-0 left-0 absolute ${
          //   status[status.length - 1]?.state === "Initiated"
          //     ? "bg-initiatedColor"
          //     : ""
          // }  ${
          //   status[status.length - 1]?.state === "InProgress"
          //     ? "bg-inprogessColor"
          //     : ""
          // } ${
          //   status[status.length - 1]?.state === "Completed"
          //     ? "bg-completedColor"
          //     : ""
          // } ${
          //   status[status.length - 1]?.state === "Closed"
          //     ? "bg-closedColor"
          //     : ""
          // }`}
        ></div>
      </div>

      <div className="flex items-center justify-between rounded-lg border-2 border-gray-100 mb-1 mx-2 p-2 px-4 shadow-sm relative overflow-hidden">
        <div className="flex flex-col justify-center ml-1">
          <h3 className="text-md font-bold text-gray-600">Water Supply</h3>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <p>Status:</p>
            <span className={`font-bold text-blue-600`}>Pending</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <p>Submited On:</p>
            <span>08 jun, 23</span>
          </div>
          <div className="flex  gap-3 text-sm text-gray-600">
            <p>Address:</p>
            <span>uetm hostel</span>
          </div>
        </div>
        <Image
          src={dummyPic}
          className="h-70% w-[30%]"
          width={60}
          height={40}
          alt=""
        />
        <div
          className="h-[100%] w-2 top-0 left-0 absolute bg-blue-600"
          // className={`h-[100%] w-2 top-0 left-0 absolute ${
          //   status[status.length - 1]?.state === "Initiated"
          //     ? "bg-initiatedColor"
          //     : ""
          // }  ${
          //   status[status.length - 1]?.state === "InProgress"
          //     ? "bg-inprogessColor"
          //     : ""
          // } ${
          //   status[status.length - 1]?.state === "Completed"
          //     ? "bg-completedColor"
          //     : ""
          // } ${
          //   status[status.length - 1]?.state === "Closed"
          //     ? "bg-closedColor"
          //     : ""
          // }`}
        ></div>
      </div>
    </div>
  );
};

export default HomeScreen;
