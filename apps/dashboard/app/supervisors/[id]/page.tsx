"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { RootState } from "@/app/GlobalState/store";
import { setActiveTab } from "@/app/GlobalState/TabSlice";
import SingleComplaintSupervisor from "@/components/complaint/SingleComplaintSupervisor";
import { GetSingleSupervisor } from "@/app/GlobalState/ApiCalls/supervisorApiCalls";
import { FetchSupervisorComplaints } from "@/app/GlobalState/ApiCalls/complaintApiCalls";
import { AiFillStar } from "react-icons/ai";
import Rating from "react-rating";

const page = ({ params }: any) => {
  const id = params.id;
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [state, setState] = useState<string>("AllComplaints");
  let one = 0;
  let two = 0;
  let three = 0;
  let four = 0;
  let five = 0;
  let totalFeedbacks = 0;

  useEffect(() => {
    GetSingleSupervisor(dispatch, id);
    FetchSupervisorComplaints(id, dispatch);
  }, []);

  const supervisor: any = useSelector(
    (state: RootState) => state.Supervisor.supervisor
  );
  // const complaints: any = useSelector((state: RootState) =>
  //   state.Complaint.complaintsAll.filter((c) => c.supervisorId == id)
  // );
  const complaints: any = useSelector(
    (state: RootState) => state.Complaint.supervisorComplaints
  );

  const rates: number[] = [1, 2, 3, 4, 5];

  complaints &&
    complaints.forEach((complaint: any, index: any) => {
      console.log(complaint?.feedback?.rating);
      if (complaint.feedback) {
        totalFeedbacks += 1;
      }

      if (complaint?.feedback?.rating == 1) one += 1;
      if (complaint?.feedback?.rating == 2) two += 1;
      if (complaint?.feedback?.rating == 3) three += 1;
      if (complaint?.feedback?.rating == 4) four += 1;
      if (complaint?.feedback?.rating == 5) five += 1;
    });

  let rate = one * 1 + two * 2 + three * 3 + four * 4 + five * 5;

  let totalRating = 0;
  if (rate != 0) totalRating = rate / totalFeedbacks;

  return (
    <div className="container flex flex-col gap-3">
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
                <h1 className="font-semibold">{supervisor.phone}</h1>
              </div>
              <div className="flex items-center gap-4">
                <span>WSSC_CODE</span>
                <h1 className="uppercase font-semibold">
                  {supervisor.WSSC_CODE}
                </h1>
              </div>
              <span className="flex items-center gap-2">
                <p className="text-lg font-bold text-primaryColor-500">
                  {totalRating.toFixed(1)}
                </p>
                <Rating
                  initialRating={totalRating}
                  readonly
                  fullSymbol={
                    <AiFillStar className="text-initiatedColor text-2xl" />
                  }
                  emptySymbol={
                    <AiFillStar className="text-gray-300 text-2xl" />
                  }
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
