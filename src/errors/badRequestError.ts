import CustomError from "./customError";

export default class BadRequestError extends CustomError{
    constructor(message:string) {
        super(message);
        
        this.statusCode = 400;
    }

    serializeErrors() {
        return this.message;
    }
}