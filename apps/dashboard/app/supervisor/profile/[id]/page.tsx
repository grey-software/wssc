"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { HiArrowLeft } from "react-icons/hi";
import Avatar from "../../../../public/user.jpg";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { UpdateSupervisor } from "@/GlobalState/Supervisor-ApiCalls/ApiCalls/authApiCalls";
import { RootState } from "@/GlobalState/store";
import { useRouter } from "next/navigation";

const ProfileCard = () => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [ProfilePhoto, setProfilePhoto] = useState();
  const [loading, setloading] = useState(false);
  // getting supervisor profile data
  const { _id, profile_image, name, phone }: any = useSelector(
    (state: RootState) => state.suprvisor.SupervisorSiginData
  );
  // getting supervisorToken from store
  const token: any = useSelector(
    (state: RootState) => state.suprvisor.supervisorToken
  );

  const dispatch = useDispatch();
  const navigate = useRouter();
  // ------------ back button --------
  const BackButton = () => {
    navigate.back();
  };
  // upload profile pic
  const UpdatePhoto = async (e: any) => {
    setloading(true);

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "xguxdutu");
      data.append("cloud_name", "dgpwe8xy6");
      data.append("folder", "ProfilePhotos");
      data.append("quality", "auto:good"); // Set the desired quality level

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dgpwe8xy6/image/upload",
          {
            method: "post",
            body: data,
          }
        );
        const photo = await response.json();
        setProfilePhoto(photo.secure_url);
        const updatedpic: any = {
          profile_image: photo.secure_url,
        };
        // calling updateProfile apiCall to update userInfo
        await UpdateSupervisor(dispatch, {
          updatedpic,
          suprvisorId: _id,
        }, token);

        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        toast.error("something went wrong", {
          position: "top-right",
          duration: 3000,
        });
      }
    }
  };

  // JSX Section
  return (
    <div className="container w-screen flex justify-center overflow-x-hidden mt-20 ">
      <div className=" ml-3 flex flex-col justify-center w-screen md:w-[50%] overflow-x-hidden">
        <div className="flex items-center justify-between mb-2">
          <Link
            href="/supervisor"
            className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-all cursor-pointer"
          >
            <HiArrowLeft
              className="text-[28px] text-primaryColor-500"
              onClick={BackButton}
            />
          </Link>
          <h3 className="text-lg -ml-3 font-bold text-primaryColor-500">
            <span className=" text-headingColor-400 opacity-50 font-black">
              Profile Card
            </span>
          </h3>
          <div className="w-11"></div>
        </div>
        {/* below code for user image */}
        <div className="relative flex flex-col gap-2 items-center">
          {loading && (
            <div className="spinner absolute mt-16 flex justify-center items-center">
              <svg
                aria-hidden="true"
                className="inline w-7 h-7 mr-2 text-gray-100 animate-spin dark:text-gray-600 fill-gray-400 dark:fill-gray-100"
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
          <Image
            src={profile_image ? profile_image : Avatar}
            width={144}
            height={144}
            className={`${
              loading ? "opacity-40" : "opacity-100"
            } h-36 w-36 object-cover rounded-full mt-2`}
            alt=""
          />
          {!loading && (
            <span className="absolute translate-x-[50px] translate-y-[120px] flex items-center justify-center p-2 bg-primaryColor-500 rounded-full text-white cursor-pointer hover:shadow-lg transition-all">
              <input
                className="hidden"
                accept="image/*"
                ref={imageRef}
                onChange={UpdatePhoto}
                type="file"
                name="image"
              />
              <FaCamera onClick={() => imageRef.current!.click()} />
            </span>
          )}
          <h1 className="text-xl text-headingColor-400 font-bold">{name}</h1>
        </div>
        {/* Name */}
        <div className="flex flex-col gap-1 z-0 mt-10 mb-6 ml-8 mr-8">
          <label htmlFor="Name" className="text-sm text-gray-400">
            Name
          </label>
          <div className="flex items-center justify-between font-semibold ">
            <h2 className="text-md text-gray-500">{name}</h2>
            <BiEdit
              title="Update Your Name"
              className="text-gray-400 text-2xl cursor-pointer"
            />
          </div>
        </div>
        {/* Contact */}
        <div className="flex flex-col gap-1 z-0 mt-4 mb-6 ml-8 mr-8">
          <label htmlFor="Name" className="text-sm text-gray-400">
            Contact Number
          </label>
          <div
            title="Phone Number can not be updated"
            className="flex items-center justify-between font-semibold"
          >
            <h2 className="text-md text-gray-500">{phone}</h2>
            <BiEdit className="text-gray-400 text-2xl cursor-not-allowed" />
          </div>
        </div>
        {/* Email */}
        <div className="flex flex-col gap-1 z-0 mt-4 mb-6 ml-8 mr-8">
          <label htmlFor="Name" className="text-sm text-gray-400">
            Email
          </label>
          <div className="flex items-center justify-between font-semibold">
            <h2 className="text-md text-gray-500">example@gmail.com</h2>
            <BiEdit
              title="Update Your Email"
              className="text-gray-400 text-2xl cursor-pointer"
            />
          </div>
        </div>
        {/* Your Address */}
        <div className="flex flex-col gap-1 z-0 mt-4 mb-6 ml-8 mr-8">
          <label htmlFor="Name" className="text-sm text-gray-400">
            Address
          </label>
          <div className="flex items-center justify-between font-semibold">
            <h2 className="text-md text-gray-500">your address</h2>
            <BiEdit
              title="Update Your Address"
              className="text-gray-400 text-2xl cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
