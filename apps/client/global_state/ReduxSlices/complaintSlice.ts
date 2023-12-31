"use client";

import { complaintTypes } from "@/Types";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { FetchAllComplaints } from "../ApiCalls/complaintApiCalls";

const complaintSlice = createSlice({
  name: "complaint",
  initialState: {
    complaintsAll: <complaintTypes[]>(<unknown>[]),
    newComplaint: [],
    notifications: [
      {
        id: "WSSCM7937",
        type: "Solid Waste",
        status: "InProgress",
        time: "12:08 AM",
      },
      {
        id: "WSSCM76767",
        type: "Waste Water",
        status: "Completed",
        time: "11:23 AM",
      },
      {
        id: "WSSCM73456",
        type: "Water Supply",
        status: "Closed",
        time: "09:12 AM",
      },
    ],
    loading: false,
    error: false,
  },
  reducers: {
    //  Fetching all complaints data
    GetComplaintsStart: (state) => {
      state.loading = true;
    },
    GetComplaintsSuccess: (state, action) => {
      state.loading = false;
      state.complaintsAll = action.payload;
    },
    GetComplaintsError: (state, action) => {
      state.error = true;
      toast.error(action.payload, {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 3000,
      });
    },

    // creatng a complaint
    NewComplaintStart: (state) => {
      state.loading = true;
    },
    NewComplaintSuccess: (state, action) => {
      state.loading = false;
      state.newComplaint = action.payload;
      state.complaintsAll.push(action.payload);
    },
    NewComplaintError: (state, action) => {
      state.error = true;
      state.loading = false;
      toast.error(action.payload, {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 3000,
      });
    },

    // Citizen feedback
    FeedbackStart: (state) => {
      state.loading = true;
    },
    FeedbackSuccess: (state) => {
      state.loading = false;
    },
    FeedbackError: (state, action) => {
      state.error = true;
      state.loading = false;
      toast.error(action.payload, {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 3000,
      });
    },
  },
});

export const {
  GetComplaintsError,
  GetComplaintsStart,
  GetComplaintsSuccess,
  NewComplaintStart,
  NewComplaintSuccess,
  NewComplaintError,
  FeedbackStart,
  FeedbackSuccess,
  FeedbackError,
} = complaintSlice.actions;
export default complaintSlice.reducer;
