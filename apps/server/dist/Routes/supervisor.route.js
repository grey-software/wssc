"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supervisor_controller_1 = require("../controller/supervisor.controller");
const Supervisor = (0, express_1.Router)();
Supervisor.route("/register").post(supervisor_controller_1.RegisterSupervisor);
Supervisor.route("/signin").post(supervisor_controller_1.SignInSupervisor);
Supervisor.route("/").get(supervisor_controller_1.GetAllSupervisors);
Supervisor.route("/:id").get(supervisor_controller_1.GetSupervisor);
exports.default = Supervisor;
//# sourceMappingURL=supervisor.route.js.map