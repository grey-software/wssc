"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AiFillStar } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { RootState } from "@/app/GlobalState/store";
import { setActiveTab } from "@/app/GlobalState/TabSlice";
import Image from "next/image";
import { FetchAllSupervisors } from "@/app/GlobalState/ApiCalls/supervisorApiCalls";
import {
  AssignComplaint,
  AddStatement,
} from "@/app/GlobalState/ApiCalls/complaintApiCalls";
import { ColorRing, RotatingLines } from "react-loader-spinner";
import { API } from "@/app/GlobalState/ApiCalls/complaintApiCalls";
import { config } from "@/app/GlobalState/config";
import { toast } from "react-hot-toast";
import { complaintTypes } from "@/@types/complaintTypes.types";

const Page = ({ params }: any) => {
  const id = params.id;
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [wsscStatement, setWsscStatement] = useState<string>("");
  const [supervisorId, setSupervisorId] = useState<string>("");
  const [complaint, setComplaint] = useState<complaintTypes>();
  const [updatedComplaint, setupdatedComplaint] = useState<complaintTypes>();

  const [pending, setPending] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const loading = useSelector((state: RootState) => state.Complaint.loading);

  const supervisors = useSelector(
    (state: RootState) => state.Supervisor.supervisorsAll
  );
  
    const rates: number[] = [1, 2, 3, 4, 5];

  // A method that call complaint api to fetch specific complaint
  const FetchComplaint = async (complaintId: any): Promise<any> => {
    setPending(true);
    try {
      const res = await API.get(`api/v1/complaints/${complaintId}`, config);
      console.log(res.data.complaint);
      if (res.data.complaint) {
        setTimeout(() => setPending(false), 1000);
        setComplaint(res.data.complaint);
        setupdatedComplaint(res.data.complaint)
      }
      // setLoading(false);
      return res.data.complaint;
    } catch (err: any) {
      setError(true);
      if (err.response?.status == 401) {
        toast.error("401, Complaint not found", {
          position: "top-center",
          style: { width: "auto", height: "auto" },
          duration: 3000,
        });
        return err.response;
      } else if (err.response.status == 500) {
        toast.error("500, Something went wrong", {
          position: "top-center",
          style: { width: "auto", height: "auto" },
          duration: 3000,
        });
        return err.response;
      }
    }
  };

  
  
  const supervisor: any = useSelector((state: RootState) =>
  state.Supervisor.supervisorsAll.find(
    (s) => s._id == complaint?.supervisorId
    )
    );
    
    useEffect(() => {
      FetchComplaint(id);
      FetchAllSupervisors(dispatch);
    }, []);
  
  const handleAssign = async() => {
    if (!supervisorId || supervisorId == "NotSelected") {
      toast.error("Please Select Supervisor", {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 3000,
      });
      return;
    }

    try {
        const res: any = await AssignComplaint(dispatch, supervisorId, id);
        if (res.status == 200) {
          const updated = await FetchComplaint(id);
          setupdatedComplaint(updated)
      }
        else {
           toast.error("something went wrong", {
             position: "top-center",
             style: { width: "auto", height: "auto" },
             duration: 3000,
           });
      }
    } catch (error) {
      
    }
  
  };

  // 
  const handleStatment = () => {
    if (
      wsscStatement == "" ||
      wsscStatement == " " ||
      wsscStatement.length <= 15
    ) {
      toast.error("Statement should be explaining problem in detail", {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 3000,
      });
      return;
    }

    AddStatement(complaint?._id, wsscStatement, dispatch);
    complaint && setComplaint({ ...complaint, wsscStatement: wsscStatement });
  };

  const RatingInWords: string[] = [
    "",
    "Very Bad",
    "Bad",
    "Good",
    "Very Good",
    "Excellent",
  ];

  // JSX Section
  return (
    <div className="container flex flex-col gap-3 mb-3">
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
        {updatedComplaint?.supervisorId == "" ? (
          <div className="flex items-center gap-4">
            <select
              name="supervisor"
              id="supervisor"
              className="px-3 py-1 border-2 border-gray-400 rounded focus:border-primaryColor-500"
              onChange={(e) => setSupervisorId(e.target.value)}
            >
              <option value="NotSelected">Select Supervisor</option>
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
            {supervisor?.name && (
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
      <div
        className={`${
          pending
            ? "flex items-center justify-center h-[70vh]"
            : "grid grid-cols-2 w-full gap-6 text-sm"
        } `}
      >
        {/* Complaint details */}
        {pending ? (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        ) : (
          <>
            <div className=" shadow-md p-5 rounded-md border-2 border-gray-50">
              <div className="flex items-center justify-between mb-1">
                <h1 className=" font-bold text-md">Complaint Details</h1>
                <div className="flex items-center gap-2 ">
                  <span>Status</span>
                  <span
                    className={`text-white  px-2 py-1 rounded ${
                      complaint?.status[complaint?.status?.length - 1].state ===
                      "Initiated"
                        ? "bg-initiatedColor"
                        : ""
                    }  ${
                      complaint?.status[complaint?.status?.length - 1].state ===
                      "InProgress"
                        ? "bg-inprogessColor"
                        : ""
                    } ${
                      complaint?.status[complaint?.status?.length - 1].state ===
                      "Completed"
                        ? "bg-completedColor"
                        : ""
                    } ${
                      complaint?.status[complaint?.status?.length - 1].state ===
                      "Closed"
                        ? "bg-closedColor"
                        : ""
                    }`}
                  >
                    {complaint?.status[complaint?.status?.length - 1].state}
                  </span>
                </div>
              </div>
              <div className="w-full border-[1px] border-gray-300"></div>

              {/* COMPLAINT DETAILS */}
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

                <div className="flex items-start gap-2 col-span-2">
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
                  <span className="uppercase">
                    {complaint?.userId.slice(-8)}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold">Contact</span>
                  <span>0{complaint?.phone}</span>
                </div>
                <div></div>
                {complaint?.feedback ? (
                  <div className="p-4 shadow-md flex flex-col gap-2 w-[120%]">
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
                      {RatingInWords.map((w, index) => (
                        <>
                          {index == complaint.feedback.rating && (
                            <span className="text-sm text-initiatedColor font-bold ml-2">
                              {w}
                            </span>
                          )}
                        </>
                      ))}
                    </div>
                    <p className="text-sm">{complaint.feedback.description}</p>
                  </div>
                ) : (
                  <h1 className="font-semibold text-gray-400">
                    No Feedback yet
                  </h1>
                )}
              </div>
            </div>

            {/* Supervisor details */}
            <div
              onClick={() => navigate.push(`/supervisors/${supervisor._id}`)}
              className="cursor-pointer shadow-md p-5 rounded-md border-2 border-gray-50"
            >
              <h1 className="mb-1 font-bold text-md">Supervisor Details</h1>
              <div className="w-full border-[1px] border-gray-300"></div>
              {complaint?.supervisorId != "" ? (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-start gap-2">
                    <span className="font-semibold">Name</span>
                    <span>{supervisor?.name}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold">Supervisor ID</span>
                    <span className="uppercase">
                      {supervisor?._id?.slice(-8)}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold">Contact</span>
                    <span>{supervisor?.phone}</span>
                  </div>
                  <div></div>
                  {complaint?.response ? (
                    <div className="p-4 col-span-2 shadow-md flex flex-col gap-2">
                      <h1 className="text-md font-bold">Response</h1>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-semibold">Desription</span>
                        <p>{complaint?.response?.description}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4  mt-4 w-full">
                        {complaint?.response.ImageUrl ||
                        complaint?.response.VideoUrl ? (
                          <>
                            {complaint?.response?.ImageUrl && (
                              <Image
                                src={complaint?.response?.ImageUrl}
                                className="h-36 w-32"
                                width={300}
                                height={100}
                                alt="Complaint Picture"
                              />
                            )}
                            {complaint?.response?.VideoUrl && (
                              <video className="h-36 w-32" controls>
                                <source src={complaint?.response?.VideoUrl} />
                              </video>
                            )}
                          </>
                        ) : (
                          <h1 className="font-semibold text-gray-400">
                            The Supervisor have not provided any Media
                          </h1>
                        )}
                      </div>
                    </div>
                  ) : (
                    <h1 className="font-semibold text-gray-400">
                      No Response yet
                    </h1>
                  )}
                </div>
              ) : (
                <h1 className="mt-4 font-semibold text-gray-400">
                  Not assigned yet
                </h1>
              )}
            </div>

            {/* complaint media */}
            <div className="shadow-md p-5 rounded-md border-2 border-gray-50">
              <h1 className="mb-1 font-bold text-md">Complaint Media</h1>
              <div className="w-full border-[1px] border-gray-300 mb-4"></div>
              <div className="grid grid-cols-2 gap-4  mt-4 w-full">
                {complaint?.ImageUrl || complaint?.VideoUrl ? (
                  <>
                    {complaint?.ImageUrl && (
                      <Image
                        src={complaint?.ImageUrl}
                        className="h-56 w-48"
                        width={300}
                        height={100}
                        alt="Complaint Picture"
                      />
                    )}
                    {complaint?.VideoUrl && (
                      <video className="h-56 w-48" controls>
                        <source src={complaint?.VideoUrl} />
                      </video>
                    )}
                  </>
                ) : (
                  <h1 className="font-semibold text-gray-400">
                    The Citizen have not provided any Media
                  </h1>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
