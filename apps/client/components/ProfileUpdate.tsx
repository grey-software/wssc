import React, { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  updateValue: any;
  setUpdateValue: any;
  updateType: string;
}

const ProfileUpdate = ({
  update,
  setUpdate,
  updateValue,
  setUpdateValue,
  updateType,
}: Props) => {
  const [input, setInput] = useState(updateValue);
  const Toastify = () => {
    toast.error("This feature is in progress", {
      position: "top-center",
      style: { width: "auto", height: "auto" },
      duration: 1000,
    });
  };

  return (
    <div className="fixed top-0 flex justify-center items-center w-full h-screen bg-gray-500 bg-opacity-40 transition-all z-10">
      <form className="bg-white p-6 flex flex-col gap-3 w-full absolute bottom-0 rounded-t-lg">
        <label htmlFor="update" className="text-md text-gray-400 font-bold">
          Enter your Name
        </label>
        <input
          type={updateType}
          id="name"
          autoFocus
          className="outline-none text-md  border-b-2 border-gray-600 py-2 focus:border-primaryColor-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex gap-10 mt-3 items-center justify-end text-md">
          <button onClick={() => setUpdate(!update)} className="text-gray-500">
            cancel
          </button>
          <button onClick={() => Toastify()} className="text-primaryColor-500 ">
            save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdate;
