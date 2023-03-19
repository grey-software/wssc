'use client';

import { configureStore } from "@reduxjs/toolkit";

import UserReducer from "./UserSlice";

export const store = configureStore({
    reducer: {
        wsscm : UserReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;