"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface user {
  name?: string;
  phone: string;
  email?: string;
  address?: string;
  password?: string;
}

const initialState: user = {
  phone: "",
};

export const UserSlice = createSlice({
  name: "wssc",
  initialState,
  reducers: {
    ChangeName: (state, action) => {
      state.phone = action.payload;
    },
  },
});

export const { ChangeName } = UserSlice.actions;
export default UserSlice.reducer;
