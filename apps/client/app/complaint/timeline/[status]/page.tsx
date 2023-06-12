"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Complaint_stages from "../../../../components/Complaint_stages";
import { HiArrowLeft } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { API } from "@/global_state/ApiCalls/complaintApiCalls";
import { config } from "@/global_state/ApiCalls/config";
import { complaintTypes } from "@/Types";

const Timeline = ({ params }: any) => {
  const complaintID = params.status;
  const navigate = useRouter();
  const [complaint, setComplaint] = useState<complaintTypes>();

  // Fetching Single Complaint from Server
  const FetchSingleComplaint = async (): Promise<any> => {
    try {
      const res = await API.get(`api/v1/complaints/${complaintID}`, config);
      console.log(res.data.complaint);
      setComplaint(res.data.complaint);
      return res.data;
    } catch (err: any) {
      console.log(err);
      if (err.response) {
        if (err.response.status == 404) {
          return err.response.status;
        } else {
          return err.response.status;
        }
      }
    }
  };
  useEffect(() => {
    FetchSingleComplaint();
  }, []);

  console.log(complaint?.feedback);
  console.log(complaint?.status);

  const back = () => {
    navigate.push("/complaint/stages/AllComplaints");
  };
  // TSX Section
  return (
    <div className="w-[365px] sm:w-[450px] md:w-full lg-full xl-w-full">
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
          <h3 className="text-lg font-bold text-gray-600">
            {complaint?.complaintType}
          </h3>
          <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
            <p>Status:</p>
            <span
              className={`font-bold ${
                complaint?.status[complaint?.status.length - 1].state ===
                "Initiated"
                  ? "text-initiatedColor"
                  : ""
              }  ${
                complaint?.status[complaint?.status.length - 1].state ===
                "InProgress"
                  ? "text-inprogessColor"
                  : ""
              } ${
                complaint?.status[complaint?.status.length - 1].state ===
                "Completed"
                  ? "text-completedColor"
                  : ""
              } ${
                complaint?.status[complaint?.status.length - 1].state ===
                "Closed"
                  ? "text-closedColor"
                  : ""
              }`}
            >
              {complaint?.status[complaint?.status.length - 1].state}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <p>Compliant ID:</p>
            <span className="uppercase">{complaint?._id.slice(-8)}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <p>Submited On:</p>
            <span>{complaint?.createdAt.split("T")[0]}</span>
          </div>
          <div className="flex  gap-3 text-sm text-gray-600">
            <p>Address:</p>
            <span>{complaint?.complaintAddress}</span>
          </div>
        </div>
        <Image
          src={`${
            complaint?.ImageUrl
              ? complaint?.ImageUrl
              : "/assets/complaintDefaultPic.png"
          }`}
          width={80}
          height={50}
          className="h-36 w-32 rounded-md"
          alt=""
        />
        <div
          className={`h-[100%] w-2 ${
            complaint?.status[complaint?.status.length - 1].state ===
            "Initiated"
              ? "bg-initiatedColor"
              : ""
          }  ${
            complaint?.status[complaint?.status.length - 1].state ===
            "InProgress"
              ? "bg-inprogessColor"
              : ""
          } ${
            complaint?.status[complaint?.status.length - 1].state ===
            "Completed"
              ? "bg-completedColor"
              : ""
          } ${
            complaint?.status[complaint?.status.length - 1].state === "Closed"
              ? "bg-closedColor"
              : ""
          } top-0 left-0 absolute`}
        ></div>
      </div>
      <Complaint_stages
        stages={complaint?.status}
        complaintId={complaint?._id}
      />
    </div>
  );
};

export default Timeline;
