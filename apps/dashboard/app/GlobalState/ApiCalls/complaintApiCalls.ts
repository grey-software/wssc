import axios from "axios";
import {
  ApiRequestStart,
  GetComplaintsSuccess,
  AssignComplaintSuccess,
  GetSingleComplaintSuccess,
  APIRequestError,
} from "../complatintSlice";
import { config } from "./config";

const API = axios.create({ baseURL: "http://localhost:7000" });

// GET SINGLE COMPLAINT
export const FetchComplaint = async (
  dispatch: any,
  complaintId: any
): Promise<any> => {
  dispatch(ApiRequestStart());
  try {
    const res = await API.get(`api/v1/complaints/${complaintId}`, config);
    dispatch(GetSingleComplaintSuccess(res.data.complaint));
    return res.data;
  } catch (err: any) {
    if (err.response?.status == 401) {
      dispatch(APIRequestError(err.response.data));
      return err.response;
    } else if (err.response.status == 500) {
      dispatch(APIRequestError(err.response.statusText));
      return err.response;
    }
  }
};

// ASSIGN COMPLAINT
export const AssignComplaint = async (
  dispatch: any,
  supervisorId: any,
  complaintId: any
): Promise<any> => {
  dispatch(ApiRequestStart());
  try {
    const res = await API.patch(
      `api/v1/complaints/${supervisorId}/${complaintId}`,
      config
    );

    dispatch(AssignComplaintSuccess());
    return res.data;
  } catch (err: any) {
    if (err.response?.status == 401) {
      dispatch(APIRequestError(err.response.data));
      return err.response;
    } else if (err.response.status == 500) {
      dispatch(APIRequestError(err.response.statusText));
      return err.response;
    }
  }
};

// ADD STATEMENT TO COMPLAINT
export const AddStatement = async (
  complaintId: any,
  wsscStatement: any,
  dispatch: any
): Promise<any> => {
  dispatch(ApiRequestStart());
  try {
    const res = await API.patch(
      `api/v1/complaints/${complaintId}`,
      { wsscStatement },
      config
    );

    dispatch(AssignComplaintSuccess());
    return res.data;
  } catch (err: any) {
    if (err.response?.status == 401) {
      dispatch(APIRequestError(err.response.data));
      return err.response;
    } else if (err.response.status == 500) {
      dispatch(APIRequestError(err.response.statusText));
      return err.response;
    }
  }
};

// Fetching Complaints from Server
export const FetchAllComplaints = async (dispatch: any): Promise<any> => {
  dispatch(ApiRequestStart());
  try {
    const res = await API.get(`api/v1/complaints`, config);
    dispatch(GetComplaintsSuccess(res.data.allComplaints));
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err.response) {
      if (err.response.status == 404) {
        dispatch(APIRequestError(err.response.status));
        return err.response.status;
      } else {
        dispatch(APIRequestError("Something went wrong"));
        return err.response.status;
      }
    }
  }
};
