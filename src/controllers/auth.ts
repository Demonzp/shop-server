import { Request, Response } from "express";
import BadRequestError from "../errors/badRequestError";
import { prisma } from "../../prisma/prisma-client";
import { createId } from "../lib/global";
import { passwordToHash } from "../lib/password";

export const signin = async (req:Request, res:Response):Promise<any>=>{
    try {
        //console.log('req.body = ', req.body);
        const user = await prisma.user.findFirst({
            where:{
                email: req.body.email
            }
        });
        console.log('user = ', user);
        const ip = req.ip;
        console.log('ip = ', ip);
        const agent = req.get('User-Agent');
        console.log('agent = ', agent);
        
        
        return res.json({success: 'signin'});
    } catch (error) {
        console.log('error = ', (error as Error).message);
        throw new BadRequestError((error as Error).message);
    }
}

export const signup = async (req:Request, res:Response):Promise<any>=>{
    try {
        //console.log('req.body = ', req.body);
        //const users = await prisma.user.findMany();
        const user = await prisma.user.create({
            data: {
                uid: createId(),
                email: req.body.email,
                firstName: req.body.firstName,
                secondName: req.body.secondName,
                lastName: req.body.lastName,
                phone: req.body.phone.length>0?`380${req.body.phone}`:'',
                password: passwordToHash(req.body.password),
            }
        });

        const verefied = await prisma.verifiedEmail.create({
            data: {
                userUid: user.uid,
                token: createId()
            }
        });

        console.log('user = ', user);
        console.log('verefied = ', verefied);
        return res.json({success: 'signup'});
    } catch (error) {
        console.log('error = ', (error as Error).message);
        throw new BadRequestError('Что то пошло не так!');
    }
}