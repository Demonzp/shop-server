import { Router } from "express";
import { verefiedEmailMiddl } from "../middlewares/user";
import { verifiedEmail } from "../controllers/user";

export const authRouter = Router();

authRouter.post('/verefied-email', verefiedEmailMiddl, verifiedEmail);