import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/customError";

export const errorHandle = async (err:Error, _:Request, res:Response, next:NextFunction):Promise<any> => {
    console.log('errorHandle!!');
    if (err instanceof CustomError) {
      console.log('errorHandle CustomError!!');
      return res.status(err.statusCode).json(err.serializeErrors());
    }

    return res.status(400).json({
      error: { message: 'Something went wrong' }
    });

};