import axios from "axios";
import { SignInStart, SignInSuccess, SignInError, ApiRequestStart, ApiRequestError, SignOutUser } from "../UserSlice";
import { ClearStatisticsRecord } from "../WSSC_Slice";

// const API = axios.create({ baseURL: "http://localhost:7000" });
// const API = axios.create({ baseURL: "https://fyp-backend-production-27a1.up.railway.app/" });
// eslint-disable-next-line turbo/no-undeclared-env-vars
const BASE_API: any = process.env.NODE_ENV == "development" ? "http://localhost:7000" : "https://fyp-backend-production-27a1.up.railway.app/";
const API = axios.create({ baseURL: BASE_API });

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
      { WSSC_CODE, password }
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
    const res = await API.get("api/v1/wssc/logout")
    console.log(res);
    dispatch(SignOutUser());
    dispatch(ClearStatisticsRecord())
    return res;
  } catch (error) {
    console.log(error)
    dispatch(ApiRequestError("Something went wrong"))
  }
}
