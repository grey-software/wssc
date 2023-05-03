import { Router } from "express";
import { Logout, SignIn, SignUp } from "../controller/auth.controller";

const AuthRouter: Router = Router();

AuthRouter.post('/signup', SignUp)
AuthRouter.post("/signin", SignIn)
AuthRouter.get("/logout", Logout)



export default AuthRouter;