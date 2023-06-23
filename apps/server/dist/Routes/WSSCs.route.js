"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const WSSCS_controller_1 = require("../controller/WSSCS.controller");
const verifyToken_1 = require("../middleware/verifyToken");
const WSSC = express_1.default.Router();
WSSC.post('/signup', WSSCS_controller_1.Register);
WSSC.post('/signin', WSSCS_controller_1.SignIn);
WSSC.get('/logout', WSSCS_controller_1.AdminLogout);
WSSC.get('/statistics', verifyToken_1.verifyAdmin, WSSCS_controller_1.Statistics);
WSSC.patch('/update-complaints', verifyToken_1.verifyAdmin, WSSCS_controller_1.UpdateAllComplaints);
WSSC.patch('/update-users-supervisors', verifyToken_1.verifyAdmin, WSSCS_controller_1.SupervisorUsersShifting);
exports.default = WSSC;
//# sourceMappingURL=WSSCs.route.js.map