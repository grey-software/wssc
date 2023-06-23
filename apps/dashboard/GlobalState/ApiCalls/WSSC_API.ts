import axios from "axios";
import { config } from "../config";
import { ApiRequestError, ApiRequestStart, ApiRequestSuccess } from "../WSSC_Slice";

const API = axios.create({ baseURL: "http://localhost:7000" });

// Sign In Admin
export const Statistics = async (dispatch:any) => {
  
   dispatch(ApiRequestStart())

   try {
       const res = await API.get('api/v1/wssc/statistics', config);
     console.log(res.data)
     dispatch(ApiRequestSuccess(res.data))
       return res.data;
   } catch (error) {
     console.log(error)
     dispatch(ApiRequestError())
   }
};
