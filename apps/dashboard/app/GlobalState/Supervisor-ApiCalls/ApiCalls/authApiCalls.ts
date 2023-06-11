import axios from "axios";
import { config } from "../../config";
import { ApiFetchingError, ApiFetchingStart, SignInSuccess, SupervisorLogout } from "./supervisorSlice/AuthSlice";

const API = axios.create({ baseURL: "http://localhost:7000" });

// Sign In Supervisor
export const SupervisorSignIn = async (UserData: any, dispatch: any) => {
    console.log(UserData);
    const { phone, password } = UserData;
    // SignIn start action
    dispatch(ApiFetchingStart);
    try {
        // calling api to check the credentials
        const res = await API.post(
            "api/v1/supervisors/signin",
            { phone, password },
            config
        );
        dispatch(SignInSuccess(res.data));
        console.log(res);
        return res;
    } catch (err: any) {
        console.log(err);
        if (err?.response?.status == 404) {
            dispatch(ApiFetchingError("User not found"));
            console.log(err.response)
        } else if (err?.response?.status == 400) {
            dispatch(ApiFetchingError("Wrong Credentials"));
            console.log(err.response)
        } else {
            dispatch(ApiFetchingError("Server error, please try again later"));
            console.log("Server error, please try again later")
        }
    }
};

// supervisor logout
export const SupervisorLogoutApi = async (dispatch: any) => {
   
    // SignIn start action
    dispatch(ApiFetchingStart);
    try {
        // calling api to check the credentials
        const res = await API.post(
            "api/v1/supervisors/logout",
            config
        );
        dispatch(SupervisorLogout("logout successfully"));
        console.log(res.data);
        return res.data;
    } catch (err: any) {
        console.log(err);
        if (err?.response?.status == 404) {
            dispatch(ApiFetchingError("User not found"));
            console.log(err.response)
        } else if (err?.response?.status == 400) {
            dispatch(ApiFetchingError("Wrong Credentials"));
            console.log(err.response)
        } else {
            dispatch(ApiFetchingError("Server error, please try again later"));
            console.log("Server error, please try again later")
        }
    }
};