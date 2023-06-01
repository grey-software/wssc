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
    pending: false,
    error: false,
    SignInData: {},
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
    SignOutUser: (state) => {
      // state.SignInData = {};
    },
  },
});

export const { SignInStart, SignInSuccess, SignInError, SignOutUser } =
  UserSlice.actions;
export default UserSlice.reducer;
