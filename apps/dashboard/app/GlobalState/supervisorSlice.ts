"use Client";

import { supervisorTypes } from "@/@types/supervisorTypes";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const supervisorSlice = createSlice({
  name: "supervisor",
  initialState: {
    supervisorsAll: <supervisorTypes[]>(<unknown>[]),
    newSupervisor: [],
    supervisor: {},
    loading: false,
    error: false,
  },
  reducers: {
    ApiRequestStart: (state) => {
      state.loading = true;
    },
    GetSupervisorsSuccess: (state, action) => {
      state.loading = false;
      state.supervisorsAll = action.payload;
    },
    GetSingleSupervisorSuccess: (state, action) => {
      state.loading = false;
      state.supervisor = action.payload;
    },
    ApiRequestError: (state, action) => {
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
  GetSupervisorsSuccess,
  ApiRequestError,
  GetSingleSupervisorSuccess,
} = supervisorSlice.actions;
export default supervisorSlice.reducer;
