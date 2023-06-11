import { UpdateUserProfile } from "@/global_state/ApiCalls/authApiCalls";
import React, { memo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
interface Props {
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  updateValue: any;
  setUpdateValue: any;
  updateType: string;
  InputField: string;
  userId: any;
}

const ProfileUpdate = ({
  update,
  setUpdate,
  updateValue,
  setUpdateValue,
  updateType,
  InputField,
  userId,
}: Props) => {
  const [input, setInput] = useState(updateValue);
  const updatRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const UpdatedProfile = (event: any): void => {
    event.preventDefault();
    let updateData: any;

    const value = updatRef.current?.value;
    if (InputField == "name") {
      updateData = {
        name: value,
      };
    } else if (InputField == "email") {
      updateData = {
        email: value,
      };
    } else if (InputField == "address") {
      updateData = {
        address: value,
      };
    }

    // calling API method to update UserInfo
    UpdateUserProfile(dispatch, updateData, userId);
    // console.log("updateProfile method successfully")
    setUpdateValue(updatRef.current?.value);
    setUpdate(!update);
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center w-screen h-screen bg-gray-500 bg-opacity-40 transition-all z-10">
      <form
        onSubmit={UpdatedProfile}
        className="bg-white p-6 flex flex-col gap-3 w-full sm:w-full md:max-w-lg absolute rounded-lg"
      >
        <label htmlFor="update" className="text-md text-gray-400 font-bold">
          Update your {InputField}
        </label>
        <input
          type={updateType}
          id="name"
          autoFocus
          className="outline-none text-md  border-b-2 border-gray-600 py-2 focus:border-primaryColor-500"
          defaultValue={input}
          // onChange={(e) => setInput(e.target.value)}
          ref={updatRef}
        />
        <div className="flex gap-10 mt-3 items-center justify-end text-md">
          <button onClick={() => setUpdate(!update)} className="text-gray-500">
            cancel
          </button>
          <button type="submit" className="text-primaryColor-500 ">
            save
          </button>
        </div>
      </form>
    </div>
  );
};

export default memo(ProfileUpdate);
