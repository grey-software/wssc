import { Router } from "express";
import {
  RegisterSupervisor,
  GetAllSupervisors,
  SignInSupervisor,
  GetSupervisor,
  UpdateSupervisor,
  DeleteSupervisor,
  Logout,
} from "../controller/supervisor.controller";
import { verifyAdmin, verifySupervisor, verifyToken } from "../middleware/verifyToken";

const Supervisor: Router = Router();

Supervisor.route("/register").post(verifyAdmin, RegisterSupervisor);
Supervisor.route("/signin").post(SignInSupervisor);

Supervisor.route("/").get(verifyAdmin, GetAllSupervisors);
Supervisor.route("/:id")
  .get(verifySupervisor, GetSupervisor)
  .patch(verifySupervisor, UpdateSupervisor)
  .delete(verifyAdmin, DeleteSupervisor);

Supervisor.post("/logout", Logout)

export default Supervisor;
