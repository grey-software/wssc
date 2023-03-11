"use client";
import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  SignupvalidationSchema,
  SigninvalidationSchema,
} from "./validation_schema";
import { UserSubmitForm } from "../../@types/signup.types";
import Link from "next/link";

const Authentication: React.FC = () => {
  const [authStatus, setAuthStates] = useState("signup");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(SignupvalidationSchema),
  });

  const onSubmit = (data: UserSubmitForm) => {
    console.log(JSON.stringify(data, null, 2));
    alert("form submitted successfully");
    reset();
  };
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="flex justify-center flex-col w-[80%] ">
        <div className="flex flex-col items-center justify-center gap-4">
          <img src="/wsscmlogo.png" className="w-40" alt="Wsscm-logo" />
          <p className="text-md text-gray-500 font-semibold text-center">
            Commited to clean and Green Mardan
          </p>
        </div>
        {authStatus === "signup" ? (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="relative z-0 mt-10 mb-6">
              <input
                type="text"
                id="floating_standard"
                {...register("username")}
                className={`block py-1 px-0 w-full text-md text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor-500 peer ${
                  errors.username ? "focus:border-red-500" : ""
                }`}
                placeholder=" "
              />
              <label
                htmlFor="floating_standard"
                className="absolute text-lg text-gray-400  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primaryColor-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                User Name | صارف نام
              </label>
              <div className="text-sm text-red-500">
                {errors.username?.message}
              </div>
            </div>

            <div className="relative z-0 mt-10 mb-6">
              <input
                type="number"
                id="floating_standard"
                {...register("phone")}
                className={`block py-1 px-0 w-full text-md text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor-500 peer ${
                  errors.username ? "focus:border-red-500" : ""
                }`}
                placeholder=" "
              />
              <label
                htmlFor="floating_standard"
                className="absolute text-lg text-gray-400  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primaryColor-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone Number | فون کانمبر
              </label>
              <div className="text-sm text-red-500">
                {errors.phone?.message}
              </div>
            </div>

            <div className="relative z-0 mt-10 mb-6">
              <input
                type="text"
                id="floating_standard"
                {...register("password")}
                className={`block py-1 px-0 w-full text-md text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor-500 peer ${
                  errors.username ? "focus:border-red-500" : ""
                }`}
                placeholder=" "
              />
              <label
                htmlFor="floating_standard"
                className="absolute text-lg text-gray-400  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primaryColor-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Create Password | پاسورڈ بنائیں
              </label>
              <div className="text-sm text-red-500">
                {errors.password?.message}
              </div>
            </div>

            <div className="relative z-0 mt-10 mb-6">
              <input
                type="text"
                id="floating_standard"
                {...register("confirmPassword")}
                className={`block py-1 px-0 w-full text-md text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor-500 peer ${
                  errors.username ? "focus:border-red-500" : ""
                }`}
                placeholder=" "
              />
              <label
                htmlFor="floating_standard"
                className="absolute text-lg text-gray-400  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primaryColor-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Confirm Password | پاس ورڈ
              </label>
              <div className="text-sm text-red-500">
                {errors.confirmPassword?.message}
              </div>
            </div>

            {/* ---------------------- Submit form button ------------------ */}
            <div className="flex justify-center mt-12">
              <button
                type="submit"
                className="w-[100%] text-lg hover:bg-primaryColor-400 rounded-xl bg-primaryColor-500 text-white py-3 font-bold mb-3"
              >
                Sign Up
              </button>
            </div>
            <div className="text-lg text-gray-600 text-center mt-6">
              <span>Already Registered?</span>
              <span
                className="text-blue-700 underline ml-4 font-bold"
                onClick={() => setAuthStates("signin")}
              >
                Sign In
              </span>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="relative z-0 mt-10 mb-6">
              <input
                type="number"
                id="floating_standard"
                {...register("phone")}
                className={`block py-1 px-0 w-full text-md text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor-500 peer ${
                  errors.username ? "focus:border-red-500" : ""
                }`}
                placeholder=" "
              />
              <label
                htmlFor="floating_standard"
                className="absolute text-lg text-gray-400  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primaryColor-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Mobile Number | فون کانمبر
              </label>
              <div className="text-sm text-red-500">
                {errors.phone?.message}
              </div>
            </div>

            <div className="relative z-0 mt-10 mb-6">
              <input
                type="text"
                id="floating_standard"
                {...register("password")}
                className={`block py-1 px-0 w-full text-md text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor-500 peer ${
                  errors.username ? "focus:border-red-500" : ""
                }`}
                placeholder=" "
              />
              <label
                htmlFor="floating_standard"
                className="absolute text-lg text-gray-400  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primaryColor-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Password | پاس ورڈ
              </label>
              <div className="text-sm text-red-500">
                {errors.password?.message}
              </div>
            </div>

            {/* ---------------------- Submit form button ------------------ */}
            <div className="flex justify-center mt-12">
              <button
                type="submit"
                className="w-[100%] text-lg hover:bg-primaryColor-400 rounded-xl bg-primaryColor-500 text-white py-3 font-bold mb-3"
              >
                Sign In
              </button>
            </div>
            <div className="text-lg text-gray-600 text-center mt-6">
              <span>New user?</span>
              <span
                className="text-blue-700 underline ml-4 font-bold"
                onClick={() => setAuthStates("signup")}
              >
                Sign Up
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
export default Authentication;
