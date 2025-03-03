import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice'
import supervisorReducer from './SupervisorSlice'
const store = configureStore({
    reducer: {
        app: userReducer,
        supervisor: supervisorReducer 
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;