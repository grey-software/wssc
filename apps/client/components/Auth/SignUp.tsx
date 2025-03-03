"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm, ValidationRule } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUp_validate } from "./Validation/SignUP.validate";
import { UserSubmitForm } from "../../@types/signup.types";
// import logo from "../../public/wsscmlogo.png";
import logo from "../../public/govt_logo.png";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { RegisterUser } from "@/global_state/ApiCalls/authApiCalls";
import { useSelector } from "react-redux";
import { RootState } from "@/global_state/store";

// OTP Imports
import "react-phone-input-2/lib/style.css";
import { auth } from "../../firebase.config";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import OTPInput from "react-otp-input";

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
  const [wssc_code, setWSSC] = useState("");

  // OTP Variables
  const [showOtpPage, setShowOtpPage] = useState(false)
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  //

  // OTP Input Styling
  const inputStyle = {
    inputt:{
    width: "3.2rem !important",
    height: "2.9rem",
    margin: "0. 1rem",
    'font-size': "1.6rem",
    'border-radius': "4px",
    border: "1px solid rgba(0, 0, 0, 0.3)",
    backgroundColor: "#f1f1f1",
    overflow: 'hidden',
    }
  };
  // 

  const { UserInfo, pending, error }: any = useSelector(
    (state: RootState) => state.users
  );
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
    const { phone, username, password } = data;
    console.log(data);
    // if (!showOtpPage) {
    //   setShowOtpPage(true)
    // }
    // if (user === true) {
      const res = await RegisterUser(
        { phone, name: username, password, wssc_code },
        dispatch
      );
      if (res?.status == 200) {
        setAuthState("Signin");
        reset();
      } 
    // }
  };

  // OTP Functions
  function onCaptchVerify() {
    
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,"recaptcha-container",
        {
          size: "invisible",
          callback: (response: any) => {
            // onSignup();
          },
          "expired-callback": () => {},
        },
        
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        toast.success("OTP sended successfully!");
        setLoading(false);
        setShowOTP(true); 
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res: { user: React.SetStateAction<null>; }) => {
        console.log(res);
        // setUser(res.user);       
        setLoading(false);
        setShowOtpPage(true)
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
      });
  }
// 

  // ------- TSX Section --------------
  return (
    <>
    {showOtpPage ? (
      <div className="flex items-center justify-center  w-full px-0 md:px-20 lg:px-20 xl:px-20">
      <div className="flex justify-center flex-col w-[85vw] sm:w-[80vw] md:w-full lg:w-full xl:w-full ">
        <div className="flex flex-col items-center justify-center gap-4">
          <Image src={logo} className="w-44" alt="Wsscm-logo" priority />
          <div className="title flex flex-col ">
            <p className="text-md text-gray-500 font-semibold text-center">
              آپ کی آواز، ہمارا عزم
            </p>
            <p className="text-md text-gray-500 font-semibold text-center">
              Your Voice, Our Commitment
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
          <div className={`relative z-0 mt-10 mb-6 `}>
            <input
              type="text"
              id="username"
              {...register("username")}
              className={`block py-1 px-0 w-full text-md text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor-500 peer ${
                errors.username ? "focus:border-red-500" : ""
              }`}
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
              // onChange={(e) => setPh(e.target.value)}
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
              <IoIosEye
                onClick={() => setconfirmPassword(!confirmPassword)}
                className=" absolute right-2 top-0 text-3xl text-green-500 font-bold float-right"
              />
            ) : (
              <IoIosEyeOff
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
          {/* select the one of the wssc according to the citizen location */}
          <div className="residentialArea">
            <label htmlFor="underline_select" className="sr-only block">
              Select your residential area
            </label>
            <select
              id="underline_select"
              {...register("wssc_code")}
              className={`block py-2 px-2 overflow-hidden  w-[70%] text-sm text-gray-600 shadow-b-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer ${
                errors.wssc_code ? "focus:border-red-500" : ""
              }`}
              onChange={(e) => setWSSC(e.target.value)}
            >
              <option value="">Select your residential area</option>
              <option value="wsscp25001">Peshawar</option>
              <option value="wsscm23200">Mardan</option>
              <option value="wssck026010">Kohat</option>
              <option value="wsscs19200">Swat</option>
              <option value="wssca22020">Abbottabad</option>
              <option value="wsscabannu">Bannu</option>
            </select>
            <div className="text-sm text-red-500">
              {errors.wssc_code?.message}
            </div>
          </div>
          {/* ---------------------- Submit form button ------------------ */}
          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className="w-[100%] text-lg hover:bg-primaryColor-400 rounded-xl bg-primaryColor-500 active:scale-95 transition-all text-white py-3 font-semibold mb-3"
            >
              {!pending ? (
                "SIGN UP | سائن اپ"
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
    ) : (
       <section className="bg-emerald-500 flex items-center justify-center h-screen">
        <div>
          <Toaster toastOptions={{ duration: 4000 }} />
          <div id="recaptcha-container"></div>
          {user ? (
            <h2 className="text-center text-white font-medium text-2xl">
              👍Login Success
            </h2>
          ) : (
            <div className="w-80 flex flex-col gap-3 rounded-lg p-3">
              <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
                Welcome to <br /> WSSC Registration Portal
              </h1>
              {showOTP ? (
                <>
                {/* Page to enter the OTP recieved */}
                  <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                    <BsFillShieldLockFill size={30} />
                  </div>
                  <label
                    htmlFor="otp"
                    className="font-bold text-xl text-white text-center"
                  >
                    Enter your OTP
                  </label>
                  <OTPInput
                    inputStyle={inputStyle.inputt}
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    inputType="text"
                    renderSeparator={<span>-</span>}
                    renderInput={(props: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLInputElement> & React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />}
                    shouldAutoFocus
                   />
                  <button
                    onClick={onOTPVerify}
                    className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                  >
                    {loading && (
                      <CgSpinner size={20} className="mt-1 animate-spin" />
                    )}
                    <span>Verify OTP</span>
                  </button>
                </>
              ) : (
                <>
                {/* Page to enter the phone number */}
                  <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                    <BsTelephoneFill size={30} />
                  </div>
                  <label
                    htmlFor=""
                    className="font-bold text-xl text-white text-center"
                  >
                    Verify your phone number
                  </label>
                  <PhoneInput country={"us"} value={ph} onChange={setPh} />
                  <button
                    onClick={onSignup}
                    className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                  >
                    {loading && (
                      <CgSpinner size={20} className="mt-1 animate-spin" />
                    )}
                    <span>Send code via SMS</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    )}
    </>
  );
};

export default SignUp;
