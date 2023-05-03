"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BsFillBellFill } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import ProfileMenu from "./ProfileMenu";
import Link from "next/link";
import userdp from "../public/user.jpg";
import type { RootState } from "../global_state/store";
import { useSelector } from "react-redux";

const Header = () => {
  const { UserInfo }: any = useSelector(
    (state: RootState) => state.users
  );
  const notifications = useSelector(
    (state: RootState) => state.complaints.notifications
  );

  const [menuActive, setMenuActive] = useState(false);
  const [windowActive, setWindowActive] = useState(false);

  return (
    <>
      {!UserInfo ? (
        ""
      ) : (
        <div className="flex items-center justify-between bg-gray-50 w-full px-3 py-2 border-1 shadow-md md:shadow-lg fixed top-0 border z-30">
          <div className="flex items-center justify-center gap-2">
            <Link href="/">
              <Image src="/wsscmlogo.png" height={40} width={40} alt="" />
            </Link>
            <h2 className="text-lg text-primaryColor-500 font-bold">WSSCM</h2>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="notification flex relative">
              <BsFillBellFill
                className="text-[26px] text-primaryColor-500"
                onClick={() => setWindowActive(!windowActive)}
              />
              {/* notification ibatch */}
              <div className="absolute right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-95"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </div>
            </div>

            <Image
              src={UserInfo?.profile_image? UserInfo.profile_image:userdp}
                className="w-8 rounded-full"
                width={32}
                height={32}
              alt="profileIcon"
              onClick={() => setMenuActive(!menuActive)}
            />
          </div>
          {/* Notification window */}
          <div
            className={`flex flex-col z-50 absolute top-12 right-3 w-2/3 transform transition-transform p-4 border-2 border-gray-300 bg-white shad rounded-lg ${
              windowActive ? "-translate-x-0" : "translate-x-72"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-primaryColor-500">
                Notifications
              </span>
              <GrFormClose
                className="text-2xl"
                onClick={() => setWindowActive(!windowActive)}
              />
            </div>
            <div className="flex flex-col">
              {notifications.map(({ id, type, status, time }) => (
                <Link
                  key={id}
                  href={`/complaint/timeline/${id}`}
                  onClick={() => setWindowActive(!windowActive)}
                  className="flex items-center justify-between border-b-[1px] border-gray-400 py-2"
                >
                  <div className="flex flex-col">
                    <p className="text-[10px] text-gray-500">
                      ID: <span>{id}</span>
                    </p>
                    <span className="text-sm font-bold text-headingColor-400">
                      {type}
                    </span>
                  </div>
                  <div className="flex flex-col text-sm">
                    <span className="font-bold text-gray-400 text-right text-[12px]">
                      {time}
                    </span>
                    <span
                      className={`font-bold  ${
                        status === "Initiated" ? "text-initiatedColor" : ""
                      }  ${
                        status === "InProgress" ? "text-inprogessColor" : ""
                      } ${
                        status === "Completed" ? "text-completedColor" : ""
                      } ${status === "Closed" ? "text-closedColor" : ""}`}
                    >
                      {status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Profile Menu */}
          <div
            className={`z-50 absolute top-0 left-0 transform transition-transform ${
              menuActive ? "translate-x-0" : "-translate-x-72"
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
              className="absolute top-0 left-0 bottom-0 right-0 h-[100vh] w-[100vw] bg-gray-800 opacity-50 z-30"
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
