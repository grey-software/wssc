"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Complaint_stages from "../../../../components/Complaint_stages";
import { HiArrowLeft } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { complaintTypes } from "@/Types";
import Loader from "@/components/Loading";
import { useSelector } from "react-redux";
import { RootState } from "@/global_state/store";
import { API } from "@/global_state/ApiCalls/complaintApiCalls";

const Timeline = ({ params }: any) => {
  const complaintID = params.status;
  const navigate = useRouter();
  const [complaint, setComplaint] = useState<complaintTypes>();
  const [loading, setLoading] = useState<boolean>();
  const [showImage, setShowImage] = useState<boolean>();
  // get citizen token from persist storage to send in every request in order to make sure proper authorization
  const CitizenToken: any = useSelector(
    (state: RootState) => state.users.token
  );
  // Fetching Single Complaint from Server
  const FetchSingleComplaint = async (): Promise<any> => {
    setLoading(true);
    try {
      const res = await API.get(`api/v1/complaints/${complaintID}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CitizenToken}`,
        },
      });
      setComplaint(res.data.complaint);
      setLoading(false);
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
      {loading ? (
        <Loader />
      ) : (
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
            onClick={() => setShowImage(true)}
            src={`${
              complaint?.ImageUrl
                ? complaint?.ImageUrl
                : "/assets/complaintDefaultPic.png"
            }`}
            width={500}
            height={500}
            className="h-36 w-32 rounded-md object-cover cursor-pointer"
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
      )}

      {!loading && (
        <Complaint_stages
          stages={complaint?.status}
          complaintId={complaint?._id}
          userfeedback={complaint?.feedback}
        />
      )}

      {/* MODAL SHOW IMAGE */}
      {/* OVERLAY */}
      {showImage && (
        <div
          onClick={() => setShowImage(false)}
          className="fixed top-0 left-0 h-screen w-screen bg-slate-300 bg-opacity-75 z-30"
        ></div>
      )}

      {/* SHOW IMAGE */}
      <div
        className={`${
          showImage ? "opacity-100 scale-100" : "opacity-0 scale-0"
        } fixed m-2 top-[10%] h-fit flex items-center justify-center z-50`}
      >
        <Image
          src={`${
            complaint?.ImageUrl
              ? complaint?.ImageUrl
              : "/assets/complaintDefaultPic.png"
          }`}
          width={1000}
          height={1000}
          className={`${
            showImage ? "scale-100" : "scale-0"
          } h-[75vh] w-auto mx-2 rounded-lg object-contain transition-all`}
          alt=""
        />
      </div>
    </div>
  );
};

export default Timeline;
