import { NextFunction, Request, Response } from "express";
import BadRequestError from "../errors/badRequestError";

export const authUser = async (req: Request, _: Response, next: NextFunction):Promise<any> => {
    if (!req.body.hasOwnProperty('currentUser')) {
        throw new BadRequestError('Не авторизированый пользователь!');
    }

    try {
       

        return next();
    } catch (error) {
        throw new BadRequestError((error as Error).message);
    }
};