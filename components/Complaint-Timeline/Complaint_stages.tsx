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

function Complaint_stages({}: Props) {
  const date = "Mar 08 2023";
  return (
    <>
      <VerticalTimeline
        layout="1-column-left"
        lineColor="rgba(218, 225, 181, 0.885)"
      >
        {/* this is for initiated complaint stage */}

        <VerticalTimelineElement
          className=""
          contentStyle={{
            background: "#94d3d8",
            color: "black",
            height: "8rem",
          }}
          date="2023 - Feb"
          iconStyle={{
            background: "white",
            color: "black",
            fontSize: "9px",
            padding: "9px 0px 0px 6px",
            fontWeight: "bold",
          }}
          contentArrowStyle={{ borderRight: "10px solid #94d3d8" }}
          // icon={<IoIosGitCompare />}
          icon={date}
        >
          <div className="parent flex justify-around">
            <h3>Initiated</h3>
            <h3> 10:12 am</h3>
          </div>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className=""
          contentStyle={{
            background: "#94d3d8",
            color: "black",
            height: "8rem",
          }}
          date="2023 - Feb"
          iconStyle={{
            background: "white",
            color: "black",
            fontSize: "9px",
            padding: "9px 0px 0px 6px",

            fontWeight: "bold",
          }}
          contentArrowStyle={{ borderRight: "10px solid #94d3d8" }}
          // icon={<IoIosGitCompare />}
          icon={date}
        >
          <div className="parent flex justify-around">
            <h3>Assigned</h3>
            <h3> 10:30 am</h3>
          </div>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className=""
          contentStyle={{
            background: "#94d3d8",
            color: "black",
            height: "8rem",
          }}
          // date="2023 - Feb"
          iconStyle={{
            background: "white",
            color: "black",
            fontSize: "9px",
            padding: "9px 0px 0px 6px",
            fontWeight: "bold",
          }}
          contentArrowStyle={{ borderRight: "10px solid #94d3d8" }}
          // icon={<IoIosGitCompare />}
          icon={date}
        >
          <div className="parent flex justify-around">
            <h3>Resolved</h3>
            <h3> 11:50 am</h3>
          </div>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </>
  );
}

export default Complaint_stages;
