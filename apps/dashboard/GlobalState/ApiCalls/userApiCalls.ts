import axios from "axios";

import {
  ApiRequestStart,
  GetUsersSuccess,
  ApiRequestError,
} from "../UserSlice";

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
// GET ALL USERS
export const FetchUsers = async (dispatch: any): Promise<any> => {
  dispatch(ApiRequestStart());
  try {
    const res = await API.get(`api/v1/citizens`, config);
    console.log(res.data.data);
    dispatch(GetUsersSuccess(res.data.data));
  } catch (error: any) {
    if (error.response.status == 404) {
      dispatch(ApiRequestError(error.response.status));
      return error.response.status;
    } else {
      dispatch(ApiRequestError("Something went wrong"));
      return error.response.status;
    }
  }
};
