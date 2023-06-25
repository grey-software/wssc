"use client";

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

export interface user {
  name?: string;
  phone?: string;
  email?: string;
  wssc_code?: string;
  address?: string;
  password?: string;
}

export const UserSlice = createSlice({
  name: "User",
  initialState: {
    UserInfo: null,
    token: "",
    WSSC: null,
    pending: false,
    error: false,
  },
  reducers: {
    //------ below are the SignIn actions ------
    SignInStart: (state) => {
      state.pending = true;
    },
    SignInSuccess: (state, action) => {
      state.pending = false;
      state.UserInfo = action.payload.user;
      state.WSSC = action.payload.WSSC;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
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
    SignUpSuccess: (state) => {
      state.pending = false;
      toast.success("Signed in successfully", {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 3000,
      });
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

    // Update UserInfo section
    UpdateUserInfoStart: (state) => {
      state.pending = true;
    },
    UpdateUserInfoSuccess: (state, action) => {
      state.pending = false;
      state.UserInfo = action.payload;
      toast.success("Profile updated Successfully", {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 3000,
      });
    },
    UpdateUserInfoError: (state, action) => {
      state.error = true;
      state.pending = false;
      toast.error(action.payload, {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 3000,
      });
    },

    // changing password actions
    ChangingPasswordStart: (state) => {
      state.pending = true;
    },
    ChangingPasswordSuccess: (state) => {
      state.pending = false;
    },
    ChangingPasswordError: (state) => {
      state.error = true;
      state.pending = false;
    },

    // below is the LOGOUT action
    LogOutUser: (state, action) => {
      state.UserInfo = null;
      state.WSSC = null;
      localStorage.removeItem("token");
      toast.success(action.payload, {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 3000,
      });
    },

    // Below are the User account delete actions
    DeleteAccountStart: (state) => {
      state.pending = true;
    },
    DeleteAccountSuccess: (state) => {
      state.pending = false;
      state.UserInfo = null;
    },
    DeleteAccountError: (state, action) => {
      state.error = true;
      state.pending = false;
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
  UpdateUserInfoStart,
  UpdateUserInfoSuccess,
  UpdateUserInfoError,
  ChangingPasswordStart,
  ChangingPasswordSuccess,
  ChangingPasswordError,
  DeleteAccountStart,
  DeleteAccountSuccess,
  DeleteAccountError,
} = UserSlice.actions;
export default UserSlice.reducer;
