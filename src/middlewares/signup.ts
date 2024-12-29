import { NextFunction, Request, Response } from "express";
import BadRequestError from "../errors/badRequestError";
import { formRegisterZod } from "../lib/zodAuth";
import ValidationError from "../errors/validationError";
import { parseZodError } from "../lib/zodGlobal";

export const signupMiddl = async (req:Request, _:Response, next:NextFunction):Promise<any>=>{
    try {
        if(req.body.hasOwnProperty('currentUser')){
            throw new BadRequestError('user already signin!');
        }
        console.log('signupMiddl');
        console.log('req.body = ', req.body);
        
        const validate = formRegisterZod.safeParse(req.body);
        if(!validate.success){
            console.log('validate.error = ', validate.error.issues);
            const zodData = parseZodError(validate.error.issues)
            console.log('zodData = ', zodData);
            throw new ValidationError(zodData);
        }
    
        return next();
    } catch (error) {
        throw error;
    }
    
}