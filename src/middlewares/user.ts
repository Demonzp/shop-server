import { NextFunction, Request, Response } from "express";
import BadRequestError from "../errors/badRequestError";
import { formChangePassword, formRepairPassword, formVerifiedEmailZod } from "../lib/zodUser";

export const verifiedEmailMiddl = async (req: Request, _: Response, next: NextFunction): Promise<any> => {
    try {
        const validate = formVerifiedEmailZod.safeParse(req.body);
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

export const changePasswordMiddl = async (req: Request, _: Response, next: NextFunction): Promise<any> => {
    try {
        const validate = formChangePassword.safeParse(req.body);
        if (!validate.success) {
            console.log('validate.error = ', validate.error.issues);
            throw new BadRequestError('Не верный старый или новый пароль');
        }
        let currentUser = null;
        if (req.body.hasOwnProperty('currentUser')) {
            currentUser = {...req.body.currentUser};
        }
        req.body = {...validate.data};
        
        if(currentUser){
            req.body['currentUser'] = {...currentUser};
        }
        return next();
    } catch (error) {
        throw error;
    }
}

export const repairPasswordMiddl = async (req: Request, _: Response, next: NextFunction): Promise<any> => {
    try {
        if(req.body.hasOwnProperty('currentUser')){
            throw new BadRequestError('Авторизированый пользователь');
        }
        
        const validate = formRepairPassword.safeParse(req.body);
        if (!validate.success) {
            console.log('validate.error = ', validate.error.issues);
            throw new BadRequestError('Не верный адрес електронной почты');
        }
        
        req.body = {...validate.data};
        return next();
    } catch (error) {
        throw error;
    }
}