"use client";
import React from "react";
import { HiArrowLeft } from "react-icons/hi";
import user from '../../../public/user.jpg';
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";

const ProfileCard = () => {
 
  const InProgress = () => {
     toast.error("This feature is in Progress", {
       position: "top-center",
       style: { width: "auto", height: "auto" },
       duration: 2000,
     });
  }

  // JSX Section
  return (
    <div>
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
      <div className="relative z-0 mt-10 mb-6 ml-10 mr-10">
        <input
          type="text"
          id="Name"
          defaultValue={`Arman Malik`}
          className={`block py-1 px-0 w-full text-md text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor-500 peer
                `}
          placeholder=""
        />
        <label
          htmlFor="Name"
          className="absolute text-med text-gray-400  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primaryColor-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Your Name
        </label>
      </div>
      {/* Contact */}
      <div className="relative z-0 mt-10 mb-6 ml-10 mr-10">
        <input
          type="number"
          id="contact"
          defaultValue={`03319395175`}
          className={`block py-1 px-0 w-full text-md text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor-500 peer
                `}
          placeholder=""
        />
        <label
          htmlFor="contact"
          className="absolute text-medium text-gray-400  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primaryColor-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Contact Number
        </label>
      </div>
      {/* Email */}
      <div className="relative z-0 mt-10 mb-6 ml-10 mr-10">
        <input
          type="email"
          id="email"
          defaultValue={`armanmalik88@gmail.com`}
          className={`block py-1 px-0 w-full text-md text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor-500 peer
                `}
          placeholder=""
        />
        <label
          htmlFor="email"
          className="absolute text-medium text-gray-400  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primaryColor-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email
        </label>
      </div>
      {/* Your Address */}
      <div className="relative z-0 mt-10 mb-6 ml-10 mr-10">
        <input
          type="text"
          id="address"
          defaultValue={`opposite MMC Golberg town `}
          className={`block py-1 px-0 w-full text-md text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor-500 peer
                `}
          placeholder=""
        />
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
    </div>
  );
};

export default ProfileCard;
