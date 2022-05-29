import { IErrorResponse } from "../interfaces/error";

class ErrorResponse extends Error {

    public statusCode: number
    public path: string

    constructor(response: IErrorResponse) {
        super(response.error);
        this.statusCode = response.statusCode
        this.path = response.path
    }
}

export {
    ErrorResponse
}