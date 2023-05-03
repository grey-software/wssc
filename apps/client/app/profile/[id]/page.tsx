"use client";
import React, { useState, useRef } from "react";
import { HiArrowLeft } from "react-icons/hi";
import user from "../../../public/user.jpg";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { FaCamera } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/global_state/store";
import ProfileUpdate from "@/components/ProfileUpdate";
const ProfileCard = () => {
  const [update, setUpdate] = useState(false);
  const [updateValue, setUpdateValue] = useState();
  const [updateType, setUpdateType] = useState("");
  const imageRef = useRef<HTMLInputElement>(null);
  const [ProfilePhoto, setProfilePhoto] = useState();
  // getting global user data
  const { UserInfo }: any = useSelector((state: RootState) => state.users);
  const InProgress = () => {
    toast.error("This feature is in Progress", {
      position: "top-center",
      style: { width: "auto", height: "auto" },
      duration: 2000,
    });
  };

  const UpdatePhoto = async (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "xguxdutu");
      data.append("cloud_name", "dgpwe8xy6");
      data.append("folder", "ProfilePhotos");

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

        toast.success("Profile Photo Updated Successfully", {
          position: "top-center",
          style: { width: "auto", height: "auto" },
          duration: 2000,
        });
      } catch (error) {
        toast.success("Oops, there was an error updating photo", {
          position: "top-center",
          style: { width: "auto", height: "auto" },
          duration: 2000,
        });
      }
    }
  };

  const handleUpdate = (value: any, type: any) => {
    setUpdate(!update);
    setUpdateValue(value);
  };

  // JSX Section
  return (
    <div className="relative">
      <div className="flex items-center gap-28 mt-20 mb-2">
        <Link href="/">
          <HiArrowLeft
            className="text-[28px] text-primaryColor-500 ml-2"
            // onClick={handleBack}
          />
        </Link>
        <h3 className="text-lg -ml-3 font-bold text-primaryColor-500">
          <span className=" text-headingColor-400 opacity-50 font-black">
            Profile Card
          </span>
        </h3>
      </div>
      {/* below code for user image */}
      <div className="relative flex flex-col gap-2 items-center">
        <Image
          src={UserInfo?.profile_image ? UserInfo.profile_image : user}
          width={144}
          height={144}
          className="h-36 w-36 rounded-full mt-2"
          alt=""
        />
        <h1 className="text-xl text-headingColor-400 font-bold">
          {UserInfo?.name || "Jhoe Doe"}
        </h1>
        <span className="absolute translate-x-[50px] translate-y-[120px] flex items-center justify-center p-2 bg-primaryColor-500 rounded-full text-white">
          <input
            className="hidden"
            accept="image/*"
            ref={imageRef}
            onChange={UpdatePhoto}
            type="file"
            capture="environment"
            name="image"
          />
          <FaCamera onClick={() => imageRef.current!.click()} />
        </span>
      </div>
      {/* Name */}
      <div className="flex flex-col gap-1 z-0 mt-10 mb-6 ml-8 mr-8">
        <label htmlFor="Name" className="text-sm text-gray-400">
          Name
        </label>
        <div className="flex items-center justify-between font-semibold">
          <h2 className="text-lg">{UserInfo?.name || "Jhoe Doe"}</h2>
          <BiEdit
            onClick={() => handleUpdate(UserInfo.name, "text")}
            className="text-primaryColor-500 text-2xl"
          />
        </div>
      </div>
      {/* Contact */}
      <div className="flex flex-col gap-1 z-0 mt-10 mb-6 ml-8 mr-8">
        <label htmlFor="Name" className="text-sm text-gray-400">
          Contact Number
        </label>
        <div className="flex items-center justify-between font-semibold">
          <h2 className="text-lg">0{UserInfo?.phone || "3319395175"}</h2>
          <BiEdit
            onClick={() => handleUpdate(UserInfo.phone, "number")}
            className="text-primaryColor-500 text-2xl"
          />
        </div>
      </div>
      {/* Email */}
      <div className="flex flex-col gap-1 z-0 mt-10 mb-6 ml-8 mr-8">
        <label htmlFor="Name" className="text-sm text-gray-400">
          Email
        </label>
        <div className="flex items-center justify-between font-semibold">
          <h2 className="text-lg">example@gmail.com</h2>
          <BiEdit
            onClick={() =>
              handleUpdate(UserInfo?.email || "example@gmail.com", "email")
            }
            className="text-primaryColor-500 text-2xl"
          />
        </div>
      </div>
      {/* Your Address */}
      <div className="flex flex-col gap-1 z-0 mt-10 mb-6 ml-8 mr-8">
        <label htmlFor="Name" className="text-sm text-gray-400">
          Address
        </label>
        <div className="flex items-center justify-between font-semibold">
          <h2 className="text-lg">Your address goes here</h2>
          <BiEdit
            onClick={() =>
              handleUpdate(
                UserInfo?.address || "Your address goes here",
                "text"
              )
            }
            className="text-primaryColor-500 text-2xl"
          />
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <button
          type="submit"
          className=" w-[75%] text-sm hover:bg-primaryColor-400 rounded-xl bg-primaryColor-500 text-white py-3 font-medium mb-3"
          onClick={InProgress}
        >
          Change Password
        </button>
      </div>
      <div className="flex justify-center mt-1">
        <button
          type="submit"
          className=" w-[75%] text-sm hover:bg-primaryColor-400 rounded-xl bg-DeleteButton-100 text-DeleteButton-300 py-3 font-medium mb-3 hover:bg-DeleteButton-300 hover:text-white"
          onClick={InProgress}
        >
          Delete Account
        </button>
      </div>
      {/* update modal */}
      {update ? (
        <ProfileUpdate
          updateValue={updateValue}
          setUpdateValue={setUpdateValue}
          updateType={updateType}
          update={update}
          setUpdate={setUpdate}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfileCard;
