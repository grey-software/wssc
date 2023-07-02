import axios from "axios";
import {ApiRequestStart, SupervisorAllComplaintsSuccess } from "./supervisorSlice/supervisorComplaintsSlice";

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
export const FetchSingleComplaint = async (complaintId: any): Promise<any> => {
    console.log(complaintId)
    try {
        const res = await API.get(`api/v1/complaints/${complaintId}`, config);
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
export const SupervisorComplaintResponse = async (data: any) => {
    const { complaintId, ImageUrl, description } = data;

    try {
        const res = await API.patch(`api/v1/complaints/response/${complaintId}`, { ImageUrl, description }, config);
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