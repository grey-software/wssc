import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    
    phone: Yup.string()
        .required("Complaint address is required")
        .min(8, "Address must not less than 8 characters"),
    
    // location: Yup.string()
    //         .required("Your current location is required"),
    
    // attachement: Yup.string()
    //     .required("at least 1 attachement is required!"),
});