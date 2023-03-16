'use client'
import React from 'react'
import { FacebookShareButton, WhatsappShareButton, LinkedinShareButton } from 'react-share'
import {FaFacebook, FaLinkedin, FaWhatsapp} from 'react-icons/fa'

type Props = {}

function ShareApp({}: Props) {
  return (
      <div className="flex justify-center items-center w-full h-screen bg-blend-overlay backdrop-blur-md">
          
      <div className="wrapper flex justify-around space-x-4 items-center py-10 w-60 bg-gray-100 shadow-md">
        {/* facebook site */}
        <FacebookShareButton url={"https://fyp-front-end.vercel.app/"}>
          {/* <FacebookIcon className='rounded-full' /> */}
          <FaFacebook className="text-3xl text-cyan-600" />
        </FacebookShareButton>

        {/* LinkedIn */}
        <LinkedinShareButton url={"https://fyp-front-end.vercel.app/"}>
          <FaLinkedin className="text-3xl text-cyan-600" />
        </LinkedinShareButton>
        {/* whatsapp */}
        <WhatsappShareButton url={"https://fyp-front-end.vercel.app/"}>
          <FaWhatsapp className="text-3xl text-cyan-600" />
        </WhatsappShareButton>
      </div>
    </div>
  );
}

export default ShareApp