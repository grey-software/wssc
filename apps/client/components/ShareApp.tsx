"use client";
import React from "react";
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailShareButton,
} from "react-share";
import toast from "react-hot-toast";

import { HiMail } from "react-icons/hi";
import { FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import { MdClose } from "react-icons/md";

type Props = {
  sharePop: boolean;
  setSharePop: React.Dispatch<React.SetStateAction<boolean>>;
};

function ShareApp({ sharePop, setSharePop }: Props) {
  const CopiedToast = () => {
    toast.success("Copied", {
      position: "top-center",
      style: { width: "auto", height: "auto" },
    });
  };
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center w-screen h-screen bg-slate-200 bg-opacity-50 transition-all z-40">
      <div className="flex flex-col gap-12 shadow-2xl bg-white px-5 py-5 rounded-md  z-50">
        {/* closing btn */}
        <div className="flex items-center justify-between font-semibold">
          <span>Share this App</span>
          <MdClose
            className="text-headingColor-400 text-2xl font-mono cursor-pointer"
            onClick={() => setSharePop(!sharePop)}
          />
        </div>

        <div className="wrapper relative flex justify-around space-x-4 items-center w-auto">
          {/* facebook site */}
          <FacebookShareButton url={"https://fyp-front-end.vercel.app/"}>
            <FaFacebook className="text-3xl text-blue-500" />
          </FacebookShareButton>

          {/* LinkedIn */}
          <LinkedinShareButton url={"https://fyp-front-end.vercel.app/"}>
            <FaLinkedin className="text-3xl text-blue-700" />
          </LinkedinShareButton>
          {/* whatsapp */}
          <WhatsappShareButton url={"https://fyp-front-end.vercel.app/"}>
            <FaWhatsapp className="text-4xl text-green-500" />
          </WhatsappShareButton>
          {/* Twitter */}
          <TwitterShareButton
            url={"https://fyp-front-end.vercel.app/"}
            title={"WSSCM"}
          >
            <FaTwitter className="text-3xl text-blue-400" />
          </TwitterShareButton>
          {/* email */}
          <EmailShareButton
            url={"https://fyp-front-end.vercel.app/"}
            subject={"WSSCM official app"}
            body={
              "This is a wsscm official app through you can easily file any type of complaint which are related to WSSCM"
            }
          >
            <HiMail className="text-4xl text-red-500" />
          </EmailShareButton>
        </div>
        <div className="flex items-center justify-between">
          <input
            className="text-sm w-[80%] overflow-hidden px-1 py-1 border-[1px] border-gray-400 rounded-md"
            defaultValue={"https://fyp-front-end.vercel.app/"}
          />
          <button
            className="text-sm px-2 py-1 bg-primaryColor-500 text-white rounded-md"
            onClick={() => {
              navigator.clipboard.writeText(
                "https://fyp-front-end.vercel.app/"
              );
              CopiedToast();
            }}
          >
            <FiCopy className="font-bold text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareApp;
