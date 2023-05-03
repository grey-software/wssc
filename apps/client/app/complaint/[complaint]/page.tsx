"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../../Schema_validation/ComplainForm.schema";
import { ComplainForm } from "../../../@types/complainForm.types";
import Image from "next/image";
import { BsImage } from "react-icons/bs";
import { TbFilePlus } from "react-icons/tb";
import { HiArrowLeft } from "react-icons/hi";
import { BiVideo } from "react-icons/bi";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { CreateComplaint } from "@/global_state/ApiCalls/complaintApiCalls";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/global_state/store";

const Form: React.FC = ({ params }: any) => {
  const complaint = params.complaint;
  const { loading, error }: any = useSelector(
    (state: RootState) => state.complaints
  );
  const Navigate = useRouter();
  const dispatch = useDispatch();

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
  let [imageUrl, setImageUrl] = useState<string>();
  let [videoUrl, setVideoUrl] = useState<string>();

  const [load, setloading] = useState(false);
  // Submit Form
  const onSubmit = (data: ComplainForm) => {
    setloading(!load);
    console.log(JSON.stringify(data, null, 2));
    console.log(data);

    // Calling API
    CreateComplaint(data, dispatch);

    // alert("form submitted successfully");
    // Navigate.push("/complaint/timeline/slfsldfsdf");
    setloading(!load);
    reset();
  };

  const GoHomePage = () => {
    Navigate.push("/");
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
          console.log(imageUrl);
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
          console.log(videoUrl);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // ---------- JSX SECTION STARTED ---------
  return (
    <>
      {load ? (
        <Loading />
      ) : (
        <div className="md:w-[20%] mt-20 w-[93%] mx-3">
          <div className="flex items-center justify-between">
            <HiArrowLeft
              onClick={GoHomePage}
              className="text-[28px] text-primaryColor-500"
            />
            <h3 className="flex gap-2 text-lg text-primaryColor-500">
              <span className="text-headingColor-400 opacity-75 font-bold">
                Complaint:
              </span>
              <span className="px-2 bg-[#1A5980] text-white rounded-lg">
                {complaint}
              </span>
            </h3>
            <div></div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 mt-6 rounded-3xl px-[20px] pt-6 pb-8"
          >
            <div className="flex flex-col">
              <label className="text-gray-500 text-[18px]">
                <span>
                  Address<span className="text-red-500">*</span>
                </span>
                <span className="text-gray-500 ml-2 font-serif">
                  شکایت کا پتہ
                </span>
              </label>
              <textarea
                rows={2}
                cols={2}
                placeholder="Complaint address"
                {...register("phone")}
                className={`block py-1 px-2 w-full rounded-lg text-md text-black bg-transparent border-2 border-gray-300 focus:outline-none focus:border-primaryColor-500 peer ${
                  errors.phone ? "focus:border-red-500" : ""
                }`}
              />
              <div className="text-sm text-red-500">
                {errors.phone?.message}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[#333] text-[18px]">
                <span className="text-gray-500">Description</span>
                <span className="text-gray-500 ml-2 font-serif">تفصیل</span>
              </label>
              <textarea
                placeholder="Describe issue"
                rows={3}
                cols={4}
                {...register("desc")}
                className="py-2 px-2 bg-transparent rounded-lg border-2 border-gray-300 focus:border-primaryColor-500 outline-none"
              />
            </div>

            {/*uploading media  */}
            <div className="flex flex-col mt-2 mb-2">
              <label className="text-gray-500 text-[18px]">
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
                className="border-2 border-primaryColor-300 rounded-md hover:bg-primaryColor-300 transition-all cursor-pointer py-1 px-3 text-[18px] text-secondarycolor-500 font-bold"
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
                className="border-2 border-primaryColor-300 rounded-md active:bg-primarycolor-500 hover:bg-primaryColor-300 transition-all cursor-pointer py-1 px-3 text-[18px] text-secondarycolor-500 font-bold"
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
                  // onDurationChange={CheckingDuration()}
                  name="video"
                />
              </div>
              {/* ---------------------- END input sectons ------------------ */}
            </div>
            {/* ------------- Submit button -------------- */}
            <div className="flex justify-center mt-2 w-[100%]">
              <button
                type="submit"
                className="flex items-center justify-center gap-3 text-white mt-4 w-[100%] uppercase bg-primaryColor-500 rounded-lg transition-all outline-none cursor-pointer py-2 px-4 text-[18px] font-bold shadow-md"
              >
                <TbFilePlus className="text-xl font-bold text-white" />
                <span>Submit</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Form;
