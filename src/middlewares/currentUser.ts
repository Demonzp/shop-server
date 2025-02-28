import { NextFunction, Request, Response } from "express";
import BadRequestError from "../errors/badRequestError";
import jwt from "jsonwebtoken";

export const currentUser = async (req: Request, _: Response, next: NextFunction):Promise<any> => {
    if (!req.headers.hasOwnProperty('authorization')) {
        return next();
    }

    try {
        console.log('authorization = ', req.headers.authorization);
        //const isExpired = false;
        const payload = jwt.verify(
            (req.headers.authorization as string),
            (process.env.JWT_KEY as string)
        );

        console.log('payload = ', payload);
        
        if(typeof payload==='string'){
            console.log('incorrect token!');
            return next();
        }
        console.log('Date.now() = ', Date.now());
        console.log('<>() = ', Date.now()>Number(payload.exp));

        // if(!('uid' in payload) ||
        //     !('exp' in payload) ||
        //     !('lExp' in payload) ||
        //     !('role' in payload)
        // ){
        //     console.log('incorrect token!');
        //     return next();
        // }

        req.body['currentUser'] = {...payload};
        
        return next();
    } catch (error) {
        throw new BadRequestError((error as Error).message);
    }
};