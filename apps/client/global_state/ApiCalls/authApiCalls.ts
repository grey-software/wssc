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
} from "../ReduxSlices/UserSlice";
import { config } from "./config";

const API = axios.create({ baseURL: "http://localhost:7000" });

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

// LOGOUT APICALL
export const LOGOUT = async (dispatch: any) => {
  try {
    const res = await API.get("api/v1/auth/logout");
    dispatch(LogOutUser("Logged out successfully"))

  } catch (err) {
    console.log(err)
  }
}

