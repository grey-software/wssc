import React from "react";
import { useRouter } from "next/navigation";

const SingleComplaintSupervisor = ({ complaint, index }) => {
  const navigate = useRouter();
  return (
    <div
      key={index}
      className=" shadow-md p-5 rounded cursor-pointer border-2 border-gray-50"
      onClick={() => navigate.push(`/complaint/${complaint._id}`)}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-4 text-md">
          <span className="px-2 py-[2px] bg-gray-300 font-bold rounded-full">
            {index + 1}
          </span>{" "}
          <div className="flex items-center gap-2">
            <span className="font-semibold">Type</span>
            <span className="bg-feedbackColor px-2 py-1 rounded text-white">
              {complaint?.complaintType}
            </span>
          </div>
        </div>
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
              complaint?.status[complaint.status.length - 1].state === "Closed"
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
        <div className="flex items-start gap-2">
          <span className="font-semibold">ID</span>
          <span className="uppercase">{complaint?._id.slice(-8)}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="font-semibold">Intiated At</span>
          <span>{complaint?.createdAt.split("T")[0]}</span>
        </div>

        <div className="flex items-start gap-2">
          <span className="font-semibold">Address</span>
          <span>{complaint?.complaintAddress}</span>
        </div>
        {complaint?.complaintDes && (
          <div className="flex items-start gap-2 ">
            <span className="font-semibold">Description</span>
            <span>{complaint.complaintDes}</span>
          </div>
        )}
        {complaint?.wsscStatement && (
          <div className="flex items-center gap-2 col-span-2">
            <span className="font-semibold">Statement</span>
            <span>{complaint.wsscStatement}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleComplaintSupervisor;
