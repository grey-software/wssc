"use client";
import { createSlice } from "@reduxjs/toolkit";

const TabSlice = createSlice({
  name: "Tab",
  initialState: {
    index: 0,
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.index = action.payload;
    },
  },
});

export const { setActiveTab } = TabSlice.actions;
export default TabSlice.reducer;
