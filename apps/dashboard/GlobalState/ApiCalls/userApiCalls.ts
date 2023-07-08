import axios from "axios";

import {
  ApiRequestStart,
  GetUsersSuccess,
  ApiRequestError,
} from "../UserSlice";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const BASE_API: any =
  process.env.NODE_ENV == "development"
    ? "http://localhost:7000"
    : "https://fyp-backend-production-27a1.up.railway.app/";

const API = axios.create({ baseURL: BASE_API });
// GET ALL USERS
export const FetchUsers = async (dispatch: any, token: any): Promise<any> => {
  dispatch(ApiRequestStart());
  try {
    const res = await API.get(`api/v1/citizens`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    dispatch(GetUsersSuccess(res.data.data.allUsers));
    return res.data;
  } catch (error: any) {
    if (error?.response?.status == 404) {
      dispatch(ApiRequestError(error.response.status));
      return error.response.status;
    } else {
      dispatch(ApiRequestError("Something went wrong"));
      return error.response.status;
    }
  }
};
