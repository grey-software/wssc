"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { BsCaretLeftSquareFill, BsCaretRightSquareFill } from "react-icons/bs";
import { RootState } from "../GlobalState/store";
import { FetchAllComplaints } from "../GlobalState/ApiCalls/complaintApiCalls";
import { setActiveTab } from "../GlobalState/TabSlice";

const page = () => {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const userId = useSelector((state: RootState) => state.User.SignInData);
  useEffect(() => {
    FetchAllComplaints(userId, dispatch);
  }, []);

  const compliants = useSelector(
    (state: RootState) => state.Complaint.complaintsAll
  );

  const selectPagehandler = (selectedPage: any) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= Math.ceil(compliants.length / 10) &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  return (
    <div className="container flex flex-col gap-6">
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
            title="Complaints"
            className="flex items-center justify-center cursor-pointer text-sm text-primary-default px-3 py-1 rounded-full bg-primaryColor-300"
          >
            <span>Complaints</span>
          </span>
        </div>
        <div className="flex items-center border-2 border-gray-300 rounded-full">
          <input
            type="text"
            placeholder="Search here               "
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

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                S. NO.
              </th>
              <th scope="col" className="px-6 py-3">
                Complaint ID
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Filed By
              </th>
              <th scope="col" className="px-6 py-3">
                Date and Time
              </th>

              <th scope="col" className="px-6 py-3">
                status
              </th>

              <th scope="col" className="px-6 py-3">
                <span>Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {compliants
              .slice(page * 10 - 10, page * 10)
              .map(
                (
                  {
                    _id,
                    complaintType,
                    userName,
                    complaintAddress,
                    createdAt,
                    status,
                  },
                  index
                ) => (
                  <tr
                    key={index}
                    className="cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    onClick={() => navigate.push(`/complaint/${_id}`)}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase"
                    >
                      {index + 1}
                    </th>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase"
                    >
                      {_id.slice(-8)}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white "
                    >
                      {complaintType}
                    </td>
                    <td className="px-6 py-4">
                      {complaintAddress.slice(0, 20)}
                    </td>
                    <td className="px-6 py-4">
                      {!userName ? "NILL" : userName}
                    </td>
                    <td className="px-6 py-4">
                      {createdAt.split("T").join(" ")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`p-2  text-white rounded-lg ${
                          status[status.length - 1].state === "Initiated"
                            ? "bg-initiatedColor"
                            : ""
                        }  ${
                          status[status.length - 1].state === "InProgress"
                            ? "bg-inprogessColor"
                            : ""
                        } ${
                          status[status.length - 1].state === "Completed"
                            ? "bg-completedColor"
                            : ""
                        } ${
                          status[status.length - 1].state === "Closed"
                            ? "bg-closedColor"
                            : ""
                        }`}
                      >
                        {status[status.length - 1]?.state}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <button className="font-medium text-white bg-primaryColor-500 uppercase py-1 px-3 rounded-lg">
                        proceed
                      </button>
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
      {compliants.length > 10 && (
        <div className="flex items-center justify-center w-full">
          <div className="my-10 flex items-center gap-2 text-2xl">
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
            {compliants.length > 10 &&
              [...Array(Math.ceil(compliants.length / 10))].map((_, index) => (
                <span
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
                page < Math.ceil(compliants.length / 10)
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
    </div>
  );
};

export default page;
