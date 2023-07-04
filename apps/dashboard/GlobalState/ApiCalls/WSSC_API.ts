import axios from "axios";
import { ApiRequestError, ApiRequestStart, ApiRequestSuccess } from "../WSSC_Slice";

// const API = axios.create({ baseURL: "http://localhost:7000" });
const API = axios.create({ baseURL: "https://fyp-backend-production-27a1.up.railway.app/" });

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

// Sign In Admin
export const Statistics = async (dispatch: any, token:any) => {
  
   dispatch(ApiRequestStart())

   try {
     const res = await API.get('api/v1/wssc/statistics', {
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
       },
});
     console.log(res.data)
     dispatch(ApiRequestSuccess(res.data))
       return res.data;
   } catch (error) {
     console.log(error)
     dispatch(ApiRequestError())
   }
};
