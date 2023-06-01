"use client";
import React from "react";
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

type Props = {};

const Auth = (props: Props) => {
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
    SignIn(data, dispatch);
    navigate.push("/");
  };

  return (
    <div className="-mt-20 -ml-[280px] h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="flex items-center rounded-lg overflow-hidden shadow-md shadow-primaryColor-300 p-16 h-[70vh] w-[30%] bg-white">
        <div className="flex flex-col w-full">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-8">
            Sign in to WSSC Dashboard
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-6 w-full"
            action="#"
          >
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Enter WSSC Code
              </label>
              <input
                type="WSSC_CODE"
                // name="username"
                id="WSSC_CODE"
                {...register("WSSC_CODE")}
                className={`bg-gray-50 border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg
                outline-none
                block w-full p-2.5 
                focus:border-primaryColor-500
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  
                ${errors.WSSC_CODE ? "focus:border-red-500" : ""}
                `}
                placeholder="wss*******"
              />
              <div className="text-sm text-red-500">
                {/* {errors.phone?.message} */}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  
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
                  <label
                    htmlFor="remember"
                    className="text-gray-500 dark:text-gray-300"
                  >
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
        </div>
      </div>
    </div>
  );
};

export default Auth;
