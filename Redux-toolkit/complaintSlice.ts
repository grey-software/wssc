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
    complaints: [],
    Loading: false,
    error: false,
  },
  reducers: {
    // get complaits reducer
    // extraReducers: {
    //   [getComplaints.pending]: (state) => {
    //     // get all complaints
    //   },
    //   [getComplaints.fulfilled]: (state, action) => {
    //     // get all complaints
    //   },
    //   [getComplaints.rejected]: (state) => {
    //     // get all complaints
    //   },
    // },
    FileComplaint: (state, action) => {
      //     // File complaint
      state.complaints = action.payload;
      console.log(state.complaints);
    },
  },
});

export const { FileComplaint } = complaintSlice.actions;
export default complaintSlice.reducer;
