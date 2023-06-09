import { Router } from "express";
import {
  RegisterSupervisor,
  GetAllSupervisors,
  SignInSupervisor,
  GetSupervisor,
  UpdateSupervisor,
  DeleteSupervisor,
} from "../controller/supervisor.controller";
import { verifyAdmin, verifySupervisor } from "../middleware/verifyToken";

const Supervisor: Router = Router();

Supervisor.route("/register").post(RegisterSupervisor);
Supervisor.route("/signin").post(SignInSupervisor);

Supervisor.route("/").get( verifyAdmin , GetAllSupervisors);
Supervisor.route("/:id")
  .get(verifySupervisor,GetSupervisor)
  .patch( verifySupervisor,UpdateSupervisor)
  .delete(verifyAdmin, DeleteSupervisor);
  
// below is the general route defined to fetch all the record such as: no of users, complaints, supervisors along with no of complaint types registered

export default Supervisor;
