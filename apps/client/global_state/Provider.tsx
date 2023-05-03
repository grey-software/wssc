'use client';
import { Provider } from "react-redux";
import { store } from "./store";
import { PersistGate } from "redux-persist/es/integration/react";
import { persistStore } from "redux-persist";

export function Providers({ children }:{children: React.ReactNode}) {
    let persistor = persistStore(store);
    return <Provider store={store}>
        <PersistGate persistor={persistor}>
        {children}
     </PersistGate>
    </Provider>;  
}