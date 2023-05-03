"use client";

import SignUp from "./SignUp";
import {useState} from "react"
import Signin from "./Signin";

const Authentication: React.FC = () => {
  const [authStatus, setAuthStates] = useState('Signin');
 

  return (
    <>
      {authStatus == "Signin" ? (
        <Signin  setAuthState={setAuthStates} />
      ) : (
        <SignUp  setAuthState={setAuthStates} />
      )}
    </>
  );
};
export default Authentication;
