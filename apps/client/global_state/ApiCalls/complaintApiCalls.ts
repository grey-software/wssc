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
// import { config } from "./config";
import { ComplainForm } from "@/@types/complainForm.types";

// export const API = axios.create({ baseURL: "http://localhost:7000" });
const API = axios.create({
  baseURL: "https://fyp-backend-production-27a1.up.railway.app/",
});
// if (typeof window !== "undefined") {
//   // Perform localStorage action
//   const token: any = localStorage.getItem("token");
//   var config = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   };
// }

// Citizen feedback
export const CreateFeedback = async (
  complaintId: any,
  feedback: any,
  dispatch: any,
  token:any
): Promise<any> => {
  dispatch(FeedbackStart());
  try {
    console.log(feedback);
    const res = await API.patch(
      `api/v1/complaints/feedback/${complaintId}`,
      feedback,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
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
  dispatch: any,
  token:any
): Promise<any> => {
  const {
    userId,
    userName,
    complaintType,
    phone,
    WSSC_CODE,
    complaintAddress,
    complaintDes,
    ImageUrl,
    VideoUrl,
  } = newComplaint;
  dispatch(NewComplaintStart());

  // calling API to create complaint in database
  try {
    const res = await API.post(
      `api/v1/complaints`,
      {
        userId,
        userName,
        complaintType,
        phone,
        WSSC_CODE,
        complaintAddress,
        complaintDes,
        ImageUrl,
        VideoUrl,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(`this is complaintApi console: ${res.data}`);
    dispatch(NewComplaintSuccess(res.data.CreateComplaint));
    return res.data;
  } catch (err: any) {
    if (err.response?.status == 400) {
      dispatch(NewComplaintError(err.response.data));
      console.log(err);
      return err.response;
    } else if (err.response.status == 500) {
      dispatch(NewComplaintError(err.response.statusText));
      console.log(err);
      return err.response;
    }
  }
};

// Fetching Complaints from Server
export const FetchAllComplaints = async (dispatch: any, token:any): Promise<any> => {
  dispatch(GetComplaintsStart());
  try {
    const res = await API.get(`api/v1/complaints`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
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
