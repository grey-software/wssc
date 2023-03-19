import * as Yup from "yup";

export const SignIn_validate = Yup.object().shape({
   
    phone: Yup.string()
        .required("Mobile number is required")
        .min(11, "Mobile number must be at least 11 numbers long")
        .max(11, "Mobile number must not exceed 11 numbers"),

    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(12, "Password must not exceed 12 characters"),
});
