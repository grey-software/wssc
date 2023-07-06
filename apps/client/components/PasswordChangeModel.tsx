"use client";
import { ChangedPassword } from "@/global_state/ApiCalls/authApiCalls";
import { RootState } from "@/global_state/store";
import React, { useRef } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
type Props = {
  SetChangePass: React.Dispatch<React.SetStateAction<boolean>>;
  changePass: boolean;
  userId: any;
};

const PasswordChangeModel = ({ SetChangePass, changePass, userId }: Props) => {
  const changePssRef = useRef<HTMLInputElement>(null);
  const ConfirmPssRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { pending }: any = useSelector((state: RootState) => state.users);
  // get citizen token from persist storage to send in every request in order to make sure proper authorization
  const CitizenToken: any = useSelector(
    (state: RootState) => state.users.token
  );

  // update password method definition
  const UpdatedPassword = async (e: any) => {
    e.preventDefault();
    const password = changePssRef.current?.value;
    const confirmpassword = ConfirmPssRef.current?.value;

    if (password != confirmpassword) {
      toast.error("Passwords are not matched", {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 3000,
      });
    } else {
      const updatedPass: any = {
        password: password,
      };
      // calling changePassword api method to change password
      const res = await ChangedPassword(dispatch, updatedPass, userId, CitizenToken);
      if (res.status == 200) {
        toast.success("Password changed successfully", {
          position: "top-center",
          style: { width: "auto", height: "auto" },
          duration: 3000,
        });
        SetChangePass(!changePass);
      } else {
        toast.error("Something went wrong, try again", {
          position: "top-center",
          style: { width: "auto", height: "auto" },
          duration: 3000,
        });
      }
    }
  };
  // JSX section
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center w-screen h-screen bg-gray-400 bg-opacity-60 transition-all z-10">
      <form
        onSubmit={UpdatedPassword}
        className={`${
          pending ? "bg-gray-300" : "bg-gray-50"
        }  p-6 flex flex-col gap-3 w-[96%] md:max-w-lg absolute center rounded-lg`}
      >
        <label htmlFor="password" className="text-md text-gray-400">
          Enter Password
        </label>
        <input
          id="password"
          type="password"
          autoFocus
          className="outline-none text-md bg-transparent border-b-2 border-gray-600 py-2 focus:border-primaryColor-500"
          placeholder="*******"
          ref={changePssRef}
        />

        <label htmlFor="confirmPass" className="text-md text-gray-400">
          Confirm Password
        </label>
        <input
          id="confirmPass"
          type="password"
          className="outline-none text-md bg-transparent  border-b-2 border-gray-600 py-2 focus:border-primaryColor-500"
          placeholder="*******"
          ref={ConfirmPssRef}
        />

        <div className="flex gap-10 mt-3 items-center justify-end text-md">
          <button
            onClick={() => {
              SetChangePass(!changePass);
            }}
            className="text-gray-500"
          >
            cancel
          </button>
          <button type="submit" className="text-primaryColor-500 font-medium ">
            change
          </button>
        </div>
      </form>
      {/* loading */}
      {pending && (
        <div className=" w-screen h-full absolute flex justify-center items-center">
          <svg
            aria-hidden="true"
            className="inline w-7 h-7 mr-2 text-gray-100 animate-spin dark:text-gray-600 fill-gray-500 dark:fill-gray-100"
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
    </div>
  );
};

export default PasswordChangeModel;
