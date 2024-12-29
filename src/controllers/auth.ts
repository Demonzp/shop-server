import { Request, Response } from "express";
import BadRequestError from "../errors/badRequestError";
import { prisma } from "../../prisma/prisma-client";

export const signin = async (req:Request, res:Response):Promise<any>=>{
    try {
        //console.log('req.body = ', req.body);
        const users = await prisma.user.findMany();
        console.log('users = ', users);
        return res.json({success: 'signin'});
    } catch (error) {
        console.log('error = ', (error as Error).message);
        throw new BadRequestError((error as Error).message);
    }
}

export const signup = async (req:Request, res:Response):Promise<any>=>{
    try {
        //console.log('req.body = ', req.body);
        const users = await prisma.user.findMany();
        console.log('users = ', users);
        return res.json({success: 'signup'});
    } catch (error) {
        console.log('error = ', (error as Error).message);
        throw new BadRequestError((error as Error).message);
    }
}