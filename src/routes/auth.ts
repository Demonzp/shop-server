import { Router } from "express";
import { signinMiddl } from "../middlewares/signin";
import { signin, signout, signup } from "../controllers/auth";
import { signupMiddl } from "../middlewares/signup";

export const authRouter = Router();

authRouter.post('/signin', signinMiddl, signin);
authRouter.post('/signup', signupMiddl, signup);
authRouter.post('/signout', signout);