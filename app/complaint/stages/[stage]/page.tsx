"use client";
import React, { useState } from "react";
import Image from "next/image";
import garbage from "../../../../public/garbage.png";
import { HiArrowLeft } from "react-icons/hi";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux-toolkit/store";
import { useRouter } from "next/navigation";
import Complaint from "@/components/Complaint";

const Complaints = ({ params }: any) => {
  let statesValue = params.stage;
  const [states, setStates] = useState(statesValue);
  if (states === "Resolved") setStates("Closed");
  const complaintsAll = useSelector((state: RootState) => {
    return state.complaints.complaintsAll;
  });

  // JSX section
  return (
    <>
      <div className="mt-20 mx-3">
        <div className="flex items-center justify-between">
          <Link href="/">
            <HiArrowLeft className="text-[28px] text-primaryColor-500" />
          </Link>
          <h3 className="text-md -ml-5 px-2 py-1 rounded-md bg-[#1A5980] text-white font-bold">
            <span className="">Complaints</span>
          </h3>
          <div></div>
        </div>
        <div className="flex items-center gap-8 my-6">
          <label
            htmlFor="countries"
            className="text-sm font-medium text-gray-900"
          >
            Filter by:
          </label>
          <select
            id="countries"
            className="w-3/3 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none"
            onChange={(e) => setStates(e.target.value)}
          >
            <option defaultValue={states}>{states}</option>
            <option value="AllComplaints">All Complaints</option>
            <option value="Initiated">Initiated</option>
            <option value="InProgress">InProgress</option>
            <option value="Completed">Completed</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <div className="flex flex-col gap-3 mt-6">
          {complaintsAll.map(
            ({ type, status, complaintID, submitedOn, address }, index) => (
              <div key={index}>
                {/* show all the complaints */}
                {states === "AllComplaints" ? (
                  <Complaint
                    type={type}
                    status={status}
                    complaintID={complaintID}
                    submitedOn={submitedOn}
                    address={address}
                    garbage={garbage}
                  />
                ) : (
                  <div>
                    {/* filter complaints based on provided filter */}
                    {states === status ? (
                      <Complaint
                        type={type}
                        status={status}
                        complaintID={complaintID}
                        submitedOn={submitedOn}
                        address={address}
                        garbage={garbage}
                      />
                    ) : (
                      <div>
                        {/* show only pending complaints: initiated an inProgress */}
                        {states === "Pending" &&
                        (status === "Initiated" || status === "InProgress") ? (
                          <Complaint
                            type={type}
                            status={status}
                            complaintID={complaintID}
                            submitedOn={submitedOn}
                            address={address}
                            garbage={garbage}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Complaints;
