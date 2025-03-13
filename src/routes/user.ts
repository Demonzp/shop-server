import { Router } from "express";
import { changePasswordMiddl, createRepairPasswordTokenMiddl, repairPasswordMiddl, verifiedEmailMiddl } from "../middlewares/user";
import { changePassword, createRepairPasswordToken, repairPassword, verifiedEmail } from "../controllers/user";
import { authUser } from "../middlewares/authUser";

export const userRouter = Router();

userRouter.post('/verified-email', verifiedEmailMiddl, verifiedEmail);
userRouter.post('/change-password', changePasswordMiddl, authUser, changePassword);
userRouter.post('/start-repair-password', createRepairPasswordTokenMiddl, createRepairPasswordToken);
userRouter.post('/repair-password', repairPasswordMiddl, repairPassword);