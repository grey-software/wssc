import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BiUserCircle } from "react-icons/bi";
import { FiShare2 } from "react-icons/fi";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { AiOutlineFileProtect } from "react-icons/ai";
import { TbLogout } from "react-icons/tb";

const ProfileMenu = () => {
  return (
    <div className="relative">
      <Image
        src="polygon.svg"
        width={20}
        height={20}
        alt=""
        className="absolute -top-2 right-0"
      />
      <div className="flex flex-col gap-2 py-4 px-4 border-1 border-gray-500 shadow-lg rounded-b-md rounded-l-md z-50 bg-white">
        <Link href="profilepage" className="flex items-center gap-2 text-md">
          <BiUserCircle className="text-[28px] text-primaryColor-500" />{" "}
          <span className="text-gray-500">View Profile</span>{" "}
        </Link>
        <Link href="profilepage" className="flex items-center gap-2 text-md">
          <FiShare2 className="text-[28px] text-primaryColor-500" />{" "}
          <span className="text-gray-500">Share App</span>{" "}
        </Link>
        <Link href="profilepage" className="flex items-center gap-2 text-md">
          <MdOutlinePrivacyTip className="text-[28px] text-primaryColor-500" />{" "}
          <span className="text-gray-500">Privacy and Policy</span>{" "}
        </Link>
        <Link href="profilepage" className="flex items-center gap-2 text-md">
          <AiOutlineFileProtect className="text-[28px] text-primaryColor-500" />{" "}
          <span className="text-gray-500">Terms and Conditions</span>{" "}
        </Link>
        <Link href="profilepage" className="flex items-center gap-2 text-md">
          <TbLogout className="text-[28px] text-primaryColor-500" />{" "}
          <span className="text-gray-500">Log out</span>{" "}
        </Link>
      </div>
    </div>
  );
};

export default ProfileMenu;
