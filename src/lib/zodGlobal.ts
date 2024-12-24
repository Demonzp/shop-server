import { ZodIssue } from "zod";
import { TValidationError } from "../errors/validationError";

export const parseZodError = (data:ZodIssue[]): TValidationError[]=>{
    const errorData = data.map((el)=>{
        return {
            path: el.path[0] as string,
            message: el.message
        }
    });
    return errorData;
};