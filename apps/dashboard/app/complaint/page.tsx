"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../GlobalState/store";
import { FetchAllComplaints } from "../GlobalState/ApiCalls/complaintApiCalls";

const page = () => {
  // const compliants = useSelector(
  //   (state: RootState) => state.Complaint.complaintsAll
  // );

  return <div>All complaints</div>;
};

export default page;
