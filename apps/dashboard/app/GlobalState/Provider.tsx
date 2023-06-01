"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import React from "react";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export function Providers({ children }: { children: React.ReactNode }) {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
}
