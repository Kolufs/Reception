import { Router } from "express";
import {loginController} from "../controllers/loginController";

const authRouter = Router();

authRouter.post("/login", loginController);

export default authRouter;