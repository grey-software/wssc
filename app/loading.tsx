import Image from "next/image";
import { useState, CSSProperties } from "react";
import BeapLoader from "react-spinners/BounceLoader";
import logo from '../public/wsscmlogo.png'

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  fontWeight: "bolder",
  opacity: 1,
};

const color = "red";

const Loading = () => {
    return (
      <>
        <div className="h-screen w-full bg-gray-800 flex justify-center items-center">
          <div className="logo animate-spin duration-100">
            <Image src={logo} height={50} width={50} alt="loader" />
          </div>
        </div>
      </>
    );
};

export default Loading