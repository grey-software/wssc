"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { items } from "@/public/projectdata/asideData";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setActiveTab } from "@/app/GlobalState/TabSlice";
import { RootState } from "@/app/GlobalState/store";
import Image from "next/image";
import logo from "../public/wsscmlogo.png";
import { FetchAllComplaints } from "@/app/GlobalState/ApiCalls/complaintApiCalls";

// import Fgpc_logo  from '../assets/fgpc_logo.svg'

function Aside() {
  const navigate = useRouter();
  const activeTab = useSelector((state: RootState) => state.Tab);
  const dispatch = useDispatch();

  const clickHander = (link: any, index: any) => {
    navigate.push(`${link}`);
    if (link == "/complaint") FetchAllComplaints(dispatch);
    dispatch(setActiveTab(index));
  };
  const { username } = useSelector((state: RootState) => state.User.SignInData);

  return (
    <div>
      {username ? (
        <aside className="h-screen w-[200px] absolute shadow top-0">
          <div className="flex items-center gap-2 mt-4 pl-7">
            <Image src={logo} className="h-9 w-10" alt="logo" />
            <h1 className="text-2xl font-bold text-primaryColor-500">WSSC</h1>
          </div>
          <ul className="mt-6 w-full">
            {items.map((item, index) => (
              <li
                key={index}
                onClick={() => clickHander(item.to, index)}
                className={` py-4 flex w-full justify-start cursor-pointer items-center border-l-4 transition-all ${
                  activeTab.index === index
                    ? "bg-gray-100 font-bold text-primaryColor-500  border-primaryColor-500"
                    : ""
                }`}
              >
                <div className={`flex items-center justify-start ml-6`}>
                  {/* {item.icon} */}
                  <span className="text-lg ml-2">{item.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      ) : (
        ""
      )}
    </div>
  );
}

export default Aside;
