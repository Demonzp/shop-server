import { NextFunction, Request, Response } from "express";
import BadRequestError from "../errors/badRequestError";

export const signupMiddl = async (req:Request, _:Response, next:NextFunction):Promise<any>=>{
    if(req.body.hasOwnProperty('currentUser')){
        throw new BadRequestError('user already signin!');
    }

    console.log('req.body = ', req.body);

    

    return next();
}