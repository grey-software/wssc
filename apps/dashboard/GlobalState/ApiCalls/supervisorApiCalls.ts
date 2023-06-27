import axios from "axios";

import {
  ApiRequestStart,
  GetSupervisorsSuccess,
  GetSingleSupervisorSuccess,
  ApiRequestError,
  RegisterNewSupervisor,
  DeleteSupervisorSuccess,
} from "../supervisorSlice";

const API = axios.create({ baseURL: "http://localhost:7000" });

if (typeof window !== 'undefined') {
  // Perform localStorage action
  const token: any = localStorage.getItem("adminToken");
  var config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
};

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

// REGISTER SUPEVISOR
export const RegisterSupervisor = async (
  userData: any,
  dispatch: any
): Promise<any> => {
  console.log(userData);
  const { name, phone, password } = userData;
  dispatch(ApiRequestStart());

  try {
    const res = await API.post(
      "api/v1/supervisors/register",
      { name, phone, password },
      { withCredentials: true }
    );
    console.log(res.data);
    dispatch(RegisterNewSupervisor(res.data));
    return res.status;
  } catch (err: any) {
    if (err.response) {
      if (err.response.status == 400) {
        dispatch(ApiRequestError(err.response.data));
        return err.response.status;
      } else if (err.response.status == 500) {
        dispatch(ApiRequestError(err.response.statusText));
        return err.response.status;
      }
    }
  }
};

// DELETE SUPERVISOR
export const DeleteSupervisor = async (
  supervisorId: any,
  dispatch: any
): Promise<any> => {
  dispatch(ApiRequestStart());
  try {
    const res = await API.delete(`api/v1/supervisors/${supervisorId}`, config);
    dispatch(DeleteSupervisorSuccess());
    console.log(res);
    return res.data;
  } catch (err: any) {
    if (err.response) {
      if (err.response.status == 401) {
        dispatch(ApiRequestError(err.response.data));
        return err.response.status;
      } else if (err.response.status == 500) {
        return err.response.status;
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
