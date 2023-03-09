import React from "react";

const Header = () => {
  return (
    <div className="flex items-center justify-between w-full px-3 py-4 border-1 shadow-xl fixed">
      <div className="flex items-center justify-center gap-2">
        <img src="/wsscmlogo.png" height={50} width={50} alt="" />
        <h2 className="text-lg text-primaryColor-500 font-bold">WSSCM</h2>
      </div>
      <div className="flex items-center justify-center gap-4">
        <img src="/notification.svg" height={35} width={35} alt="" />
        <img src="/user.svg" height={40} width={40} alt="" />
      </div>
    </div>
  );
};

export default Header;
