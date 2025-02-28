import { Router } from "express";
import { changePasswordMiddl, verifiedEmailMiddl } from "../middlewares/user";
import { changePassword, verifiedEmail } from "../controllers/user";
import { authUser } from "../middlewares/authUser";

export const userRouter = Router();

userRouter.post('/verified-email', verifiedEmailMiddl, verifiedEmail);
userRouter.post('/change-password', changePasswordMiddl, authUser, changePassword);