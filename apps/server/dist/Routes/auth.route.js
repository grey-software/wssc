"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const AuthRouter = (0, express_1.Router)();
AuthRouter.post('/signup', auth_controller_1.SignUp);
AuthRouter.post("/signin", auth_controller_1.SignIn);
AuthRouter.get("/logout", auth_controller_1.Logout);
exports.default = AuthRouter;
//# sourceMappingURL=auth.route.js.map