import * as Yup from "yup";

export const SignupvalidationSchema = Yup.object().shape({
  username: Yup.string()
    .required("username is required")
    .min(4, "username must be at least 4 characters")
    .max(20, "username must not exceed 20 characters"),

  email: Yup.string().required("Email is required").email("Email is invalid"),

  phone: Yup.string()
    .required("Mobile no is required")
    .min(11, "Mobile number must be at least 11 numbers long")
    .max(14, "Mobile number must not exceed 14 numbers"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must not exceed 12 characters"),

  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Confirm Password does not match"),
});

export const SigninvalidationSchema = Yup.object().shape({
  phone: Yup.string()
    .required("Mobile no is required")
    .min(11, "Mobile number must be at least 11 numbers long")
    .max(14, "Mobile number must not exceed 14 numbers"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must not exceed 12 characters"),
});
