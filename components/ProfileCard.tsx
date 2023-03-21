import React from 'react'
import { HiArrowLeft } from "react-icons/hi";
import user from "../public/user.jpg";
import Image from "next/image";

const ProfileCard = () => {
  return (
    <div>
    <div className="flex items-center gap-28 mt-20">
    <HiArrowLeft
      className="text-[28px] text-primaryColor-500 ml-2"
    />
    <h3 className="text-lg font-bold text-primaryColor-500">
      <span className=" text-headingColor-400 opacity-50 font-black">Profile Card</span>
    </h3>
  </div>  
  {/* below code for user image */}
  <div className="flex flex-col gap-2 items-center">
        <Image src={user} className="h-36 w-36 rounded-full mt-8" alt="" />
        <h1 className="text-xl text-headingColor-400 font-bold">John Doe</h1>
        </div>
        <div>
        <input
                type="text"
                id="floating_standard"
                className={`block py-1 px-0 w-full text-md text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor-500 peer
                `}
                placeholder="Name "
              />
        </div>
  </div>
  );
};

export default ProfileCard;