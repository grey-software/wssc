"use client";

import { configureStore } from "@reduxjs/toolkit";

import UserReducer from "./UserSlice";
import ComplaintReducer from "./complaintSlice";

export const store = configureStore({
  reducer: {
    wsscm: UserReducer,
    complaints: ComplaintReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
