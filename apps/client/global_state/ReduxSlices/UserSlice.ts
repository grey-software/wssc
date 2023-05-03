"use client";

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

export interface user {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  password?: string;
}

export const UserSlice = createSlice({
  name: "User",
  initialState: {
    UserInfo: null,
    pending: false,
    error: false,
    SignInData: {}, //  this is just for dummy testing
  },
  reducers: {
    //------ below are the SignIn actions ------
    SignInStart: (state) => {
      state.pending = true;
    },
    SignInSuccess: (state, action) => {
      state.pending = false;
      state.UserInfo = action.payload;
      localStorage.setItem("Profile", JSON.stringify({ ...action?.payload }));
      toast.success("Signed in successfully", {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 3000,
      });
    },
    SignInError: (state, action) => {
      state.error = true;
      state.pending = false;
      toast.error(action.payload, {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 3000,
      });
    },
    //-------- below are the SignUp actions ---------
    SignUpStart: (state) => {
      state.pending = true;
    },
    SignUpSuccess: (state, action) => {
      state.pending = false;
      state.UserInfo = action.payload;
    },
    SignUpError: (state, action) => {
      state.error = true;
      state.pending = false;
      toast.error(action.payload, {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 3000,
      });
    },

    // below is the LOGOUT action
    LogOutUser: (state, action) => {
      state.UserInfo = null;
      toast.success(action.payload, {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 3000,
      });
    },
  },
});

export const {
  SignInStart,
  SignInSuccess,
  SignInError,
  SignUpStart,
  SignUpSuccess,
  SignUpError,
  LogOutUser,
} = UserSlice.actions;
export default UserSlice.reducer;
