"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { HiArrowLeft } from "react-icons/hi";
import user from "../../../public/user.jpg";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/global_state/store";
import ProfileUpdate from "@/components/ProfileUpdate";
import { UpdateUserProfile } from "@/global_state/ApiCalls/authApiCalls";
import PasswordChangeModel from "@/components/PasswordChangeModel";
import DeleteAccountModal from "@/components/DeleteAccountModal";

const ProfileCard = () => {
  const [update, setUpdate] = useState(false);
  const [updateValue, setUpdateValue] = useState(null);
  const [updateType, setUpdateType] = useState("");
  const imageRef = useRef<HTMLInputElement>(null);
  const [ProfilePhoto, setProfilePhoto] = useState();
  const [InputField, SetInputField] = useState("")
  const [loading, setloading] = useState(false)
  const [changePass, SetChangePass] = useState(false)
  const [deleteAccount, SetdeleteAccount] = useState(false);
  const dispatch = useDispatch();

  // getting global user data
  const { UserInfo, pending }: any = useSelector((state: RootState) => state.users);
  
  const InProgress = () => {
    SetdeleteAccount(true);
  };

// ---------- changing password------------
  const ChangePassword = () => {
     SetChangePass(true)
  }



  // upload profile pic
  const UpdatePhoto = async (e: any) => {
    setloading(true)

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
        const updatedpic:any = {
          profile_image: photo.secure_url
        };
        // calling updateProfile apiCall to update userInfo
        const res = await UpdateUserProfile(dispatch, updatedpic, UserInfo._id);
        console.log(res.status)
        if (res.status == 200 && pending == false) {
          setloading(false)
          }
      } catch (error) {
        console.log(error)
      }
    }
  };


  const handleUpdate = (value: any, type: any, InputField:string) => {
    setUpdate(!update);
    setUpdateValue(value);
    SetInputField(InputField)

  };
  
  

  // JSX Section
  return (
    <>
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
          {loading ? (
            <div className="relative flex justify-center items-center">
              <div className="w-36 h-36 flex flex-col justify-center gap-2 items-center bg-slate-600 rounded-full">
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
            </div>
          ) : (
            <>
              <Image
                src={UserInfo?.profile_image ? UserInfo.profile_image : user}
                width={144}
                height={144}
                className="h-36 w-36 object-cover rounded-full mt-2"
                alt=""
              />
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
            </>
          )}
          <h1 className="text-xl text-headingColor-400 font-bold">
            {UserInfo?.name || "Jhoe Doe"}
          </h1>
        </div>
        {/* Name */}
        <div className="flex flex-col gap-1 z-0 mt-10 mb-6 ml-8 mr-8">
          <label htmlFor="Name" className="text-sm text-gray-400">
            Name
          </label>
          <div className="flex items-center justify-between font-semibold">
            <h2 className="text-lg">{UserInfo?.name || "Jhoe Doe"}</h2>
            <BiEdit
              onClick={() => handleUpdate(UserInfo.name, "text", "name")}
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
            <h2 className="text-lg text-gray-500">
              0{UserInfo?.phone || "3319395175"}
            </h2>
            <BiEdit
              // onClick={() => handleUpdate(UserInfo.phone, "number", "phone")}
              className="text-gray-500 text-2xl"
            />
          </div>
        </div>
        {/* Email */}
        <div className="flex flex-col gap-1 z-0 mt-10 mb-6 ml-8 mr-8">
          <label htmlFor="Name" className="text-sm text-gray-400">
            Email
          </label>
          <div className="flex items-center justify-between font-semibold">
            <h2 className="text-lg">
              {UserInfo?.email || "example@gmail.com"}
            </h2>
            <BiEdit
              onClick={() =>
                handleUpdate(
                  UserInfo?.email || "example@gmail.com",
                  "email",
                  "email"
                )
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
            <h2 className="text-lg">
              {UserInfo?.address || "Your address goes here"}
            </h2>
            <BiEdit
              onClick={() =>
                handleUpdate(
                  UserInfo?.address || "Your address goes here",
                  "text",
                  "address"
                )
              }
              className="text-primaryColor-500 text-2xl"
            />
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <button
            className=" w-[75%] text-sm hover:bg-primaryColor-400 rounded-xl bg-primaryColor-500 text-white py-3 font-medium mb-3"
            onClick={ChangePassword}
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
        {update && (
          <ProfileUpdate
            updateValue={updateValue}
            setUpdateValue={setUpdateValue}
            updateType={updateType}
            update={update}
            setUpdate={setUpdate}
            InputField={InputField}
            userId={UserInfo._id}
          />
        )}
      </div>

      {/* changePassword Modal */}
      {changePass && (
        <PasswordChangeModel
          SetChangePass={SetChangePass}
          changePass={changePass}
          userId={UserInfo?._id}
        />
      )}
      {/* Delete account modal */}
      {deleteAccount && (
        <DeleteAccountModal
          SetdeleteAccount={SetdeleteAccount}
          DeleteAccount={deleteAccount}
          userId={UserInfo?._id}
        />
      )}
    </>
  );
};

export default ProfileCard;
