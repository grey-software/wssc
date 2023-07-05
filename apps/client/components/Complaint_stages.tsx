"use client";
import React, { useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import FeedbackRating from "@/components/FeedbackRating";
import Ratings from "./Rating";
type Props = {
  stages: any;
  complaintId: any;
  userfeedback: any;
};

function Complaint_stages({ stages, complaintId, userfeedback }: Props) {
  const [feedback, setfeedback] = useState(false);
  console.log(stages);
  const rates: number[] = [1, 2, 3, 4, 5];

  // current time for feedback
  const date = new Date();

  // JSX section
  return (
    <>
      <VerticalTimeline layout="1-column-left" lineColor="#aaa">
        {stages &&
          stages.map((stage: any, index: number) => (
            <>
              {/* show feedback option */}
              {stage.state === "Completed" ? (
                <>
                  <VerticalTimelineElement
                    key={index}
                    className="relative"
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
                    contentArrowStyle={{
                      borderRight: `10px solid ${
                        stage.state === "Initiated" ? "rgb(251 182 79)" : ""
                      }  ${
                        stage.state === "InProgress" ? "rgb(0 166 255)" : ""
                      } ${
                        stage.state === "Completed" ? "rgb(106 214 22)" : ""
                      } ${stage.state === "Closed" ? "rgb(212 52 52)" : ""}`,
                    }}
                    icon={stage.updatedAt.split("T")[0]}
                  >
                    <div className="flex flex-col">
                      <div className="parent flex justify-between text-lg font-bold">
                        <h3
                          className={`${
                            stage.state === "Initiated"
                              ? "text-initiatedColor"
                              : ""
                          }  ${
                            stage.state === "InProgress"
                              ? "text-inprogessColor"
                              : ""
                          } ${
                            stage.state === "Completed"
                              ? "text-completedColor"
                              : ""
                          } ${
                            stage.state === "Closed" ? "text-closedColor" : ""
                          }`}
                        >
                          {stage.state}
                        </h3>
                        <h3 className="text-sm text-gray-400">
                          {stage.updatedAt.split("T")[1].split(".")[0]}
                        </h3>
                      </div>
                      <div className="flex flex-col mt-6">
                        <span className="text-gray-500">Remarks: </span>
                        <span>
                          Your complaint is 
                          {stage.state == "Completed"
                            ? "Resolved"
                            : stage.state}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`h-[103%] w-1 top-0 right-0 rounded-tr-md rounded-br-md absolute  ${
                        stage.state === "Initiated" ? "bg-initiatedColor" : ""
                      }  ${
                        stage.state === "InProgress" ? "bg-inprogessColor" : ""
                      } ${
                        stage.state === "Completed" ? "bg-completedColor" : ""
                      } ${stage.state === "Closed" ? "bg-closedColor" : ""}`}
                    ></div>
                  </VerticalTimelineElement>
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
                    contentArrowStyle={{ borderRight: "10px solid #1A5980" }}
                    icon={stage.updatedAt.split("T")[0]}
                  >
                    <div className="flex flex-col">
                      <div className="parent flex justify-between text-lg font-bold">
                        <h3 className="text-[#1A5980]">Feedback</h3>
                        <h3 className="text-sm text-gray-400">
                          {`${date.getHours()}:${date.getMinutes()}`}
                        </h3>
                      </div>
                      <div className="flex flex-col mt-4">
                        {stages[stages.length - 1].state == "Closed" ? (
                          <span className="text-gray-500 mb-1">
                            Your Feedback:
                          </span>
                        ) : (
                          <span className="text-gray-500 mb-1">
                            Are you satisfied with our service:
                          </span>
                        )}
                        {stages[stages.length - 1].state == "Closed" ? (
                          <>
                            <Ratings totalRating={userfeedback.rating} />
                          </>
                        ) : (
                          <button
                            onClick={() => setfeedback(!feedback)}
                            className="w-1/2 py-1 px-2 bg-[#1A5980] text-white text-sm rounded-lg shadow-md"
                          >
                            Feedback
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="h-[103%] w-1 bg-[#1A5980] top-0 right-0 rounded-tr-md rounded-br-md absolute"></div>
                  </VerticalTimelineElement>
                </>
              ) : (
                <VerticalTimelineElement
                  key={index}
                  className="relative"
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
                  contentArrowStyle={{
                    borderRight: `10px solid ${
                      stage.state === "Initiated" ? "rgb(251 182 79)" : ""
                    }  ${
                      stage.state === "InProgress" ? "rgb(0 166 255)" : ""
                    } ${stage.state === "Completed" ? "rgb(106 214 22)" : ""} ${
                      stage.state === "Closed" ? "rgb(212 52 52)" : ""
                    }`,
                  }}
                  icon={stage.updatedAt.split("T")[0]}
                >
                  <div className="flex flex-col">
                    <div className="parent flex justify-between text-lg font-bold">
                      <h3
                        className={`${
                          stage.state === "Initiated"
                            ? "text-initiatedColor"
                            : ""
                        }  ${
                          stage.state === "InProgress"
                            ? "text-inprogessColor"
                            : ""
                        } ${
                          stage.state === "Completed"
                            ? "text-completedColor"
                            : ""
                        } ${
                          stage.state === "Closed" ? "text-closedColor" : ""
                        }`}
                      >
                        {stage.state}
                      </h3>
                      <h3 className="text-sm text-gray-400">
                        {stage.updatedAt.split("T")[1].split(".")[0]}
                      </h3>
                    </div>
                    <div className="flex flex-col mt-6">
                      <span className="text-gray-500">Remarks:</span>
                      <span>
                        Your complaint is{" "}
                        {stage.state == "Completed" ? "Resolved" : stage.state}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`h-[103%] w-1 top-0 right-0 rounded-tr-md rounded-br-md absolute  ${
                      stage.state === "Initiated" ? "bg-initiatedColor" : ""
                    }  ${
                      stage.state === "InProgress" ? "bg-inprogessColor" : ""
                    } ${
                      stage.state === "Completed" ? "bg-completedColor" : ""
                    } ${stage.state === "Closed" ? "bg-closedColor" : ""}`}
                  ></div>
                </VerticalTimelineElement>
              )}
            </>
          ))}
      </VerticalTimeline>
      {/* To open feedback window popup*/}
      {feedback ? (
        <FeedbackRating
          feedback={feedback}
          setfeedback={setfeedback}
          complaintId={complaintId}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Complaint_stages;
