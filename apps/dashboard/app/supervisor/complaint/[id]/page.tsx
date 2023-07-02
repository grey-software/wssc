"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { BsFillCameraVideoFill, BsImage } from "react-icons/bs";
import { TbFilePlus } from "react-icons/tb";
import { toast } from "react-hot-toast";
import defaultPic from "../../../../public/complaintDefaultPic.png";
import {
  FetchSingleComplaint,
  SupervisorComplaintResponse,
} from "@/GlobalState/Supervisor-ApiCalls/ApiCalls/supervisorComplaintsApiCalls";
import { useRouter } from "next/navigation";
import { MdDone } from "react-icons/md";
import { HiArrowLeft } from "react-icons/hi";
import Loader from "@/app/loading";

const Page = ({ params }: any) => {
  const navigate = useRouter();
  const imageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>();
  const videoRef = useRef<HTMLInputElement>(null);
  const [video, setvideo] = useState<string>();
  let [ImageUrl, setImageUrl] = useState<string>();
  let [VideoUrl, setVideoUrl] = useState<string>();
  let [complaint, setcomplaint] = useState<any>(null);
  const [complaintDes, setcomplaintDes] = useState("");
  const DescRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setloading] = useState(false);

  // SubmiResponse method definition express supervisor response on complaint resolution
  const SubmitResponse = async () => {
    // console.log(`desc: ${DescRef?.current?.value} || imageURL: ${ImageUrl} | VideoUrl: ${VideoUrl}`)

    if (DescRef.current?.value === "") {
      toast.error("please add resolution statement", {
        position: "top-center",
      });
      return;
    }
    //
    if (!ImageUrl && !VideoUrl) {
      toast.error("please upload at least one media", {
        position: "top-center",
      });
      return;
    }

    // when both media and des have been provided supervisor then api will be called to update the complaint status
    try {
      const response = {
        complaintId: complaint?._id,
        ImageUrl: ImageUrl,
        description: DescRef?.current?.value,
      };

      // Call Supervisor response API to update the complaint status
      const res = await SupervisorComplaintResponse(response);
      if (res.status == 200) {
        toast.success("Response submitted Successfully", {
          position: "top-center",
        });
        // navigate to the home page
        navigate.push("/supervisor");
      }
    } catch (error) {
      console.log(error);
    }

  };

  // upload media attachments in optimized way
  const UploadAttachments = async (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileUrl = URL.createObjectURL(file);

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "xguxdutu");
      data.append("cloud_name", "dgpwe8xy6");
      data.append("folder", "complaint");
      data.append("quality", "auto:good"); // Set the desired quality level

      try {
        let response;
        if (event.target.name === "image") {
          response = await fetch(
            "https://api.cloudinary.com/v1_1/dgpwe8xy6/image/upload",
            {
              method: "post",
              body: data,
            }
          );
          const imageData = await response.json();
          console.log(imageData);
          setImage(fileUrl);
          setImageUrl(imageData.secure_url);
        } else {
          response = await fetch(
            "https://api.cloudinary.com/v1_1/dgpwe8xy6/video/upload",
            {
              method: "post",
              body: data,
            }
          );
          const videoData = await response.json();
          console.log(videoData);
          setvideo(fileUrl);
          setVideoUrl(videoData.secure_url);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // fetch single method definition
  const FetchComplaint = async () => {
    setloading(true);
    try {
      const res = await FetchSingleComplaint(params.id);
      if (res.status == 200) {
        console.log(res.complaint);
        setcomplaint(res.complaint);
        //checking complaint response
        if (res.complaint?.response) {
          setImage(res.complaint?.response.ImageUrl);
          //  setting complaint description
          setcomplaintDes(res.complaint?.response?.description);
          console.log("complaint response is availble");
        }
        setloading(false);
      }
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };
  // using useEffect to call the getSingleComplaint API instant to the fetch the complaint instant when page is rendered
  useEffect(() => {
    FetchComplaint();
  }, [params]);

  // JSX SECTION
  return (
    <div className="container w-screen flex justify-center bg-slate-50">
      <div className="pt-14 w-screen  md:w-[50%]  bg-slate-50">
        {!loading ? (
          <div className="wrapper w-full ">
            {/* NAVIGATION */}
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-all cursor-pointer">
                <HiArrowLeft
                  onClick={() => navigate.push("/supervisor")}
                  className="text-[28px] text-primaryColor-500"
                />
              </span>
              <h3 className="flex gap-2 text-md text-primaryColor-500">
                <span className="px-2 bg-[#1A5980] text-white rounded-lg">
                  Complaint Details
                </span>
              </h3>
              <div className="w-7"></div>
            </div>

            {/* COMPLAINT DETAILS */}
            <div className="px-3 py-3 my-1 mx-2 gap-3 text-[15px] rounded-md flex flex-col flex-wrap justify-between md:justify-around border-2 border-gray-200 shadow-md bg-white">
              <div className="flex justify-between">
                <p>
                  <span className="text-gray-500">Type:</span>
                  <span className="font-bold"> {complaint?.complaintType}</span>
                </p>
                <p>
                  <span className="text-gray-500">Status: </span>
                  <span
                    className={`font-bold ${
                      complaint?.status[complaint?.status.length - 1]?.state ===
                      "Initiated"
                        ? "text-initiatedColor"
                        : ""
                    }  ${
                      complaint?.status[complaint?.status.length - 1]?.state ===
                      "InProgress"
                        ? "text-inprogessColor"
                        : ""
                    } ${
                      complaint?.status[complaint?.status.length - 1]?.state ===
                      "Completed"
                        ? "text-completedColor"
                        : ""
                    } ${
                      complaint?.status[complaint?.status.length - 1]?.state ===
                      "Closed"
                        ? "text-closedColor"
                        : ""
                    }`}
                  >
                    {complaint?.status[complaint?.status.length - 1]?.state}
                  </span>
                </p>
              </div>
              <div className="flex justify-between">
                <p className="uppercase">
                  <span className="text-gray-500 ">ID: </span>
                  {complaint?._id.slice(-8)}
                </p>
                <p>
                  <span className="text-gray-500">Date: </span>
                  {complaint?.updatedAt.split("T")[0]}
                </p>
              </div>
              {/* adming description */}
              <div className="desc flex flex-col">
                <h5 className="text-gray-500">Description</h5>

                <p className="border border-gray-200 p-2 rounded-md bg-white">
                  {complaint?.complaintDes}
                </p>
              </div>

              {/* admin statement */}
              {complaint?.wsscStatement && (
                <div className="desc flex flex-col">
                  <h5 className="text-gray-500">Admin statement</h5>

                  <p className="border border-gray-200 rounded-md bg-white p-2">
                    {complaint?.wsscStatement}
                  </p>
                </div>
              )}
              {/* attached media */}
              <div className="attachment">
                <p>Attached media</p>
                <div className="media  flex gap-2 justify-around md:justify-between border border-gray-200 p-2 md:p-1 rounded-md">
                  <div className="pic w-[36vw] md:w-[20vw] md:h-[25vh] h-[14vh] text-white ">
                    <Image
                      src={
                        complaint?.ImageUrl ? complaint?.ImageUrl : defaultPic
                      }
                      alt=""
                      width={40}
                      height={40}
                      className="object-cover w-[36vw] md:w-[20vw] md:h-[25vh] h-[14vh]"
                    />
                  </div>
                  {/* video */}
                  <div className="video w-[36vw] md:w-[20vw] md:h-[25vh] h-[14vh] text-white ">
                    {complaint?.VideoUrl ? (
                      <video
                        src={complaint.VideoUrl}
                        controls
                        className="object-cover w-[36vw] md:w-[20vw] md:h-[25vh] h-[14vh]"
                      />
                    ) : (
                      <Image
                        src={defaultPic}
                        alt=""
                        width={40}
                        height={40}
                        className="object-cover  w-[36vw] md:w-[20vw] md:h-[25vh] h-[14vh]"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Supervisor complaint feedback section */}
            <div className="wrapper w-full flex justify-center">
              <h3 className="flex gap-2 md:w-[95%] w-full h-11 items-center justify-center rounded-md text-md bg-gray-200 mt-2 mb-2">
                <span className="px-2 bg-[#1A5980] text-white rounded-md">
                  Your Response
                </span>
              </h3>
            </div>
            {/* Supervisor feeback */}

            {complaint?.response ? (
              <div className="flex flex-col gap-2 mx-2 shadow-lg mb-2 border-2 border-gray-200 rounded-md p-3 bg-white">
                <div className="desc flex flex-col">
                  <h5 className="text-gray-500">Description</h5>
                  <p className="border border-gray-200 p-2 rounded-md bg-white">
                    {complaintDes}
                  </p>
                </div>
                <div className="media  flex gap-2 justify-around md:justify-between border border-gray-200 p-2 md:p-1 rounded-md">
                  <div className="pic  w-[36vw] md:w-[20vw] md:h-[25vh] h-[14vh] text-white ">
                    <Image
                      src={
                        complaint?.response?.ImageUrl
                          ? complaint?.response?.ImageUrl
                          : defaultPic
                      }
                      alt=""
                      width={40}
                      height={40}
                      className="object-contain   w-[36vw] md:w-[20vw] md:h-[25vh] h-[14vh]"
                    />
                  </div>
                  {/* video */}
                  <div className="video  w-[36vw] md:w-[20vw] md:h-[25vh] h-[14vh] text-white ">
                    {complaint?.response?.VideoUrl ? (
                      <video
                        src={complaint.response.VideoUrl}
                        controls
                        className="object-contain   w-[36vw] md:w-[20vw] md:h-[25vh] h-[14vh]"
                      />
                    ) : (
                      <Image
                        src={defaultPic}
                        alt=""
                        width={40}
                        height={40}
                        className="object-cover  w-[36vw] md:w-[20vw] md:h-[25vh] h-[14vh]"
                      />
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="complaintDetail p-3 my-0 gap-2 text-[15px] shadow-lg  rounded-md border-2 border-gray-200 mx-2 mb-2 bg-white flex flex-col flex-wrap justify-between">
                {/* admin description */}
                <div className="desc flex flex-col">
                  <h5 className="text-gray-700">
                    Statement<span className="text-red-500">*</span>
                    <span className="ml-3">شکایت کے حل کی تفصیل</span>
                  </h5>
                  <textarea
                    name="query"
                    id="response"
                    cols={5}
                    rows={5}
                    className="border border-gray-300 p-2 flex-wrap"
                    placeholder="please write your query"
                    ref={DescRef}
                    defaultValue={complaintDes}
                    readOnly={complaintDes !== ""}
                  ></textarea>
                </div>

                {/* testing section of attached media */}
                <div className="flex flex-col mt-2 mb-2">
                  <label className="text-gray-700 text-[15px]">
                    <span>
                      Attachment<span className="text-red-500">*</span>
                    </span>
                    <span className=" ml-2 font-serif">تصویر / ویڈیو</span>
                  </label>
                  <div
                    className={`flex gap-3 w-full h-[7rem] p-[3px]  overflow-hidden border-2 rounded-lg border-gray-300 outline-none bg-white
          `}
                  >
                    {image && (
                      <div className="w-[160px] h-[105px] object-cover">
                        <Image
                          className="rounded-sm object-cover w-full h-full"
                          src={image}
                          width={100}
                          height={100}
                          alt="previewImage"
                        />
                      </div>
                    )}

                    {video && (
                      <div className="w-[120px] h-[120px] border border-orange-400 object-cover">
                        <video
                          src={video}
                          controls
                          style={{ width: "120px", height: "120px" }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* buttons */}
                <div className="flex justify-between mt-1">
                  {/* for image to upload */}
                  <div
                    className={`border-2 border-primaryColor-300 rounded-md hover:bg-primaryColor-300 transition-all  py-1 px-3 text-[19px] text-secondarycolor-500 font-bold ${
                      !complaint?.response
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    }`}
                    onClick={() => {
                      if (!complaint?.response) {
                        imageRef.current!.click();
                      }
                    }}
                  >
                    <div className="flex justify-center items-center gap-1 text-[18px]">
                      <span>
                        <BsImage />
                      </span>
                      <span>Picture</span>
                    </div>
                  </div>
                  {/* for video to upload */}
                  <div
                    className={`border-2 border-primaryColor-300 rounded-md active:bg-primarycolor-500 hover:bg-primaryColor-300 transition-all py-1 px-3 text-[18px] text-secondarycolor-500 font-bold ${
                      !complaint?.response
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    }`}
                    onClick={() => {
                      if (!complaint?.response) {
                        imageRef.current!.click();
                      }
                    }}
                  >
                    <div className="flex justify-center items-center gap-1 text-[18px]">
                      <span>
                        <BsFillCameraVideoFill />
                      </span>
                      <span>Video</span>
                    </div>
                  </div>

                  {/* ---------------------- input sectons ------------------ */}
                  <div className="hidden">
                    <input
                      accept="image/*"
                      ref={imageRef}
                      onChange={UploadAttachments}
                      type="file"
                      name="image"
                    />
                  </div>

                  <div className="hidden">
                    <input
                      accept="video/*"
                      ref={videoRef}
                      onChange={UploadAttachments}
                      type="file"
                      name="video"
                    />
                  </div>
                  {/* ---------------------- END input sectons ------------------ */}
                </div>

                {/* submit button */}
                <div className="flex justify-center mt-2 w-full">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-3 text-white mt-4 w-full uppercase bg-primaryColor-500 rounded-lg active:scale-[0.98] transition-all outline-none cursor-pointer py-2 px-4 text-[18px] font-bold shadow-md"
                    onClick={SubmitResponse}
                  >
                    <TbFilePlus className="text-xl font-bold text-white" />

                    <span>Submit</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Page;
