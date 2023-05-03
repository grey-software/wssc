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
// import { complaintTypes } from "@/Types";
import { ComplainForm } from "@/@types/complainForm.types";

const API = axios.create({ baseURL: "http://localhost:7000" });

// Creating New Complaint
export const CreateComplaint = async (
  newComplaint: ComplainForm,
  dispatch: any
): Promise<any> => {
  // const {};
  dispatch(NewComplaintStart());

  // calling API to create complaint in database

  try {
    const res = await API.post("api/v1/complaints", { ...newComplaint }, config);
    dispatch(NewComplaintSuccess(res.data));
    return res.status;
  } catch (err: any) {
    if (err.response.status == 400) {
      dispatch(NewComplaintError(err.response.data));
      return err.response.status;
    } else if (err.response.status == 500) {
      dispatch(NewComplaintError(err.response.statusText));
      return err.response.status;
    }
  }
};

// Fetching Complaints from Server
export const FetchAllComplaints = async (dispatch: any): Promise<any> => {
  dispatch(GetComplaintsStart());
  // calling api to fetch all complaints
  try {
    const res = await API.get("api/v1/complaints", config);
    console.log(res.data);
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
