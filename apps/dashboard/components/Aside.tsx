"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import { items } from "@/public/projectdata/asideData";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setActiveTab } from "@/GlobalState/TabSlice";
import { RootState } from "@/GlobalState/store";
// icons
import { FaUserCircle, FaUsers } from "react-icons/fa";
import { MdSpaceDashboard, MdFeedback } from "react-icons/md";
import { SiFiles } from "react-icons/si";
import { HiUsers } from "react-icons/hi";
import { BiLogOutCircle } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { LOGOUT } from "@/GlobalState/ApiCalls/authApiCalls";

function Aside() {
  const navigate = useRouter();
  const activeTab = useSelector((state: RootState) => state.Tab);
  const dispatch = useDispatch();
  // Data for sideBar
  const items = [
    {
      id: 0,
      name: "Dashboard",
      to: "/",
      icon: <MdSpaceDashboard />,
    },
    {
      id: 1,
      name: "Complaints",
      to: "/complaint",
      icon: <SiFiles />,
    },
    {
      id: 2,
      name: "Supervisors",
      to: "/supervisors",
      icon: <HiUsers />,
    },
    {
      id: 3,
      name: "Citizens",
      to: "/users",
      icon: <FaUsers />,
    },
    {
      id: 4,
      name: "Feedback",
      to: "/feedback",
      icon: <MdFeedback />,
    },
  ];

  const clickHander = (link: any, index: any) => {
    navigate.push(`${link}`);
    dispatch(setActiveTab(index));
  };
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

  const { WSSC_CODE }: any = useSelector(
    (state: RootState) => state.User.SignInData
  );

  return (
    <>
      {WSSC_CODE ? (
        <aside className="h-screen w-[250px] fixed shadow bg-slate-50 border-r">
          <ul className="mt-10 w-full">
            {items.map((item, index) => (
              <li
                key={index}
                onClick={() => clickHander(item.to, index)}
                className={`mx-6 my-4 px-2 py-1 flex items-center rounded-full cursor-pointer transition-all ${
                  activeTab.index === index
                    ? "bg-primaryColor-300 hover:bg-primaryColor-300 font-semibold tracking-wide text-feedbackColor border-primaryColor-300"
                    : "hover:bg-gray-200"
                }`}
              >
                <div className={`flex items-center justify-start ml-6`}>
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-lg ml-4">{item.name}</span>
                </div>
              </li>
            ))}
          </ul>

          {/* logout button */}
          <div className="logout px-6 absolute bottom-28 w-full ">
            <button
              className="text-lg px-3 py-1 rounded-full flex justify-center items-center w-full text-red-500 border border-red-500 tracking-wide  bg-white hover:text-white hover:bg-red-500 cursor-pointer transition-all"
              onClick={LogOut}
            >
              <span>
                <BiLogOutCircle className="text-xl mr-3" />
              </span>
              <span>Logout</span>
            </button>
          </div>
        </aside>
      ) : (
        ""
      )}
    </>
  );
}

export default Aside;
