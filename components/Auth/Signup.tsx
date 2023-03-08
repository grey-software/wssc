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
        <div className="md:w-[20%] w-[100%] h-auto border-2 shadow-md shadow-gray-200 border-gray-200 px-4 bg-slate-100">
         
          <div className="w-full flex justify-center h-8 items-center text-md text-green-600">
            <h3>SIGN UP FORM</h3>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <label className="text-gray-500">Username*</label>
              <input
                type="text"
                {...register("username")}
                className={`py-1 px-2 rounded-sm ${
                  errors.username
                    ? "border-2 border-red-500"
                    : "border-2 border-gray-400"
                }`}
              />
              <div className="text-sm text-red-500">
                {errors.username?.message}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500">Mobile Number*</label>
              <input
                type="text"
                {...register("phone")}
                className={`py-1 px-2 rounded-sm ${
                  errors.phone
                    ? "border-2 border-red-500"
                    : "border-2 border-gray-400"
                }`}
              />
              <div className="text-sm text-red-500">
                {errors.phone?.message}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500">Password*</label>
              <input
                type="password"
                {...register("password")}
                className={`py-1 px-2 rounded-sm ${
                  errors.password
                    ? "border-2 border-red-500"
                    : "border-2 border-gray-400"
                }`}
              />
              <div className="text-sm text-red-500">
                {errors.password?.message}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500">Confirm Password*</label>
              <input
                type="password"
                {...register("confirmPassword")}
                className={`py-1 px-2 rounded-sm ${
                  errors.confirmPassword
                    ? "border-2 border-red-500"
                    : "border-2 border-gray-400"
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
                className="w-[50%] hover:bg-blue-700 rounded-sm bg-green-600 text-white py-2 font-bold mb-3"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </>
    );
};

export default Signup;
