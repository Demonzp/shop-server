import { Request, Response } from "express";
import BadRequestError from "../errors/badRequestError";
import { prisma } from "../../prisma/prisma-client";
import { createId } from "../lib/global";
import { comparePassword, passwordToHash } from "../lib/password";
import bruteforceList from "../lib/bruteforceGuard";
import jwt from "jsonwebtoken";
import { delOldUserSesions, getUserLogin } from "../lib/user";

export const signin = async (req: Request, res: Response): Promise<any> => {
    try {
        //console.log('req.body = ', req.body);

        const user = await prisma.user.findFirst({
            where: {
                email: req.body.email
            }
        });
        const ip = req.ip;
        const agent = req.get('User-Agent');
        if (!user) {
            if (!ip || !agent) {
                throw new Error('Неверный логин или пароль');
            }
            //const key = generateShortHash(ip+agent);
            //console.log('key = ', key);
            if (!bruteforceList.detect(ip)) {
                throw new Error('Слишком много попыток неверного входа, попробуйте позже или воспользуйтесь востановлением пароля!');
            }
            throw new Error('Неверный логин или пароль');

        }

        const passwordMatch = comparePassword(
            user.password,
            req.body.password
        );

        if (!passwordMatch) {
            throw new Error('Неверный логин или пароль');
        }

        //console.log('user = ', user);
        //const agent = req.get('User-Agent');
        //console.log('agent = ', agent);
        const tokenData = {
            ip,
            agent,
            userUid: user.uid,
        };

        const expires = 14 * 12 * 60 * 60 * 1000;

        //const expires = 60 * 1000;

        const token = jwt.sign(tokenData, (process.env.JWT_KEY as string), { expiresIn: '14d' });

        const dataUser = getUserLogin(user);
        const expiresUser = Date.now()+expires;
        console.log('token = ', token);

        const sessionData = {
            ip: ip as string,
            userId: user.id,
            token,
            agent: agent as string,
            expiration: expiresUser
        }

        await delOldUserSesions(user, ip as string, agent as string);

        await prisma.session.create({
            data: sessionData
        });

        return res.json({ token, user: dataUser, expiresUser });
    } catch (error) {
        console.log('error = ', (error as Error).message);
        throw new BadRequestError((error as Error).message);
    }
}

export const signup = async (req: Request, res: Response): Promise<any> => {
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
                phone: req.body.phone.length > 0 ? `380${req.body.phone}` : '',
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
        return res.json({ success: 'signup' });
    } catch (error) {
        console.log('error = ', (error as Error).message);
        throw new BadRequestError('Что то пошло не так!');
    }
}

export const signout = async (req: Request, res: Response): Promise<any> => {
    try {
        if (!req.body.hasOwnProperty('currentUser')) {
            throw new BadRequestError('Что то пошло не так!');
        }
        const currentUser = req.body['currentUser'];
        const user = await prisma.user.findFirst({
            where:{
                uid: currentUser.userUid
            }
        });
        if(!user){
            throw new BadRequestError('Что то пошло не так!'); 
        }
        await prisma.session.delete({
            where:{
                userId: user?.id,
                token: req.headers.authorization as string
            }
        });
        return res.json({ success: 'signout' });
    } catch (error) {
        throw new BadRequestError('Что то пошло не так!');
    }
};