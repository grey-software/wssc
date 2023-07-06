"use client";
import React, { useEffect, useState } from "react";
import garbage from "../../../../public/garbage.png";
import { HiArrowLeft } from "react-icons/hi";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/global_state/store";
import Complaint from "@/components/Complaint";
import { useDispatch } from "react-redux";
import { complaintTypes } from "@/Types";
import Loader from "@/components/Loading";
import { FetchAllComplaints } from "@/global_state/ApiCalls/complaintApiCalls";

const Complaints = ({ params }: any) => {
  let statesValue = params.stage;
  const dispatch = useDispatch();
  const [states, setStates] = useState(statesValue);
  if (states === "Resolved") setStates("Closed");
  const { loading, error } = useSelector(
    (state: RootState) => state.complaints
  );
  // get citizen token from persist storage to send in every request in order to make sure proper authorization
  const CitizenToken: any = useSelector(
    (state: RootState) => state.users.token
  );

  useEffect(() => {
    FetchAllComplaints(dispatch, CitizenToken);
  }, []);

  const complaintsAll = useSelector((state: RootState) => {
    return state.complaints.complaintsAll;
  });
  const { UserInfo }: any = useSelector((state: RootState) => state.users);

  // JSX section
  return (
    <div className="w-[365px] sm:w-[450px] md:w-full lg-full xl-w-full">
      {UserInfo?.phone ? (
        <>
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-all cursor-pointer"
            >
              <HiArrowLeft className="text-[28px] text-primaryColor-500" />
            </Link>
            <h3 className="text-md -ml-5 px-2 py-1 rounded-md bg-feedbackColor text-white font-bold">
              <span className="">Complaints</span>
            </h3>
            <div></div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              <label
                htmlFor="complaint-stages"
                className="text-sm font-medium text-gray-900"
              >
                Filter by:
              </label>
              <select
                id="complaint-stages"
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
            <div className="flex items-center gap-4">
              <span>Complaints:</span>
              <span className="py-1 px-3 rounded-lg bg-gray-200 text-feedbackColor">
                {complaintsAll?.length}
              </span>
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="flex flex-col gap-3 mt-4">
              {complaintsAll.map(
                (
                  {
                    complaintType,
                    _id,
                    status,
                    createdAt,
                    complaintAddress,
                    ImageUrl,
                  }: complaintTypes,
                  index
                ) => (
                  <>
                    {/* show all the complaints */}
                    {states === "AllComplaints" ? (
                      <div key={index}>
                        <Complaint
                          type={complaintType}
                          status={status}
                          complaintID={_id}
                          submitedOn={createdAt}
                          address={complaintAddress}
                          garbage={garbage}
                          ImageUrl={ImageUrl}
                        />
                      </div>
                    ) : (
                      <>
                        {/* filter complaints based on provided filter */}
                        {states === status[status.length - 1]?.state ? (
                          <div key={index}>
                            <Complaint
                              type={complaintType}
                              status={status}
                              complaintID={_id}
                              submitedOn={createdAt}
                              address={complaintAddress}
                              garbage={garbage}
                              ImageUrl={ImageUrl}
                            />
                          </div>
                        ) : (
                          <>
                            {/* show only pending complaints: initiated an inProgress */}
                            {states === "Pending" &&
                            (status[status.length - 1]?.state === "Initiated" ||
                              status[status.length - 1]?.state ===
                                "InProgress") ? (
                              <div key={index}>
                                <Complaint
                                  type={complaintType}
                                  status={status}
                                  complaintID={_id}
                                  submitedOn={createdAt}
                                  address={complaintAddress}
                                  garbage={garbage}
                                  ImageUrl={ImageUrl}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )
              )}
            </div>
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Complaints;
