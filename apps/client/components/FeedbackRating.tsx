"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";
import { MdStar, MdStarBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { CreateFeedback } from "@/global_state/ApiCalls/complaintApiCalls";

interface Props {
  feedback: boolean;
  setfeedback: React.Dispatch<React.SetStateAction<boolean>>;
  complaintId: any;
}
const FeedbackRating = ({ feedback, setfeedback, complaintId }: Props) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState<number>(-1);
  const [description, setDescription] = useState<string>("");

  const rates: number[] = [1, 2, 3, 4, 5];
  const RatingInWords: string[] = [
    "",
    "Very Bad",
    "Bad",
    "Good",
    "Very Good",
    "Excellent",
  ];
  //  const words: string[] = [
  //    "",
  //    "بہت برا",
  //    "برا",
  //    " اچھا",
  //    "بہت اچھا",
  //    "بہترین",
  //  ];

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  // handle feedback
  const handleFeedback = () => {
    if (rating > 0) {
      CreateFeedback(complaintId, { rating, description }, dispatch);
      toast.success("Thanks for your Feedback", {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 3000,
      });
      setfeedback(!feedback);
    } else {
      toast.error("Your rating help us Improve our service", {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 3000,
      });
    }
  };

  return (
    <>
      <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center w-screen h-[100vh] backdrop-blur-sm transition-all">
        <div className="flex flex-col gap-6 shadow-lg shadow-gray-300 bg-gray-50 px-5 mx-2 py-8 border border-gray-200 rounded-md overflow-hidden">
          {/* close feedback icon */}
          <div className="flex items-center justify-between text-lg font-semibold">
            <span className="text-primaryColor-500 ">Complaint Feedback</span>
            <h4
              onClick={() => setfeedback(!feedback)}
              className="flex justify-end  text-2xl text-green-600 font-bold cursor-pointer"
            >
              <IoCloseSharp />
            </h4>
          </div>

          <div className="service ">
            <h1>Are you satisfied with our service?</h1>
            <h5 className="">کیا آپ ہماری سروس سے مطمئن ہیں؟</h5>
          </div>

          <div>
            <h1 className="font-semibold">How would you rate us</h1>
            <div className="flex justify-between items-center ">
              <div className="flex star-rating">
                {rates.map((value) => (
                  <span
                    key={value}
                    onClick={() => handleRatingClick(value)}
                    className="cursor-pointer text-4xl"
                  >
                    <span className="text-yellow-500 focus:invisible outline-none">
                      {value <= rating ? <MdStar /> : <MdStarBorder />}
                    </span>
                  </span>
                ))}
              </div>
              <span className=" font-semibold text-yellow-500 ">
                {rating > -1 ? RatingInWords[rating] : ""}
              </span>
            </div>
          </div>
          {/* feedback input field */}
          <div className="feedback">
            <label htmlFor="feedbackInput">
              <span>Your words are appreciated</span> <br />
              <span className="">آپ کے الفاظ قابل تعریف ہیں۔</span>
            </label>

            <textarea
              name=""
              id="feedbackInput"
              cols={29}
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 rounded-lg border px-2 py-1  border-yellow-500 w-full outline-none"
            ></textarea>
          </div>
          {/* feedback submit button */}
          <button
            onClick={handleFeedback}
            className="w-full py-2 text-lg font-bold rounded-lg shadow-lg bg-green-600 text-white text-center"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default FeedbackRating;
