"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { BsCaretLeftSquareFill, BsCaretRightSquareFill } from "react-icons/bs";
import { RootState } from "@/app/GlobalState/store";
import { setActiveTab } from "@/app/GlobalState/TabSlice";
import SingleComplaintSupervisor from "@/components/complaint/SingleComplaintSupervisor";
import { GetSingleSupervisor } from "@/app/GlobalState/ApiCalls/supervisorApiCalls";

const page = ({ params }: any) => {
  const id = params.id;
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [state, setState] = useState<string>("AllComplaints");

  useEffect(() => {
    GetSingleSupervisor(dispatch, id);
  }, []);

  const supervisor: any = useSelector(
    (state: RootState) => state.Supervisor.supervisor
  );
  const complaints: any = useSelector((state: RootState) =>
    state.Complaint.complaintsAll.filter((c) => c.supervisorId == id)
  );

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
            onClick={() => {
              navigate.push("/supervisors");
            }}
            title="Complaints"
            className="flex items-center justify-center cursor-pointer text-sm text-primary-default px-3 py-1 rounded-full transition-all hover:bg-primaryColor-300 bg-gray-200"
          >
            <span>Supervisors</span>
          </span>
          <span className="text-[10px] font-bold text-gray-500">
            <MdOutlineArrowForwardIos />
          </span>
          <span
            title="Complaint"
            className="flex items-center justify-center cursor-pointer text-sm text-primary-default px-3 py-1 rounded-full bg-primaryColor-300"
          >
            <span>Supervisor</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 w-full gap-6">
        <div className="flex items-center justify-between col-span-2">
          <h1 className=" text-lg font-bold">
            Complaints
            <span className="ml-2 px-3 py-1 bg-primaryColor-500 text-white rounded-md">
              {complaints?.length}
            </span>
          </h1>
          <select
            className="px-3 py-1 border-2 border-gray-400 rounded focus:border-primaryColor-500"
            onChange={(e) => setState(e.target.value)}
          >
            <option value="AllComplaints">All Complaints</option>
            <option value="InProgress">InProgress</option>
            <option value="Completed">Completed</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <h1 className=" text-md font-bold">Supervisor Profile</h1>
      </div>
      {/* showing supervisor and complaints data */}
      <div className="grid grid-cols-3 w-full gap-6 text-sm">
        <div className="col-span-2 flex flex-col gap-4 overflow-y-scroll h-[73vh] px-2 pb-4">
          {complaints.length == 0 && (
            <h1 className="text-lg font-semibold text-gray-400">
              No Complaints to show
            </h1>
          )}

          {complaints.map((complaint: any, index: any) => (
            <>
              {state === "AllComplaints" ? (
                <SingleComplaintSupervisor
                  complaint={complaint}
                  index={index}
                />
              ) : (
                <>
                  {state ===
                    complaint?.status[complaint.status.length - 1].state && (
                    <SingleComplaintSupervisor
                      complaint={complaint}
                      index={index}
                    />
                  )}
                </>
              )}
            </>
          ))}
        </div>

        {/* SUPERVISOR PROFILE CARD */}
        <div className="flex items-start justify-start">
          <div className="flex flex-col items-center p-10 rounded shadow-md border-[1px] border-gray-50">
            <img
              src="/user.jpg"
              className="h-32 w-32 rounded-full"
              alt={supervisor.name}
            />
            <div className="flex flex-col gap-2 items-center mt-6">
              <h1 className="text-xl font-bold">{supervisor.name}</h1>
              <div className="flex items-center gap-4">
                <span>Contact</span>
                <h1>{supervisor.phone}</h1>
              </div>
              <div className="flex items-center gap-4">
                <span>WSSC_CODE</span>
                <h1 className="uppercase">{supervisor.WSSC_CODE}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
