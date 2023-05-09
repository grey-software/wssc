"use client";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import UserReducer from "./UserSlice";
import TabReducer from "./TabSlice";

export const store = configureStore({
  reducer: {
    User: UserReducer,
    Tab: TabReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
