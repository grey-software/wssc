"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbconnect = (uri) => {
    mongoose_1.default
        .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
    })
        .then(() => {
        console.log("Database Connected Successfuly.");
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.default = dbconnect;
//# sourceMappingURL=dbconnect.js.map