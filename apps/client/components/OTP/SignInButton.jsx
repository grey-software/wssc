// SignInButton.js
import React from 'react';
import {CgSpinner} from 'react-icons/cg';

const SignInButton = ({ onClick, loading }) => {
    return (
        <button
            onClick={onClick}
            className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
        >
            {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
            <span>Verify OTP</span>
        </button>
    );
};

export default SignInButton;
