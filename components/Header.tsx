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
          onClick={() => setMenuActive(!menuActive)}
        />
      </div>
      <div
        className={`z-50 absolute top-0 left-0 transform transition-transform ${
          menuActive ? "translate-x-0" : "-translate-x-72"
        }`}
      >
        <ProfileMenu />
      </div>
      {menuActive ? (
        <div
          onClick={() => setMenuActive(false)}
          className="absolute top-0 left-0 bottom-0 right-0 h-[100vh] w-[100vw] bg-white-/50 backdrop-blur-sm z-30"
        ></div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
