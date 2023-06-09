"use client";

// import { complaintTypes } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { complaintTypes } from "@/@types/complaintTypes.types";

const complaintSlice = createSlice({
  name: "complaint",
  initialState: {
    complaintsAll: <complaintTypes[]>(<unknown>[]),
    newComplaint: [],
    complaint: <complaintTypes>{},
    loading: false,
    error: false,
  },
  reducers: {
    //  Fetching all complaints data
    ApiRequestStart: (state) => {
      state.loading = true;
    },
    GetComplaintsSuccess: (state, action) => {
      state.loading = false;
      state.complaintsAll = action.payload;
    },
    AssignComplaintSuccess: (state) => {
      state.loading = false;
    },

    AddStatementSuccess: (state, action) => {
      state.loading = false;
      state.complaint.wsscStatement = action.payload;
    },
    GetSingleComplaintSuccess: (state, action) => {
      state.loading = false;
      state.complaint = action.payload;
    },
    APIRequestError: (state, action) => {
      state.error = true;
      toast.error(action.payload, {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 3000,
      });
    },
  },
});

export const {
  ApiRequestStart,
  GetComplaintsSuccess,
  AssignComplaintSuccess,
  AddStatementSuccess,
  GetSingleComplaintSuccess,
  APIRequestError,
} = complaintSlice.actions;
export default complaintSlice.reducer;
