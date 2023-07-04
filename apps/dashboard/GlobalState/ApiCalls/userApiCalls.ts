import axios from "axios";

import {
  ApiRequestStart,
  GetUsersSuccess,
  ApiRequestError,
} from "../UserSlice";

// const API = axios.create({ baseURL: "http://localhost:7000" });
const API = axios.create({
  baseURL: "https://fyp-backend-production-27a1.up.railway.app/",
});

// if (typeof window !== "undefined") {
//   // Perform localStorage action
//   const token: any = localStorage.getItem("adminToken");
//   var config = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   };
// }
// GET ALL USERS
export const FetchUsers = async (dispatch: any, token:any): Promise<any> => {
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
    if (error.response.status == 404) {
      dispatch(ApiRequestError(error.response.status));
      return error.response.status;
    } else {
      dispatch(ApiRequestError("Something went wrong"));
      return error.response.status;
    }
  }
};
