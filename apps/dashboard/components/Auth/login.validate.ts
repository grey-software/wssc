import * as Yup from "yup";

export const login_validate = Yup.object().shape({
  WSSC_CODE: Yup.string()
    .required("WSSC Code is required")
    .min(10, "WSSC Code must be at least 10 numbers long")
    .max(10, "WSSC Code must not exceed 10 numbers"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must not exceed 12 characters"),
});
