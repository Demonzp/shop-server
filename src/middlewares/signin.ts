import { NextFunction, Request, Response } from "express";
import BadRequestError from "../errors/badRequestError";
import { formLoginZod } from "../lib/zodAuth";
import { parseZodError } from "../lib/zodGlobal";
import ValidationError from "../errors/validationError";

export const signinMiddl = async (req: Request, _: Response, next: NextFunction): Promise<any> => {
    if (req.body.hasOwnProperty('currentUser')) {
        throw new BadRequestError('user already signin!');
    }
    console.log('signupMiddl');
    console.log('req.body = ', req.body);
    const validate = formLoginZod.safeParse(req.body);
    if (!validate.success) {
        console.log('validate.error = ', validate.error.issues);
        const zodData = parseZodError(validate.error.issues)
        console.log('zodData = ', zodData);
        throw new ValidationError(zodData);
    }
    req.body = {...validate.data};
    return next();
}