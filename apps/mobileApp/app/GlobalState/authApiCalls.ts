import { API } from "../screens/Login";
import { ChangingPasswordStart, ChangingPasswordSuccess, ChangingPasswordError, DeleteAccountStart, DeleteAccountSuccess, DeleteAccountError } from "./UserSlice";
interface ChangePasswordArgs {
    userId: string;
    updatedPassword: { password: string };
    token: string;
  }
export const ChangedPassword = async (dispatch: any, updatedPassword: any, userId: any, token: any): Promise<any> => {
  console.log('id:',userId);
  dispatch(ChangingPasswordStart());
  // calling password endpoint API
  try {
    const res = await API.patch(`api/v1/citizens/changepassword/${userId}`, updatedPassword, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    dispatch(ChangingPasswordSuccess());
    return { status: res.status, data: res.data, message: 'Password changed successfully', success: true };
  } catch (err: any) {
    dispatch(ChangingPasswordError());
    if (err.response) {
      return { status: err.response.status, data: err.response.data, message: err.response.data?.message || 'An error occurred', success: false };
    } else {
      return { status: 500, data: null, message: 'An error occurred', success: false };
    }
  }
};

// User account delete API CALL
export const UserAccountDelete = async (dispatch: any, userId: any, token:any): Promise<any> => {
  console.log('token: ',token)
  dispatch(DeleteAccountStart());
  try {
    const res = await API.delete(`api/v1/citizens/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    dispatch(DeleteAccountSuccess())
    return res.data;

  } catch (err: any) {
    if (err.response) {
      if (err.response.status == 401) {
        dispatch(DeleteAccountError("you are unauthorized"))
        console.log(err.response)
        return err.response;
      } else {
        dispatch(DeleteAccountError("internal server error"))
        console.log(err.response)
        return err.response;
      }
    }
    
  }
}

