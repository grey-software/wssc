"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import userdp from "../../public/user.jpg";
import { BsFillBellFill } from "react-icons/bs";
import { SupervisorLogoutApi } from "@/app/GlobalState/Supervisor-ApiCalls/ApiCalls/authApiCalls";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useRouter();
const [menuActive, setMenuActive] = useState(false);
  const [windowActive, setWindowActive] = useState(false);
  
  // handle mthod deintiion
  const HandleClick = () => {
    toast.error("This feature is in progress", {
      position: "top-center",
      style: { width: "auto", height: "auto" },
      duration: 3000,
    });
  }
  // logout method definition
  const Logout = async() => {
    
    try {
      const res = await SupervisorLogoutApi(dispatch)
      console.log(res)
      if (res.status == 200) {
        navigate.push("/auth");
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="flex items-center justify-between bg-gray-50 w-full px-3 py-2 border-1 shadow-md md:shadow-lg fixed top-0 border z-30">
        <div className="flex items-center justify-center gap-2">
          <Link href="/supervisor">
            <Image src="/wsscmlogo.png" height={40} width={40} alt="" />
          </Link>
          <h2 className="text-lg text-primaryColor-500 font-bold">WSSCM</h2>
        </div>
        {/* notification icon and batch of notify */}
        <div className="flex items-center justify-center gap-4">
          <div className="notification flex relative">
            <BsFillBellFill
              className="text-[26px] text-primaryColor-500"
              onClick={() => setWindowActive(!windowActive)}
            />
            {/* notification batch */}
            <div className="absolute right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-95"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </div>
          </div>
          {/* user image */}
          <Image
            src={userdp}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
            alt="profileIcon"
            onClick={() => setMenuActive(!menuActive)}
          />
        </div>
        {/* Notification window */}
        <div
          className={`flex flex-col z-50 absolute top-12 right-3 w-32 transform transition-transform px-4 py-2 border border-gray-300 bg-white shad rounded-lg ${
            menuActive ? "-translate-x-0" : "translate-x-72 duration-100"
          }`}
        >
          <div className="flex flex-col text-sm font-semibold justify-center items-center text-gray-500 gap-1">
            <p
              onClick={() => {
                HandleClick();
                setMenuActive(false);
              }}
              className="hover:text-green-500"
            >
              Profile
            </p>
            <p
              onClick={() => {
                HandleClick();
                setMenuActive(false);
              }}
              className="hover:text-green-500"
            >
              History
            </p>
            <p onClick={Logout} className="hover:text-green-500">
              Logout
            </p>
          </div>
        </div>
      </div>
    </>
  );
};


export default Navbar