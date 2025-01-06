import { Router } from "express";
import { verifiedEmailMiddl } from "../middlewares/user";
import { verifiedEmail } from "../controllers/user";

export const userRouter = Router();

userRouter.post('/verified-email', verifiedEmailMiddl, verifiedEmail);