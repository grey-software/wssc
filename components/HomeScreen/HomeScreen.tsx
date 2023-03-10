import Image from 'next/image';
import { IoIosArrowForward } from 'react-icons/io'
import { complaints_types } from '@/public/Data/data';
import Link from 'next/link';


const HomeScreen = () => {
  return (
    <div className="container w-[90%] py-3">
      <div className="complaints-record bg-gray-50 flex justify-center items-center overflow-hidden  w-full border border-green-500 shadow-lg shadow-gray-200 rounded-3xl p-1 mt-20">
        <div className="pending cursor-pointer hover:bg-gray-100 flex flex-col justify-center items-center border-r border-gray-300  flex-1 ">
          <h3 className="font-bold">02</h3>
          <p className="">Pending</p>
        </div>

        <div className="all-complaints cursor-pointer hover:bg-gray-400  flex flex-col justify-center items-center border-r border-gray-300 flex-1">
          <h3 className="font-bold">03</h3>
          <p>All Complaints</p>
        </div>

        <div className="arrow cursor-pointer hover:bg-gray-300 w-10 flex justify-center items-center">
          <IoIosArrowForward className="text-3xl text-green-500 font-extrabold" />
        </div>
      </div>

      <div className="complaints-types mt-4">
        <h2 className="text-lg text-center font-semibold">
          Please Choose the complaint type
        </h2>

        {/* complaint-types */}
        <div className="complaint-types flex justify-around flex-wrap">
          {complaints_types.map((complaint, index) => (
            <div
              key={index}
              className="wrapper overflow-hidden cursor-pointer mt-4 w-[42%] border-2 border-gray-200 rounded-lg shadow-lg shadow-gray-400 flex flex-col justify-center items-center"
            >
              <Link href={`/complaint/${complaint.complaintType}`}>
                <Image
                  
                  src={complaint.img}
                  height={100}
                  width={120}
                  alt="water Supply"
                  className="h-[100%] w-[100%]"
                />
              </Link>
              <p className="mt-2 font-bold">{complaint.name}</p>
              <p className="font-bold mb-3">{complaint.urdu}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen