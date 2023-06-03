"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { setActiveTab } from "@/app/GlobalState/TabSlice";

type Props = {};

function Supervisors({}: Props) {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [search, setSearch] = useState<string>("");

  const supervisors: any = [
    {
      _id: "12341241234124",
      name: "ihtisham",
      phone: "03124568521",
      WSSC_CODE: "wsscm247810",
      assignComplaints: [
        {
          _id: "kjh2sdf43534453",
        },
        {
          _id: "jwdsg435344sdf3",
        },
        {
          _id: "8sdf2sdf4353dfgs",
        },
      ],
    },
    {
      _id: "23487641234124",
      name: "umair",
      phone: "03113456218",
      WSSC_CODE: "wsscm247810",
      assignComplaints: [
        {
          _id: "kjh2sdf43534453",
        },
        {
          _id: "jwdsg435344sdf3",
        },
        {
          _id: "8sdf2sdf4353dfgs",
        },
        {
          _id: "kjh2sdf43534453",
        },
      ],
    },
    {
      _id: "80287381234124",
      name: "hikmat",
      phone: "03124568521",
      WSSC_CODE: "wsscm247810",
      assignComplaints: [
        {
          _id: "kjh2sdf43534453",
        },
        {
          _id: "8sdf2sdf4353dfgs",
        },
      ],
    },
  ];
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
            <span>Supervisors</span>
          </span>
        </div>
        <div className="flex items-center border-2 border-gray-300 rounded-full">
          <input
            type="text"
            placeholder={`Search in ${supervisors.length} supervisors`}
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
                Supervisor ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Asigned Complaints
              </th>
              <th scope="col" className="px-6 py-3">
                WSSC_CODE
              </th>

              <th scope="col" className="px-6 py-3">
                <span>Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {supervisors.map(
              (
                { _id, name, phone, WSSC_CODE, assignComplaints }: any,
                index: any
              ) => (
                <tr
                  key={index}
                  onClick={() => navigate.push(`/supervisors/${_id}`)}
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
                  <td className="px-6 py-4">{assignComplaints.length}</td>
                  <td className="px-6 py-4 uppercase">{WSSC_CODE}</td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate.push(`/supervisors/${_id}`)}
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
    </div>
  );
}

export default Supervisors;
