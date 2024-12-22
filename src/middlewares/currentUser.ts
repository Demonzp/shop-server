import { NextFunction, Request, Response } from "express";
import BadRequestError from "../errors/badRequestError";
import * as jwt from "jsonwebtoken";

export const currentUser = async (req: Request, _: Response, next: NextFunction):Promise<any> => {
    if (!req.headers.hasOwnProperty('authorization')) {
        return next();
    }

    try {
        const isExpired = false;
        const payload = jwt.verify(
            (req.headers.authorization as string),
            (process.env.JWT_KEY as string)
        );

        if(typeof payload==='string'){
            console.log('incorrect token!');
            return next();
        }

        if(!('uid' in payload) ||
            !('exp' in payload) ||
            !('lExp' in payload) ||
            !('role' in payload)
        ){
            console.log('incorrect token!');
            return next();
        }

        req.body['currentUser'] = {...payload};

        return next();
    } catch (error) {
        throw new BadRequestError((error as Error).message);
    }
};