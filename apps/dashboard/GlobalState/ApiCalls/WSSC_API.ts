import axios from "axios";
import { ApiRequestError, ApiRequestStart, ApiRequestSuccess } from "../WSSC_Slice";

// const API = axios.create({ baseURL: "http://localhost:7000" });
// const API = axios.create({ baseURL: "https://fyp-backend-production-27a1.up.railway.app/" });
// eslint-disable-next-line turbo/no-undeclared-env-vars
const BASE_API: any = process.env.NODE_ENV == "development" ? "http://localhost:7000" : "https://fyp-backend-production-27a1.up.railway.app/";

const API = axios.create({ baseURL: BASE_API });

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
