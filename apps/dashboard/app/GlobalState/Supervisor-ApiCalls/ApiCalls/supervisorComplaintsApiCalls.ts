import axios from "axios";
import { config } from "../../config";
import { ApiRequestError, ApiRequestStart, SupervisorAllComplaintsSuccess } from "./supervisorSlice/supervisorComplaintsSlice";

const API = axios.create({ baseURL: "http://localhost:7000" });

// Sign In Supervisor
export const SupervisorComplaints = async ( dispatch: any) => {
    // SignIn start action
    dispatch(ApiRequestStart());
    try {
        // calling api to check the credentials
        const res = await API.get(
            "api/v1/complaints",
            config
        );
        dispatch(SupervisorAllComplaintsSuccess(res.data.allComplaints));
        console.log(res.data.allComplaints);
        return res.data.allComplaints;
    } catch (err: any) {
        console.log(err);
        if (err?.response?.status == 404) {
            // dispatch(ApiRequestError("Something went wrong"));
            console.log(err.response)
        } else {
            // dispatch(ApiRequestError("Server error, please try again later"));
            console.log("Server error, please try again later")
        }
    }
};
