"use client";

import React from "react";
import { HiArrowLeft } from "react-icons/hi";
import user from "../public/user.jpg";
import Image from "next/image";
import { BiEdit } from "react-icons/bi";
import { useRouter } from "next/navigation";

const ProfileCard = () => {
  const navigate = useRouter();
  const handleBack = () => {
    // go to home page
    navigate.push("/");
  };
  return (
    <div>
      <div className="flex items-center gap-28 mt-20">
        <HiArrowLeft
          className="text-[28px] text-primaryColor-500 ml-2"
          onClick={handleBack}
        />
        <h3 className="text-lg font-bold text-primaryColor-500">
          <span className=" text-headingColor-400 opacity-50 font-black">
            Profile Card
          </span>
        </h3>
      </div>
      {/* below code for user image */}
      <div className="flex flex-col gap-2 items-center">
        <Image src={user} className="h-36 w-36 rounded-full mt-2" alt="" />
        <h1 className="text-xl text-headingColor-400 font-bold">John Doe</h1>
      </div>
      {/* Name */}
      <div className="flex flex-col gap-1 z-0 mt-10 mb-6 ml-10 mr-10">
        <div className="flex items-center justify-between">
          <h2>Ihtisham Ul Haq</h2>
          <BiEdit className="text-primaryColor-500" />
        </div>
        <label htmlFor="Name" className="text-md text-gray-400">
          Name
        </label>
      </div>
      {/* Contact */}
      <div className="relative z-0 mt-10 mb-6 ml-10 mr-10">
        <div className="flex items-center justify-between">
          <h2>Ihtisham Ul Haq</h2>
          <BiEdit className="text-primaryColor-500" />
        </div>
        <label
          htmlFor="Name"
          className="absolute text-medium text-gray-400  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primaryColor-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Contact Number
        </label>
      </div>
      {/* Email */}
      <div className="relative z-0 mt-10 mb-6 ml-10 mr-10">
        <div className="flex items-center justify-between">
          <h2>Ihtisham Ul Haq</h2>
          <BiEdit className="text-primaryColor-500" />
        </div>
        <label
          htmlFor="email"
          className="absolute text-medium text-gray-400  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primaryColor-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email
        </label>
      </div>
      {/* Your Address */}
      <div className="relative z-0 mt-10 mb-6 ml-10 mr-10">
        <div className="flex items-center justify-between">
          <h2>Ihtisham Ul Haq</h2>
          <BiEdit className="text-primaryColor-500" />
        </div>
        <label
          htmlFor="address"
          className="absolute text-medium text-gray-400  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primaryColor-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Your Address
        </label>
      </div>

      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className=" w-[75%] text-sm hover:bg-primaryColor-400 rounded-xl bg-primaryColor-500 text-white py-3 font-medium mb-3"
        >
          Change Password
        </button>
      </div>
      <div className="flex justify-center mt-1">
        <button
          type="submit"
          className=" w-[75%] text-sm hover:bg-primaryColor-400 rounded-xl bg-DeleteButton-100 text-DeleteButton-300 py-3 font-medium mb-3"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
