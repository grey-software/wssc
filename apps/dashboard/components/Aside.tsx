"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import { items } from "@/public/projectdata/asideData";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setActiveTab } from "@/app/GlobalState/TabSlice";
import { RootState } from "@/app/GlobalState/store";
// icons
import { FaUserCircle, FaUsers } from "react-icons/fa";
import { MdSpaceDashboard, MdFeedback } from "react-icons/md";
import { SiFiles } from "react-icons/si";
import { HiUsers } from "react-icons/hi";
import Link from "next/link";



function Aside() {
  const navigate = useRouter();
  const activeTab = useSelector((state: RootState) => state.Tab);
  const dispatch = useDispatch();
// Data for sideBar
   const items = [
     {
       id: 0,
       name: "Dashboard",
       to: "/",
       icon: <MdSpaceDashboard />,
     },
     {
       id: 1,
       name: "Complaints",
       to: "/complaint",
       icon: <SiFiles />,
     },
     {
       id: 2,
       name: "Supervisors",
       to: "/supervisors",
       icon: <HiUsers />,
     },
     {
       id: 3,
       name: "Citizens",
       to: "/users",
       icon: <FaUsers />,
     },
     {
       id: 4,
       name: "Feedback",
       to: "/feedback",
       icon: <MdFeedback />,
     },
  ];
  
  const clickHander = ( index: any) => {
    // navigate.push(`${link}`);
    // if (link == "/complaint") FetchAllComplaints(dispatch);
    dispatch(setActiveTab(index));
  };

  const { WSSC_CODE }: any = useSelector(
    (state: RootState) => state.User.SignInData
  );

  return (
    <>
      {WSSC_CODE ? (
        <aside className="h-screen w-[250px] fixed shadow bg-slate-50 border-r">
          <ul className=" mt-4 w-full">
            <li
              onClick={() => clickHander(0)}
              className={` py-3 flex w-full justify-start cursor-pointer items-center transition-all  ${
                activeTab.index === 0
                  ? "bg-primaryColor-300 font-semibold tracking-wide text-feedbackColor border-primaryColor-300"
                  : ""
              }`}
            >
              <Link href="/">
                <div className={`flex items-center justify-start ml-6`}>
                  <span className="text-xl">
                    <MdSpaceDashboard />
                  </span>
                  <span className="text-lg ml-4">Dashboard</span>
                </div>
              </Link>
            </li>

            <li
              onClick={() => clickHander(1)}
              className={` py-3 flex w-full justify-start cursor-pointer items-center transition-all  ${
                activeTab.index === 1
                  ? "bg-primaryColor-300 font-semibold tracking-wide text-feedbackColor border-primaryColor-300"
                  : ""
              }`}
            >
              <Link href="/complaint">
                <div className={`flex items-center justify-start ml-6`}>
                  <span className="text-xl">
                    <SiFiles />
                  </span>
                  <span className="text-lg ml-4">complaints</span>
                </div>
              </Link>
            </li>

            <li
              onClick={() => clickHander(2)}
              className={` py-3 flex w-full justify-start cursor-pointer items-center transition-all  ${
                activeTab.index === 2
                  ? "bg-primaryColor-300 font-semibold tracking-wide text-feedbackColor border-primaryColor-300"
                  : ""
              }`}
            >
              <Link href="/supervisors">
                <div className={`flex items-center justify-start ml-6`}>
                  <span className="text-xl">
                    <HiUsers />
                  </span>
                  <span className="text-lg ml-4">Supervisors</span>
                </div>
              </Link>
            </li>

            <li
              onClick={() => clickHander(3)}
              className={` py-3 flex w-full justify-start cursor-pointer items-center transition-all  ${
                activeTab.index === 3
                  ? "bg-primaryColor-300 font-semibold tracking-wide text-feedbackColor border-primaryColor-300"
                  : ""
              }`}
            >
              <Link href="/users">
                <div className={`flex items-center justify-start ml-6`}>
                  <span className="text-xl">
                    <FaUsers />
                  </span>
                  <span className="text-lg ml-4">citizen</span>
                </div>
              </Link>
            </li>

            <li
              onClick={() => clickHander(4)}
              className={` py-3 flex w-full justify-start cursor-pointer items-center transition-all  ${
                activeTab.index === 4
                  ? "bg-primaryColor-300 font-semibold tracking-wide text-feedbackColor border-primaryColor-300"
                  : ""
              }`}
            >
              <Link href="/feedback">
                <div className={`flex items-center justify-start ml-6`}>
                  <span className="text-xl">
                    <MdFeedback />
                  </span>
                  <span className="text-lg ml-4">Feedback</span>
                </div>
              </Link>
            </li>

            {/* {items.map((item, index) => (
              <li
                key={index}
                onClick={() => clickHander(item.to, index)}
                className={` py-3 flex w-full justify-start cursor-pointer items-center transition-all  ${
                  activeTab.index === index
                    ? "bg-primaryColor-300 font-semibold tracking-wide text-feedbackColor border-primaryColor-300"
                    : ""
                }`}
              >
                <div className={`flex items-center justify-start ml-6`}>
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-lg ml-4">{item.name}</span>
                </div>
              </li>
            ))} */}
          </ul>
        </aside>
      ) : (
        ""
      )}
    </>
  );
}

export default Aside;
