"use client";
import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { IoIosGitCompare } from "react-icons/io";
import { FaStarOfLife } from "react-icons/fa";

type Props = {};

function Complaint_stages({ }: Props) {
  
  const Feedback = () => {
    alert("This feature is in progress!")
  }
  const date = "Mar 08 2023";
  return (
    <>
      <VerticalTimeline layout="1-column-left" lineColor="#aaa">
        {/* this is for initiated complaint stage */}

        <VerticalTimelineElement
          className="relative "
          contentStyle={{
            background: "#fff",
            color: "black",
            height: "8rem",
            border: "1px solid #eee",
            borderRadius: "8px",
          }}
          iconStyle={{
            background: "white",
            color: "black",
            fontSize: "9px",
            padding: "9px 0px 0px 6px",
            fontWeight: "bold",
          }}
          contentArrowStyle={{ borderRight: "10px solid #FBB64F" }}
          // icon={<IoIosGitCompare />}
          icon={date}
        >
          <div className="flex flex-col">
            <div className="parent flex justify-between text-lg font-bold">
              <h3 className="text-initiatedColor">Initiated</h3>
              <h3 className="text-sm text-gray-400">10:12 am</h3>
            </div>
            <div className="flex flex-col mt-6">
              <span className="text-gray-500">Comments:</span>
              <span>Your complaint is initiated</span>
            </div>
          </div>

          <div className="h-[103%] w-1 bg-initiatedColor top-0 right-0 rounded-tr-md rounded-br-md absolute"></div>
        </VerticalTimelineElement>

        {/* <VerticalTimelineElement
          className="relative "
          contentStyle={{
            background: "#fff",
            color: "black",
            height: "8rem",
            border: "1px solid #eee",
            borderRadius: "8px",
          }}
          iconStyle={{
            background: "white",
            color: "black",
            fontSize: "9px",
            padding: "9px 0px 0px 6px",
            fontWeight: "bold",
          }}
          contentArrowStyle={{ borderRight: "10px solid #00A6FF" }}
          // icon={<IoIosGitCompare />}
          icon={date}
        >
          <div className="flex flex-col">
            <div className="parent flex justify-between text-lg font-bold">
              <h3 className="text-inprogessColor">InProgress</h3>
              <h3 className="text-sm text-gray-400">11:00 am</h3>
            </div>
            <div className="flex flex-col mt-6">
              <span className="text-gray-500">Comments:</span>
              <span>Forwarded to Supervisor</span>
            </div>
          </div>

          <div className="h-[103%] w-1 bg-inprogessColor top-0 right-0 rounded-tr-md rounded-br-md absolute"></div>
        </VerticalTimelineElement> */}

        {/* <VerticalTimelineElement
          className="relative "
          contentStyle={{
            background: "#fff",
            color: "black",
            height: "8rem",
            border: "1px solid #eee",
            borderRadius: "8px",
          }}
          iconStyle={{
            background: "white",
            color: "black",
            fontSize: "9px",
            padding: "9px 0px 0px 6px",
            fontWeight: "bold",
          }}
          contentArrowStyle={{ borderRight: "10px solid #6AD616" }}
          // icon={<IoIosGitCompare />}
          icon={date}
        >
          <div className="flex flex-col">
            <div className="parent flex justify-between text-lg font-bold">
              <h3 className="text-completedColor">Completed</h3>
              <h3 className="text-sm text-gray-400">04:00 pm</h3>
            </div>
            <div className="flex flex-col mt-6">
              <span className="text-gray-500">Comments:</span>
              <span>Complaint Resolved</span>
            </div>
          </div>

          <div className="h-[103%] w-1 bg-completedColor top-0 right-0 rounded-tr-md rounded-br-md absolute"></div>
        </VerticalTimelineElement> */}

        {/* <VerticalTimelineElement
          className="relative "
          contentStyle={{
            background: "#fff",
            color: "black",
            height: "8rem",
            border: "1px solid #eee",
            borderRadius: "8px",
          }}
          iconStyle={{
            background: "white",
            color: "black",
            fontSize: "9px",
            padding: "9px 0px 0px 6px",
            fontWeight: "bold",
          }}
          contentArrowStyle={{ borderRight: "10px solid #1A5980" }}
          // icon={<IoIosGitCompare />}
          icon={date}
        >
          <div className="flex flex-col">
            <div className="parent flex justify-between text-lg font-bold">
              <h3 className="text-[#1A5980]">Feedback</h3>
              <h3 className="text-sm text-gray-400">04:00 pm</h3>
            </div>
            <div className="flex flex-col mt-4">
              <span className="text-gray-500 mb-1">
                Are you satisfied with:
              </span>
              <button onClick={Feedback} className="w-1/2 py-1 px-2 bg-[#1A5980] text-white text-sm rounded-lg shadow-md">
                Feedback
              </button>
            </div>
          </div>

          <div className="h-[103%] w-1 bg-[#1A5980] top-0 right-0 rounded-tr-md rounded-br-md absolute"></div>
        </VerticalTimelineElement> */}

        {/* <VerticalTimelineElement
          className="relative "
          contentStyle={{
            background: "#fff",
            color: "black",
            height: "8rem",
            border: "1px solid #eee",
            borderRadius: "8px",
          }}
          iconStyle={{
            background: "white",
            color: "black",
            fontSize: "9px",
            padding: "9px 0px 0px 6px",
            fontWeight: "bold",
          }}
          contentArrowStyle={{ borderRight: "10px solid #D43434" }}
          // icon={<IoIosGitCompare />}
          icon={date}
        >
          <div className="flex flex-col">
            <div className="parent flex justify-between text-lg font-bold">
              <h3 className="text-[#D43434]">Closed</h3>
              <h3 className="text-sm text-gray-400">04:02 pm</h3>
            </div>
            <div className="flex flex-col mt-6">
              <span className="text-gray-500">Comments:</span>
              <span>Complaint Closed</span>
            </div>
          </div>

          <div className="h-[103%] w-1 bg-[#D43434] top-0 right-0 rounded-tr-md rounded-br-md absolute"></div>
        </VerticalTimelineElement> */}
      </VerticalTimeline>
    </>
  );
}

export default Complaint_stages;
