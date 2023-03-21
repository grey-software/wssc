"use client";
import Image from "next/image";
import Complaint_stages from "./Complaint_stages";
import { HiArrowLeft } from "react-icons/hi";
import { useRouter } from "next/navigation";


const Timeline = () => {
const navigate = useRouter();

  const backTohome = () => {
    navigate.push('/')
  }

  // JSX SECTION
  return (
    <>
      <div className="md:w-[40%] w-[90%] h-[100vh] bg-secondarycolor-500 mt-20 mx-3 relative">
        <div className="flex items-center gap-24 mb-4">
          <HiArrowLeft onClick={backTohome} className="text-[28px] text-primaryColor-500" />
          <span className="text-[25px] font-bold text-headingColor-400">
            Tracking
          </span>
        </div>
        <div className="flex items-center justify-between rounded-lg border-2 border-gray-100 p-4 shadow-lg relative overflow-hidden">
          <div className="flex flex-col justify-center ml-1">
            <h3 className="text-lg font-bold text-gray-600">Solid waste</h3>
            <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
              <p>Status:</p>
              <span className="text-initiatedColor font-bold">Initiated</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <p>Compliant ID:</p>
              <span>uwe1238</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <p>Submited On:</p>
              <span>24-jan-2023</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <p>Address:</p>
              <span>Mardan</span>
            </div>
          </div>
          <Image
            src='/garbage.png' width={80} height={50}
            className="h-70% w-[30%]"
            alt=""
          />
          <div className="h-[100%] w-2 bg-initiatedColor top-0 left-0 absolute"></div>
        </div>
        <Complaint_stages />
      </div>
    </>
  );
};

export default Timeline;
