"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignIn_validate = exports.SignUp_validate = void 0;
const joi_1 = __importDefault(require("joi"));
// SignUp Validation
const SignUp_validate = (data) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string()
            .min(3).message("Name must be 3 characters long")
            .max(20).message("Name should not exceed 20 characters long")
            .pattern(new RegExp('^[a-zA-Z ._-]*$')).message("Only Alphabets are allowed in name field")
            .required(),
        phone: joi_1.default.string()
            .min(11).message("Phone number must be 11 characters long.")
            .max(11).message("Phone number must be 11 characters long.")
            .pattern(new RegExp('^[0-9]*$')).message("Only Numbers are allowed in phone field")
            .required(),
        password: joi_1.default.string()
            .min(6)
            .max(15)
            .required(),
        profile_image: joi_1.default.string(),
        WSSC_CODE: joi_1.default.string(),
    });
    const valid = schema.validate(data);
    return valid;
};
exports.SignUp_validate = SignUp_validate;
// SignIn Validation
const SignIn_validate = (data) => {
    const schema = joi_1.default.object({
        phone: joi_1.default.string()
            .min(11).message("Phone number must be 11 characters long.")
            .max(11).message("Phone number must be 11 characters long.")
            .pattern(new RegExp('^[0-9]*$')).message("Only Numbers are allowed in phone field")
            .required(),
        password: joi_1.default.string()
            .min(6)
            .max(15)
            .required(),
    });
    const valid = schema.validate(data);
    return valid;
};
exports.SignIn_validate = SignIn_validate;
//# sourceMappingURL=Auth_Validation.js.map