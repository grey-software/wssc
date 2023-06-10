'use client';
import Image from 'next/image';
import React, { useRef, useState } from 'react'
import { BsFile, BsFillCameraVideoFill, BsImage } from 'react-icons/bs';
import { TbFilePlus } from "react-icons/tb";
import {toast } from 'react-hot-toast';
type Props = {}

const Page = (props: Props) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>();
  const videoRef = useRef<HTMLInputElement>(null);
  const [video, setvideo] = useState<string>();
   let [ImageUrl, setImageUrl] = useState<string>();
   let [VideoUrl, setVideoUrl] = useState<string>();
   let [desc, setdesc] = useState<string>("");
   const [load, setload] = useState(false);
  const DescRef = useRef<HTMLTextAreaElement>(null);

  // SubmiResponse method definition express supervisor response on complaint resolution
  const SubmitResponse = () => {
    console.log(`desc: ${DescRef?.current?.value} || imageURL: ${ImageUrl} | VideoUrl: ${VideoUrl}`)
    if (!ImageUrl && !VideoUrl) {
      window.alert("upload media is mandatory one")
    }
    if (DescRef.current?.value == "") {
      window.alert("description should be given on complaint resolution")
    }

    if (DescRef.current?.value && (ImageUrl || VideoUrl)) {
      toast.success("response submitted successfull", {
        position: 'top-center'
      })
    }
  } 
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

  // JSX SECTION
  return (
    <div className="text-red mt-16 border w-[100vw] border-blue-500">
      <div className="wrapper w-full border border-red-400">
        {/* complaint detail */}
        <p className="text-[16px] -mb-2 text-center text-gray-500">
          Complaint Detail
        </p>
        <div className="complaintDetail px-3 py-3 m-3 gap-3 text-[15px] shadow-sm border border-gray-300 flex flex-col flex-wrap justify-between">
          <div className="flex justify-between">
            <p>
              <span className="text-gray-500">Type:</span>
              <span className="font-bold"> Water Supply</span>
            </p>
            <p>
              <span className="text-gray-500">Status:</span>
              <span className="text-blue-600 font-bold"> Pending</span>
            </p>
          </div>
          <div className="flex justify-between">
            <p>
              <span className="text-gray-500">ID:</span> 353454
            </p>
            <p>
              <span className="text-gray-500">Date:</span> 8 jun, 023
            </p>
          </div>
          {/* adming description */}
          <div className="desc flex flex-col">
            <h5 className="text-gray-500">Description</h5>

            <p className="border border-gray-300 p-2">
              Please resolve this complaint as soon as possible.Please resolve
              this complaint as soon as possible.Please resolve this complaint
              as soon as possible.Please resolve this complaint as soon as
              possible.
            </p>
          </div>
          {/* attached media */}
          <div className="attachment">
            <p>Attached media</p>
            <div className="media  flex gap-2 justify-around border border-gray-300 p-2">
              <div className="pic w-[40vw] h-[10vh] bg-gray-500 text-white border border-gray-300">
                image
              </div>
              {/* video */}
              <div className="video w-[40vw] h-[10vh] bg-green-500 text-white border border-gray-300">
                video
              </div>
            </div>
          </div>
        </div>

        <hr />

        {/* Supervisor feeback */}
        <p className="text-[16px] mt-2 text-center text-gray-500">
          Supervisor response
        </p>
        <div className="complaintDetail px-3 py-2 mx-3 mt-1 gap-2 text-[15px] shadow-sm border border-gray-300 flex flex-col flex-wrap justify-between">
          {/* adming description */}
          <div className="desc flex flex-col">
            <h5 className="text-gray-500">
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
            ></textarea>
          </div>

          {/* testing section of attached media */}
          <div className="flex flex-col mt-2 mb-2">
            <label className="text-gray-500 text-[15px]">
              <span>
                Attachment<span className="text-red-500">*</span>
              </span>
              <span className=" ml-2 font-serif">تصویر / ویڈیو</span>
            </label>
            <div
              className={`flex gap-3 w-full h-[6rem] p-[3px] overflow-hidden border-2 rounded-lg border-gray-300 outline-none
          `}
            >
              {image && (
                <div className="w-[120px] h-[120px] object-cover">
                  <Image
                    className="rounded-md"
                    src={image}
                    width={100}
                    height={100}
                    alt="previewImage"
                  />
                </div>
              )}

              {video && (
                <div className="w-[120px] h-[120px] object-cover">
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
              className="border-2 border-primaryColor-300 rounded-md hover:bg-primaryColor-300 transition-all cursor-pointer py-1 px-3 text-[19px] text-secondarycolor-500 font-bold"
              onClick={() => imageRef.current!.click()}
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
              className="border-2 border-primaryColor-300 rounded-md active:bg-primarycolor-500 hover:bg-primaryColor-300 transition-all cursor-pointer py-1 px-3 text-[18px] text-secondarycolor-500 font-bold"
              onClick={() => videoRef.current!.click()}
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
                capture="environment"
                name="image"
              />
            </div>

            <div className="hidden">
              <input
                accept="video/*"
                ref={videoRef}
                onChange={UploadAttachments}
                type="file"
                capture="environment"
                // onDurationChange={CheckingDuration()}
                name="video"
              />
            </div>
            {/* ---------------------- END input sectons ------------------ */}
          </div>

          {/* submit button */}
          <div className="flex justify-center mt-2 w-full">
            <button
              type="submit"
              className="flex items-center justify-center gap-3 text-white mt-4 w-[80%] uppercase bg-primaryColor-500 rounded-sm transition-all outline-none cursor-pointer py-2 px-4 text-[18px] font-bold shadow-md"
              onClick={SubmitResponse}
            >
              <TbFilePlus className="text-xl font-bold text-white" />

              <span>Submit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page