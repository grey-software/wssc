import { Router } from "express";
import {
  UpdateUser,
  GetUser,
  RetreiveAllUsers,
  DeleteAccount,
  ChangePassword,
} from "../controller/citizen.controller";
import {
  verifyAdmin,
  verifyToken,
  verifyUser,
} from "../middleware/verifyToken";

const Citizen: Router = Router();

Citizen.route("/:id")
  .get(verifyUser, GetUser)
  .patch(verifyUser, UpdateUser)
  .delete(verifyUser, DeleteAccount);
Citizen.patch("/changepassword/:id", verifyUser, ChangePassword);
Citizen.get("/", verifyToken, RetreiveAllUsers);

export default Citizen;
