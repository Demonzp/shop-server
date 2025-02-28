import { NextFunction, Request, Response } from "express";
import BadRequestError from "../errors/badRequestError";
import { prisma } from "../../prisma/prisma-client";

export const authUser = async (req: Request, _: Response, next: NextFunction): Promise<any> => {
    
    if (!req.body.hasOwnProperty('currentUser')) {
        console.log('currentUser = ', req.body.currentUser);
        console.log('!req.body.hasOwnProperty(currentUser');
        throw new BadRequestError('Не авторизированый пользователь!');
    }

    try {
        const token = req.headers.authorization;
        const userUid = req.body.currentUser.userUid;

        const session = await prisma.session.findFirst({
            where:{
                token,
                userUid
            }
        });

        if(!session){
            console.log('!session');
            throw new BadRequestError('Не авторизированый пользователь!'); 
        }

        if(session.expiration<Date.now()){
            await prisma.session.delete({
                where:{
                    id: session.id
                }
            });
            console.log('session.expiration<Date.now()');
            throw new BadRequestError('Не авторизированый пользователь!'); 
        }
        req.body['session'] = {...session};
        return next();
    } catch (error) {
        throw new BadRequestError((error as Error).message);
    }
};