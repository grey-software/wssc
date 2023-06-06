import axios from "axios";
import { config } from "./config";
import {
  ApiRequestStart,
  GetSupervisorsSuccess,
  GetSingleSupervisorSuccess,
  ApiRequestError,
} from "../supervisorSlice";

const API = axios.create({ baseURL: "http://localhost:7000" });

// GET SINGLE SUPERVISOR
export const GetSingleSupervisor = async (
  dispatch: any,
  supervisorId: any
): Promise<any> => {
  dispatch(ApiRequestStart());
  try {
    const res = await API.get(`api/v1/supervisors/${supervisorId}`, config);
    console.log(res.data);
    dispatch(GetSingleSupervisorSuccess(res.data.data));
  } catch (error: any) {
    if (error.response) {
      if (error.response.status == 404) {
        dispatch(ApiRequestError(error.response.status));
        return error.response.status;
      } else {
        dispatch(ApiRequestError("Something went wrong"));
        return error.response.status;
      }
    }
  }
};

// GET ALL SUPERVISORS
export const FetchAllSupervisors = async (dispatch: any): Promise<any> => {
  dispatch(ApiRequestStart());
  try {
    const res = await API.get("api/v1/supervisors", config);
    console.log(res.data.data);
    dispatch(GetSupervisorsSuccess(res.data.data));
  } catch (error: any) {
    if (error.response) {
      if (error.response.status == 404) {
        dispatch(ApiRequestError(error.response.status));
        return error.response.status;
      } else {
        dispatch(ApiRequestError("Something went wrong"));
        return error.response.status;
      }
    }
  }
};
