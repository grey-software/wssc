import React from "react";
import Rating from "react-rating";
import { AiFillStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

const rates = [1, 2, 3, 4, 5];

const Ratings = ({ totalRating }: any) => {
  return (
    <div className="flex items-center gap-1 text-2xl">
      {rates.map((value, index) => (
        <>
          {value <= totalRating ? (
            <AiFillStar key={index} className="text-initiatedColor" />
          ) : (
            <>
              {value > totalRating && totalRating > value - 1 ? (
                <BsStarHalf
                  key={index}
                  className="text-xl text-initiatedColor"
                />
              ) : (
                <AiFillStar key={index} className="text-gray-300" />
              )}
            </>
          )}
        </>
      ))}
    </div>
  );
};

export default Ratings;
