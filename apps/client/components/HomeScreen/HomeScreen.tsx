"use client";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import { complaints_types } from "@/public/Data/data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FetchAllComplaints } from "@/global_state/ApiCalls/complaintApiCalls";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState, store } from "@/global_state/store";

const HomeScreen = () => {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const user: any = useSelector((state: RootState) => state.users.UserInfo);
  const handleClick = (stage: string) => {
    navigate.push(`/complaint/stages/${stage}`);
  };
  return (
    <div className="w-[365px] sm:w-[450px] md:w-full lg-full xl-w-full">
      <div className="bg-gray-50 flex justify-center items-center mx-4 overflow-hidden border border-green-500 shadow-md shadow-gray-200 rounded-full">
        <span
          onClick={() => handleClick("Pending")}
          className="p-[6px] sm:p-2 md:p-2 lg:p-2 pending cursor-pointer hover:bg-gray-100 flex flex-col justify-center items-center border-r border-gray-300  flex-1 "
        >
          <h3 className="font-bold">02</h3>
          <p className="text-sm">Pending complaints</p>
        </span>
        <span
          onClick={() => handleClick("Resolved")}
          className="p-2 all-complaints cursor-pointer hover:bg-gray-200  flex flex-col justify-center items-center border-r border-gray-300 flex-1"
        >
          <h3 className="font-bold">03</h3>
          <p className="text-sm">Resolved complaints</p>
        </span>

        <span
          onClick={() => handleClick("AllComplaints")}
          className="p-2 arrow cursor-pointer hover:bg-gray-200 w-10 flex justify-center items-center"
        >
          <IoIosArrowForward className="text-3xl text-green-500 font-extrabold" />
        </span>
      </div>

      <div className="complaints-types mt-4">
        <h2 className="text-lg text-center font-semibold text-gray-600">
          Please Choose the complaint type
        </h2>

        {/* complaint-types */}
        <div className="complaint-types grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 justify-center mx-4">
          {complaints_types.map((complaint, index) => (
            <div
              key={index}
              className={`wrapper overflow-hidden cursor-pointer mt-5 border-1 border-gray-300 rounded-lg shadow-sm shadow-gray-400 flex flex-col  items-center hover:shadow-md transition-all`}
            >
              <Link
                className="h-[60%] w-[100%]"
                href={`/complaint/${complaint.complaintType}`}
              >
                <Image
                  src={complaint.img}
                  alt="water Supply"
                  loading="lazy"
                  className="h-[100%] w-[100%]"
                  placeholder="blur"
                />
              </Link>
              <div className="flex items-center justify-center flex-col">
                <p className="mt-2 font-bold">{complaint.name}</p>
                <p className="font-bold mb-3">{complaint.urdu}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
