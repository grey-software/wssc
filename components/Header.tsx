import Image from "next/image";
import React from "react";
const Header = () => {
  return (
    <div className="flex items-center justify-between bg-gray-50 w-full px-3 py-2 border-1 shadow-md md:shadow-lg fixed top-0 border">
      <div className="flex items-center justify-center gap-2">
        <Image src="/wsscmlogo.png" height={50} width={50} alt="" />
        <h2 className="text-lg text-primaryColor-500 font-bold">WSSCM</h2>
      </div>
      <div className="flex items-center justify-center gap-4">
        <Image src="/notification.svg" height={23} width={23} alt="" />
        <Image src="/user.svg" height={27} width={27} alt="" />
      </div>
    </div>
  );
};

export default Header;
