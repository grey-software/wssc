"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { setActiveTab } from "@/app/GlobalState/TabSlice";

type Props = {};

function Users({}: Props) {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [search, setSearch] = useState<string>("");
  const [userId, setUserId] = useState<string>();
  const [modal, setModal] = useState<boolean>(false);
  const [users, setUsers] = useState([
    {
      _id: "kjh934823984h22fads",
      name: "Hikmat Khan",
      phone: "03245689852",
      email: "hikmat@gmail.com",
      address: "Umarzai Charsadda",
      profile_image: "/user.jpg",
    },
    {
      _id: "kjh934823984sdfs8y8",
      name: "Ihtisham Ul Haq",
      phone: "03118523658",
      email: "sham@gmail.com",
      address: "Uet mardan",
      profile_image: "/user.jpg",
    },
    {
      _id: "kjh93482398kajhsd8a",
      name: "Talha khan",
      phone: "03256985694",
      email: "talha@gmail.com",
      address: "Katlan mardan",
      profile_image: "/user.jpg",
    },
  ]);

  const user = users.find((c) => c?._id == userId);

  return (
    <div className="relative container flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4  text-md">
          <span
            className="cursor-pointer flex items-center justify-center p-[10px] rounded-full hover:bg-gray-100 active:bg-gray-300 transition-all"
            title="Dashboard"
            onClick={() => {
              navigate.push("/");
              dispatch(setActiveTab(0));
            }}
          >
            <AiFillHome />
          </span>
          <span className="text-[10px] font-bold text-gray-500">
            <MdOutlineArrowForwardIos />
          </span>
          <span
            title="Citizens"
            className="flex items-center justify-center cursor-pointer text-sm text-primary-default px-3 py-1 rounded-full bg-primaryColor-300"
          >
            <span>Citizens</span>
          </span>
        </div>
        <div className="flex items-center border-2 border-gray-300 rounded-full">
          <input
            type="text"
            placeholder={`Search in ${users.length} Users`}
            className="text-sm rounded-l-full outline-none py-1 px-4 w-52 "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="border-[1px] border-gray-300 h-8"></div>
          <button className="py-1 px-4 rounded-r-full transition-all text-white bg-feedbackColor cursor-pointer">
            Search
          </button>
        </div>
      </div>

      {/* SHOWING ALL USERS */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                S. NO.
              </th>
              <th scope="col" className="px-6 py-3">
                Citizen ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                email
              </th>

              <th scope="col" className="px-6 py-3">
                <span>Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map(
              ({ _id, name, phone, address, email }: any, index: any) => (
                <tr
                  key={index}
                  className="cursor-pointer bg-white border-b  hover:bg-gray-50 "
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap uppercase"
                  >
                    {index + 1}
                  </th>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap uppercase"
                  >
                    {_id.slice(-8)}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white "
                  >
                    {name}
                  </td>
                  <td className="px-6 py-4">{phone}</td>
                  <td className="px-6 py-4">{address}</td>
                  <td className="px-6 py-4">{email}</td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setModal(true);
                        setUserId(_id);
                      }}
                      className="font-medium text-white bg-primaryColor-500 uppercase py-1 px-3 rounded-lg"
                    >
                      View
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      {modal && (
        <div
          onClick={() => setModal(false)}
          className="absolute mt-10 h-[80vh] w-full flex items-center justify-center backdrop-blur-sm"
        >
          <div className="flex items-start justify-start">
            <div className="flex flex-col items-center p-10 rounded shadow-2xl bg-white border-[1px] border-gray-400">
              <img
                src="/user.jpg"
                className="h-32 w-32 rounded-full"
                alt={user?.name}
              />
              <h1 className="mt-2 text-center text-xl font-bold">
                {user?.name}
              </h1>

              <div className="flex flex-col gap-2 items-start mt-6">
                <div className="flex items-center gap-4">
                  <span>Contact</span>
                  <h1>{user?.phone}</h1>
                </div>
                <div className="flex items-center gap-4">
                  <span>email</span>
                  <h1>{user?.email}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
