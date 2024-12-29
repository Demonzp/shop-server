import CustomError from "./customError";

export type TValidationError = {
    path: string;
    message: string;
};

export default class ValidationError extends CustomError{
    private errors:TValidationError[] = [];
    constructor(errors:TValidationError[]) {
        super('Invalid request parameters');
        console.log('ValidationError');
        this.errors = errors;
        this.statusCode = 412;
    }

    override serializeErrors() {
        console.log('ValidationError serializeErrors');
        return this.errors;
    }
}