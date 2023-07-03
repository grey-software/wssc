"use client";
import React, { useState } from "react";
import Image from "next/image";
import { BiLogOutCircle, BiUserCircle } from "react-icons/bi";
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
  menuActive: boolean;
  setMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileMenu = ({ menuActive, setMenuActive }: Props) => {
  const { name, profile_image, _id }: any = useSelector(
    (state: RootState) => state.users.UserInfo
  );
  const [sharePop, setsharePop] = useState(false);
  const dispatch = useDispatch();
  const navigate = useRouter();

  //Logout Method def to logOut user
  const LogOut = () => {
    // calling LOGOUT apicall method to logout user
    LOGOUT(dispatch);
    setMenuActive(!menuActive);
    navigate.push("/");
  };

  // im writing this just for the purpose of checking
  return (
    <div className="container w-full h-screen bg-red-700">
      <div className="flex flex-col justify-around gap-2 h-[100vh] w-[70vw] px-6 bg-blend-overlay border-r-2 border-gray-100 shadow-lg bg-primaryColor-100 ">
        <div className="flex flex-col gap-2 items-center -mt-6">
          <Image
            src={profile_image ? profile_image : user}
            className="h-32 w-32 rounded-full border-1 border-gray-300 object-cover"
            width={128}
            height={128}
            alt=""
          />
          <h1 className="text-xl text-headingColor-400 font-bold">{name}</h1>
          <Link href={`/profile/${_id}`}>
            <button
              className="flex items-center gap-2 px-2 bg-[#A4C9D1] rounded-md"
              onClick={() => setMenuActive(!menuActive)}
            >
              <span>Update</span>
              <FaEdit />
            </button>
          </Link>
        </div>
        <div className="flex flex-col gap-3 -mt-20">
          <Link
            href={`/profile/${_id}`}
            onClick={() => setMenuActive(!menuActive)}
            className="flex items-center gap-2 text-md font-semibold"
          >
            <BiUserCircle className="text-[24px] text-primaryColor-500" />
            <span className="text-gray-700">View Profile</span>
          </Link>

          <button
            className="flex items-center gap-2 text-md font-semibold"
            onClick={() => setsharePop(!sharePop)}
          >
            <FiShare2 className="text-[20px] text-primaryColor-500" />
            <span className="text-gray-700 ml-1">Share App</span>
          </button>

          <button
            onClick={() => {
              setMenuActive(!menuActive);
              navigate.push("/contact");
            }}
            className="flex items-center gap-2 text-md font-semibold"
          >
            <MdOutlineContactPhone className="text-[20px] text-primaryColor-500" />
            <span className="text-gray-700 ml-1">Contact us</span>
          </button>
          <button
            onClick={() => {
              setMenuActive(!menuActive);
              navigate.push("/privacypolicy");
            }}
            className="flex items-center gap-2 text-md font-semibold"
          >
            <MdOutlinePrivacyTip className="text-[24px] text-primaryColor-500" />
            <span className="text-gray-700">Privacy and Policy</span>
          </button>

          <button
            onClick={() => {
              setMenuActive(!menuActive);
              navigate.push("/termsandconditions");
            }}
            className="flex items-center gap-2 text-md font-semibold"
          >
            <AiOutlineFileProtect className="text-[24px] text-primaryColor-500" />
            <span className="text-gray-700">Terms and Conditions</span>
          </button>
        </div>

        {/* Logout button */}
        <div className="logout  w-full ">
          <button
            className="text-lg px-3 py-1 rounded-full flex justify-center items-center w-[80%] tracking-wide bg-white text-red-500 border border-red-500 active:bg-red-500 active:text-white"
            onClick={LogOut}
          >
            <span>
              <BiLogOutCircle className="text-xl mr-3" />
            </span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {sharePop && <ShareApp sharePop={sharePop} setSharePop={setsharePop} />}
    </div>
  );
};

export default ProfileMenu;
