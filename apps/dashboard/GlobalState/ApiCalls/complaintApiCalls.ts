import axios from "axios";
import {
  ApiRequestStart,
  GetComplaintsSuccess,
  AssignComplaintSuccess,
  GetSingleComplaintSuccess,
  APIRequestError,
  AddStatementSuccess,
  GetSupervisorComplaintsSuccess,
} from "../complatintSlice";
import { GetSingleSupervisorSuccess } from "../supervisorSlice";


// export const API = axios.create({ baseURL: "http://localhost:7000" });
// export const API = axios.create({ baseURL: "https://fyp-backend-production-27a1.up.railway.app/" });

// eslint-disable-next-line turbo/no-undeclared-env-vars
const BASE_API: any = process.env.NODE_ENV == "development" ? "http://localhost:7000" : "https://fyp-backend-production-27a1.up.railway.app/";
export const API = axios.create({ baseURL: BASE_API });

// ASSIGN COMPLAINT
export const AssignComplaint = async (
  dispatch: any,
  supervisorId: any,
  complaintId: any,
  token:any
): Promise<any> => {
  dispatch(ApiRequestStart());
  try {
    const res = await API.patch(
      `api/v1/complaints/${supervisorId}/${complaintId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
}
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
  dispatch: any,
  token:any
): Promise<any> => {
  dispatch(ApiRequestStart());
  try {
    const res = await API.patch(
      `api/v1/complaints/${complaintId}`,
      { wsscStatement },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
}
    );
    console.log(res.data);
    dispatch(AddStatementSuccess(wsscStatement));
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

// Fetch Specific supervisor complaints
export const FetchSupervisorComplaints = async (
  supervisorId: any,
  dispatch: any,
  token: any
): Promise<any> => {
  dispatch(ApiRequestStart());
  try {
    const res = await API.get(
      `api/v1/complaints/supervisor/${supervisorId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
}
    );
    dispatch(GetSupervisorComplaintsSuccess(res.data.allComplaints));
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

// Fetching Complaints from Server
export const FetchAllComplaints = async (dispatch: any, token:any): Promise<any> => {
  dispatch(ApiRequestStart());
  try {
    const res = await API.get(`api/v1/complaints`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
});
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

// fetch single complaint
export const FetchSingleComplaint = async (complaintId: any, token: any): Promise<any> => {
    console.log(complaintId)
  try {
    const res = await API.get(`api/v1/complaints/${complaintId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
} );
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err.response) {
      if (err.response.status == 404) {
        return err.response.status;
      } else {
        return err.response.status;
      }
    }
  }
};

