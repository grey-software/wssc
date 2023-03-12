"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BsFillBellFill } from "react-icons/bs";
import ProfileMenu from "./ProfileMenu";
const Header = () => {
  const [menuActive, setMenuActive] = useState(false);
  return (
    <div className="flex items-center justify-between bg-gray-50 w-full px-3 py-2 border-1 shadow-md md:shadow-lg fixed top-0 border z-30">
      <div className="flex items-center justify-center gap-2">
        <Image src="/wsscmlogo.png" height={40} width={40} alt="" />
        <h2 className="text-lg text-primaryColor-500 font-bold">WSSCM</h2>
      </div>
      <div className="flex items-center justify-center gap-4">
        <BsFillBellFill className="text-[28px] text-primaryColor-500" />
        <FaUserCircle
          className="text-[28px] text-primaryColor-500"
          onClick={() => setMenuActive(true)}
        />
      </div>
      <div
        className={`absolute top-12 right-4 ${menuActive ? "flex " : "hidden"}`}
      >
        <ProfileMenu />
      </div>
    </div>
  );
};

export default Header;
