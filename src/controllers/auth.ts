import { Request, Response } from "express";
import BadRequestError from "../errors/badRequestError";

export const signin = async (req:Request, res:Response):Promise<any>=>{
    try {
        console.log('req.body = ', req.body);
        return res.json({success: 'signin'});
    } catch (error) {
        console.log('error = ', (error as Error).message);
        throw new BadRequestError((error as Error).message);
    }
}