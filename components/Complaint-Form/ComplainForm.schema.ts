import * as Yup from "yup";

export const validationSchema = Yup.object().shape({

    username: Yup.string()
        .required("username is required")
        .min(4, "username must be at least 4 characters")
        .max(20, "username must not exceed 20 characters"),
    
    phone: Yup.string()
        .required("Mobile no is required")
        .min(11, "Mobile number must be at least 11 numbers long")
        .max(14, "Mobile number must not exceed 14 numbers"),
    
    // location: Yup.string()
    //         .required("Your current location is required"),
    
    // attachement: Yup.string()
    //     .required("at least 1 attachement is required!"),
});