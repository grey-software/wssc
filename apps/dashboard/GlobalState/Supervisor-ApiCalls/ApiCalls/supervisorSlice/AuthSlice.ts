"use client";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";


export const Suprvisor_Slice = createSlice({
    name: "Supervisor",
    initialState: {
        pending: false,
        error: false,
        SupervisorSiginData: {},
        WSSC: {},
        supervisorToken: "",
    },
    reducers: {
        // below is the generic action which calls for every api endpoints hit
        ApiFetchingStart: (state) => {
            state.pending = true;
        },
// below action indicate the supervisor successfully signedIn
        SignInSuccess: (state, action) => {
            state.pending = false;
            state.SupervisorSiginData = action.payload.supervisor;
            state.WSSC = action.payload.WSSC;
            state.supervisorToken = action.payload.supervisorToken;
            toast.success("Signed in successfully", {
                position: "top-center",
                style: { width: "auto", height: "auto" },
                duration: 3000,
            });
        },

// -------------- Update Supervisor profile ---------------
        UpdateProfile: (state, action) => {
            state.pending = false;
            state.SupervisorSiginData = action.payload;
        },

// supervisor logout 
        SupervisorLogout: (state, action) => {
            state.pending = false;
            state.SupervisorSiginData = {};
            state.supervisorToken = "";
                toast.success("Logout Successfully", {
                    position: "top-center",
                    style: { width: "auto", height: "auto" },
                    duration: 3000,
                });
        },

// below is the generic action which calls when API endpoint failed
        ApiFetchingError: (state, action) => {
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
    ApiFetchingStart,
    SignInSuccess,
    ApiFetchingError,
    SupervisorLogout,
    UpdateProfile
} = Suprvisor_Slice.actions;
export default Suprvisor_Slice.reducer;
