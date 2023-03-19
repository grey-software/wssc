'use client'
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiUserCircle } from "react-icons/bi";
import { FiShare2 } from "react-icons/fi";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { AiOutlineFileProtect } from "react-icons/ai";
import { TbLogout } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { MdOutlineContactPhone } from "react-icons/md";
import user from "../public/user.jpg";
import ShareApp from "./ShareApp";

const ProfileMenu = () => {
  const [sharePop, setsharePop] = useState(false);
  
  return (
    <div className="container w-full h-screen bg-red-700">
      <div className="flex flex-col justify-around gap-2 h-[100vh] w-[70vw] px-6 bg-blend-overlay border-r-2 border-gray-100 shadow-lg bg-primaryColor-100 ">
        <div className="flex flex-col gap-2 items-center -mt-6">
          <Image
            src={user}
            className="h-32 w-32 rounded-full border-1 border-gray-300 "
            alt=""
          />
          <h1 className="text-xl text-headingColor-400 font-bold">Arman Malik</h1>
          <button className="flex items-center gap-2 px-2 bg-[#A4C9D1] rounded-md">
            <span>Edit</span>
            <FaEdit />
          </button>
        </div>
        <div className="flex flex-col gap-3 -mt-20">
          <Link href="profilepage" className="flex items-center gap-2 text-md">
            <BiUserCircle className="text-[28px] text-primaryColor-500" />
            <span className="text-gray-700">View Profile</span>
          </Link>
          <div className="flex items-center gap-2 text-md" onClick={()=>setsharePop(!sharePop)}>
            <FiShare2 className="text-[24px] text-primaryColor-500" />
            <span className="text-gray-700">Share App</span>
          </div>

          <Link href="profilepage" className="flex items-center gap-2 text-md">
            <MdOutlineContactPhone className="text-[24px] text-primaryColor-500" />
            <span className="text-gray-700">Contact us</span>
          </Link>
          <Link href="profilepage" className="flex items-center gap-2 text-md">
            <MdOutlinePrivacyTip className="text-[28px] text-primaryColor-500" />
            <span className="text-gray-700">Privacy and Policy</span>
          </Link>
          <Link href="profilepage" className="flex items-center gap-2 text-md">
            <AiOutlineFileProtect className="text-[28px] text-primaryColor-500" />
            <span className="text-gray-700">Terms and Conditions</span>
          </Link>
        </div>
        <Link
          href="profilepage"
          className="flex items-center gap-2 text-md -mt-4"
        >
          <TbLogout className="text-[28px] text-primaryColor-500" />
          <span  className="text-gray-700">Log out</span>
        </Link>
      </div>

      {sharePop && <ShareApp sharePop={sharePop} setSharePop={setsharePop}  />}
    </div>
  );
};

export default ProfileMenu;
