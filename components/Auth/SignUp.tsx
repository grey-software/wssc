"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { SignUp_validate } from "./Validation/SignUP.validate";
import { UserSubmitForm } from "../../@types/signup.types";
import logo from "../../public/wsscmlogo.png";
import Image from "next/image";
import axios from "axios";

interface Prop {
  setAuthState: Dispatch<SetStateAction<string>>;
}

const SignUp = ({  setAuthState }: Prop) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(SignUp_validate),
  });

  const onSubmit = async (data: UserSubmitForm) => {
    // console.log(JSON.stringify(data, null, 2));
    const { phone, username, password } = data;

    console.log(data);
    // console.log(`phone is : ${phone} | username is: ${username} | password is: ${password}`)

    // await axios.post("http://localhost:7000/api/v1/auth/signup", {
    //   name: username,
    //   phone: phone,
    //   password: password
    // }).then((response) => {
    //       console.log(response.data)
    //     }).catch((err) => {
    //         console.log(err)
    //       });

      reset();
      setAuthState("Signin")
  };

  // ------- JSX Section --------------
  return (
    <>
      <div className="flex items-center justify-center h-screen w-full">
        <div className="flex justify-center flex-col w-[80%] sm:w-[40%] ">
          <div className="flex flex-col items-center justify-center gap-4">
            <Image src={logo} className="w-40" alt="Wsscm-logo" priority />
            <p className="text-md text-gray-500 font-semibold text-center">
              Commited to a Clean and Green Mardan
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className={`relative z-0 mt-10 mb-6 `}>
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
                className="absolute text-md text-gray-400  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primaryColor-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                id="username"
                {...register("phone")}
                className={`block py-1 px-0 w-full text-md text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor-500 peer ${
                  errors.phone ? "focus:border-red-500" : ""
                }`}
                placeholder=" "
              />
              <label
                htmlFor="username"
                className="absolute text-md text-gray-400  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primaryColor-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Mobile Number | فون نمبر
              </label>
              <div className="text-sm text-red-500">
                {errors.phone?.message}
              </div>
            </div>

            <div className="relative z-0 mt-10 mb-6">
              <input
                type="text"
                id="password"
                {...register("password")}
                className={`block py-1 px-0 w-full text-md text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor-500 peer ${
                  errors.password ? "focus:border-red-500" : ""
                }`}
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="absolute text-md text-gray-400  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primaryColor-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Create Password | پاس ورڈ بنائیں
              </label>
              <div className="text-sm text-red-500">
                {errors.password?.message}
              </div>
            </div>

            <div className={`relative z-0 mt-10 mb-6`}>
              <input
                type="text"
                id="confirm password"
                {...register("confirmPassword")}
                className={`block py-1 px-0 w-full text-md text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor-500 peer ${
                  errors.confirmPassword ? "focus:border-red-500" : ""
                }`}
                placeholder=" "
              />
              <label
                htmlFor="confirm password"
                className="absolute text-md text-gray-400  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primaryColor-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                <p>
                  <span>Confirm Password</span> |
                  <span className="font-serif"> تصدیق کریں </span>
                </p>
              </label>
              <div className="text-sm text-red-500">
                {errors.confirmPassword?.message}
              </div>
            </div>

            {/* ---------------------- Submit form button ------------------ */}
            <div className="flex justify-center mt-12">
              <button
                type="submit"
                className=" w-[100%] text-lg hover:bg-primaryColor-400 rounded-xl bg-primaryColor-500 text-white py-3 font-bold mb-3"
              >
                Sign Up
              </button>
            </div>

            <div className="text-lg text-gray-600 text-center mt-6">
              <span>Already Registered</span>

              <span
                className="text-blue-700 ml-4 font-bold cursor-pointer"
                onClick={() => setAuthState("Signin")}
              >
                <span onClick={() => setAuthState("Signin")}>Sign In</span>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
