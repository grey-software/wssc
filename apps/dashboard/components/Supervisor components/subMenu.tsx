"use client";
import { RootState } from "@/GlobalState/store";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const SubMenu = () => {
  const supervisor: any = useSelector(
    (state: RootState) => state.suprvisor.SupervisorSiginData
  );
  return (
    <>
      <div className="w-[80px] flex justify-center items-center right-2  border border-red-500 bg-white">
        <ul className="w-full list-none no-underline flex justify-center items-center flex-col gap-2 ">
          <Link href={`/supervisor/profile/${supervisor?._id}`}>
            <li> profile</li>
          </Link>
          <li>History</li>
          <li>Logout</li>
        </ul>
      </div>
    </>
  );
};

export default SubMenu;
