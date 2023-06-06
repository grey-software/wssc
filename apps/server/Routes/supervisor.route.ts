import { Router } from "express";
import {
  RegisterSupervisor,
  GetAllSupervisors,
  SignInSupervisor,
  GetSupervisor,
  UpdateSupervisor,
  DeleteSupervisor,
} from "../controller/supervisor.controller";

const Supervisor: Router = Router();

Supervisor.route("/register").post(RegisterSupervisor);
Supervisor.route("/signin").post(SignInSupervisor);

Supervisor.route("/").get(GetAllSupervisors);
Supervisor.route("/:id")
  .get(GetSupervisor)
  .patch(UpdateSupervisor)
  .delete(DeleteSupervisor);

export default Supervisor;
