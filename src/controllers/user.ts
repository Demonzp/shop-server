import { Request, Response } from "express";
import BadRequestError from "../errors/badRequestError";
import { prisma } from "../../prisma/prisma-client";

export const verifiedEmail = async (req: Request, res: Response): Promise<any> => {
    try {
        console.log('req.body = ', req.body);
        const verefied = await prisma.verifiedEmail.findFirst({
            where:{
                userUid: req.body.userUid,
                token: req.body.token
            }
        });

        if(!verefied){
            throw new BadRequestError('Неверная ссылка верификации електронной почты!');
        }

        const user = await prisma.user.findFirst({
            where:{
                uid: verefied.userUid
            }
        });

        if(!user){
            throw new BadRequestError('Неверная ссылка верификации електронной почты!');
        }

        if(user.verified!==null){
            throw new BadRequestError('Почта уже верифицирована!');
        }

        await prisma.user.update({
            where:{
                id: user.id,
            },
            data:{
                verified: String(Date.now())
            }
        });
        await prisma.verifiedEmail.delete({
            where:{
                id: verefied.id
            }
        });
        console.log('users = ', verefied);

        return res.json({ success: 'verified' });
    } catch (error) {
        console.log('error = ', (error as Error).message);
        throw new BadRequestError((error as Error).message);
    }
}

export const changePassword = async (req: Request, res: Response): Promise<any> => {
    try {

        return res.json({ success: 'changePassword' });
    } catch (error) {
        console.log('error = ', (error as Error).message);
        throw new BadRequestError((error as Error).message);
    }
}