import { Router } from "express";
import {
  RegisterSupervisor,
  GetAllSupervisors,
  SignInSupervisor,
  GetSupervisor,
} from "../controller/supervisor.controller";

const Supervisor: Router = Router();

Supervisor.route("/register").post(RegisterSupervisor);
Supervisor.route("/signin").post(SignInSupervisor);

Supervisor.route("/").get(GetAllSupervisors);
Supervisor.route("/:id").get(GetSupervisor);

export default Supervisor;
