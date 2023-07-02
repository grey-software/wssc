"use client";
import { createSlice } from "@reduxjs/toolkit"

export const StatisticSlice = createSlice({
    name: "statistics",
    initialState: {
        loading: false,
        error: false,
        data: {},
        complaints: {},
        complaintsStatus: {},
    },
    reducers: {
        ApiRequestStart: (state) => {
            state.loading = true
     },
     
        // fetching all statistics record
        ApiRequestSuccess: (state, action) => {
            state.loading = false;
            state.error = false;
            state.data = action.payload.record;
            state.complaints = action.payload.complaints;
            state.complaintsStatus = action.payload.complaintsStatus;
        },
        
        ApiRequestError: (state) => {
            state.loading = false
            state.error = true
        },

    }
})

export const { ApiRequestStart, ApiRequestError, ApiRequestSuccess } = StatisticSlice.actions;

export default StatisticSlice.reducer;