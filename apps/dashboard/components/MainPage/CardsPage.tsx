import React from 'react'
import { FaUsers } from "react-icons/fa";
import { FcManager } from "react-icons/fc";
import { AiFillFileAdd } from "react-icons/ai";
import ChartNeedle from './ChatNeedle';
import CountUp from "react-countup"
import { useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalState/store';



const CardsPage = () => {
  const data: any = useSelector((state: RootState) => state.statistics.data)
console.log(data)

  return (
    <div className="cards W-full flex justify-between">
      {/* user cards */}
      <div className="card w-[20%] relative bg-gray-50 border-gray-400 rounded-md shadow-md overflow-hidden">
        <div className="wrapper p-3 flex justify-between items-center">
          <div className="name flex flex-col gap-3">
            <p className="text-sm">All Users</p>
            <h2 className="text-orange-400 font-bold text-3xl">
              0<CountUp start={0} end={data?.users} duration={3} />
            </h2>
          </div>
          <div className="ICONS text-5xl text-orange-400 ">
            <FaUsers />
          </div>
        </div>
        {/* footer */}
        <div className="botm absolute bottom-0 w-full p-2 text-sm text-white text-center bg-orange-500 opacity-90">
          <h5>Registered users</h5>
        </div>
      </div>

      {/* supervisor  card */}
      <div className="card w-[20%] relative bg-gray-50 border-gray-400 rounded-md shadow-md overflow-hidden">
        <div className="wrapper p-3 flex justify-between items-center">
          <div className="name flex flex-col gap-3">
            <p className="text-sm">Supervisors</p>
            <h2 className="text-blue-600 font-bold text-3xl">
              0<CountUp start={0} end={data?.supervisors} duration={3} />
            </h2>
          </div>
          <div className="ICONS text-5xl text-blue-600">
            <FcManager />
          </div>
        </div>
        {/* footer */}
        <div className="botm absolute w-full bottom-0 p-2 text-sm text-white text-center bg-blue-600 opacity-90">
          <h5>Active supervisors</h5>
        </div>
      </div>

      {/* complaints card */}
      <div className="card w-[20%] relative bg-gray-50 border-gray-400 rounded-md shadow-md overflow-hidden">
        <div className="wrapper p-3 flex justify-between items-center">
          <div className="name flex flex-col gap-3">
            <p className="text-sm">Complaints</p>
            <h2 className="text-green-500 font-bold text-3xl">
              <CountUp start={0} end={data?.complaints} duration={3} />
            </h2>
          </div>
          <div className="ICONS text-5xl text-primaryColor-500">
            <AiFillFileAdd />
          </div>
        </div>
        {/* footer */}
        <div className="botm absolute w-full bottom-0 p-2 text-sm text-white text-center bg-primaryColor-500 opacity-90">
          <h5>Registered complaints</h5>
        </div>
      </div>

      {/* chartNeedle */}
      <div className="card w-[20%] relative bg-gray-50 border-gray-400 rounded-md shadow-md overflow-hidden">
        <div className="wrapper p-3 flex justify-between items-center">
          <ChartNeedle />
        </div>
        {/* footer */}
        <div className="botm p-2 text-sm text-white font-semibold tracking-wide text-center bg-yellow-300 bg-opacity-6">
          <h5>WSSC Rating</h5>
        </div>
        {/* rating %age */}
        <div className="percent w-full justify-between  flex absolute top-2  text-[16px] font-extrabold text-yellow-400">
          <div className=" w-auto ml-2 "> 4.7 💛</div>
          <div className=" w-auto mr-2">93.5%</div>

          {/* <div className=" flex gap-1  ">
            <div className="bg-yellow-400 w-3 h-3 rounded-full"></div> 20-40%
          </div>
          <div className=" flex gap-1  ">
            <div className="bg-pink-400 w-3 h-3 rounded-full"></div> 40-60%
          </div>
          <div className=" flex gap-1 ">
            <div className="bg-blue-600 w-3 h-3 rounded-full"></div> 60-80%
          </div>
          <div className=" flex gap-1">
            <div className="bg-green-500 w-3 h-3 rounded-full"></div> 80-100%
          </div>  */}
        </div>
      </div>
    </div>
  );
}

export default CardsPage