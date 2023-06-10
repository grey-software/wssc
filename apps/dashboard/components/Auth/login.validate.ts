import * as Yup from "yup";

export const login_validate = Yup.object().shape({
  WSSC_CODE: Yup.string()
    .required("WSSC Code is required")
    .min(10, "WSSC Code must be at least 10 numbers long")
    .max(11, "WSSC Code must not exceed 10 numbers"),

  
  password: Yup.string()
    .required("Password is required")
    .min(5, "Password must be at least 6 characters")
    .max(12, "Password must not exceed 12 characters"),
});

export const register_supervisor_validate = Yup.object().shape({
  name: Yup.string()
    .required("Username is required")
    .min(4, "username must be at least 4 characters long")
    .max(20, "username must not exceed 20 characters"),

  phone: Yup.string()
    .required("Mobile number is required")
    .min(11, "Mobile number must be at least 11 numbers long")
    .max(11, "Mobile number must not exceed 11 numbers"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must not exceed 12 characters"),
});
