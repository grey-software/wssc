"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignIn_validate } from "./Validation/SignIn.validate";
import { UserSubmitForm } from "../../@types/signup.types";
import logo from "../../public/wsscmlogo.png";
import Image from "next/image";
import { useDispatch, useStore } from "react-redux";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { SignIn } from "@/global_state/ApiCalls/authApiCalls";
import { useSelector } from "react-redux";
import { RootState } from "@/global_state/store";

interface Prop {
  setAuthState: Dispatch<SetStateAction<string>>;
}

const Signin = ({ setAuthState }: Prop) => {
  const dispatch = useDispatch();
  const [showPassword, setshowPassword] = useState(false);
  // access global user data
  const { pending, UserInfo, error }: any = useSelector(
    (state: RootState) => state.users
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(SignIn_validate),
  });

  const onSubmit = async (data: UserSubmitForm) => {
    const { phone, password } = data;
    // calling SignIn ApiCall to check credentials
    SignIn({ phone, password }, dispatch);
  };

  // ------- JSX Section --------------
  return (
    <>
      <div className="flex items-center justify-center w-full px-0 md:px-20 lg:px-20 xl:px-20">
        <div className="flex justify-center flex-col">
          <div className="flex flex-col items-center justify-center gap-4">
            <Image src={logo} className="w-40" alt="Wsscm-logo" priority />
            <p className="text-md text-gray-500 font-semibold text-center">
              Commited to a Clean and Green Mardan
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
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
                className="absolute text-sm text-gray-400  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primaryColor-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
              {/* show password and hide password icons */}
              {showPassword ? (
                <IoIosEye
                  onClick={() => setshowPassword(!showPassword)}
                  className=" absolute right-2 top-0 text-3xl text-green-500 font-bold float-right"
                />
              ) : (
                <IoIosEyeOff
                  onClick={() => setshowPassword(!showPassword)}
                  className=" absolute right-2 top-0 text-3xl text-green-500 font-bold float-right"
                />
              )}

              <label
                htmlFor="password"
                className="absolute text-sm text-gray-400  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primaryColor-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Password | پاس ورڈ
              </label>
              <div className="text-sm text-red-500">
                {errors.password?.message}
              </div>
            </div>

            {/* ---------------------- Submit form ------------------ */}
            <div className="flex justify-center mt-12">
              <button
                type="submit"
                className=" w-[100%] text-lg hover:bg-primaryColor-400 rounded-xl bg-primaryColor-500 active:scale-95 transition-all text-white py-3 font-semibold mb-3"
              >
                {!pending ? (
                  "LOGIN | لاگ ان"
                ) : (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-7 h-7 mr-2 text-gray-100 animate-spin dark:text-gray-600 fill-blue-600 dark:fill-gray-100"
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
              </button>
            </div>

            <div className="text-md text-gray-600 text-center mt-4">
              <span
                className="text-blue-700 ml-4 font-semibold cursor-pointer underline"
                onClick={() => setAuthState("signUp")}
              >
                Register with us
              </span>
              <h5 className="text-md text-gray-600 text-center no-underline">
                ہمارے ساتھ رجسٹر کریں
              </h5>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
