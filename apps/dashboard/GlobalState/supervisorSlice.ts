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
    // Generic API Start action called for all apis
    ApiRequestStart: (state) => {
      state.loading = true;
    },

    // REGISTER NEW SUPERVISOR
    RegisterNewSupervisor: (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.supervisorsAll.unshift(action.payload);
    },

    // DELETE SUPERVISOR
    DeleteSupervisorSuccess: (state) => {
      state.loading = false;
      state.supervisorsAll.shift();
      toast.success("Supervisor Removed successfully", {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 3000,
      });
    },

    // below action retrieve the all registered supervisors data
    GetSupervisorsSuccess: (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.supervisorsAll = action.payload;
    },
    // below action retrieve the single supervisor data
    GetSingleSupervisorSuccess: (state, action) => {
      state.loading = false;
      state.supervisor = action.payload;
    },

    // Generic API Failled called notif toast for all APIs
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
  RegisterNewSupervisor,
  DeleteSupervisorSuccess,
} = supervisorSlice.actions;
export default supervisorSlice.reducer;
