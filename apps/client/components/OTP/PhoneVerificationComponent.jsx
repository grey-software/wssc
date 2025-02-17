// PhoneVerificationComponent.js
import React from 'react';
import {BsTelephoneFill} from 'react-icons/bs';
import PhoneInputComponent from './PhoneInputComponent';
import SignInButton from './SignInButton';

const PhoneVerificationComponent = ({ ph, setPh, onSignup, loading }) => {
    return (
        <>
            <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                <BsTelephoneFill size={30} />
            </div>
            <label htmlFor="" className="font-bold text-xl text-white text-center">
                Verify your phone number
            </label>
            <PhoneInputComponent ph={ph} setPh={setPh} />
            <SignInButton onClick={onSignup} loading={loading} />
        </>
    );
};

export default PhoneVerificationComponent;
