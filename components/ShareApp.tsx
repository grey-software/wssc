'use client'
import React from 'react'
import { FacebookShareButton, WhatsappShareButton, LinkedinShareButton, TwitterShareButton, EmailShareButton } from 'react-share'
import {HiMail, HiOutlineMail} from 'react-icons/hi'
import {FaFacebook, FaLinkedin, FaTwitter, FaVoicemail, FaWhatsapp} from 'react-icons/fa'
import {GrClose, GrFormClose} from 'react-icons/gr'
type Props = {
  sharePop: boolean,
  setSharePop: React.Dispatch<React.SetStateAction<boolean>>
}

function ShareApp({sharePop, setSharePop}: Props) {
  return (
    <div className="absolute top-0 flex justify-center items-center w-screen h-screen bg-blend-overlay backdrop-blur-sm">
      
      <div className="wrapper relative flex justify-around space-x-4 items-center py-20 w-auto px-10 bg-gray-600 shadow-md">
      {/* closing btn */}
       <button className='absolute right-3 top-0 text-white text-2xl font-mono' onClick={()=>setSharePop(!sharePop)}> x</button>
        {/* facebook site */}
        <FacebookShareButton url={"https://fyp-front-end.vercel.app/"}>
          <FaFacebook className="text-3xl text-gray-300" />
        </FacebookShareButton>

        {/* LinkedIn */}
        <LinkedinShareButton url={"https://fyp-front-end.vercel.app/"}>
          <FaLinkedin className="text-3xl text-gray-300" />
        </LinkedinShareButton>
        {/* whatsapp */}
        <WhatsappShareButton url={"https://fyp-front-end.vercel.app/"}>
          <FaWhatsapp className="text-3xl text-gray-300" />
        </WhatsappShareButton>
        {/* Twitter */}
        <TwitterShareButton
          url={"https://fyp-front-end.vercel.app/"}
          title={"WSSCM"}
        >
          <FaTwitter className="text-3xl text-gray-300" />
        </TwitterShareButton>
        {/* email */}
        <EmailShareButton
          url={"https://fyp-front-end.vercel.app/"}
          subject={"WSSCM official app"}
          body={
            "This is a wsscm official app through you can easily file any type of complaint which are related to WSSCM"
          }
        >
          <HiMail className="text-3xl text-gray-300" />
        </EmailShareButton>
      </div>
    </div>
  );
}

export default ShareApp