import { Router } from "express";
import { verifiedEmailMiddl } from "../middlewares/user";
import { changePassword, verifiedEmail } from "../controllers/user";

export const userRouter = Router();

userRouter.post('/verified-email', verifiedEmailMiddl, verifiedEmail);
userRouter.post('/change-password', verifiedEmailMiddl, changePassword);