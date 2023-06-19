import Joi from "joi";

import { ICitizen } from "../@types/userSchema.type";

// SignUp Validation
export const SignUp_validate = (data: ICitizen): Joi.ValidationResult<any> => {
    const schema = Joi.object({

        name: Joi.string()
            .min(3).message("Name must be 3 characters long")
            .max(20).message("Name should not exceed 20 characters long")
            .pattern(new RegExp('^[a-zA-Z ._-]*$')).message("Only Alphabets are allowed in name field")
            .required(),

        phone: Joi.string()
            .min(11).message("Phone number must be 11 characters long.")
            .max(11).message("Phone number must be 11 characters long.")
            .pattern(new RegExp('^[0-9]*$')).message("Only Numbers are allowed in phone field")
            .required(),

        password: Joi.string()
            .min(6)
            .max(15)
            .required(),
        
        profile_image: Joi.string(),
        WSSC_CODE: Joi.string(),
    })

    const valid = schema.validate(data);
    return valid;
}

// SignIn Validation
export const SignIn_validate = (data: ICitizen): Joi.ValidationResult<any> => {

    const schema = Joi.object({

        phone: Joi.string()
            .min(11).message("Phone number must be 11 characters long.")
            .max(11).message("Phone number must be 11 characters long.")
            .pattern(new RegExp('^[0-9]*$')).message("Only Numbers are allowed in phone field")
            .required(),

        password: Joi.string()
            .min(6)
            .max(15)
            .required(),

    })

    const valid = schema.validate(data);
    return valid;
}