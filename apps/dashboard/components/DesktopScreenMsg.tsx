'use client';
import Image from 'next/image';
import React from 'react'
import dashicon from "../public/dashicon.gif"
import { LOGOUT } from "@/GlobalState/ApiCalls/authApiCalls";
import { useDispatch } from "react-redux";
import { BiLogOutCircle } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const DesktopScreenMsg = () => {
    const dispatch = useDispatch();
    const navigate = useRouter();
    
// Logout method definition logout admin successfully
  const LogOut = async () => {
    try {
      const res = await LOGOUT(dispatch);
      if (res?.status === 200) {
        navigate.push("/auth");
        toast.success("Successfully Logged Out", {
          duration: 2000,
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center flex-col">
      {/* icon */}

      <Image
        src={dashicon}
        width={34}
        height={34}
        alt="dashicon"
        className="w-[40%]"
      />
      <div className="msg text-lg text-purple-600 flex-wrap flex-col justify-center items-center">
        <h3>To access Dashboard,</h3>
        <h3> please open it in PC</h3>
      </div>

      <fieldset className=" border-t mt-6 p-40 border-gray-400">
        <legend className="mx-auto px-2 text-gray-400 text-lg italic">
          or
        </legend>

        <button
          className=" text-md -mt-32 py-1 rounded-full flex justify-center items-center px-5 text-red-500 border border-red-500 tracking-wide  bg-white hover:text-white hover:bg-red-500 cursor-pointer transition-all"
          onClick={LogOut}
        >
          <span>
            <BiLogOutCircle className="text-xl mr-3" />
          </span>
          <span>Logout</span>
        </button>
      </fieldset>

      {/* logout button */}
    </div>
  );
}

export default DesktopScreenMsg