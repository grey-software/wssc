"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supervisor_controller_1 = require("../controller/supervisor.controller");
const verifyToken_1 = require("../middleware/verifyToken");
const Supervisor = (0, express_1.Router)();
Supervisor.route("/register").post(verifyToken_1.verifyAdmin, supervisor_controller_1.RegisterSupervisor);
Supervisor.route("/signin").post(supervisor_controller_1.SignInSupervisor);
Supervisor.route("/").get(verifyToken_1.verifyAdmin, supervisor_controller_1.GetAllSupervisors);
Supervisor.route("/:id")
    .get(verifyToken_1.verifySupervisor, supervisor_controller_1.GetSupervisor)
    .patch(verifyToken_1.verifySupervisor, supervisor_controller_1.UpdateSupervisor)
    .delete(verifyToken_1.verifyAdmin, supervisor_controller_1.DeleteSupervisor);
Supervisor.post("/logout", supervisor_controller_1.Logout);
exports.default = Supervisor;
//# sourceMappingURL=supervisor.route.js.map