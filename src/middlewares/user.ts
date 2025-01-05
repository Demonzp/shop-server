import { NextFunction, Request, Response } from "express";
import BadRequestError from "../errors/badRequestError";
import { formVerefiedEmailZod } from "../lib/zodUser";

export const verefiedEmailMiddl = async (req: Request, _: Response, next: NextFunction): Promise<any> => {
    try {
        const validate = formVerefiedEmailZod.safeParse(req.body);
        if (!validate.success) {
            console.log('validate.error = ', validate.error.issues);
            throw new BadRequestError('Неверная ссылка верификации електронной почты!');
        }
        req.body = {...validate.data};
        return next();
    } catch (error) {
        throw error;
    }
}