import axios from "axios";
import {ApiRequestStart, SupervisorAllComplaintsSuccess } from "./supervisorSlice/supervisorComplaintsSlice";

// const API = axios.create({ baseURL: "http://localhost:7000" });
// const API = axios.create({ baseURL: "https://fyp-backend-production-27a1.up.railway.app/" });
// eslint-disable-next-line turbo/no-undeclared-env-vars
const BASE_API: any = process.env.NODE_ENV == "development" ? "http://localhost:7000" : "https://fyp-backend-production-27a1.up.railway.app/";
const API = axios.create({ baseURL: BASE_API });

// Sign In Supervisor
export const SupervisorComplaints = async ( dispatch: any, token:any) => {
    // SignIn start action
    dispatch(ApiRequestStart());
    try {
        // calling api to check the credentials
        const res = await API.get(
            "api/v1/complaints",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
}
        );
        dispatch(SupervisorAllComplaintsSuccess(res.data.allComplaints));
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


// fetch single complaint
export const FetchSingleComplaint = async (complaintId: any, token:any): Promise<any> => {
    console.log(complaintId)
    try {
        const res = await API.get(`api/v1/complaints/${complaintId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
});
        return res.data;
    } catch (err: any) {
        console.log(err);
        if (err.response) {
            if (err.response.status == 404) {
                return err.response.status;
            } else {
                return err.response.status;
            }
        }
    }
};


// Suprvisor Response API Called to update the complaint Status
export const SupervisorComplaintResponse = async (data: any, token:any) => {
    const { complaintId, ImageUrl, description } = data;

    try {
        const res = await API.patch(`api/v1/complaints/response/${complaintId}`, { ImageUrl, description }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
});
        console.log(res.data)
        return res.data;
    } catch (err: any) {
        console.log(err);
        if (err.response) {
            if (err.response.status == 404) {
                return err.response.status;
            } else {
                return err.response.status;
            }
        }
    }
}