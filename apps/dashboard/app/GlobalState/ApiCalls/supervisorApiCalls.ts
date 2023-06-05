import axios from "axios";
import { config } from "./config";
import {
  GetSupervisorsStart,
  GetSupervisorSuccess,
  GetSupervisorsError,
} from "../supervisorSlice";

const API = axios.create({ baseURL: "http://localhost:7000" });

export const FetchAllSupervisors = async (dispatch: any): Promise<any> => {
  dispatch(GetSupervisorsStart());
  try {
    const res = await API.get("api/v1/supervisors", config);
    console.log(res.data.data);
    dispatch(GetSupervisorSuccess(res.data.data));
  } catch (error: any) {
    if (error.response) {
      if (error.response.status == 404) {
        dispatch(GetSupervisorsError(error.response.status));
        return error.response.status;
      } else {
        dispatch(GetSupervisorsError("Something went wrong"));
        return error.response.status;
      }
    }
  }
};
