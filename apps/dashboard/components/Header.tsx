"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { SignOutUser } from "@/GlobalState/UserSlice";
import { RootState } from "@/GlobalState/store";
import Image from "next/image";
// import logo from "../public/wsscmlogo.png";

import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
  IMessage,
} from "@novu/notification-center";

const Header = () => {
  const { WSSC_CODE, fullname, logo }: any = useSelector(
    (state: RootState) => state.User.SignInData
  );
  console.log(WSSC_CODE);
  const activeTab = useSelector((state: RootState) => state.Tab.index);
  const dispatch = useDispatch();

  function onNotificationClick(message: IMessage) {
    // your logic to handle the notification click
    if (message?.cta?.data?.url) {
      window.location.href = message.cta.data.url;
    }
  }

  // JSX SECTION
  return (
    <div>
      {WSSC_CODE ? (
        <div className="w-full hidden md:flex justify-between items-center px-10 py-2 bg-slate-50 top-0 fixed border-b shadow z-50">
          <div className="flex items-center gap-2 pl-2">
            <Image
              src={logo}
              className="h-9 w-10"
              width={40}
              height={36}
              alt="logo"
            />
            <h1 className="text-xl font-bold text-primaryColor-500">
              {fullname}
            </h1>
          </div>
          {/* <h1 className="text-3xl font-semibold">{currentTab?.name}</h1> */}
          <div className="flex items-center justify-start gap-8">
            <div className="flex items-center gap-2 text-3xl text-primaryColor-500">
              <NovuProvider
                subscriberId={WSSC_CODE}
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
              <div className="flex items-center gap-[2px] text-lg">
                <Image src="/govt_logo.png" height={50} width={50} alt="" />
                <span className="font-semibold">Govt. Kpk</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
