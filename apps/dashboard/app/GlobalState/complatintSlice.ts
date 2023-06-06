"use client";

// import { complaintTypes } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { ComplainForm } from "@/@types/complainForm.types";

interface complaintTypes {
  _id: string;
  phone: string;
  userName: string;
  userId: string;
  supervisorId?: string;
  complaintType: string;
  complaintAddress: string;
  complaintDes?: string;
  wsscStatement?: string;
  ImageUrl?: string;
  feedback?: any;
  VideoUrl?: string;
  status: any;
  createdAt: string;
}

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
      toast.success("Complaint Assigned Successfully", {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 3000,
      });
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
  GetSingleComplaintSuccess,
  APIRequestError,
} = complaintSlice.actions;
export default complaintSlice.reducer;
