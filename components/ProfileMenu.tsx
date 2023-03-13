import React from "react";
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

const ProfileMenu = () => {
  return (
    <div className="flex flex-col justify-around gap-2 h-[100vh] w-[70vw] px-6 border-1 border-gray-500 shadow-lg bg-primaryColor-100">
      <div className="flex flex-col gap-2 items-center -mt-6">
        <Image src={user} className="h-36 w-36 rounded-full" alt="" />
        <h1 className="text-xl text-headingColor-400 font-bold">John Doe</h1>
        <button className="flex items-center gap-2 px-2 bg-[#A4C9D1] rounded-md">
          <span>Edit</span>
          <FaEdit />
        </button>
      </div>
      <div className="flex flex-col gap-3 -mt-20">
        <Link href="profilepage" className="flex items-center gap-2 text-md">
          <BiUserCircle className="text-[28px] text-primaryColor-500" />{" "}
          <span className="text-gray-700">View Profile</span>{" "}
        </Link>
        <Link href="profilepage" className="flex items-center gap-2 text-md">
          <FiShare2 className="text-[28px] text-primaryColor-500" />{" "}
          <span className="text-gray-700">Share App</span>{" "}
        </Link>
        <Link href="profilepage" className="flex items-center gap-2 text-md">
          <MdOutlineContactPhone className="text-[28px] text-primaryColor-500" />{" "}
          <span className="text-gray-700">Contact us</span>{" "}
        </Link>
        <Link href="profilepage" className="flex items-center gap-2 text-md">
          <MdOutlinePrivacyTip className="text-[28px] text-primaryColor-500" />{" "}
          <span className="text-gray-700">Privacy and Policy</span>{" "}
        </Link>
        <Link href="profilepage" className="flex items-center gap-2 text-md">
          <AiOutlineFileProtect className="text-[28px] text-primaryColor-500" />{" "}
          <span className="text-gray-700">Terms and Conditions</span>{" "}
        </Link>
      </div>
      <Link
        href="profilepage"
        className="flex items-center gap-2 text-md -mt-4"
      >
        <TbLogout className="text-[28px] text-primaryColor-500" />{" "}
        <span className="text-gray-700">Log out</span>{" "}
      </Link>
    </div>
  );
};

export default ProfileMenu;
