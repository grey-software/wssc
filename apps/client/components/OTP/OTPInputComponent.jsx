// OTPInputComponent.js
import React from 'react';
import OtpInput from 'otp-input-react';

const OTPInputComponent = ({ otp, setOtp }) => {
    return (
        <OtpInput
            value={otp}
            onChange={setOtp}
            OTPLength={6}
            otpType="number"
            disabled={false}
            autoFocus
            className="otp-container"
        />
    );
};

export default OTPInputComponent;
