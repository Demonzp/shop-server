import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/customError";

export const errorHandle = async (err:Error, _:Request, res:Response):Promise<any> => {

    if (err instanceof CustomError) {
      return res.status(err.statusCode).send({ error: err.serializeErrors() });
    }

    return res.status(400).send({
      error: { message: 'Something went wrong' }
    });

};