"use client";
import React from "react";
import { HiArrowLeft } from "react-icons/hi";
import user from "../../../public/user.jpg";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { BiEdit } from "react-icons/bi";

const ProfileCard = () => {
  const InProgress = () => {
    toast.error("This feature is in Progress", {
      position: "top-center",
      style: { width: "auto", height: "auto" },
      duration: 2000,
    });
  };

  // JSX Section
  return (
    <div className="relative">
      <div className="flex items-center gap-28 mt-20 mb-2">
        <Link href="/">
          <HiArrowLeft
            className="text-[28px] text-primaryColor-500 ml-2"
            // onClick={handleBack}
          />
        </Link>
        <h3 className="text-lg -ml-3 font-bold text-primaryColor-500">
          <span className=" text-headingColor-400 opacity-50 font-black">
            Profile Card
          </span>
        </h3>
      </div>
      {/* below code for user image */}
      <div className="flex flex-col gap-2 items-center">
        <Image src={user} className="h-36 w-36 rounded-full mt-2" alt="" />
        <h1 className="text-xl text-headingColor-400 font-bold">Arman Malik</h1>
      </div>
      {/* Name */}
      <div className="flex flex-col gap-1 z-0 mt-10 mb-6 ml-8 mr-8">
        <label htmlFor="Name" className="text-sm text-gray-400">
          Name
        </label>
        <div className="flex items-center justify-between font-semibold">
          <h2 className="text-lg">Ihtisham Ul Haq</h2>
          <BiEdit className="text-primaryColor-500 text-2xl" />
        </div>
      </div>
      {/* Contact */}
      <div className="flex flex-col gap-1 z-0 mt-10 mb-6 ml-8 mr-8">
        <label htmlFor="Name" className="text-sm text-gray-400">
          Contact Number
        </label>
        <div className="flex items-center justify-between font-semibold">
          <h2 className="text-lg">03118133026</h2>
          <BiEdit className="text-primaryColor-500 text-2xl" />
        </div>
      </div>
      {/* Email */}
      <div className="flex flex-col gap-1 z-0 mt-10 mb-6 ml-8 mr-8">
        <label htmlFor="Name" className="text-sm text-gray-400">
          Email
        </label>
        <div className="flex items-center justify-between font-semibold">
          <h2 className="text-lg">shaami.khn321@gmail.com</h2>
          <BiEdit className="text-primaryColor-500 text-2xl" />
        </div>
      </div>
      {/* Your Address */}
      <div className="flex flex-col gap-1 z-0 mt-10 mb-6 ml-8 mr-8">
        <label htmlFor="Name" className="text-sm text-gray-400">
          Address
        </label>
        <div className="flex items-center justify-between font-semibold">
          <h2 className="text-lg">Near UET Mardan</h2>
          <BiEdit className="text-primaryColor-500 text-2xl" />
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <button
          type="submit"
          className=" w-[75%] text-sm hover:bg-primaryColor-400 rounded-xl bg-primaryColor-500 text-white py-3 font-medium mb-3"
          onClick={InProgress}
        >
          Change Password
        </button>
      </div>
      <div className="flex justify-center mt-1">
        <button
          type="submit"
          className=" w-[75%] text-sm hover:bg-primaryColor-400 rounded-xl bg-DeleteButton-100 text-DeleteButton-300 py-3 font-medium mb-3"
          onClick={InProgress}
        >
          Delete Account
        </button>
      </div>

      {/* Overlay */}
      {/* <div className="absolute top-0 left-0 right-0 bottom-0 h-screen w-full bg-gray-200 z-20"></div> */}
    </div>
  );
};

export default ProfileCard;
