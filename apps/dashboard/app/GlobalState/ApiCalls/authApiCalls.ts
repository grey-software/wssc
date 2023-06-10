import axios from "axios";
import { SignInStart, SignInSuccess, SignInError } from "../UserSlice";
import { config } from "../config";

const API = axios.create({ baseURL: "http://localhost:7000" });

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
