"use client";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";


export const SupervisorComplaintsSlice = createSlice({
    name: "SupervisorComplaints",
    initialState: {
        pending: false,
        error: false,
        SupervisorComplaints: [],
    },
    reducers: {
        // below is the generic action which calls for every api endpoints when making a request
        ApiRequestStart: (state) => {
            state.pending = true;
        },
        // below action indicate the supervisor successfully signedIn
        SupervisorAllComplaintsSuccess: (state, action) => {
            state.pending = false;
            state.SupervisorComplaints = action.payload;
        },

        // below is the generic action which calls when API endpoint request failed
        ApiRequestError: (state, action) => {
            state.error = true;
            state.pending = false;
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
    SupervisorAllComplaintsSuccess,
    ApiRequestError,

} = SupervisorComplaintsSlice.actions;
export default SupervisorComplaintsSlice.reducer;
