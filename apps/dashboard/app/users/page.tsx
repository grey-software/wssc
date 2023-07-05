"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { BsCaretLeftSquareFill, BsCaretRightSquareFill } from "react-icons/bs";
import { setActiveTab } from "@/GlobalState/TabSlice";
import { FetchUsers } from "@/GlobalState/ApiCalls/userApiCalls";
import { RootState } from "@/GlobalState/store";
import { ColorRing } from "react-loader-spinner";
import { MdClose } from "react-icons/md";
import Image from "next/image";

function Users() {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [userid, setUserId] = useState("");
  const { pending, error, adminToken }: any = useSelector((state: RootState) => state.User);
  const [success, setSuccess] = useState(error);


  const users: any = useSelector((state: RootState) => state.User.users);
  const user = users.find((u: any) => u?._id == userid);

  // pagination
  const selectPagehandler = (selectedPage: any) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= Math.ceil(users.length / 10) &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  const { WSSC_CODE }: any = useSelector(
    (state: RootState) => state.User.SignInData
  );

  const clickHandler = (id: any) => {
    setUserId(id);
    setModal(true);
  };

  useEffect(() => {
    const FetchingCitizens = async () => {
      await FetchUsers(dispatch, adminToken);
    }

    FetchingCitizens();
  }, []);

  // JSX SECTION
  return (
    <>
      {WSSC_CODE && users && (
        <div className="relative container flex flex-col gap-3">
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
            {users.length > 0 && (
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
            )}
          </div>

          {success ||
            (error && (
              <div className="flex items-center justify-between p-2 text-[#D8000C] bg-[#FFBABA]">
                <span>Unable to fetch Data, Please refresh the page 🙂</span>
                <span
                  onClick={() => setSuccess(false)}
                  className="text-2xl cursor-pointer"
                >
                  <MdClose />
                </span>
              </div>
            ))}

          {/* SHOWING ALL USERS */}
          <div
            className={`overflow-x-auto shadow-md sm:rounded-lg h-[75vh] py-1 ${
              pending && "flex items-center justify-center"
            }`}
          >
            {pending ? (
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            ) : (
              <>
                {users.length > 0 ? (
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
                        .map(
                          (
                            { _id, name, phone, address, email }: any,
                            index: any
                          ) => (
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
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                              >
                                {name}
                              </td>
                              <td className="px-6 py-4">0{phone}</td>
                              <td className="px-6 py-4">{address}</td>
                              <td className="px-6 py-4">{email}</td>

                              <td className="px-6 py-4">
                                <button
                                  onClick={() => clickHandler(_id)}
                                  className="font-bold text-[12px] uppercase text-white bg-primaryColor-500  py-1 px-3 rounded-lg hover:shadow-lg transition-all border-2 hover:bg-gray-50 border-completedColor hover:text-completedColor"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex items-center justify-center h-[70vh] w-full">
                    <p className="text-gray-400 font-semibold">
                      Citizens Signed Up will show here
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
          {users?.length > 10 && !pending && (
            <div className="flex items-center justify-center w-full">
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
                  <Image
                    src={user?.profile_image || "/user.jpg"}
                    className="h-32 w-32 rounded-full"
                    alt={user?.name}
                    height={100}
                    width={100}
                  />
                  <h1 className="mt-2 text-center text-xl font-bold">
                    {user?.name}
                  </h1>

                  <div className="flex flex-col gap-2 items-start mt-6">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-500">Contact</span>
                      <h1>0{user?.phone}</h1>
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
      )}
    </>
  );
}

export default Users;
