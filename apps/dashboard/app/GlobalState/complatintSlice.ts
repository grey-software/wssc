"use client";

// import { complaintTypes } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { ComplainForm } from "@/@types/complainForm.types";

interface complaintTypes {
  _id: string;
  phone: string;
  complaintType: string;
  complaintAddress: string;
  complaintDes: string;
  picture: string;
  video: string;
  status: any;
  createdAt: string;
}

const complaintSlice = createSlice({
  name: "complaint",
  initialState: {
    complaintsAll: <complaintTypes[]>(<unknown>[]),
    newComplaint: [],
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
      console.log(action.payload);
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
  },
});

export const { GetComplaintsError, GetComplaintsStart, GetComplaintsSuccess } =
  complaintSlice.actions;
export default complaintSlice.reducer;
