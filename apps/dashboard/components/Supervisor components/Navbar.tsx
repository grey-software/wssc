"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import userdp from "../../public/user.jpg";
import { SupervisorLogoutApi } from "@/GlobalState/Supervisor-ApiCalls/ApiCalls/authApiCalls";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
// import {
//   NovuProvider,
//   PopoverNotificationCenter,
//   NotificationBell,
//   IMessage,
// } from "@novu/notification-center";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalState/store";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [menuActive, setMenuActive] = useState(false);
  const [windowActive, setWindowActive] = useState(false);

  const { _id, profile_image }: any = useSelector(
    (state: RootState) => state.suprvisor.SupervisorSiginData
  );

  const WSSC: any = useSelector((state: RootState) => state.suprvisor.WSSC);
  // function onNotificationClick(message: IMessage) {
  //   // your logic to handle the notification click
  //   if (message?.cta?.data?.url) {
  //     window.location.href = message.cta.data.url;
  //   }
  // }

  // handle mthod deintiion
  const HandleClick = () => {
    toast.error("This feature is in progress", {
      position: "top-center",
      style: { width: "auto", height: "auto" },
      duration: 3000,
    });
  };
  // logout method definition
  const Logout = async () => {
    try {
      const res = await SupervisorLogoutApi(dispatch);
      console.log(res);
      if (res.status == 200) {
        navigate.push("/auth");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between bg-gray-50 w-full px-3 py-2 border-1 shadow-md md:shadow-lg fixed top-0 border z-30">
        <div className="flex items-center justify-center gap-2">
          <Link href="/supervisor">
            <Image src={WSSC?.logo} height={40} width={40} alt="wssc_logo" />
          </Link>
          <h2 className="text-lg text-primaryColor-500 font-bold">
            {WSSC?.shortname}
          </h2>
        </div>
        {/* notification icon and batch of notify */}
        <div className="flex items-center justify-center gap-4">
          {/* notification batch */}
          {/* <NovuProvider
            subscriberId={_id}
            applicationIdentifier={"yhet1-MoYIOR"}
          >
            <PopoverNotificationCenter
              onNotificationClick={onNotificationClick}
              colorScheme="light"
            >
              {({ unseenCount }) => (
                <NotificationBell unseenCount={unseenCount} />
              )}
            </PopoverNotificationCenter>
          </NovuProvider> */}
          {/* user image */}
          <Image
            src={profile_image ? profile_image : userdp}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
            alt="profileIcon"
            onClick={() => setMenuActive(!menuActive)}
          />
        </div>
        {/* SubMenu window */}
        <div
          className={`flex flex-col z-50 absolute top-12 right-3 w-32 transform transition-transform px-4 py-2 border border-gray-300 bg-white shad rounded-lg ${
            menuActive ? "-translate-x-0" : "translate-x-72 duration-100"
          }`}
        >
          <div className="flex flex-col text-sm font-semibold justify-center items-center text-gray-500 gap-1">
            <Link
              href={`/supervisor/profile/${_id}`}
              onClick={() => {
                setMenuActive(false);
              }}
            >
              <p className="hover:text-green-500">Profile</p>
            </Link>
            <p
              onClick={() => {
                HandleClick();
                setMenuActive(false);
              }}
              className="hover:text-green-500"
            >
              History
            </p>
            <p onClick={Logout} className="hover:text-green-500">
              Logout
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
