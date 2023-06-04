import axios from "axios";
import {
  GetComplaintsStart,
  GetComplaintsSuccess,
  GetComplaintsError,
  NewComplaintStart,
  NewComplaintSuccess,
  NewComplaintError,
  FeedbackStart,
  FeedbackSuccess,
  FeedbackError,
} from "../ReduxSlices/complaintSlice";
import { config } from "./config";
import { ComplainForm } from "@/@types/complainForm.types";

// const API = axios.create({ baseURL: "http://localhost:7000" });
const API = axios.create({ baseURL: "https://fyp-wssc-backend-production.up.railway.app/" });


// Citizen feedback
export const CreateFeedback = async (
  complaintId: any,
  feedback: any,
  dispatch: any
): Promise<any> => {
  console.log("start");
  dispatch(FeedbackStart());
  console.log("started");
  try {
    console.log("try");
    console.log(feedback);
    const res = await API.patch(
      `api/v1/complaints/${complaintId}`,
      feedback,
      config
    );
    console.log(res);
    console.log("feedback updated");
    dispatch(FeedbackSuccess());
    return res.data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status == 401) {
        dispatch(FeedbackError("You are not authorized"));
        return error.response;
      } else {
        dispatch(FeedbackError("Server Error, Try again later"));
        return error.response;
      }
    }
  }
};

// Creating New Complaint
export const CreateComplaint = async (
  newComplaint: any,
  dispatch: any
): Promise<any> => {
  const {
    userId,
    userName,
    complaintType,
    phone,
    complaintAddress,
    complaintDes,
    ImageUrl,
    VideoUrl,
  } = newComplaint;
  dispatch(NewComplaintStart());

  // calling API to create complaint in database
  try {
    const res = await API.post(
      `api/v1/complaints/${userId}`,
      {
        userId,
        userName,
        complaintType,
        phone,
        complaintAddress,
        complaintDes,
        ImageUrl,
        VideoUrl,
      },
      config
    );
    dispatch(NewComplaintSuccess(res.data.CreateComplaint));
    return res.data;
  } catch (err: any) {
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
export const FetchAllComplaints = async (
  dispatch: any,
  userId: any
): Promise<any> => {
  dispatch(GetComplaintsStart());
  console.log(userId);
  try {
    const res = await API.get(`api/v1/complaints/${userId}`, config);
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
