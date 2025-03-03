import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../screens/Login'; // Adjust the path to your API instance

// Define initial state
const initialState = {
  user: null,
  wssc: null,
  token: null,
  pending: false,
  error: false,
};

const userSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    SetUserData: (state, action) => {
      state.user = action.payload.user;
      state.wssc = action.payload.wssc;
      state.token = action.payload.token;
    },
    UpdateUserData: (state, action) => {
      state.user = action.payload;
    },

    ChangingPasswordStart: (state) => {
      state.pending = true;
    },
    ChangingPasswordSuccess: (state) => {
      state.pending = false;
    },
    ChangingPasswordError: (state) => {
      state.error = true;
      state.pending = false;
    },

    LogOut: (state) => {
      state.user = null;
      state.wssc = null;
      state.token = null;
    },
    // Below are the User account delete actions
    DeleteAccountStart: (state) => {
      state.pending = true;
    },
    DeleteAccountSuccess: (state) => {
      state.pending = false;
      state.user = null;
      state.wssc = null;
      state.token = null;
    },
    DeleteAccountError: (state, action) => {
      state.error = true;
      state.pending = false;
    },
  },
});

export const { SetUserData, UpdateUserData,ChangingPasswordStart,
  ChangingPasswordSuccess,
  ChangingPasswordError, DeleteAccountStart,
   DeleteAccountSuccess, DeleteAccountError, LogOut } = userSlice.actions;
export default userSlice.reducer;
