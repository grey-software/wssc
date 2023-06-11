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

// below is the general route defined to fetch all the record such as: no of users, complaints, supervisors along with no of complaint types registered

export default Supervisor;
