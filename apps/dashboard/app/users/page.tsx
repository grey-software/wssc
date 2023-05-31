"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { setActiveTab } from "@/app/GlobalState/TabSlice";

type Props = {};

function Users({}: Props) {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [search, setSearch] = useState("");
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
            title="Complaints"
            className="flex items-center justify-center cursor-pointer text-sm text-primary-default px-3 py-1 rounded-full bg-primaryColor-300"
          >
            <span>Users</span>
          </span>
        </div>
        <div className="flex items-center border-2 border-gray-300 rounded-full">
          <input
            type="text"
            placeholder="Search in Users               "
            className="text-sm rounded-l-full outline-none py-1 px-4 w-52 "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="border-[1px] border-gray-300 h-8"></div>
          <button className="py-1 px-4 rounded-r-full transition-all text-white bg-feedbackColor cursor-pointer">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Users;
