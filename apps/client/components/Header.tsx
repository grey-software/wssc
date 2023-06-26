"use client";
import Image from "next/image";
import React, { useState } from "react";
import ProfileMenu from "./ProfileMenu";
import Link from "next/link";
import userdp from "../public/user.jpg";
import type { RootState } from "../global_state/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
  IMessage,
} from "@novu/notification-center";

const Header = () => {
  const navigate = useRouter();
  const { UserInfo }: any = useSelector((state: RootState) => state.users);
  const notifications = useSelector(
    (state: RootState) => state.complaints.notifications
  );
  // getting WSSC Info
  const WSSC: any = useSelector((state: RootState) => state.users.WSSC);

  const [menuActive, setMenuActive] = useState(false);
  const [windowActive, setWindowActive] = useState(false);

  function onNotificationClick(message: IMessage) {
    // your logic to handle the notification click
    if (message?.cta?.data?.url) {
      window.location.href = message.cta.data.url;
    }
  }

  return (
    <>
      {!UserInfo ? (
        ""
      ) : (
        <div className="bg-gray-50 w-full px-3 py-2 border-1 shadow-md md:shadow-lg fixed top-0 border z-30">
          <div className="flex items-center justify-between max-w-5xl m-auto">
            <div className="flex items-center justify-center gap-2">
              <Link href="/">
                <Image src={WSSC?.logo} height={40} width={40} alt="" />
              </Link>
              <h2 className="text-lg text-primaryColor-500 font-bold">
                {WSSC?.shortname}
              </h2>
            </div>
            <div className="flex items-center justify-center gap-4">
              <NovuProvider
                subscriberId={UserInfo._id}
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
              </NovuProvider>
              {/* show for mobile screen */}
              <Image
                src={UserInfo?.profile_image ? UserInfo?.profile_image : userdp}
                width={32}
                height={32}
                className={`block sm:block md:hidden lg:hidden xl:hidden w-8 h-8 rounded-full object-cover cursor-pointer`}
                alt="profileIcon"
                onClick={() => setMenuActive(!menuActive)}
              />
              {/* show for tablets and desktops  */}
              <Image
                src={UserInfo?.profile_image ? UserInfo?.profile_image : userdp}
                width={32}
                height={32}
                className={`hidden sm:hidden md:block lg:block xl:block w-8 h-8 rounded-full object-cover cursor-pointer`}
                alt="profileIcon"
                onClick={() => navigate.push(`profile/${UserInfo._id}`)}
              />
            </div>
          </div>

          {/* Profile Menu */}
          <div
            className={`z-50 absolute top-0 left-0 transform transition-transform ${
              menuActive
                ? "translate-x-0 sm:translate-x-0 md:hidden lg:hidden xl:hidden"
                : "-translate-x-[28rem] sm:-translate-x-[34rem] md:hidden lg:hidden xl:hidden"
            }`}
          >
            <ProfileMenu
              menuActive={menuActive}
              setMenuActive={setMenuActive}
            />
          </div>

          {/* Overlay to profile menu */}
          {menuActive ? (
            <div
              onClick={() => {
                setMenuActive(false);
                setWindowActive(false);
              }}
              className={`absolute top-0 left-0 bottom-0 right-0 h-[100vh] w-[100vw] bg-gray-800 opacity-50 z-30${
                menuActive && "sm:block md:hidden lg:hidden xl:hidden"
              } `}
            ></div>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};

export default Header;
