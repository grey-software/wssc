// OTPVerificationComponent.js
import React from 'react';
import {BsFillShieldLockFill} from 'react-icons/bs';
import OTPInputComponent from './OTPInputComponent';
import SignInButton from './SignInButton';

const OTPVerificationComponent = ({ otp, setOtp, onOTPVerify, loading }) => {
    return (
        <>
            <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                <BsFillShieldLockFill size={30} />
            </div>
            <label htmlFor="otp" className="font-bold text-xl text-white text-center">
                Enter your OTP
            </label>
            <OTPInputComponent otp={otp} setOtp={setOtp} />
            <SignInButton onClick={onOTPVerify} loading={loading} />
        </>
    );
};

export default OTPVerificationComponent;
