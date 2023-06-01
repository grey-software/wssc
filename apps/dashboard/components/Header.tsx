"use client";
import React, { useState } from "react";
import { items } from "@/public/projectdata/asideData";
import { BsFillBellFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { SignOutUser } from "@/app/GlobalState/UserSlice";
import { RootState } from "@/app/GlobalState/store";
import Image from "next/image";
import logo from "../public/wsscmlogo.png";

const Header = () => {
  const [search, setSearch] = useState("");
  const { WSSC_CODE }: any = useSelector(
    (state: RootState) => state.User.SignInData
  );
  const activeTab = useSelector((state: RootState) => state.Tab.index);
  const currentTab = items.find((x) => x.id === activeTab);
  console.log(activeTab, currentTab);
  const dispatch = useDispatch();
  return (
    <div>
      {WSSC_CODE ? (
        <div className="w-full flex justify-between items-center px-8 py-2 bg-slate-50 top-0 fixed border-b shadow z-50">
          <div className="flex items-center gap-2 pl-7">
            <Image src={logo} className="h-9 w-10" alt="logo" />
            <h1 className="text-2xl font-bold text-primaryColor-500">WSSCM</h1>
          </div>
          {/* <h1 className="text-3xl font-semibold">{currentTab?.name}</h1> */}
          <div className="flex items-center justify-start gap-8">
            <div className="flex items-center gap-4 text-3xl text-primaryColor-500">
              <BsFillBellFill />
              <h1 className="text-black text-lg">WSSCM</h1>
              <div onClick={() => dispatch(SignOutUser)}>
                <FaUserCircle />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
