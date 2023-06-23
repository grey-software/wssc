"use client";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

export interface user {
  _id?: string;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  password?: string;
  profile_image?: string;
}

export const UserSlice = createSlice({
  name: "User",
  initialState: {
    pending: false,
    error: false,
    SignInData: {},
    users: <user[]>(<unknown>[]),
  },
  reducers: {
    SignInStart: (state) => {
      state.pending = true;
    },
    SignInSuccess: (state, action) => {
      state.pending = false;
      state.SignInData = action.payload;
      localStorage.setItem(
        "AdminProfile",
        JSON.stringify({ ...action?.payload })
      );
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

    // SignOutUser action to logout admin 
    SignOutUser: (state) => {
      state.SignInData = "";
      state.pending = false;
    },

    ApiRequestStart: (state) => {
      state.pending = true;
    },
    GetUsersSuccess: (state, action) => {
      state.pending = false;
      state.users = action.payload;
    },
    ApiRequestError: (state, action) => {
      state.pending = false;
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
  SignInStart,
  SignInSuccess,
  SignInError,
  SignOutUser,
  ApiRequestStart,
  ApiRequestError,
  GetUsersSuccess,
} = UserSlice.actions;
export default UserSlice.reducer;
