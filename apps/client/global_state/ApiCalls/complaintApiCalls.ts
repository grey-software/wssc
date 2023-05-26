import axios from "axios";
import {
  GetComplaintsStart,
  GetComplaintsSuccess,
  GetComplaintsError,
  NewComplaintStart,
  NewComplaintSuccess,
  NewComplaintError,
} from "../ReduxSlices/complaintSlice";
import { config } from "./config";
import { ComplainForm } from "@/@types/complainForm.types";

const API = axios.create({ baseURL: "http://localhost:7000" });

// Creating New Complaint
export const CreateComplaint = async (
  newComplaint: any,
  dispatch: any
): Promise<any> => {
  const { userId , username,complaintType, complaintAddress, complaintDes, ImageUrl, VideoUrl } = newComplaint;
  dispatch(NewComplaintStart());

  // calling API to create complaint in database
  try {
    const res = await API.post("api/v1/complaints", { userId, username, complaintType, complaintAddress, complaintDes, ImageUrl, VideoUrl }, config);
    dispatch(NewComplaintSuccess(res.data.CreateComplaint));
    return res.data;
  }
  catch (err: any)
  {
    if (err.response?.status == 400) {
      dispatch(NewComplaintError(err.response.data));
      return err.response;
    } else if (err.response.status == 500) {
      dispatch(NewComplaintError(err.response.statusText));
      return err.response;
    }
  }
};

// Fetching Complaints from Server
export const FetchAllComplaints = async (dispatch: any): Promise<any> => {

  dispatch(GetComplaintsStart());
  try {
    const res = await API.get("api/v1/complaints", config);
    dispatch(GetComplaintsSuccess(res.data.allComplaints));
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err.response) {
      if (err.response.status == 404) {
        dispatch(GetComplaintsError(err.response.status));
        return err.response.status;
      } else {
        dispatch(GetComplaintsError("Something went wrong"));
        return err.response.status;
      }
    }
  }
};
