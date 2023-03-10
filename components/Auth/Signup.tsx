"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignupvalidationSchema } from "./validation_schema";
import { UserSubmitForm } from "../../@types/signup.types";

const Signup: React.FC = () => {
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
    <>
      <div className="border-2 shadow-md shadow-gray-200 rounded-3xl border-gray-200 mx-3 p-6 mt-24 md:mt-28 md:w-[50%] w-[90%]">
        <div className="w-full flex justify-between items-center  text-xl font-bold text-gray-500">
          <h3>Sign In</h3>
          <span>|</span>
          <h3>Sign Up</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
          <div className="flex flex-col mb-6">
            <label className="text-gray-600 text-lg font-semibold mb-2">
              Username<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Your Name"
              {...register("username")}
              className={`p-3 w-full rounded-xl border-2 ${
                errors.username ? "border-red-500" : "border-gray-400"
              }`}
            />
            <div className="text-sm text-red-500">
              {errors.username?.message}
            </div>
          </div>

          <div className="flex flex-col mb-6">
            <label className="text-gray-600 text-lg font-semibold mb-2">
              Mobile Number<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Phone Number"
              {...register("phone")}
              className={`p-3 rounded-xl border-2 ${
                errors.phone ? "border-red-500" : "border-gray-400"
              }`}
            />
            <div className="text-sm text-red-500">{errors.phone?.message}</div>
          </div>

          <div className="flex flex-col mb-6">
            <label className="text-gray-600 text-lg font-semibold mb-2">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Create Password"
              {...register("password")}
              className={`p-3 border-2 rounded-xl ${
                errors.password ? " border-red-500" : " border-gray-400"
              }`}
            />
            <div className="text-sm text-red-500">
              {errors.password?.message}
            </div>
          </div>

          <div className="flex flex-col mb-8">
            <label className="text-gray-600 text-lg font-semibold mb-2">
              Confirm Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Comfirm password"
              {...register("confirmPassword")}
              className={`p-3 border-2 rounded-xl ${
                errors.confirmPassword ? "border-red-500" : "border-gray-400"
              }`}
            />
            <div className="text-sm text-red-500">
              {errors.confirmPassword?.message}
            </div>
          </div>

          {/* ---------------------- Submit form button ------------------ */}
          <div className="flex justify-center mt-3">
            <button
              type="submit"
              className="w-[50%] hover:bg-primaryColor-400 rounded-xl bg-primaryColor-500 text-white text-lg py-2 font-bold mb-3"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
