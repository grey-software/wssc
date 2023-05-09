"use client";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

// export interface user {
//   name?: string;
//   phone?: string;
//   email?: string;
//   address?: string;
//   password?: string;
// }

export const UserSlice = createSlice({
  name: "User",
  initialState: {
    pending: false,
    error: false,
    SignInData: {
      username: "ihtisham",
    },
  },
  reducers: {
    SignInUser: (state, action) => {
      state.SignInData = action.payload;
    },
    SignOutUser: (state) => {
      // state.SignInData = {};
    },
  },
});

export const { SignInUser, SignOutUser } = UserSlice.actions;
export default UserSlice.reducer;
