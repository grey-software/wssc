import Joi, { object, string } from "joi";
import { IComplaint } from "../@types/ComplaintSchema.type";

export const ComplaintValidation = (data: IComplaint): Joi.ValidationResult<any> => {

    const ComplaintSchema = Joi.object({

        userId: Joi.string()
            .required(),
        
        username: Joi.string()
            .min(3)
            .max(20)
            .pattern(new RegExp('^[a-zA-Z ._-]*$')).message("Only Alphabets are allowed in Username field")
            .required(),

        phone: Joi.string()
            .min(11).message("Phone number must be 11 characters long.")
            .max(11).message("Phone number must be 11 characters long.")
            .pattern(new RegExp('^[0-9]*$')).message("Only Numbers are allowed in phone Numbers"),
        complaintType: Joi.string(),

        complaintAddress: Joi.string()
            .min(6)
            .max(50)
            .required()
            .pattern(new RegExp('^[\.a-zA-Z0-9,!? ]*$')).message("Only alphanumeric characters are allowed in complaint address"),

        complaintDes: Joi.string()
            .pattern(new RegExp('^[\.a-zA-Z0-9,!? ]*$')).message("Only alphanumeric characters are allowed complaint description"),
        
        ImageUrl: Joi.string(),

        VideoUrl: Joi.string(),

    })

    const complaintValid: Joi.ValidationResult<any> = ComplaintSchema.validate(data);
    return complaintValid;
}