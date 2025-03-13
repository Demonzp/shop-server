import { Request, Response } from "express";
import BadRequestError from "../errors/badRequestError";
import { prisma } from "../../prisma/prisma-client";
import { comparePassword, passwordToHash } from "../lib/password";
import { createId, generateShortHash } from "../lib/global";

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
        console.log('currentUser = ', req.body.currentUser);
        const userUid = req.body.currentUser.userUid;

        const user = await prisma.user.findFirst({
            where:{
                uid: userUid
            }
        });

        if(!user){
            throw new BadRequestError('Ошибка авторизации!');
        }

        const passwordMatch = comparePassword(
            user.password,
            req.body.password
        );

        if (!passwordMatch) {
            throw new Error('Неверный пароль');
        }

        await prisma.user.update({
            where:{
                id:user.id
            },
            data:{
                password: passwordToHash(req.body.new_password)
            }
        });
        return res.json({ success: 'changePassword' });
    } catch (error) {
        console.log('error = ', (error as Error).message);
        throw new BadRequestError((error as Error).message);
    }
}

export const createRepairPasswordToken = async (req: Request, res: Response): Promise<any> => {
    try {
       
        const user = await prisma.user.findFirst({
            where:{
                email: req.body.email
            }
        });

        if(!user){
            throw new BadRequestError('Пользователя с такой почтой не найдено!');
        }

        const repairToken = await prisma.repairPassword.findFirst({
            where:{
                userId: user.id
            }
        });

        const newToken = generateShortHash(createId());
        const expires = 14 * 12 * 60 * 60 * 1000;
        const expiresToken = Date.now()+expires;

        if(repairToken){
            await prisma.repairPassword.update({
                where:{
                    id: repairToken.id
                },
                data:{
                    token: newToken,
                    expiration: expiresToken
                }
            });
            
        }else{
            await prisma.repairPassword.create({
                data:{
                    userId: user.id,
                    token: newToken,
                    expiration: expiresToken
                }
            });
        }

        return res.json({ success: 'repairPassword' });
    } catch (error) {
        console.log('error = ', (error as Error).message);
        throw new BadRequestError((error as Error).message);
    }
}

export const repairPassword = async (req: Request, res: Response): Promise<any> => {
    try {
        const token = req.body.token;
        const repairToken = await prisma.repairPassword.findFirst({
            where:{
                token,
                expiration:{
                    lt: Date.now()
                }
            }
        });

        if(!repairToken){
            throw new BadRequestError('Не верный адрес!!!');
        }

        return res.json({ success: 'repairPassword' });
    } catch (error) {
        console.log('error = ', (error as Error).message);
        throw new BadRequestError((error as Error).message);
    }
}