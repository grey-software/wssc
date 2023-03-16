"use client";
import React from "react";
import { FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon, WhatsappShareButton, WhatsappIcon } from "react-share";
type Props = {};

const ShareApp = (props: Props) => {
  return (
    <>
      <div className="flex justify-center items-center w-full h-screen">
        <FacebookShareButton
          url={"https://fyp-front-end.vercel.app/"}
          quote={"WSSCM site"}
        >
          <FacebookIcon className="rounded-full" />
        </FacebookShareButton>

        {/* linkedIn */}
        <LinkedinShareButton
          url={"https://fyp-front-end.vercel.app/"}
          title={"WSSCM"}
          summary={
            "This is WSSCM PWA APP purely designed and developed for the citizen benefit use"
          }
        >
          <LinkedinIcon className="rounded-full" />
        </LinkedinShareButton>

        <WhatsappShareButton url={"https://fyp-front-end.vercel.app/"} title={"WSSCM APP"}>
          <WhatsappIcon className="rounded-full" />
        </WhatsappShareButton>
      </div>
    </>
  );
};

export default ShareApp;
