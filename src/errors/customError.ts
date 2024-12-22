export default class CustomError extends Error{
    private _code: number = 400;

    constructor(message:string) {
        super(message);
    }

    set statusCode(code:number){
        this._code = code;
    }

    get statusCode() {
        return this._code;
    }

    serializeErrors() {
        return this.message;
    }
}