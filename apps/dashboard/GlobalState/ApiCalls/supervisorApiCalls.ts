import axios from "axios";

import {
  ApiRequestStart,
  GetSupervisorsSuccess,
  GetSingleSupervisorSuccess,
  ApiRequestError,
  RegisterNewSupervisor,
  DeleteSupervisorSuccess,
} from "../supervisorSlice";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const BASE_API: any = process.env.NODE_ENV == "development" ? "http://localhost:7000" : "https://fyp-backend-production-27a1.up.railway.app/";
const API = axios.create({ baseURL: BASE_API });

// GET SINGLE SUPERVISOR
export const GetSingleSupervisor = async (
  dispatch: any,
  supervisorId: any,
  token:any
): Promise<any> => {
  dispatch(ApiRequestStart());
  try {
    const res = await API.get(`api/v1/supervisors/${supervisorId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
});
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
export const RegisterSupervisor:any = async (
  userData: any,
  dispatch: any,
  token:any
): Promise<any> => {
  console.log(userData);
  const { name, phone, password } = userData;
  dispatch(ApiRequestStart());

  try {
    const res = await API.post(
      "api/v1/supervisors/register",
      { name, phone, password }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
},
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
  dispatch: any,
  token:any
): Promise<any> => {
  dispatch(ApiRequestStart());
  try {
    const res = await API.delete(`api/v1/supervisors/${supervisorId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
} );
    dispatch(DeleteSupervisorSuccess());
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
// Update Supervisor
export const UpdateSupervisor = async () => {
  
}
// GET ALL SUPERVISORS
export const FetchAllSupervisors = async (dispatch: any, token:any): Promise<any> => {
  dispatch(ApiRequestStart());
  try {
    const res = await API.get("api/v1/supervisors", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
});
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
