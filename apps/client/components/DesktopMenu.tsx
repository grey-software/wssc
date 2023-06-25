"use client";
import React, { useState } from "react";
import Image from "next/image";
import { BiUserCircle } from "react-icons/bi";
import { FiShare2 } from "react-icons/fi";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { AiOutlineFileProtect } from "react-icons/ai";
import { TbFileStack } from "react-icons/tb";
import { TbLogout } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { MdOutlineContactPhone } from "react-icons/md";
import ShareApp from "./ShareApp";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/global_state/store";
import { LOGOUT } from "@/global_state/ApiCalls/authApiCalls";

const DesktopMenu = () => {
  const user: any = useSelector((state: RootState) => state.users?.UserInfo);
  console.log(user);
  const [sharePop, setsharePop] = useState(false);
  const dispatch = useDispatch();
  const navigate = useRouter();

  //Logout Method def to logOut user
  const LogOut = () => {
    // calling LOGOUT apicall method to logout user
    LOGOUT(dispatch);
    navigate.push("/");
  };

  // im writing this just for the purpose of checking
  return (
    <>
      {user && (
        <div className="container w-full py-3 mt-[70px] hidden sm:hidden md:flex lg:flex xl:flex border-2 border-gray-200 rounded-md  bg-white">
          <div className="flex flex-col justify-between gap-8 px-6">
            <div className="flex flex-col gap-3 mt-4">
              {user?.profile_image && (
                <Image
                  src={user?.profile_image || user}
                  className="h-28 w-28 rounded-full border-1 border-gray-300 "
                  width={128}
                  height={128}
                  alt=""
                />
              )}
              <h1 className="text-xl text-headingColor-400 font-bold">
                {user?.name}
              </h1>
              <span className="-mt-3">{user?.email}</span>
              <Link href={`/profile/${user?._id}`}>
                <button className="flex items-center text-sm font-semibold gap-2 px-2 bg-[#A4C9D1] rounded-md">
                  <span>Update</span>
                  <FaEdit />
                </button>
              </Link>
              <div className="h-[1px] w-full bg-gray-300"></div>
            </div>

            {/* NavBar */}
            <div className="flex flex-col gap-1">
              <Link
                href={`/profile/${user?._id}`}
                className="flex items-center gap-2 text-sm font-semibold px-4 py-2 hover:bg-gray-100 rounded-full transition-all w-40"
              >
                <BiUserCircle className="text-[24px] text-primaryColor-500" />
                <span className="text-gray-700">View Profile</span>
              </Link>
              <Link
                href={`/complaint/stages/AllComplaints`}
                className="flex items-center gap-2 text-sm font-semibold px-4 py-2 hover:bg-gray-100 rounded-full transition-all w-40"
              >
                <TbFileStack className="text-[24px] text-primaryColor-500" />
                <span className="text-gray-700">Complaints</span>
              </Link>

              <button
                className="flex items-center gap-3 text-sm font-semibold px-4 py-2 hover:bg-gray-100 rounded-full transition-all w-40"
                onClick={() => setsharePop(!sharePop)}
              >
                <FiShare2 className="text-[20px] text-primaryColor-500" />
                <span className="text-gray-700">Share App</span>
              </button>

              <button
                onClick={() => navigate.push("/contact")}
                className="flex items-center gap-3 text-sm font-semibold px-4 py-2 hover:bg-gray-100 rounded-full transition-all w-40"
              >
                <MdOutlineContactPhone className="text-[20px] text-primaryColor-500" />
                <span className="text-gray-700">Contact us</span>
              </button>
              <button
                onClick={() => navigate.push("/privacypolicy")}
                className="flex items-center gap-2 text-sm font-semibold px-4 py-2 hover:bg-gray-100 rounded-full transition-all w-52"
              >
                <MdOutlinePrivacyTip className="text-[24px] text-primaryColor-500" />
                <span className="text-gray-700">Privacy and Policy</span>
              </button>

              <button
                onClick={() => navigate.push("/termsandconditions")}
                className="flex items-center gap-2 text-sm font-semibold px-4 py-2 hover:bg-gray-100 rounded-full transition-all w-56 mb-1"
              >
                <AiOutlineFileProtect className="text-[24px] text-primaryColor-500" />
                <span className="text-gray-700">Terms and Conditions</span>
              </button>
              <div className="h-[1px] w-full bg-gray-300 "></div>
            </div>

            <button
              onClick={LogOut}
              className="flex items-center gap-2  text-sm font-semibold px-4 py-2 hover:bg-gray-100 rounded-full transition-all w-40"
            >
              <TbLogout className="text-[24px] text-primaryColor-500" />
              <span className="text-gray-700">Log out</span>
            </button>
          </div>

          {sharePop && (
            <ShareApp sharePop={sharePop} setSharePop={setsharePop} />
          )}
        </div>
      )}
    </>
  );
};

export default DesktopMenu;
