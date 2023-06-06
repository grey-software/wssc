"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { BsCaretLeftSquareFill, BsCaretRightSquareFill } from "react-icons/bs";
import { setActiveTab } from "@/app/GlobalState/TabSlice";
import { FetchUsers } from "../GlobalState/ApiCalls/userApiCalls";
import { RootState } from "../GlobalState/store";

function Users() {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [userId, setUserId] = useState<string>();
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    FetchUsers(dispatch);
  }, []);

  const users = useSelector((state: RootState) => state.User.users);

  const user = users.find((u) => u?._id == userId);

  const selectPagehandler = (selectedPage: any) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= Math.ceil(users.length / 10) &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

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
            placeholder={`Search in ${users?.length} Users`}
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
      <div className="overflow-x-auto shadow-md sm:rounded-lg h-[75vh] py-1">
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
            {users
              .slice(page * 10 - 10, page * 10)
              .map(({ _id, name, phone, address, email }: any, index: any) => (
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
                      className="font-bold text-[12px] uppercase text-white bg-primaryColor-500  py-1 px-3 rounded-lg hover:shadow-lg transition-all"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {users?.length > 10 && (
        <div className="flex items-center justify-center w-full -mt-4">
          <div className="flex items-center gap-2 text-2xl">
            <span
              className={
                page > 1
                  ? "hover:text-primaryColor-500 transition-all cursor-pointer text-gray-700"
                  : "opacity-0"
              }
              onClick={() => selectPagehandler(page - 1)}
            >
              <BsCaretLeftSquareFill />
            </span>
            {users.length > 10 &&
              [...Array(Math.ceil(users?.length / 10))].map((_, index) => (
                <span
                  key={index}
                  className={
                    page === index + 1
                      ? "bg-primaryColor-300 text-sm font-semibold  rounded-md px-2 py-1 cursor-pointer"
                      : "bg-transparent text-sm rounded-md px-2 py-1  cursor-pointer"
                  }
                  onClick={() => selectPagehandler(index + 1)}
                >
                  {index + 1}
                </span>
              ))}
            <span
              className={
                page < Math.ceil(users?.length / 10)
                  ? "hover:text-primaryColor-500 transition-all cursor-pointer text-gray-700"
                  : "opacity-0"
              }
              onClick={() => selectPagehandler(page + 1)}
            >
              <BsCaretRightSquareFill />
            </span>
          </div>
        </div>
      )}
      {modal && (
        <div
          onClick={() => setModal(false)}
          className="absolute mt-10 h-[80vh] w-full flex items-center justify-center backdrop-blur-sm"
        >
          <div className="flex items-start justify-start">
            <div className="flex flex-col items-center p-10 rounded-md shadow-2xl bg-white border-[1px] border-gray-200">
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
                  <span className="text-gray-500">Contact</span>
                  <h1>{user?.phone}</h1>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-500">Email</span>
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
