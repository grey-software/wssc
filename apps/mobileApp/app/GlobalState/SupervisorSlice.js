import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    supervisor: {},
    WSSC: {},
    supervisorToken: "",
    complaints:[],
}

const SupervisorSlice = createSlice({
    name: 'supervisor',
    initialState,
    reducers: {
        SetSupervisorData: (state, action) => {
            state.supervisor = action.payload.supervisor;
            state.WSSC = action.payload.WSSC;
            state.supervisorToken = action.payload.supervisorToken;
        },
        SetComplaints: (state,action) => {
            state.complaints = action.payload;
        },
        UpdateSupervisorData: (state, action) => {
            state.supervisor = action.payload
        },
        LogOut: (state) => {
            state.supervisor = null;
            state.WSSC = null;
            state.supervisorToken = null;
            state.complaints = null;
        }
    }
})

export default SupervisorSlice.reducer;
export const { SetSupervisorData, SetComplaints, UpdateSupervisorData, LogOut } = SupervisorSlice.actions