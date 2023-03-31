"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export interface complaint {
//   complaintId: string;
//   userPhone: string;
//   type: string;
//   address: string;
//   description: string;
//   picture: string;
//   video: string;
//   status: string;
//   submitedOn: string;
// }

export const getComplaints = createAsyncThunk("/complaints", async () => {
  // get all complaints form api
});

const complaintSlice = createSlice({
  name: "complaint",
  initialState: {
    complaintsAll: [
      {
        type: "waste water",
        status: "Initiated",
        complaintID: "WSSCM7654",
        submitedOn: "12-09-2023",
        address: "mardan",
      },
      {
        type: "Solid waste",
        status: "InProgress",
        complaintID: "WSSCM7937",
        submitedOn: "11-03-2023",
        address: "College chowk mardan",
      },
      {
        type: "water supply",
        status: "Completed",
        complaintID: "WSSCM8382",
        submitedOn: "07-01-2023",
        address: "near UET mardan",
      },
      {
        type: "Solid Waste",
        status: "Closed",
        complaintID: "WSSCM8382",
        submitedOn: "07-01-2023",
        address: "near HBL bank",
      },
    ],
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
    Loading: false,
    error: false,
  },
  reducers: {
    // get complaits reducer
    // extraReducers: {
    //   [getComplaints.pending]: (state) => {
    //   },
    //   [getComplaints.fulfilled]: (state, action) => {
    //   },
    //   [getComplaints.rejected]: (state) => {
    //   },
    // },
    FileComplaint: (state, action) => {
      //     // File complaint
      state.newComplaint = action.payload;
      console.log(state.newComplaint);
    },
  },
});

export const { FileComplaint } = complaintSlice.actions;
export default complaintSlice.reducer;
