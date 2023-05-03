"use client";
import React, { useState } from "react";
import Image from "next/image";
import { BiUserCircle } from "react-icons/bi";
import { FiShare2 } from "react-icons/fi";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { AiOutlineFileProtect } from "react-icons/ai";
import { TbLogout } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { MdOutlineContactPhone } from "react-icons/md";
import user from "../public/user.jpg";
import ShareApp from "./ShareApp";
import { toast } from "react-hot-toast";
// import { LogOutUser } from "@/Redux-toolkit/ReduxSlices/UserSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/global_state/store";
import { LOGOUT } from "@/global_state/ApiCalls/authApiCalls";
interface Props {
  menuActive: boolean,
  setMenuActive: React.Dispatch<React.SetStateAction<boolean>>
}

const ProfileMenu = ({ menuActive, setMenuActive }: Props) => {
  const {name, profile_image}:any = useSelector((state: RootState)=> state.users.UserInfo)
  const [sharePop, setsharePop] = useState(false);
  const dispatch = useDispatch();
  const navigate = useRouter();

  //Logout Method def to logOut user
  const LogOut = () => {
    // calling LOGOUT apicall method to logout user
    LOGOUT(dispatch)
    setMenuActive(!menuActive)
  }

  const NotifyTost = () => {
    toast.error("This feature is in Progress", {
      position: "top-center",
      style: { width: "auto", height: "auto" },
      duration: 2000,
    });
  };
  // im writing this just for the purpose of checking
  return (
    <div className="container w-full h-screen bg-red-700">
      <div className="flex flex-col justify-around gap-2 h-[100vh] w-[70vw] px-6 bg-blend-overlay border-r-2 border-gray-100 shadow-lg bg-primaryColor-100 ">
        <div className="flex flex-col gap-2 items-center -mt-6">
          <Image
            src={profile_image ? profile_image : user}
            className="h-32 w-32 rounded-full border-1 border-gray-300 "
            width={128}
            height={128}
            alt=""
          />
          <h1 className="text-xl text-headingColor-400 font-bold">
            {name}
          </h1>
          <Link href={`/profile/63463453`}>
            <button
              className="flex items-center gap-2 px-2 bg-[#A4C9D1] rounded-md"
              onClick={() => setMenuActive(!menuActive)}
            >
              <span>Edit</span>
              <FaEdit />
            </button>
          </Link>
        </div>
        <div className="flex flex-col gap-3 -mt-20">
          <Link
            href="/profile/3435334"
            onClick={() => setMenuActive(!menuActive)}
            className="flex items-center gap-2 text-md"
          >
            <BiUserCircle className="text-[28px] text-primaryColor-500" />
            <span className="text-gray-700">View Profile</span>
          </Link>

          <button
            className="flex items-center gap-2 text-md"
            onClick={() => setsharePop(!sharePop)}
          >
            <FiShare2 className="text-[24px] text-primaryColor-500" />
            <span className="text-gray-700">Share App</span>
          </button>

          <button
            onClick={() => NotifyTost()}
            className="flex items-center gap-2 text-md"
          >
            <MdOutlineContactPhone className="text-[24px] text-primaryColor-500" />
            <span className="text-gray-700">Contact us</span>
          </button>
          <button
            onClick={() => NotifyTost()}
            className="flex items-center gap-2 text-md"
          >
            <MdOutlinePrivacyTip className="text-[28px] text-primaryColor-500" />
            <span className="text-gray-700">Privacy and Policy</span>
          </button>

          <button
            onClick={() => NotifyTost()}
            className="flex items-center gap-2 text-md"
          >
            <AiOutlineFileProtect className="text-[28px] text-primaryColor-500" />
            <span className="text-gray-700">Terms and Conditions</span>
          </button>
        </div>

        <button
          onClick={LogOut}
          className="flex items-center gap-2 text-md -mt-4"
        >
          <TbLogout className="text-[28px] text-primaryColor-500" />
          <span className="text-gray-700">Log out</span>
        </button>
      </div>

      {sharePop && <ShareApp sharePop={sharePop} setSharePop={setsharePop} />}
    </div>
  );
};

export default ProfileMenu;
