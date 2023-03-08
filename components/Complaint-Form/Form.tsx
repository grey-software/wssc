'use client';
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./ComplainForm.schema";
import { ComplainForm } from "../../@types/complainForm.types";
import Image from "next/image";
import { BsImage } from "react-icons/bs";
import { BiVideo } from "react-icons/bi";

const Form: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ComplainForm>({
    resolver: yupResolver(validationSchema),
  });

  const imageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>();
  const videoRef = useRef<HTMLInputElement>(null);
  const [video, setvideo] = useState<string>();

  const onSubmit = (data: ComplainForm) => {
    console.log(JSON.stringify(data, null, 2));
    alert("form submitted successfully");
    reset();
  };

  // upload media
  const UploadAttachments = (event: any) => {
    console.log(event.target.name);
    if (event.target.files && event.target.files[0]) {
      if (event.target.name == "image") {
        let img: any = event.target.files[0];
        let imgurl: string = URL.createObjectURL(img);
        setImage(imgurl);
      } else {
        const video: any = event.target.files[0];
        let videourl: string = URL.createObjectURL(video);
        setvideo(videourl);
      }
    }
  };

  // ---------- JSX SECTION STARTED ---------
  return (
    <div className="md:w-[20%] w-[100%] h-[100vh] bg-secondarycolor-500">
      
      <div className="flex justify-between w-[100%] items-center px-2 py-[14px] text-brand-500 bg-secondarycolor-400">
        <div className="flex items-center gap-1">
          <Image
            src="/community-cleanup-logo.svg"
            width={50}
            height={50}
            alt="previewImage"
          />
          <Image src="/back.svg" width={20} height={20} alt="previewImage" />
        </div>
        <Image src="/Account.svg" width={40} height={40} alt="useraccount" />
      </div>
      <div className="w-full flex justify-center items-center py-[14px] text-[24px]">
        <h3 className="text-[24px] font-bold text-primarycolor-500">
          Complaint
        </h3>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 mx-[14px] mb-2 rounded-3xl bg-white px-[20px] py-[22px]"
      >
        <div className="flex flex-col">
          <label className="text-[#333] text-[18px]">
            Username<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Your name"
            {...register("username")}
            className={`py-2 px-2 rounded-lg  outline-none border-2 bg-transparent ${
              errors.username ? "border-red-500" : "border-primarycolor-500"
            }`}
          />
          <div className="text-sm text-red-500">{errors.username?.message}</div>
        </div>

        <div className="flex flex-col">
          <label className="text-[#333] text-[18px]">
            Mobile Number<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Contact number"
            {...register("phone")}
            className={`py-2 px-2 rounded-lg outline-none border-2 bg-transparent ${
              errors.phone ? "border-red-500" : "border-primarycolor-500"
            }`}
          />
          <div className="text-sm text-red-500">{errors.phone?.message}</div>
        </div>

        <div className="flex flex-col">
          <label className="text-[#333] text-[18px]">Description</label>
          <textarea
            placeholder="Describe issue"
            rows={3}
            cols={4}
            {...register("desc")}
            className="py-2 px-2 bg-transparent rounded-lg border-2 border-primarycolor-500 outline-none"
          />
        </div>

        {/*uploading media  */}
        <div className="flex flex-col mt-2 mb-2">
          <label className="text-[#333] text-[18px]">
            Attachment<span className="text-red-500">*</span>
          </label>
          <div
            className={`flex gap-3 w-full h-[6rem] p-[3px] overflow-hidden border-2 rounded-lg border-primarycolor-500 outline-none
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
            className="bg-primarycolor-300 rounded-md hover:bg-primarycolor-500 transition-all cursor-pointer py-1 px-2 text-[18px] text-secondarycolor-500 font-bold"
            onClick={() => imageRef.current!.click()}
          >
            <div className="flex justify-center items-center gap-1 text-[20px]">
              <span>
                <BsImage />
              </span>
              <span>Picture</span>
            </div>
          </div>
          {/* for video to upload */}
          <div
            className="bg-primarycolor-300 rounded-md active:bg-primarycolor-500 hover:bg-primarycolor-500 transition-all cursor-pointer py-1 px-2 text-[18px] text-secondarycolor-500 font-bold"
            onClick={() => videoRef.current!.click()}
          >
            <div className="flex justify-center items-center gap-1 text-[20px]">
              <span>
                <BiVideo />
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
              name="video"
            />
          </div>
          {/* ---------------------- END input sectons ------------------ */}
        </div>
        {/* ------------- Submit button -------------- */}
        <div className="flex justify-center mt-2 w-[100%]">
          <button
            type="submit"
            className="flex items-center justify-center gap-3 mt-4 w-[100%] uppercase bg-primarycolor-500 rounded-lg hover:bg-[#63efc5] transition-all outline-none cursor-pointer py-2 px-4 text-[18px] text-secondarycolor-500 font-bold"
          >
            <Image src="/submit.svg" width={15} height={15} alt="submit icon" />
            <span>Submit</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;