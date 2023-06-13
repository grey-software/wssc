"use client";
import React, { useState } from "react";
import { login_validate } from "@/components/Auth/login.validate";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
// import { SignInUser } from "@/app/GlobalState/UserSlice";
// import { SignInUser } from "../GlobalState/UserSlice";
import { SignIn } from "../../app/GlobalState/ApiCalls/authApiCalls";
import { useSelector } from "react-redux";
import { RootState } from "@/app/GlobalState/store";
import { MdSupervisorAccount } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import Link from "next/link";
import { SupervisorSignIn } from "../GlobalState/Supervisor-ApiCalls/ApiCalls/authApiCalls";

type Props = {};

const Auth = (props: Props) => {
  const [admin, setadmin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useRouter();
  const { pending, error }: any = useSelector((state: RootState) => state.User);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(login_validate) });

  const onSubmit = async (data: any) => {
    if (admin) {
      SignIn(data, dispatch);
      navigate.push("/");
      reset();
    } else {
      try {
        const res = await SupervisorSignIn(
          { phone: data.WSSC_CODE, password: data.password },
          dispatch
        );
        if (res?.status == 200) {
          navigate.push("/supervisor");
          reset();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="-mt-20 -ml-[280px] h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="flex items-center rounded-lg overflow-hidden shadow-md shadow-primaryColor-300 p-8 py md:p-16 h-[70vh] w-full sm:w-[8%] md:w-[70%] lg:w-[30%] bg-white">
        <div className="flex flex-col w-full">
          {/* icon of users */}
          <div className="icons mb-10 space-y-1 text-6xl text-primaryColor-500 w-full flex flex-col items-center justify-center">
            {admin ? <RiAdminFill /> : <MdSupervisorAccount />}

            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-primaryColor-500 md:text-2xl">
              {admin ? "Admin Dashboard" : "Sign in as Supervisor"}
            </h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 md:space-y-6 w-full"
            action="#"
          >
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-500 "
              >
                {admin ? "Enter WSSC code" : "Enter your phone number"}
              </label>
              <input
                type={admin ? "text" : "number"}
                // name="username"
                id="WSSC_CODE"
                {...register("WSSC_CODE")}
                className={`bg-gray-50 border-2 border-gray-300 text-gray-500 sm:text-sm rounded-lg
                outline-none
                block w-full p-2.5 
                focus:border-primaryColor-500
               
                ${errors.WSSC_CODE ? "focus:border-red-500" : ""}
                `}
                placeholder={admin ? "wss*******" : "03*********"}
              />
              <div className="text-sm text-red-500">
                {/* {errors?.WSSC_CODE?.message} */}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-500 "
              >
                Your Password
              </label>
              <input
                type="password"
                // name="password"
                id="password"
                {...register("password")}
                placeholder="Enter your password"
                className={`bg-gray-50 border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg
                    outline-none
                    block w-full p-2.5 
                    focus:border-primaryColor-500
                     
                    ${errors.password ? "focus:border-red-500" : ""}
                    `}
              />
              <div className="text-sm text-red-500">
                {/* {errors.password?.message} */}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primaryColor-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-500">
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-primary-light hover:underline dark:text-primaryColor-500"
              >
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primaryColor-500 transition-all focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {pending ? "Processing" : "Login"}
            </button>
          </form>

          {/* button to change user role login form */}
          <div className="otheruser w-full mt-6 flex flex-col justify-center">
            <button
              className="text-white  text-md text-center p-2 bg-blue-500 rounded-md"
              onClick={() => setadmin(!admin)}
            >
              {admin ? "Login as supervisor" : "Login as Admin"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
