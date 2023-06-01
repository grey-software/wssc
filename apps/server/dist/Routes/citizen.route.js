"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const citizen_controller_1 = require("../controller/citizen.controller");
const verifyToken_1 = require("../middleware/verifyToken");
const Citizen = (0, express_1.Router)();
Citizen.route("/:id")
    .get(verifyToken_1.verifyUser, citizen_controller_1.GetUser)
    .patch(verifyToken_1.verifyUser, citizen_controller_1.UpdateUser)
    .delete(verifyToken_1.verifyUser, citizen_controller_1.DeleteAccount);
Citizen.patch('/changepassword/:id', verifyToken_1.verifyUser, citizen_controller_1.ChangePassword);
Citizen.get("/", verifyToken_1.verifyAdmin, citizen_controller_1.RetreiveAllUsers);
exports.default = Citizen;
//# sourceMappingURL=citizen.route.js.map