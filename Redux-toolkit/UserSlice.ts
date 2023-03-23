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
    SignInData: {},
    SignUpData: {},
  },
  reducers: {
    SignInUser: (state, action) => {
      state.SignInData = action.payload;
      toast.success("Signed In Successfuly", {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 3000,
      });
    },
    SignUpUser: (state, action) => {
      state.SignInData = action.payload;
      toast.success("Signed Up Successfuly", {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 3000,
      });
    },
    LogOutUser: (state) => {
      state.SignInData = {};
      toast.success("Loged Out", {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 3000,
      });
    },
  },
});

export const { SignInUser, SignUpUser, LogOutUser } = UserSlice.actions;
export default UserSlice.reducer;
