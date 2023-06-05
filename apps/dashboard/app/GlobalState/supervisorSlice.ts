"use Client";

import { supervisorTypes } from "@/@types/supervisorTypes";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const supervisorSlice = createSlice({
  name: "supervisor",
  initialState: {
    supervisorsAll: <supervisorTypes[]>(<unknown>[]),
    newSupervisor: [],
    loading: false,
    error: false,
  },
  reducers: {
    GetSupervisorsStart: (state) => {
      state.loading = true;
    },
    GetSupervisorSuccess: (state, action) => {
      state.loading = false;
      state.supervisorsAll = action.payload;
    },
    GetSupervisorsError: (state, action) => {
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
  GetSupervisorsStart,
  GetSupervisorSuccess,
  GetSupervisorsError,
} = supervisorSlice.actions;
export default supervisorSlice.reducer;
