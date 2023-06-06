"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AiFillStar } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { BsCaretLeftSquareFill, BsCaretRightSquareFill } from "react-icons/bs";
import { RootState } from "@/app/GlobalState/store";
import { setActiveTab } from "@/app/GlobalState/TabSlice";
import Image from "next/image";
import { FetchAllSupervisors } from "@/app/GlobalState/ApiCalls/supervisorApiCalls";
import {
  AssignComplaint,
  FetchComplaint,
  FetchAllComplaints,
  AddStatement,
} from "@/app/GlobalState/ApiCalls/complaintApiCalls";
import { GetSingleSupervisor } from "@/app/GlobalState/ApiCalls/supervisorApiCalls";

const Page = ({ params }: any) => {
  const id = params.id;
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [wsscStatement, setWsscStatement] = useState<string>("");
  const [supervisorId, setSupervisorId] = useState<string>("");

  const supervisors = useSelector(
    (state: RootState) => state.Supervisor.supervisorsAll
  );

  useEffect(() => {
    FetchAllSupervisors(dispatch);
    FetchComplaint(dispatch, id);
    GetSingleSupervisor(dispatch, complaint.supervisorId);
  }, []);

  const { loading, error }: any = useSelector(
    (state: RootState) => state.Complaint
  );

  const rates: number[] = [1, 2, 3, 4, 5];

  const complaint = useSelector(
    (state: RootState) => state.Complaint.complaint
  );

  const supervisor: any = useSelector(
    (state: RootState) => state.Supervisor.supervisor
  );

  const handleAssign = () => {
    AssignComplaint(dispatch, supervisorId, id);
    FetchAllComplaints(dispatch);
  };

  const handleStatment = () => {
    AddStatement(complaint._id, wsscStatement, dispatch);
  };

  const RatingInWords: string[] = [
    "",
    "Very Bad",
    "Bad",
    "Good",
    "Very Good",
    "Excellent",
  ];

  return (
    <div className="container flex flex-col gap-6 mb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-md">
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
              navigate.push("/complaint");
            }}
            title="Complaints"
            className="flex items-center justify-center cursor-pointer text-sm text-primary-default px-3 py-1 rounded-full transition-all hover:bg-primaryColor-300 bg-gray-200"
          >
            <span>Complaints</span>
          </span>
          <span className="text-[10px] font-bold text-gray-500">
            <MdOutlineArrowForwardIos />
          </span>
          <span
            title="Complaint"
            className="flex items-center justify-center cursor-pointer text-sm text-primary-default px-3 py-1 rounded-full bg-primaryColor-300"
          >
            <span>Complaint</span>
          </span>
        </div>
        {complaint?.status[complaint.status.length - 1].state ===
        "Initiated" ? (
          <div className="flex items-center gap-4">
            <select
              name="supervisor"
              id="supervisor"
              className="px-3 py-1 border-2 border-gray-400 rounded focus:border-primaryColor-500"
              onChange={(e) => setSupervisorId(e.target.value)}
            >
              <option value="Select supervisor">Select Supervisor</option>
              {supervisors.map(({ _id, name }, index) => (
                <option key={index} value={_id}>
                  {name}
                </option>
              ))}
            </select>
            <button
              onClick={handleAssign}
              className="text-white  px-3 py-1 rounded bg-inprogessColor shadow-sm hover:shadow-md transition-all"
            >
              {loading ? "Processing..." : "Assign"}
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {supervisor.name && (
              <div className="flex items-center gap-3 font-semibold">
                <span>Supervisor:</span>{" "}
                <span
                  onClick={() =>
                    navigate.push(`/supervisors/${supervisor._id}`)
                  }
                  className="py-1 px-2 bg-cyan-500 text-white rounded cursor-pointer"
                >
                  {supervisor?.name}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      {/* showing single  Complaint */}
      <div className="grid grid-cols-2 w-full gap-6 text-sm">
        {/* Complaint details */}
        <div className=" shadow-md p-5 rounded-md border-2 border-gray-50">
          <div className="flex items-center justify-between mb-1">
            <h1 className=" font-bold text-md">Complaint Details</h1>
            <div className="flex items-center gap-2 ">
              <span>Status</span>
              <span
                className={`text-white  px-2 py-1 rounded ${
                  complaint?.status[complaint.status.length - 1].state ===
                  "Initiated"
                    ? "bg-initiatedColor"
                    : ""
                }  ${
                  complaint?.status[complaint.status.length - 1].state ===
                  "InProgress"
                    ? "bg-inprogessColor"
                    : ""
                } ${
                  complaint?.status[complaint.status.length - 1].state ===
                  "Completed"
                    ? "bg-completedColor"
                    : ""
                } ${
                  complaint?.status[complaint.status.length - 1].state ===
                  "Closed"
                    ? "bg-closedColor"
                    : ""
                }`}
              >
                {complaint?.status[complaint.status.length - 1].state}
              </span>
            </div>
          </div>
          <div className="w-full border-[1px] border-gray-300"></div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Type</span>
              <span className="bg-feedbackColor px-2 py-1 rounded text-white">
                {complaint?.complaintType}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">Intiated At</span>
              <span>{complaint?.createdAt.split("T")[0]}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">ID</span>
              <span className="uppercase">{complaint?._id.slice(-8)}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">Address</span>
              <span>{complaint?.complaintAddress}</span>
            </div>
            {complaint?.complaintDes && (
              <div className="flex items-start gap-2 col-span-2">
                <span className="font-semibold">Description</span>
                <span>{complaint.complaintDes}</span>
              </div>
            )}

            <div className="flex items-center gap-2 col-span-2">
              {complaint?.wsscStatement ? (
                <>
                  <span className="font-semibold">Statement</span>
                  <span>{complaint.wsscStatement}</span>
                </>
              ) : (
                <>
                  <textarea
                    cols={30}
                    rows={2}
                    placeholder="Enter Statement"
                    onChange={(e) => setWsscStatement(e.target.value)}
                    value={wsscStatement}
                    className="bg-gray-50 border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg
                    outline-none
                    block w-full px-2 p-1
                    focus:border-primaryColor-500"
                  ></textarea>
                  <button
                    onClick={handleStatment}
                    className="px-2 py-1 bg-primaryColor-300 rounded-md hover:bg-primaryColor-500 hover:text-white transition-all text-feedbackColor text-[10px] font-bold"
                  >
                    {loading ? "Processing..." : "Add Statement"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* User details */}
        <div className="shadow-md p-5 rounded-md border-2 border-gray-50">
          <h1 className="mb-1 font-bold text-md">User Details</h1>
          <div className="w-full border-[1px] border-gray-300"></div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-start gap-2">
              <span className="font-semibold">UserName</span>
              <span>{complaint?.userName}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">User ID</span>
              <span className="uppercase">{complaint?.userId.slice(-8)}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">Contact</span>
              <span>{complaint?.phone}</span>
            </div>
            <div></div>
            {complaint?.feedback ? (
              <div className="p-4 shadow-md flex flex-col gap-2">
                <h1 className="text-md font-bold">Feedback</h1>
                <div className="flex items-center gap-1 text-2xl">
                  {rates.map((value, index) => (
                    <div key={index}>
                      {value <= complaint.feedback.rating ? (
                        <span className="text-initiatedColor">
                          <AiFillStar />
                        </span>
                      ) : (
                        <span className="text-gray-300">
                          <AiFillStar />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-sm">{complaint.feedback.description}</p>
              </div>
            ) : (
              <>No feedback yet</>
            )}
          </div>
        </div>

        {/* complaint media */}
        <div className="shadow-md p-5 col-span-2 rounded-md border-2 border-gray-50">
          <h1 className="mb-1 font-bold text-md">Complaint Media</h1>
          <div className="w-full border-[1px] border-gray-300 mb-4"></div>
          <div className="grid grid-cols-2 gap-4 mt-4 h-80 w-full">
            {complaint?.ImageUrl && complaint.VideoUrl ? (
              <>
                {" "}
                {complaint?.ImageUrl && (
                  <Image
                    src={complaint?.ImageUrl}
                    className="h-full "
                    width={300}
                    height={100}
                    alt="Complaint Picture"
                  />
                )}
                {complaint?.VideoUrl && (
                  <video className="h-full" controls>
                    <source src={complaint?.VideoUrl} />
                  </video>
                )}
              </>
            ) : (
              <h1>The Citizen have not provided any Media</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
