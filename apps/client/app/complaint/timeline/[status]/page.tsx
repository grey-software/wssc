"use client";
import Image from "next/image";
import Complaint_stages from "../../../../components/Complaint_stages";
import { HiArrowLeft } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/global_state/store";
import { useState } from "react";
// import complaintImg from ""

const Timeline = ({ params }: any) => {
  const complaintsAll = useSelector((state: RootState) => {
    return state.complaints.complaintsAll;
  });

  const [complaints, setComplaints] = useState<any[]>(complaintsAll);
  const complaintID = params.status;
  const navigate = useRouter();

  const {
    _id,
    complaintType,
    complaintAddress,
    createdAt,
    status,
    ImageUrl,
    feedback,
  }: any = complaints.find((c) => c?._id == complaintID);

  const back = () => {
    navigate.push("/complaint/stages/AllComplaints");
  };
  // TSX Section
  return (
    <div className="w-[400px] sm:w-[450px]">
      <div className="flex items-center justify-between mb-4">
        <span className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-all cursor-pointer">
          <HiArrowLeft
            onClick={back}
            className="text-[28px] text-primaryColor-500 cursor-pointer"
          />
        </span>
        <h3 className="text-md -ml-5 px-2 py-1 rounded-md bg-feedbackColor text-white font-bold">
          <span className="">Complaint Tracking</span>
        </h3>
        <div></div>
      </div>
      <div className="flex items-center justify-between rounded-lg border-2 border-gray-100 p-4 shadow-lg relative overflow-hidden">
        <div className="flex flex-col justify-center ml-1">
          <h3 className="text-lg font-bold text-gray-600">{complaintType}</h3>
          <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
            <p>Status:</p>
            <span
              className={`font-bold ${
                status[status.length - 1].state === "Initiated"
                  ? "text-initiatedColor"
                  : ""
              }  ${
                status[status.length - 1].state === "InProgress"
                  ? "text-inprogessColor"
                  : ""
              } ${
                status[status.length - 1].state === "Completed"
                  ? "text-completedColor"
                  : ""
              } ${
                status[status.length - 1].state === "Closed"
                  ? "text-closedColor"
                  : ""
              }`}
            >
              {status[status.length - 1].state}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <p>Compliant ID:</p>
            <span>{_id.slice(-8)}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <p>Submited On:</p>
            <span>{createdAt.split("T")[0]}</span>
          </div>
          <div className="flex  gap-3 text-sm text-gray-600">
            <p>Address:</p>
            <span>{complaintAddress}</span>
          </div>
        </div>
        <Image
          src={`${ImageUrl ? ImageUrl : "/assets/complaintDefaultPic.png"}`}
          width={80}
          height={50}
          className="h-70% w-[30%]"
          alt=""
        />
        <div
          className={`h-[100%] w-2 ${
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
            status[status.length - 1].state === "Closed" ? "bg-closedColor" : ""
          } top-0 left-0 absolute`}
        ></div>
      </div>
      <Complaint_stages
        status={status}
        complaintId={_id}
        isfeedback={feedback}
      />
    </div>
  );
};

export default Timeline;
