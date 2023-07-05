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
        OrganizationRating: {},
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
            state.OrganizationRating = action.payload.ratingAverages;
        },

        // Cleaned organization statistics
        ClearStatisticsRecord: (state) => {
            state.data = {},
            state.complaints = {},
            state.complaintsStatus = {},
            state.OrganizationRating = {}
        },
        
        ApiRequestError: (state) => {
            state.loading = false
            state.error = true
        },

    }
})

export const { ApiRequestStart, ApiRequestError, ApiRequestSuccess, ClearStatisticsRecord } = StatisticSlice.actions;

export default StatisticSlice.reducer;