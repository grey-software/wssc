import axios from "axios";
import { SignInStart, SignInSuccess, SignInError, ApiRequestStart, ApiRequestError, SignOutUser } from "../UserSlice";

const API = axios.create({ baseURL: "http://localhost:7000" });

if (typeof window !== 'undefined') {
  // Perform localStorage action
  const token: any = localStorage.getItem("adminToken");
  var config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }

};

// Sign In Admin
export const SignIn = async (UserData: any, dispatch: any) => {
  console.log(UserData);
  const { WSSC_CODE, password } = UserData;
  // SignIn start action
  dispatch(SignInStart());
  try {
    // calling api to check the credentials
    const res = await API.post(
      "api/v1/wssc/signin",
      { WSSC_CODE, password },
      config
    );
    dispatch(SignInSuccess(res.data));
    console.log(res.data)
    return res;
  } catch (err: any) {
    console.log(err);
    if (err?.response?.status == 404) {
      dispatch(SignInError("User not found"));
    } else if (err?.response?.status == 400) {
      dispatch(SignInError("Wrong Credentials"));
    } else {
      dispatch(SignInError("Server error, please try again later"));
    }
  }
};

// LOGOUT ADMIN 
export const LOGOUT = async (dispatch: any) => {
  dispatch(ApiRequestStart());

  try {
    const res = await API.get("api/v1/wssc/logout", config)
    console.log(res);
    dispatch(SignOutUser());
    return res;
  } catch (error) {
    console.log(error)
    dispatch(ApiRequestError("Something went wrong"))
  }
}
