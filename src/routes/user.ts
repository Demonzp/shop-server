import { Router } from "express";
import { verefiedEmailMiddl } from "../middlewares/user";
import { verifiedEmail } from "../controllers/user";

export const userRouter = Router();

userRouter.post('/verefied-email', verefiedEmailMiddl, verifiedEmail);