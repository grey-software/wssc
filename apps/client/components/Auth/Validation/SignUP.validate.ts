import * as Yup from "yup";

export const SignUp_validate = Yup.object().shape({
    username: Yup.string()
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

    confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password")], "Password does not match"),
    
    wssc_code: Yup.string()
        .required("Residential area is required")
        .min(4, "Residential area must be 4 characters long")
});
