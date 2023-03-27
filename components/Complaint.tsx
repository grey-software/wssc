import React from "react";
import Image from "next/image";

interface props {
  type: String;
  status: String;
  complaintID: String;
  submitedOn: String;
  address: String;
  garbage: any;
}

const Complaint = ({
  type,
  status,
  complaintID,
  submitedOn,
  address,
  garbage,
}: props) => {
  return (
    <div className="flex items-center justify-between rounded-lg border-2 border-gray-100 p-4 shadow-lg relative overflow-hidden">
      <div className="flex flex-col justify-center ml-1">
        <h3 className="text-lg font-bold text-gray-600">{type}</h3>
        <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
          <p>Status:</p>
          <span
            className={`font-bold ${
              status === "Initiated" ? "text-initiatedColor" : ""
            }  ${status === "InProgress" ? "text-inprogessColor" : ""} ${
              status === "Completed" ? "text-completedColor" : ""
            } ${status === "Closed" ? "text-closedColor" : ""}`}
          >
            {status}
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <p>Compliant ID:</p>
          <span>{complaintID}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <p>Submited On:</p>
          <span>{submitedOn}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <p>Address:</p>
          <span>{address}</span>
        </div>
      </div>
      <Image src={garbage} className="h-70% w-[30%]" alt="" />
      <div
        className={`h-[100%] w-2 top-0 left-0 absolute ${
          status === "Initiated" ? "bg-initiatedColor" : ""
        }  ${status === "InProgress" ? "bg-inprogessColor" : ""} ${
          status === "Completed" ? "bg-completedColor" : ""
        } ${status === "Closed" ? "bg-closedColor" : ""}`}
      ></div>
    </div>
  );
};

export default Complaint;
