import Image from "next/image";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { BsFillBellFill } from "react-icons/bs";
const Header = () => {
  return (
    <div className="flex items-center justify-between bg-gray-50 w-full px-3 py-2 border-1 shadow-md md:shadow-lg fixed top-0 border">
      <div className="flex items-center justify-center gap-2">
        <Image src="/wsscmlogo.png" height={40} width={40} alt="" />
        <h2 className="text-lg text-primaryColor-500 font-bold">WSSCM</h2>
      </div>
      <div className="flex items-center justify-center gap-4">
        <BsFillBellFill className="text-[28px] text-primaryColor-500" />
        <FaUserCircle className="text-[28px] text-primaryColor-500" />
      </div>
    </div>
  );
};

export default Header;
