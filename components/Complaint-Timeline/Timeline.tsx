// 'use client'

import Complaint_stages from "./Complaint_stages";

const Timeline = () => {
  return (
    <>
    <div className="md:w-[40%] w-[100%] h-[100vh] bg-secondarycolor-500">
      
      <div className="complaint-status w-full flex flex-col p-2 bg-gray-300">
        <div className="type flex flex-col justify-center items-center">
          <h2 className="font-bold text-lg text-gray-800">Complaint Type</h2>
          <h6 className="text-green-700 font-bold">Status: intiated</h6>
        </div>

        <div className="complaint-detail flex flex-col items-center">
          <h4 className="text-gray-800">
            Complaint ID: <span className="text-gray-500 ">wsscm-05623</span>
          </h4>
          <div className="text-gray-800">
            Submitted on: <span className="text-gray-500">march 7, 2023</span>
            <h4 className="text-gray-800">
              Address:
              <span className="text-gray-500">charsadda chowk, UETM</span>
            </h4>
          </div>
        </div>

      </div>
      {/* Complaint stages */}
    <Complaint_stages/>
     </div>
    </>
  );
};

export default Timeline;
