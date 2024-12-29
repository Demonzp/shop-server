import { NextFunction, Request, Response } from "express";
import BadRequestError from "../errors/badRequestError";
import { formRegisterZod } from "../lib/zodAuth";
import ValidationError, { TValidationError } from "../errors/validationError";
import { parseZodError } from "../lib/zodGlobal";
import { prisma } from "../../prisma/prisma-client";

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
        const uniqErrors:TValidationError[] = [];
        const userByEmail = await prisma.user.findFirst({
            where:
                {
                    email: validate.data.email
                }
        });

        if(userByEmail){
            uniqErrors.push({path: 'email', message: 'Пользователь с такой електронной почтой уже зарегистрирован!'})
        }

        if(validate.data.phone.length>0){
            const userByPhone = await prisma.user.findFirst({
                where:
                    {
                        phone: `380${validate.data.phone}`
                    }
            });

            if(userByPhone){
                uniqErrors.push({path: 'phone', message: 'Пользователь c таким номером телефона уже зарегистрирован!'})
            }
        }

        if(uniqErrors.length>0){
            throw new ValidationError(uniqErrors);
        }
        
        req.body = {...validate.data};
    
        return next();
    } catch (error) {
        throw error;
    }
    
}