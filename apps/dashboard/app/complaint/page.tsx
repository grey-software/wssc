"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { BsCaretLeftSquareFill, BsCaretRightSquareFill } from "react-icons/bs";
import { RootState } from "../../GlobalState/store";
import { FetchAllComplaints } from "@/GlobalState/ApiCalls/complaintApiCalls";
import { setActiveTab } from "@/GlobalState/TabSlice";
import TableRow from "../../components/complaint/TableRow";
import { ColorRing, RotatingLines } from "react-loader-spinner";
import { MdClose } from "react-icons/md";

const Page = () => {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [state, setState] = useState<string>("AllComplaints");
  const { loading, error } = useSelector((state: RootState) => state.Complaint);
  const [success, setSuccess] = useState(error);
  // getting token from store
  const token: any = useSelector((state: RootState) => state.User.adminToken);

  useEffect(() => {
    FetchAllComplaints(dispatch, token);
  }, []);

  const complaints = useSelector(
    (state: RootState) => state.Complaint.complaintsAll
  );

  const selectPagehandler = (selectedPage: any) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= Math.ceil(complaints.length / 8) &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  // setState and Reset Page in order to show all complaints from first page
  const setStateAndResetPage = (value: string) => {
    setState(value);
    setPage(1); // Reset the page to 1 when the state is changed
  };

  // Filter complaints based on the selected state
  const filteredComplaints =
    state === "AllComplaints"
      ? complaints
      : complaints.filter(
          (complaint) =>
            state === complaint?.status[complaint.status.length - 1].state
        );

  const { WSSC_CODE }: any = useSelector(
    (state: RootState) => state.User.SignInData
  );

  // JSX SECTION
  return (
    <>
      {WSSC_CODE && (
        <div className="container flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4  text-md">
              <span
                className="cursor-pointer flex items-center justify-center p-[10px] rounded-full hover:bg-gray-100 active:bg-gray-300 transition-all"
                title="Dashboard"
                onClick={() => {
                  navigate.push("/");
                  dispatch(setActiveTab(0));
                }}
              >
                <AiFillHome />
              </span>
              <span className="text-[10px] font-bold text-gray-500">
                <MdOutlineArrowForwardIos />
              </span>
              <span
                title="Complaints"
                className="flex items-center justify-center cursor-pointer text-sm text-primary-default px-3 py-1 rounded-full bg-primaryColor-300"
              >
                <span>Complaints</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <p>Filter By</p>
              <select
                className="px-3 py-1 border-2 border-gray-400 rounded focus:border-primaryColor-500"
                onChange={(e) => setStateAndResetPage(e.target.value)}
              >
                <option value="AllComplaints">Status</option>
                <option value="Initiated">UnAssigned</option>
                <option value="InProgress">Assigned</option>
                <option value="Completed">Completed</option>
                <option value="Closed">Closed</option>
              </select>
              <div className="flex items-center border-2 border-gray-300 rounded-full">
                <input
                  type="text"
                  placeholder="Search here               "
                  className="text-sm rounded-l-full outline-none py-1 px-4 w-52 "
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="border-[1px] border-gray-300 h-8"></div>
                <button className="py-1 px-4 rounded-r-full transition-all text-white bg-feedbackColor cursor-pointer">
                  Search
                </button>
              </div>
            </div>
          </div>
          {success ||
            (error && (
              <div className="flex items-center justify-between p-2 text-[#D8000C] bg-[#FFBABA]">
                <span>
                  Unable to fetch new complaints, Please refresh the page 🙂
                </span>
                <span
                  onClick={() => setSuccess(false)}
                  className="text-2xl cursor-pointer"
                >
                  <MdClose />
                </span>
              </div>
            ))}

          {/* SHOWING ALL COMPLAINTS */}
          <div
            className={`overflow-x-auto shadow-md sm:rounded-lg h-[77vh] py-1 ${
              loading && "flex items-center justify-center"
            }`}
          >
            {loading ? (
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            ) : (
              <>
                {complaints.length > 0 ? (
                  <table className={` w-full text-sm text-left text-gray-500`}>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          S. NO.
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Complaint ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Address
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Filed By
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Date and Time
                        </th>

                        <th scope="col" className="px-6 py-3">
                          status
                        </th>

                        <th scope="col" className="px-6 py-3">
                          <span>Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredComplaints
                        ?.slice(page * 8 - 8, page * 8)
                        .map((complaint, index) => (
                          <>
                            {state === "AllComplaints" ? (
                              <TableRow complaint={complaint} index={index} />
                            ) : (
                              <>
                                {state ===
                                  complaint?.status[complaint.status.length - 1]
                                    .state && (
                                  <TableRow
                                    complaint={complaint}
                                    index={index}
                                  />
                                )}
                              </>
                            )}
                          </>
                        ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="h-[70vh] w-full flex items-center justify-center">
                    <p className="text-gray-400 font-semibold">
                      Whenever a user files a complaint it will show here
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
          {filteredComplaints?.length > 8 && !loading && (
            <div className="flex items-center justify-center w-full -mt-2">
              <div className="flex items-center gap-2 text-2xl">
                <span
                  className={
                    page > 1
                      ? "hover:text-primaryColor-500 transition-all cursor-pointer text-gray-700"
                      : "opacity-0"
                  }
                  onClick={() => selectPagehandler(page - 1)}
                >
                  <BsCaretLeftSquareFill />
                </span>
                {filteredComplaints.length > 8 &&
                  [...Array(Math.ceil(filteredComplaints?.length / 8))].map(
                    (_, index) => (
                      <span
                        key={index}
                        className={
                          page === index + 1
                            ? "bg-primaryColor-300 text-sm font-semibold  rounded-md px-2 py-1 cursor-pointer"
                            : "bg-transparent text-sm rounded-md px-2 py-1  cursor-pointer"
                        }
                        onClick={() => selectPagehandler(index + 1)}
                      >
                        {index + 1}
                      </span>
                    )
                  )}
                <span
                  className={
                    page < Math.ceil(filteredComplaints?.length / 8)
                      ? "hover:text-primaryColor-500 transition-all cursor-pointer text-gray-700"
                      : "opacity-0"
                  }
                  onClick={() => selectPagehandler(page + 1)}
                >
                  <BsCaretRightSquareFill />
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Page;
