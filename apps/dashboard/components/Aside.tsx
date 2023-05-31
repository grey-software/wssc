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
    // if (link == "/complaint") FetchAllComplaints(dispatch);
    dispatch(setActiveTab(index));
  };
  
  const { username } = useSelector((state: RootState) => state.User.SignInData);

  return (
    <div>
      {username ? (
        <aside className="h-screen w-[250px] fixed shadow bg-slate-50 border-r">
          <ul className=" mt-4 w-full">
            {items.map((item, index) => (
              <li
                key={index}
                onClick={() => clickHander(item.to, index)}
                className={` py-3 flex w-full justify-start cursor-pointer items-center transition-all rounded-tl-lg rounded-bl-lg ${
                  activeTab.index === index
                    ? "bg-primaryColor-500 font-semibold tracking-wide text-gray-50 border-primaryColor-500"
                    : ""
                }`}
              >
                <div className={`flex items-center justify-start ml-6`}>
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-lg ml-4">{item.name}</span>
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
