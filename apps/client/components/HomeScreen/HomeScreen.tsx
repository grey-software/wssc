import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import { complaints_types } from "@/public/Data/data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FetchAllComplaints } from "@/global_state/ApiCalls/complaintApiCalls";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState, store } from "@/global_state/store";

const HomeScreen = () => {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const user: any = useSelector((state: RootState) => state.users.UserInfo);
  const handleClick = (stage: string) => {
    navigate.push(`/complaint/stages/${stage}`);
    FetchAllComplaints(dispatch, user._id);
  };
  return (
    <div className="container py-3">
      <div className="complaints-record bg-gray-50 flex justify-center items-center mx-4 overflow-hidden border border-green-500 shadow-md shadow-gray-200 rounded-full p-2 mt-20">
        <span
          onClick={() => handleClick("Pending")}
          className="pending cursor-pointer hover:bg-gray-100 flex flex-col justify-center items-center border-r border-gray-300  flex-1 "
        >
          <h3 className="font-bold">02</h3>
          <p className="text-sm">Pending complaints</p>
        </span>
        <span
          onClick={() => handleClick("Resolved")}
          className="all-complaints cursor-pointer hover:bg-gray-200  flex flex-col justify-center items-center border-r border-gray-300 flex-1"
        >
          <h3 className="font-bold">03</h3>
          <p className="text-sm">Resolved complaints</p>
        </span>

        <span
          onClick={() => handleClick("AllComplaints")}
          className="arrow cursor-pointer hover:bg-gray-200 w-10 flex justify-center items-center"
        >
          <IoIosArrowForward className="text-3xl text-green-500 font-extrabold" />
        </span>
      </div>

      <div className="complaints-types mt-4">
        <h2 className="text-lg text-center font-semibold text-gray-600">
          Please Choose the complaint type
        </h2>

        {/* complaint-types */}
        <div className="complaint-types flex justify-around flex-wrap">
          {complaints_types.map((complaint, index) => (
            <div
              key={index}
              className="wrapper overflow-hidden cursor-pointer mt-5 w-[38%] border-1 border-gray-300 rounded-lg shadow-sm shadow-gray-400 flex flex-col justify-center items-center"
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
