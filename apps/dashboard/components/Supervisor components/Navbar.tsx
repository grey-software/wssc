"use client";
import Image from "next/image";
import React, { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import Link from "next/link";
import userdp from "../../public/user.jpg";
import { BsFillBellFill } from "react-icons/bs";

const Navbar = () => {
const [menuActive, setMenuActive] = useState(false);
const [windowActive, setWindowActive] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between bg-gray-50 w-full px-3 py-2 border-1 shadow-md md:shadow-lg fixed top-0 border z-30">
        <div className="flex items-center justify-center gap-2">
          <Link href="/">
            <Image src="/wsscmlogo.png" height={40} width={40} alt="" />
          </Link>
          <h2 className="text-lg text-primaryColor-500 font-bold">WSSCM</h2>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="notification flex relative">
            <BsFillBellFill
              className="text-[26px] text-primaryColor-500"
              onClick={() => setWindowActive(!windowActive)}
            />
            {/* notification ibatch */}
            <div className="absolute right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-95"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </div>
          </div>

          <Image
            src={userdp}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
            alt="profileIcon"
          />
        </div>
        {/* Notification window */}
        <div
          className={`flex flex-col z-50 absolute top-12 right-3 w-2/3 transform transition-transform p-4 border-2 border-gray-300 bg-white shad rounded-lg ${
            windowActive ? "-translate-x-0" : "translate-x-72"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-primaryColor-500">
              Notifications
            </span>
            <GrFormClose
              className="text-2xl"
              onClick={() => setWindowActive(!windowActive)}
            />
          </div>
          <div className="flex flex-col">
            <p>profile</p>
            <p>logout</p>
          </div>
        </div>
      </div>
    </>
  );
};


export default Navbar