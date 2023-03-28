"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm, ValidationRule } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUp_validate } from "./Validation/SignUP.validate";
import { UserSubmitForm } from "../../@types/signup.types";
import logo from "../../public/wsscmlogo.png";
import Image from "next/image";
import { SignUpUser } from "@/Redux-toolkit/UserSlice";
import { useDispatch } from "react-redux";
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
interface Prop {
  setAuthState: Dispatch<SetStateAction<string>>;
}
// pattern or regular expression to allow only letters
const patternRule: ValidationRule<RegExp> = {
  value: /^[A-Za-z]+$/,
  message: "Only alphabets are allowed",
};


const SignUp = ({ setAuthState }: Prop) => {
  const [showPassword, setshowPassword] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState(false);
  const dispatch = useDispatch();
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
    dispatch(SignUpUser(data));

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
    setAuthState("Signin");
  };

  // ------- TSX Section --------------
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

          <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
            <div className={`relative z-0 mt-10 mb-6 `}>
              <input
                type="text"
                id="username"
                {...register("username", {
                  pattern: patternRule,
                })}
                className={`block py-1 px-0 w-full text-md text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor-500 peer ${
                  errors.username ? "focus:border-red-500" : ""
                }`}
                placeholder=" "
              />
              <label
                htmlFor="username"
                className="absolute text-sm text-gray-400  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primaryColor-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                id="phone"
                {...register("phone")}
                className={`block py-1 px-0 w-full text-md text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor-500 peer ${
                  errors.phone ? "focus:border-red-500" : ""
                }`}
                placeholder=" "
              />
              <label
                htmlFor="phone"
                className="absolute text-sm text-gray-400  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primaryColor-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Mobile Number | فون نمبر
              </label>
              <div className="text-sm text-red-500">
                {errors.phone?.message}
              </div>
            </div>

            <div className="relative z-0 mt-10 mb-6">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password")}
                className={`block py-1 px-0 w-full text-md text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor-500 peer ${
                  errors.password ? "focus:border-red-500" : ""
                }`}
                placeholder=" "
              />
              {/* show password and hide password icons  */}
              {showPassword ? (
                <AiOutlineEye
                  onClick={() => setshowPassword(!showPassword)}
                  className=" absolute right-2 top-0 text-3xl text-green-500 font-bold float-right"
                />
              ) : (
                <AiOutlineEyeInvisible
                  onClick={() => setshowPassword(!showPassword)}
                  className=" absolute right-2 top-0 text-3xl text-green-500 font-bold float-right"
                />
              )}

              <label
                htmlFor="password"
                className="absolute text-sm text-gray-400  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primaryColor-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Create Password | پاس ورڈ بنائیں
              </label>
              <div className="text-sm text-red-500">
                {errors.password?.message}
              </div>
            </div>

            <div className={`relative z-0 mt-10 mb-6`}>
              <input
                type={confirmPassword ? "text" : "password"}
                id="confirm password"
                {...register("confirmPassword")}
                className={`block py-1 px-0 w-full text-md text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor-500 peer ${
                  errors.confirmPassword ? "focus:border-red-500" : ""
                }`}
                placeholder=" "
              />
              {/* show or hide confirm password */}
              {confirmPassword ? (
                <AiOutlineEye
                  onClick={() => setconfirmPassword(!confirmPassword)}
                  className=" absolute right-2 top-0 text-3xl text-green-500 font-bold float-right"
                />
              ) : (
                <AiOutlineEyeInvisible
                  onClick={() => setconfirmPassword(!confirmPassword)}
                  className=" absolute right-2 top-0 text-3xl text-green-500 font-bold float-right"
                />
              )}

              <label
                htmlFor="confirm password"
                className="absolute text-sm text-gray-400  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primaryColor-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-6"
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
            <div className="flex justify-center mt-10">
              <button
                type="submit"
                className=" w-[100%] text-lg hover:bg-primaryColor-400 rounded-xl bg-primaryColor-500 text-white py-3 font-bold mb-3"
              >
                Sign Up | سائن اپ
              </button>
            </div>

            <div className="text-md text-gray-600 text-center mt-4">
              <span
                className="text-blue-700 ml-4 font-bold cursor-pointer underline"
                onClick={() => setAuthState("Signin")}
              >
                Already Registered?
              </span>
              <h5 className="text-md text-gray-600 text-center no-underline">
                کیا آپ پہلے ہی رجسٹرڈ ہیں؟
              </h5>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
