"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplaintValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const ComplaintValidation = (data) => {
    const ComplaintSchema = joi_1.default.object({
        userId: joi_1.default.string().required(),
        userName: joi_1.default.string()
            .min(3)
            .max(20)
            .pattern(new RegExp("^[a-zA-Z ._-]*$"))
            .message("Only Alphabets are allowed in Username field")
            .required(),
        phone: joi_1.default.string()
            .pattern(new RegExp("^[0-9]*$"))
            .message("Only Numbers are allowed in phone Numbers"),
        complaintType: joi_1.default.string(),
        WSSC_CODE: joi_1.default.string(),
        complaintAddress: joi_1.default.string()
            .min(6)
            .max(50)
            .required()
            .pattern(new RegExp("^[.a-zA-Z0-9,!? ]*$"))
            .message("Only alphanumeric characters are allowed in complaint address"),
        complaintDes: joi_1.default.string().allow('', null).optional()
            .pattern(new RegExp("^[.a-zA-Z0-9,!? ]*$"))
            .message("Only alphanumeric characters are allowed complaint description"),
        ImageUrl: joi_1.default.string(),
        VideoUrl: joi_1.default.string(),
    });
    const complaintValid = ComplaintSchema.validate(data);
    return complaintValid;
};
exports.ComplaintValidation = ComplaintValidation;
//# sourceMappingURL=Complaint_Validation.js.map