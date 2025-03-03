// PhoneInputComponent.js
import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneInputComponent = ({ ph, setPh }) => {
    return (
        <PhoneInput country="pk" value={ph} onChange={setPh} />
    );
};

export default PhoneInputComponent;
