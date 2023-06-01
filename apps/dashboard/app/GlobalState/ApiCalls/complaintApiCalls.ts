import axios from "axios";
import {
  GetComplaintsStart,
  GetComplaintsSuccess,
  GetComplaintsError,
} from "../complatintSlice";
import { config } from "./config";

const API = axios.create({ baseURL: "http://localhost:7000" });

// Fetching Complaints from Server
export const FetchAllComplaints = async (
  dispatch: any,
  userId: any
): Promise<any> => {
  dispatch(GetComplaintsStart());
  try {
    const res = await API.get(`api/v1/complaints/${userId}`, config);
    dispatch(GetComplaintsSuccess(res.data.allComplaints));
    console.log(res.data);
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
