import { Router } from "express";
import { signinMiddl } from "../middlewares/signin";
import { signin } from "../controllers/auth";

export const authRouter = Router();

authRouter.post('/signin', signinMiddl, signin);