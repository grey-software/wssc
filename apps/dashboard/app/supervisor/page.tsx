"use client";
import Image from "next/image";
import dummyPic from "../../public/wsscmlogo.png"
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";

import { SupervisorComplaints } from "../GlobalState/Supervisor-ApiCalls/ApiCalls/supervisorComplaintsApiCalls";
import { useSelector } from "react-redux";
import { RootState } from "../GlobalState/store";

export const FiltersBtns = [
  {
    name: "Pending",
    index: 1,
  },
  {
    name: "Resolved",
    index: 2,
  },
  {
    name: "Closed",
    index: 3,
  },
];



const HomeScreen = () => {
  const dispatch = useDispatch();
    const [selected, setselected] = useState<Number>(0);
  // const [complaints, setcomplaints] = useState([]);
  
    const complaints:any = useSelector((state: RootState)=> state.supervisorComplaints.SupervisorComplaints)
    const handleClick = (index: any) => {
        
    }
  
  // FetchSupervisorComplaints method definition to fetch all complaints that are assigned to supervisor
const FetchSupervisorComplaints = async () => {
  try {
     await SupervisorComplaints(dispatch);
  } catch (error) {
    console.log(error)
  }
}

// used useEffect to call supervisor assigned complaints api to fetch and retrieve to the supervisor
useEffect(() => {
  FetchSupervisorComplaints();
}, [])
  
  
  console.log(`fetch all complaints from complaintSlice: ${complaints} `);
  // JSX section
  return (
    <div className="container">
      <div className="complaints-record bg-gray-50 flex justify-center items-center  overflow-hidden border border-gray-300 shadow-sm shadow-gray-200 rounded-sm mx-2 mt-20">
        {FiltersBtns.map((e, index) => (
          <>
            <span
              key={index}
              onClick={() => setselected(e.index)}
              className={`pending cursor-pointer py-3  hover:bg-green-500 flex flex-col justify-center items-center border-r border-gray-300  flex-1  ${
                e.index == selected && "bg-green-500 text-white"
              } `}
            >
              <p className="text-sm">{e.name}</p>
            </span>
          </>
        ))}
      </div>

      <div className="complaints-types m-3 mt-2">
        <h2 className="text-md text-center font-semibold text-gray-600">
          Recent complaints
        </h2>
      </div>

      {complaints.map((complaint:any, index:any) => (
        <>
          <Link href={`/supervisor/complaint/345454534`}>
            <div className="flex items-center justify-between rounded-lg border-2 border-gray-100 mb-1 mx-2 p-2 px-4 shadow-sm relative overflow-hidden">
              <div className="flex flex-col justify-center ml-1">
                <h3 className="text-md font-bold text-gray-600">
                 {complaint?.complaintType}
                </h3>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <p>Status:</p>
                  <span className={`font-bold text-primaryColor-500`}>
                    {complaint?.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <p>Submited On:</p>
                  <span>{complaint?.updatedAt }</span>
                </div>
                <div className="flex  gap-3 text-sm text-gray-600">
                  <p>Address:</p>
                  <span>{complaint?.complaintAddress}</span>
                </div>
              </div>
              <Image
                src={complaint?.ImageUrl ? complaint?.ImageUrl : dummyPic}
                className="h-70% w-[30%]"
                width={60}
                height={40}
                alt=""
              />
              <div
                className={`h-[100%] w-2 top-0 left-0 absolute 
                  `}
              ></div>
            </div>
          </Link>
          <h1>comlaints fetched</h1>
        </>
      ))}
     

    
    </div>
  );
};

export default HomeScreen;
