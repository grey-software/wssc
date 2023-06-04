import axios, { AxiosError } from "axios";
import {
  SignInStart,
  SignInSuccess,
  SignInError,
  user,
  SignUpStart,
  SignUpSuccess,
  SignUpError,
  LogOutUser,
  UpdateUserInfoStart,
  UpdateUserInfoSuccess,
  UpdateUserInfoError,
  ChangingPasswordStart,
  ChangingPasswordSuccess,
  ChangingPasswordError,
  DeleteAccountStart,
  DeleteAccountSuccess,
  DeleteAccountError
} from "../ReduxSlices/UserSlice";
import { config } from "./config";

const API = axios.create({ baseURL: "http://localhost:7000" });
// const API = axios.create({ baseURL: "https://fyp-wssc-backend-production.up.railway.app" });


// RegisterUser ApiCall
export const RegisterUser = async (
  userData: user,
  dispatch: any
): Promise<any> => {
  const { name, phone, password } = userData;
  dispatch(SignUpStart());

  try {
    const res = await API.post(
      "api/v1/auth/signup",
      { name, phone, password },
      { withCredentials: true }
    );
    dispatch(SignUpSuccess(res.data));
    return res.status;
  } catch (err: any) {
    if (err.response) {
      if (err.response.status == 400) {
        dispatch(SignUpError(err.response.data));
        return err.response.status;
      } else if (err.response.status == 500) {
        dispatch(SignUpError(err.response.statusText));
        return err.response.status;
      }
    }
  }
};

//-------- SignIn ApiCall ---------
export const SignIn = async (UserData: user, dispatch: any) => {
  const { phone, password } = UserData;
  // SignIn start action
  dispatch(SignInStart());
  try {
    // calling api to check the credentials
    const res = await API.post("api/v1/auth/signin", { phone, password }, config);
    dispatch(SignInSuccess(res.data));
  } catch (err: any) {
    if (err.response) {
      if (err.response.status == 404) {
        dispatch(SignInError("User is not found"));
      } else if (err.response.status == 400) {
        dispatch(SignInError("Wrong Credentials"));
      } else {
        dispatch(SignInError("Server error, please try again later"));
      }
    }
  }
};

// Update UserInfo
export const UpdateUserProfile = async (dispatch: any, updatedData: any, userId:any): Promise<any> => {
  console.log(updatedData);
  console.log(userId)
  dispatch(UpdateUserInfoStart());

  // calling updateUser api endpoint to update userInfo:a
  try {
    const res = await API.patch(`api/v1/citizens/${userId}`, updatedData , config);
    dispatch(UpdateUserInfoSuccess(res.data.updateInfo));
    return res.data;
  } catch (err: any) {
    console.log(err)
    if (err.response) {
       if (err.response.status == 401) {
         dispatch(UpdateUserInfoError("You are not authorized"));
         return err.response;
      } else {
         dispatch(UpdateUserInfoError("Server error, please try again later"));
         return err.response;
      }
    }
  }
}

// change Password api call
export const ChangedPassword = async(dispatch:any, updatedPassword: any, userId: any): Promise<any> => {
  
  dispatch(ChangingPasswordStart());
  // calling password endpoint api
  try {
    const res = await API.patch(`api/v1/citizens/changepassword/${userId}`, updatedPassword, config);
    console.log(res.data)
    dispatch(ChangingPasswordSuccess())
    return res.data;
  } catch (err: any) {
    dispatch(ChangingPasswordError())
    console.log(err)
    if (err.response) {
      if (err.response.status == 401) {
        console.log(err.response)
        return err.response;
      } else {
        console.log(err.response)
        return err.response;
      }
    }
  }
}

// LOGOUT APICALL
export const LOGOUT = async (dispatch: any) => {
  try {
    const res = await API.get("api/v1/auth/logout");
    dispatch(LogOutUser("Logged out successfully"))

  } catch (err) {
    console.log(err)
  }
}

// User account delete API CALL
export const UserAccountDelete = async (dispatch: any, userId: any): Promise<any> => {
  dispatch(DeleteAccountStart());
  try {
    const res = await API.delete(`api/v1/citizens/${userId}`, config);
    console.log(res.data);
    dispatch(DeleteAccountSuccess())
    return res.data;

  } catch (err: any) {
    if (err.response) {
      if (err.response.status == 401) {
        dispatch(DeleteAccountError("you are unauthorized"))
        console.log(err.response)
        return err.response;
      } else {
        dispatch(DeleteAccountError("internal server error"))
        console.log(err.response)
        return err.response;
      }
    }
    
  }
}
