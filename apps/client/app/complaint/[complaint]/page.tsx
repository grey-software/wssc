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

const Page: React.FC = ({ params }: any) => {
  const complaintType = decodeURI(params.complaint); // getting complaint type through params and then decoded to show properly
  // getting user data from redux store
  const { name, _id, phone, WSSC_CODE }: any = useSelector(
    (state: RootState) => state.users.UserInfo
  );

  const { loading } = useSelector((state: RootState) => state.complaints); // loading state
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
  let [ImageUrl, setImageUrl] = useState<string>();
  let [VideoUrl, setVideoUrl] = useState<string>();
  const [load, setload] = useState(false);

  // Submit Form
  const onSubmit = async (data: ComplainForm) => {
    const { address, desc } = data;
    const complaintData = {
      userName: name,
      userId: _id,
      WSSC_CODE,
      phone: phone.toString(),
      complaintType,
      complaintAddress: address,
      complaintDes: desc,
      ImageUrl,
      VideoUrl,
    };
    // Calling API
    try {
      setload(true);
      const res = await CreateComplaint(complaintData, dispatch);
      if (res && res.status === 200) {
        Navigate.push(`/complaint/timeline/${res.CreateComplaint._id}`);
        setload(false);
        reset();
      } else {
        console.log("Invalid response or missing data:", res);
      }
    } catch (error) {
      setload(false);
      console.log(error);
    }
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

  // ---------- JSX SECTION STARTED ---------
  return (
    <div className="w-[365px] sm:w-[450px] md:w-full lg-full xl-w-full">
      <div className="flex items-center justify-between mb-4 ">
        <span className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-all cursor-pointer">
          <HiArrowLeft
            onClick={GoHomePage}
            className="text-[28px] text-primaryColor-500"
          />
        </span>
        <h3 className="flex gap-2 text-lg text-primaryColor-500">
          <span className="text-headingColor-400 opacity-75 font-bold">
            Complaint:
          </span>
          <span className="px-2 bg-[#1A5980] text-white rounded-lg">
            {complaintType}
          </span>
        </h3>
        <div></div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-6 rounded-3xl pt-6 pb-8 px-4"
      >
        <div className="flex flex-col">
          <label className="text-gray-500 text-[18px]">
            <span>
              Address<span className="text-red-500">*</span>
            </span>
            <span className="text-gray-500 ml-2 font-serif">شکایت کا پتہ</span>
          </label>
          <textarea
            rows={2}
            cols={2}
            placeholder="Complaint address"
            {...register("address")}
            className={`block py-1 px-2 w-full rounded-lg text-md text-black bg-transparent border-2 border-gray-300 focus:outline-none focus:border-primaryColor-500 peer ${
              errors.phone ? "focus:border-red-500" : ""
            }`}
          />
          <div className="text-sm text-red-500">{errors.phone?.message}</div>
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
            {!loading ? (
              <span>Submit</span>
            ) : (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-7 h-7 mr-2 text-gray-100 animate-spin dark:text-gray-600 fill-blue-600 dark:fill-gray-100"
                  viewBox="0 0 100 101"
                  fill=""
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
