"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { setActiveTab } from "@/app/GlobalState/TabSlice";
import { FetchAllComplaints } from "../GlobalState/ApiCalls/complaintApiCalls";
import { RootState } from "../GlobalState/store";
import { ColorRing, RotatingLines } from "react-loader-spinner";
import { MdClose } from "react-icons/md";
import Rating from "react-rating";

function Feedback() {
  const dispatch = useDispatch();
  const navigate = useRouter();
  let one = 0;
  let two = 0;
  let three = 0;
  let four = 0;
  let five = 0;
  let totalFeedbacks = 0;

  const { loading, error }: any = useSelector(
    (state: RootState) => state.Complaint
  );
  const [success, setSuccess] = useState(error);
  useEffect(() => {
    FetchAllComplaints(dispatch);
  }, []);

  const complaints = useSelector(
    (state: RootState) => state.Complaint.complaintsAll
  );
  const rates: number[] = [1, 2, 3, 4, 5];
  const RatingInWords: string[] = [
    "",
    "Very Bad",
    "Bad",
    "Good",
    "Very Good",
    "Excellent",
  ];

  complaints &&
    complaints.forEach((complaint, index) => {
      console.log(complaint?.feedback?.rating);
      if (complaint.feedback) {
        totalFeedbacks += 1;
      }

      if (complaint?.feedback?.rating == 1) one += 1;
      if (complaint?.feedback?.rating == 2) two += 1;
      if (complaint?.feedback?.rating == 3) three += 1;
      if (complaint?.feedback?.rating == 4) four += 1;
      if (complaint?.feedback?.rating == 5) five += 1;
    });

  let totalRating =
    (one * 1 + two * 2 + three * 3 + four * 4 + five * 5) / totalFeedbacks;

  console.log(totalFeedbacks);
  console.log(totalRating);

  return (
    <div className="container flex flex-col gap-6">
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
            <span>Feedbacks</span>
          </span>
        </div>
      </div>

      {success ||
        (error && (
          <div className="flex items-center justify-between p-2 text-[#D8000C] bg-[#FFBABA]">
            <span>Unable to fetch Data, Please refresh the page 🙂</span>
            <span
              onClick={() => setSuccess(false)}
              className="text-2xl cursor-pointer"
            >
              <MdClose />
            </span>
          </div>
        ))}

      <div
        className={`${
          loading ? "flex items-center justify-center h-[70vh] w-full" : ""
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
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-bold text-primaryColor-500">
                {totalRating}
              </span>
              <span className="text-2xl">
                <Rating
                  initialRating={totalRating}
                  readonly
                  fullSymbol={<AiFillStar className="text-initiatedColor" />}
                  emptySymbol={<AiFillStar className="text-gray-300" />}
                />
              </span>
              <span>&#40;{totalFeedbacks} feedbacks&#41; </span>
              <span>{complaints.length} Complaints</span>
            </div>
            <div className="grid grid-cols-2 items-start justify-between gap-4 border-2 w-72 border-gray-200 rounded-md  p-4 mb-6">
              <div>
                {rates.map((value, index) => (
                  <div
                    className="flex items-center text-2xl mt-1 gap-1"
                    key={index}
                  >
                    {rates.map((value, id) => (
                      <>
                        {index >= id ? (
                          <span className="text-initiatedColor">
                            <AiFillStar />
                          </span>
                        ) : (
                          <span className="text-gray-300">
                            <AiFillStar />
                          </span>
                        )}
                      </>
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-[5px] text-center">
                <span>&#40;{one}&#41;</span>
                <span>&#40;{two}&#41;</span>
                <span>&#40;{three}&#41;</span>
                <span>&#40;{four}&#41;</span>
                <span>&#40;{five}&#41;</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {complaints.map((complaint, index) => (
                <>
                  {complaint.feedback && (
                    <div className="p-4 shadow-md flex flex-col gap-2 border-[1px] border-gray-100">
                      <h1 className="text-md font-bold">Feedback</h1>
                      <div className="flex items-center gap-1 text-2xl">
                        {rates.map((value, index) => (
                          <div key={index}>
                            {value <= complaint?.feedback.rating ? (
                              <span className="text-initiatedColor">
                                <AiFillStar />
                              </span>
                            ) : (
                              <span className="text-gray-300">
                                <AiFillStar />
                              </span>
                            )}
                          </div>
                        ))}
                        {RatingInWords.map((w, index) => (
                          <>
                            {index == complaint?.feedback.rating && (
                              <span className="text-sm text-initiatedColor font-bold ml-2">
                                {w}
                              </span>
                            )}
                          </>
                        ))}
                      </div>
                      <p className="text-sm">
                        {complaint?.feedback.description}
                      </p>
                    </div>
                  )}
                </>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Feedback;
