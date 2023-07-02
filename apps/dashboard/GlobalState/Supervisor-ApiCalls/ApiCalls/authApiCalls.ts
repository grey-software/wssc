import axios from "axios";
import { ApiFetchingError, ApiFetchingStart, SignInSuccess, SupervisorLogout, UpdateProfile } from "./supervisorSlice/AuthSlice";

// const API = axios.create({ baseURL: "http://localhost:7000" });
const API = axios.create({ baseURL: "https://fyp-backend-production-27a1.up.railway.app/" });

if (typeof window !== 'undefined') {
    // Perform localStorage action
    const token: any = localStorage.getItem("supervisorToken");
    var config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }
};
// Sign In Supervisor
export const SupervisorSignIn = async (UserData: any, dispatch: any) => {
    const { phone, password } = UserData;
    // SignIn start action
    // dispatch(ApiFetchingStart);
    try {
        // calling api to check the credentials
        const res = await API.post(
            "api/v1/supervisors/signin",
            { phone, password }

        );
        dispatch(SignInSuccess(res.data));
        console.log(res.data);
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

// ----- update supervisor profile ------------
export const UpdateSupervisor = async (dispatch: any, data:any ) => {
    dispatch(ApiFetchingStart);
    try {
        const res = await API.patch(`api/v1/supervisors/${data.suprvisorId}`, { profile_image: data.updatedpic.profile_image }, config);
        dispatch(UpdateProfile(res.data.data))
        return res.status;
    } catch (err: any) {
        console.log(err)
        if (err?.response?.status == 500) {
            dispatch(ApiFetchingError("Server error, please try again later"));
            return err?.response?.status;
       }
    }
}

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