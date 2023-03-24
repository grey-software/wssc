import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
    feedback: boolean,
    setfeedback: React.Dispatch<React.SetStateAction<boolean>>
}
const FeedbackRating = ({feedback, setfeedback}:Props) => {
  const [rating, setRating] = useState<number>(0);

  const rates: number[] = [1, 2, 3, 4, 5];

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  // ToastifyNotifiction method definition
  const ToastifyNotifiction = () => {
      toast.success("Thanks for your Feedback", {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 3000
      });
  }

  return (
    <>
      <div className="fixed top-0 flex justify-center items-center w-full h-[100vh] backdrop-blur-sm transition-all">
        <div className="flex flex-col gap-8 shadow-lg shadow-gray-300 bg-gray-50 px-5 mr-6 py-5 border border-gray-200 rounded-md w-[90%] overflow-hidden">
          <h1>Are you satisfied with our service?</h1>
          <div>
            <h1 className="font-semibold">How would you rate us</h1>
            {rates.map((value) => (
              <span
                key={value}
                onClick={() => handleRatingClick(value)}
                className="cursor-pointer text-4xl"
              >
                <span className="text-yellow-500 ">
                  {value <= rating ? "★" : "☆"}
                </span>
              </span>
            ))}
          </div>
          {/* feedback input field */}
          <div className="feedback">
            <label htmlFor="feedbackInput"> Your words are appreciated</label>

            <textarea
              name=""
              id="feedbackInput"
              cols={29}
              rows={5}
              className="mt-1 rounded-lg border border-green-500 px-2 py-1 focus:border-green-500 w-full"
            ></textarea>
          </div>
          {/* feedback submit button */}
          <button
            onClick={() => {
              setfeedback(!feedback);
              ToastifyNotifiction();
            }}
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
